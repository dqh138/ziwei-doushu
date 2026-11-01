/**
 * Độ sáng tinh diệu (亮度 / 庙旺) — định nghĩa các bậc và đối chiếu giữa các hệ.
 * 星曜亮度等级定义，及中国大陆/台湾与越南体系对照。
 *
 * Các hệ đang dùng:
 *  · 《紫微斗数全书》(Toàn Thư) và phần lớn phần mềm TQ/ĐL: 7 bậc 庙 > 旺 > 得 > 利 > 平 > 不 > 陷
 *  · Một số phái ghi 7 bậc kiểu 入庙、旺地、得地、利益、平和、落闲、落陷 (闲 thay cho 不)
 *  · Trung Châu phái 中州派 (Vương Đình Chi, HK/ĐL): 5 bậc 庙 > 旺 > 平 > 闲 > 陷
 *  · Giản lược: 4 bậc 庙 旺 平 陷
 *  · Tử Vi Việt Nam phổ biến: 5 bậc Miếu (M) > Vượng (V) > Đắc địa (Đ) > Bình hòa (B) > Hãm (H)
 *
 * Engine trả về một chữ trong StarBrightness ('庙' | '旺' | '得' | '利' | '平' | '不' | '闲' | '陷' | '地').
 */
import type { StarBrightness } from './types';

export interface BrightnessLevel {
  zh: StarBrightness;
  /** Tên đầy đủ trong sách Trung Quốc */
  zhFull: string;
  /** Tên Hán-Việt */
  vi: string;
  /** Viết tắt hiển thị trên lá số */
  abbr: string;
  /** 1 = mạnh nhất */
  rank: number;
  /** Bậc tương ứng trong hệ 5 bậc Việt Nam */
  vn: VnLevel;
  /** Ghi chú khi quy sang hệ VN không trọn vẹn */
  vnNote?: string;
  descVi: string;
  descZh: string;
  color: string;
}

export type VnLevel = 'M' | 'V' | 'Đ' | 'B' | 'H';

export const VN_LEVELS: Record<VnLevel, { vi: string; zh: string; color: string }> = {
  M: { vi: 'Miếu', zh: '庙', color: '#e0a526' },
  V: { vi: 'Vượng', zh: '旺', color: '#d08a1e' },
  Đ: { vi: 'Đắc địa', zh: '得', color: '#5a9e6f' },
  B: { vi: 'Bình hòa', zh: '平', color: '#8a8f99' },
  H: { vi: 'Hãm', zh: '陷', color: '#d0503c' },
};

export const BRIGHTNESS_LEVELS: Record<StarBrightness, BrightnessLevel> = {
  庙: {
    zh: '庙', zhFull: '入庙', vi: 'Miếu', abbr: 'M', rank: 1, vn: 'M', color: '#e0a526',
    descVi: 'Sao ở vị trí lý tưởng nhất, sức mạnh trọn vẹn; cát tinh rất cát, hung tinh bớt hung.',
    descZh: '星最明，力量最强，吉星极吉，凶星不凶。',
  },
  旺: {
    zh: '旺', zhFull: '旺地', vi: 'Vượng', abbr: 'V', rank: 2, vn: 'V', color: '#d08a1e',
    descVi: 'Rất thuận lợi, phát huy phần lớn tính tốt, chỉ kém Miếu một bậc.',
    descZh: '位置甚佳，大部分优点得以发挥，仅次于庙。',
  },
  得: {
    zh: '得', zhFull: '得地', vi: 'Đắc', abbr: 'Đ', rank: 3, vn: 'Đ', color: '#5a9e6f',
    descVi: 'Đắc địa: vị trí hợp, sức mạnh vừa phải, dùng được.',
    descZh: '得地：位置合宜，力量中等而可用。',
  },
  地: {
    zh: '地', zhFull: '得地', vi: 'Đắc địa', abbr: 'Đ', rank: 3, vn: 'Đ', color: '#5a9e6f',
    descVi: 'Đắc địa (một số bảng hiện đại ghi là 地).',
    descZh: '得地（部分现代亮度表记作「地」）。',
  },
  利: {
    zh: '利', zhFull: '利益', vi: 'Lợi', abbr: 'L', rank: 4, vn: 'Đ', color: '#6f9f8a',
    vnNote: 'Hệ VN không tách riêng, thường gộp vào Đắc địa (cận Bình hòa).',
    descVi: 'Lợi ích: vẫn có lợi nhưng sức đã giảm, chỉ phát huy được một phần tính tốt.',
    descZh: '利益：尚属有利，但力量渐弱，只能发挥部分优点。',
  },
  平: {
    zh: '平', zhFull: '平和', vi: 'Bình', abbr: 'B', rank: 5, vn: 'B', color: '#8a8f99',
    descVi: 'Bình hòa: trung tính, cung không giúp cũng không hại sao.',
    descZh: '平和：中等，宫位对星曜无助亦无损。',
  },
  闲: {
    zh: '闲', zhFull: '落闲', vi: 'Nhàn', abbr: 'N', rank: 6, vn: 'B', color: '#9a8a7a',
    vnNote: 'Hệ VN không tách riêng, thường gộp vào Bình hòa (thiên yếu).',
    descVi: 'Lạc nhàn: sao nhàn rỗi, sức yếu, khó phát huy; dùng trong Trung Châu phái và một số bảng 7 bậc.',
    descZh: '落闲：星曜闲散，力量偏弱，难以发挥；中州派及部分七级表使用。',
  },
  不: {
    zh: '不', zhFull: '不得地', vi: 'Bất', abbr: 'Bt', rank: 6, vn: 'H', color: '#b0705a',
    vnNote: 'Hệ VN không tách riêng, thường gộp vào Hãm (nhẹ).',
    descVi: 'Bất đắc địa: khó phát huy tính tốt, có ảnh hưởng xấu nhẹ nhưng chưa nặng như Hãm.',
    descZh: '不得地：难以发挥优点，略有不利，但不及落陷严重。',
  },
  陷: {
    zh: '陷', zhFull: '落陷', vi: 'Hãm', abbr: 'H', rank: 7, vn: 'H', color: '#d0503c',
    descVi: 'Lạc hãm: vị trí kém nhất, tính tốt khó hiện, tính xấu dễ bộc lộ; cát tinh giảm cát, hung tinh thêm hung.',
    descZh: '落陷：最不利之位，优点难显，缺点易放大；吉星减吉，凶星更凶。',
  },
};

/** Thứ tự hiển thị trong bảng chú giải 7 bậc */
export const SEVEN_LEVEL_ORDER: StarBrightness[] = ['庙', '旺', '得', '利', '平', '不', '陷'];
export const FIVE_LEVEL_ZZ_ORDER: StarBrightness[] = ['庙', '旺', '平', '闲', '陷'];

export type BrightnessDisplay = 'detail' | 'vn';

/** Nhãn ngắn để hiện cạnh sao trên lá số */
export function brightnessTag(level: StarBrightness | undefined, mode: BrightnessDisplay) {
  if (!level) return null;
  const def = BRIGHTNESS_LEVELS[level];
  if (!def) return null;
  if (mode === 'vn') {
    const v = VN_LEVELS[def.vn];
    return { abbr: def.vn, vi: v.vi, zh: v.zh, color: v.color, rank: def.rank };
  }
  return { abbr: def.abbr, vi: def.vi, zh: def.zh, color: def.color, rank: def.rank };
}

/** Các bảng độ sáng có trong engine (lib/ziwei/school-data.ts) */
export const BRIGHTNESS_SCHOOLS = [
  { id: 'QS', vi: 'Tử Vi Đẩu Số Toàn Thư', zh: '紫微斗数全书', levels: 7, note: 'Mặc định, khớp phần mềm TQ/ĐL phổ biến' },
  { id: 'XD1', vi: 'Bảng hiện đại 1', zh: '现代修订一', levels: 7, note: 'Hiệu đính từ Toàn Thư' },
  { id: 'ZZ', vi: 'Trung Châu phái', zh: '中州派', levels: 5, note: 'Vương Đình Chi (HK/ĐL): Miếu Vượng Bình Nhàn Hãm' },
  { id: 'XD2', vi: 'Bảng hiện đại 2', zh: '现代修订二', levels: 5, note: 'Hệ 5 bậc kiểu Trung Châu' },
] as const;

export type BrightnessSchoolId = typeof BRIGHTNESS_SCHOOLS[number]['id'];
