/**
 * Địa chỉ gốc của trang — dùng cho sitemap, robots.txt, thẻ canonical/OpenGraph và chân ảnh chia sẻ.
 * 站点根地址。
 *
 * Thứ tự ưu tiên:
 *  1. NEXT_PUBLIC_SITE_URL — nếu bạn tự đặt (vd. khi gắn domain riêng)
 *  2. Địa chỉ production Vercel tự cấp (vd. ziwei-doushu-wheat.vercel.app) — không cần cấu hình gì
 *  3. http://localhost:3000 khi chạy trên máy
 */
const vercelProductionHost =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL
  || (vercelProductionHost ? `https://${vercelProductionHost}` : '')
  || 'http://localhost:3000'
).replace(/\/+$/, '');

/** 只取域名部分，用于界面上展示（如分享卡底部） */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');
