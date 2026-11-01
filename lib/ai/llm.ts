/**
 * Gọi mô hình AI theo kiểu stream — Claude (mặc định) hoặc DeepSeek.
 * 流式调用大模型：默认 Claude，可切换 DeepSeek。
 *
 * Biến môi trường (đặt trên Vercel → Settings → Environment Variables):
 *   ANTHROPIC_API_KEY   khóa API Claude (bắt đầu bằng sk-ant-…)            — bắt buộc khi dùng Claude
 *   AI_PROVIDER         'anthropic' (mặc định) | 'deepseek'
 *   AI_MODEL            mặc định 'claude-sonnet-5-5'; có thể đổi 'claude-haiku-5-5' cho rẻ
 *   AI_MAX_TOKENS       mặc định 6000
 *   AI_THINKING         'off' (mặc định, trả chữ ngay) | 'on' (cho mô hình tự suy nghĩ — chậm hơn, tốn token hơn)
 *   DEEPSEEK_API_KEY    khi AI_PROVIDER=deepseek; model mặc định 'deepseek-flash'
 */
import Anthropic from '@anthropic-ai/sdk';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AiConfigError extends Error {}

/** Mô hình trả về xong nhưng không có chữ nào (từ chối, chỉ có khối thinking, v.v.). */
export class EmptyCompletionError extends Error {
  constructor(public stopReason: string | null | undefined, public blockTypes: string[]) {
    super(`empty completion (stop_reason=${stopReason}, blocks=${blockTypes.join(',') || 'none'})`);
  }
}

const provider = () => (process.env.AI_PROVIDER || 'anthropic').toLowerCase();
const maxTokens = () => {
  const n = parseInt(process.env.AI_MAX_TOKENS || '', 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 16000) : 6000;
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
  // Mô hình đời mới có thể tự "nghĩ" trước khi viết; khi đó toàn bộ max_tokens có thể bị tiêu vào phần nghĩ
  // và không còn chữ nào cho người dùng. Mặc định tắt để chữ ra ngay.
  const thinkingOff = (process.env.AI_THINKING || 'off').toLowerCase() !== 'on';
  const params = {
    model: process.env.AI_MODEL || 'claude-sonnet-5-5',
    max_tokens: maxTokens(),
    system,
    messages,
    ...(thinkingOff ? { thinking: { type: 'disabled' as const } } : {}),
  };

  let produced = 0;
  async function* run(p: typeof params) {
    const stream = client.messages.stream(p, { signal });
    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        produced += event.delta.text.length;
        yield event.delta.text;
      }
    }
    return stream.finalMessage();
  }

  let final;
  try {
    final = yield* run(params);
  } catch (e) {
    // Mô hình không nhận tham số thinking → thử lại một lần không kèm tham số đó
    if (thinkingOff && !produced && e instanceof Anthropic.BadRequestError && /thinking/i.test(e.message)) {
      console.warn('[ai] model rejected thinking=disabled, retrying without it');
      const { thinking: _omit, ...rest } = params as typeof params & { thinking?: unknown };
      void _omit;
      final = yield* run(rest as typeof params);
    } else {
      throw e;
    }
  }
  console.info(`[ai] done model=${final.model} stop=${final.stop_reason} in=${final.usage?.input_tokens} out=${final.usage?.output_tokens} chars=${produced} blocks=${final.content.map(b => b.type).join(',')}`);
  if (!produced) throw new EmptyCompletionError(final.stop_reason, final.content.map(b => b.type));
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
      // Gửi ngay một dòng chú thích SSE để trình duyệt nhận header, tránh bị proxy giữ lại khi mô hình nghĩ lâu
      controller.enqueue(enc.encode(': ok\n\n'));
      try {
        for await (const text of chunks) send(text);
      } catch (e) {
        let msg: string;
        try { msg = onError(e); } catch (inner) {
          console.error('[ai] onError failed', inner);
          msg = '\n\nLuận giải bị gián đoạn, vui lòng thử lại.\n\n解读中断，请重试。';
        }
        try { send(msg); } catch { /* client đã ngắt */ }
      } finally {
        try {
          controller.enqueue(enc.encode('data: [DONE]\n\n'));
          controller.close();
        } catch { /* client đã ngắt */ }
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
