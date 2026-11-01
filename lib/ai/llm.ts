/**
 * Gọi mô hình AI theo kiểu stream — Claude (mặc định) hoặc DeepSeek.
 * 流式调用大模型：默认 Claude，可切换 DeepSeek。
 *
 * Biến môi trường (đặt trên Vercel → Settings → Environment Variables):
 *   ANTHROPIC_API_KEY   khóa API Claude (bắt đầu bằng sk-ant-…)            — bắt buộc khi dùng Claude
 *   AI_PROVIDER         'anthropic' (mặc định) | 'deepseek'
 *   AI_MODEL            mặc định 'claude-sonnet-5-5'; có thể đổi 'claude-haiku-5-5' cho rẻ
 *   AI_MAX_TOKENS       mặc định 4000
 *   DEEPSEEK_API_KEY    khi AI_PROVIDER=deepseek; model mặc định 'deepseek-flash'
 */
import Anthropic from '@anthropic-ai/sdk';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AiConfigError extends Error {}

const provider = () => (process.env.AI_PROVIDER || 'anthropic').toLowerCase();
const maxTokens = () => {
  const n = parseInt(process.env.AI_MAX_TOKENS || '', 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 8000) : 4000;
};

/** Đọc khóa từ biến môi trường, bỏ khoảng trắng/xuống dòng/dấu nháy lỡ dán kèm (gây lỗi header → "Connection error"). */
function readKey(name: string): string | undefined {
  const v = process.env[name]?.trim().replace(/^['"]|['"]$/g, '').trim();
  return v || undefined;
}

export function aiConfigured(): boolean {
  return provider() === 'deepseek' ? !!readKey('DEEPSEEK_API_KEY') : !!readKey('ANTHROPIC_API_KEY');
}

/** Trả về luồng các đoạn chữ. */
export async function* streamCompletion(system: string, messages: ChatMessage[], signal?: AbortSignal): AsyncGenerator<string> {
  if (provider() === 'deepseek') {
    yield* streamDeepSeek(system, messages, signal);
    return;
  }
  const apiKey = readKey('ANTHROPIC_API_KEY');
  if (!apiKey) throw new AiConfigError('ANTHROPIC_API_KEY chưa được đặt');
  if (!apiKey.startsWith('sk-ant-api')) {
    console.warn('[ai] ANTHROPIC_API_KEY không có dạng khóa API (sk-ant-api…); Anthropic có thể từ chối.');
  }
  const client = new Anthropic({ apiKey, maxRetries: 1 });
  const stream = client.messages.stream(
    {
      model: process.env.AI_MODEL || 'claude-sonnet-5-5',
      max_tokens: maxTokens(),
      system,
      messages,
    },
    { signal },
  );
  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      yield event.delta.text;
    }
  }
}

async function* streamDeepSeek(system: string, messages: ChatMessage[], signal?: AbortSignal): AsyncGenerator<string> {
  const apiKey = readKey('DEEPSEEK_API_KEY');
  if (!apiKey) throw new AiConfigError('DEEPSEEK_API_KEY chưa được đặt');
  const res = await fetch(process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.AI_MODEL || 'deepseek-flash',
      max_tokens: maxTokens(),
      stream: true,
      messages: [{ role: 'system', content: system }, ...messages],
    }),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(`DeepSeek HTTP ${res.status}`);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') return;
      try {
        const text = JSON.parse(data).choices?.[0]?.delta?.content;
        if (text) yield text;
      } catch { /* bỏ qua dòng hỏng */ }
    }
  }
}

/**
 * Chuẩn hóa lịch sử hội thoại từ trình duyệt: bỏ tin rỗng, gộp tin cùng vai liên tiếp,
 * bắt đầu bằng 'user', giới hạn số tin và độ dài để tránh lạm dụng.
 */
export function sanitizeMessages(raw: unknown, opts = { maxMessages: 10, maxChars: 8000 }): ChatMessage[] | null {
  if (!Array.isArray(raw)) return null;
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== 'object') continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    const text = content.trim().slice(0, opts.maxChars);
    if (!text) continue;
    const last = out[out.length - 1];
    if (last && last.role === role) last.content += `\n\n${text}`;
    else out.push({ role, content: text });
  }
  let trimmed = out.slice(-opts.maxMessages);
  while (trimmed.length && trimmed[0].role !== 'user') trimmed = trimmed.slice(1);
  if (!trimmed.length || trimmed[trimmed.length - 1].role !== 'user') return null;
  return trimmed;
}

/** Gói luồng chữ thành SSE đúng định dạng giao diện đang đọc: data: {"delta":{"text":"…"}} … data: [DONE] */
export function sseResponse(chunks: AsyncGenerator<string>, onError: (e: unknown) => string): Response {
  const enc = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (text: string) => controller.enqueue(enc.encode(`data: ${JSON.stringify({ delta: { text } })}\n\n`));
      try {
        for await (const text of chunks) send(text);
      } catch (e) {
        send(onError(e));
      } finally {
        controller.enqueue(enc.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });
  return new Response(body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
