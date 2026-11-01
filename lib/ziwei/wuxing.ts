/**
 * Ngũ hành của tinh diệu và Tứ Hóa — dùng làm quy luật màu trên lá số.
 * 星曜与四化的五行属性，作为命盘配色规则。
 *
 * Chỉ ghi hành cho những sao mà các sách lớn thống nhất (14 chính tinh, lục cát, lục sát,
 * Lộc Tồn, Thiên Mã và một số tạp diệu quen thuộc). Sao có nhiều thuyết khác nhau để trống
 * → hiện màu trung tính, không đoán.
 * Sao kiêm hai hành (Tham Lang Mộc kiêm Thủy, Thất Sát Kim kiêm Hỏa, Kình Dương Kim kiêm Hỏa)
 * lấy hành chính đứng trước.
 */
export type WuXing = '木' | '火' | '土' | '金' | '水';

export const WUXING_META: Record<WuXing, { vi: string; cssVar: string }> = {
  木: { vi: 'Mộc', cssVar: 'var(--wx-moc)' },
  火: { vi: 'Hỏa', cssVar: 'var(--wx-hoa)' },
  土: { vi: 'Thổ', cssVar: 'var(--wx-tho)' },
  金: { vi: 'Kim', cssVar: 'var(--wx-kim)' },
  水: { vi: 'Thủy', cssVar: 'var(--wx-thuy)' },
};
export const WUXING_ORDER: WuXing[] = ['木', '火', '土', '金', '水'];

export const STAR_WUXING: Record<string, WuXing> = {
  // 14 chính tinh 主星
  紫微: '土', 天机: '木', 太阳: '火', 武曲: '金', 天同: '水', 廉贞: '火', 天府: '土',
  太阴: '水', 贪狼: '木', 巨门: '水', 天相: '水', 天梁: '土', 七杀: '金', 破军: '水',
  // Lục cát + Lộc Tồn, Thiên Mã 六吉、禄存、天马
  左辅: '土', 右弼: '水', 文昌: '金', 文曲: '水', 天魁: '火', 天钺: '火', 禄存: '土', 天马: '火',
  // Lục sát 六煞
  擎羊: '金', 陀罗: '金', 火星: '火', 铃星: '火', 地空: '火', 地劫: '火',
  // Tạp diệu có hành thống nhất 杂曜
  红鸾: '水', 天喜: '水', 天刑: '火', 天姚: '水', 龙池: '水', 凤阁: '土', 三台: '土', 八座: '土',
  恩光: '火', 天贵: '土', 天官: '土', 天福: '土', 台辅: '土', 封诰: '土', 华盖: '木', 咸池: '水',
  天哭: '金',
};

/** Ngũ hành Tứ Hóa theo cổ thư: Lộc Thổ, Quyền Mộc, Khoa Thủy, Kỵ Thủy 化禄属土、化权属木、化科属水、化忌属水 */
export const SIHUA_WUXING: Record<string, WuXing> = { 禄: '土', 权: '木', 科: '水', 忌: '水' };

export function starColor(name: string): string {
  const w = STAR_WUXING[name];
  return w ? WUXING_META[w].cssVar : 'var(--wx-none)';
}

/** Bộ sao hiện ở chế độ gọn: chính tinh + lục cát + Lộc Tồn, Thiên Mã + lục sát */
export const CORE_LUCKY = new Set(['左辅', '右弼', '文昌', '文曲', '天魁', '天钺', '禄存', '天马']);
export const CORE_SHA = new Set(['擎羊', '陀罗', '火星', '铃星', '地空', '地劫']);
