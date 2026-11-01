/**
 * Đọc luồng SSE từ /api/interpret và /api/heming (dùng ở trình duyệt).
 * Gom các dòng bị cắt giữa hai gói mạng, gọi onText với toàn bộ chữ đã nhận.
 * 读取 SSE 流：缓冲跨包的半行，回调累计文本。
 */
export async function readSseText(body: ReadableStream<Uint8Array>, onText: (full: string) => void): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  let text = '';
  const handle = (line: string): boolean => {
    if (!line.startsWith('data:')) return false;
    const data = line.slice(5).trim();
    if (data === '[DONE]') return true;
    try {
      const delta = JSON.parse(data).delta?.text ?? '';
      if (delta) { text += delta; onText(text); }
    } catch { /* dòng hỏng */ }
    return false;
  };
  outer: while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl).replace(/\r$/, '');
      buf = buf.slice(nl + 1);
      if (handle(line)) break outer;
    }
  }
  if (buf) handle(buf);
  try { reader.cancel(); } catch { /* bỏ qua */ }
  return text;
}

export const EMPTY_REPLY =
  'Không nhận được nội dung luận giải (có thể mạng bị ngắt hoặc máy chủ quá tải). Vui lòng bấm lại chủ đề.\n\n未收到解读内容（可能网络中断或服务繁忙），请重试。';
