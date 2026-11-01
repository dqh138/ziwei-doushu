/**
 * Giới hạn số lượt luận theo IP, để người lạ/bot không làm cạn tiền API.
 * 按 IP 限流，防止被刷。
 *
 * Bộ đếm nằm trong bộ nhớ của từng phiên bản serverless, nên là giới hạn "gần đúng":
 * Vercel có thể chạy nhiều phiên bản song song. Để chắc chắn không bị trừ quá tay,
 * hãy đặt thêm hạn mức chi tiêu hằng tháng trong Claude Console.
 *
 *   AI_RATE_LIMIT_PER_HOUR   mặc định 20 lượt / IP / giờ
 *   AI_RATE_LIMIT_PER_DAY    mặc định 60 lượt / IP / ngày
 */
const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const hits = new Map<string, number[]>();

const limit = (name: string, fallback: number) => {
  const n = parseInt(process.env[name] || '', 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown').trim();
}

/** Ghi nhận một lượt; trả về số giây phải chờ nếu vượt giới hạn, 0 nếu được phép. */
export function takeToken(ip: string, now = Date.now()): number {
  const perHour = limit('AI_RATE_LIMIT_PER_HOUR', 20);
  const perDay = limit('AI_RATE_LIMIT_PER_DAY', 60);
  const list = (hits.get(ip) ?? []).filter(t => now - t < DAY);
  const lastHour = list.filter(t => now - t < HOUR);
  if (lastHour.length >= perHour) {
    hits.set(ip, list);
    return Math.ceil((lastHour[0] + HOUR - now) / 1000);
  }
  if (list.length >= perDay) {
    hits.set(ip, list);
    return Math.ceil((list[0] + DAY - now) / 1000);
  }
  list.push(now);
  hits.set(ip, list);
  // dọn bớt bộ nhớ khi có quá nhiều IP
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.length || now - v[v.length - 1] > DAY) hits.delete(k);
  }
  return 0;
}
