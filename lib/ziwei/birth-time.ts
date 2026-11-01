/**
 * Từ dữ liệu form → ngày lập lá số + canh giờ, dùng chung cho form và trang hợp lá số.
 * 表单 → 排盘日期与时辰（统一走 true-solar-time.ts，含均时差与出生地时区）。
 *
 * · Việt Nam: giờ đồng hồ theo múi giờ lịch sử của nơi sinh (thường UTC+7; xem vietnam.ts).
 * · Trung Quốc: giờ Bắc Kinh UTC+8 như bản gốc.
 * · Có nơi sinh → hiệu chỉnh giờ mặt trời thật (kinh độ + phương trình thời gian).
 * · Giờ Tý muộn (23:00–23:59 giờ mặt trời thật) tính sang ngày hôm sau, theo quy tắc của engine.
 */
import type { BirthFormState } from '@/components/BirthForm';
import type { BirthInfo } from './types';
import {
  calculateTrueSolarTime,
  resolveZiweiDayOffset,
  shiftGregorianDate,
  type TrueSolarTimeResult,
} from './true-solar-time';
import { findVnPlace, vnUtcOffsetMinutes } from './vietnam';

export type BirthCountry = 'VN' | 'CN';

export interface ResolvedBirth {
  year: number;
  month: number;
  day: number;
  /** Canh giờ 0–11 (Tý = 0) */
  branch: number;
  /** Múi giờ của giờ đồng hồ đã nhập (phút) */
  utcOffsetMinutes: number;
  /** Múi giờ khác UTC+7 do lịch sử (chỉ với Việt Nam) */
  historicalOffset: boolean;
  /** Kết quả giờ mặt trời thật; null khi không rõ giờ sinh */
  solar: TrueSolarTimeResult | null;
}

export function resolveBirth(form: BirthFormState): ResolvedBirth {
  const y = parseInt(form.year) || 0;
  const m = parseInt(form.month) || 0;
  const d = parseInt(form.day) || 0;
  const country: BirthCountry = form.country ?? 'CN';
  const hasPlace = !!form.province && !!form.city;

  let utcOffsetMinutes = 480;
  let historicalOffset = false;
  if (country === 'VN') {
    const place = hasPlace ? findVnPlace(form.province, form.city) : undefined;
    utcOffsetMinutes = vnUtcOffsetMinutes(y, m, d, place?.south);
    historicalOffset = utcOffsetMinutes !== 420;
  }

  if (form.unknownTime || !y || !m || !d) {
    return { year: y, month: m, day: d, branch: 0, utcOffsetMinutes, historicalOffset, solar: null };
  }

  const solar = calculateTrueSolarTime({
    year: y, month: m, day: d,
    clockHour: parseInt(form.clockHour) || 0,
    clockMinute: parseInt(form.clockMinute) || 0,
    longitude: hasPlace ? form.longitude : undefined,
    utcOffsetMinutes,
  });
  const dayOffset = resolveZiweiDayOffset(solar, 'next-day');
  const date = shiftGregorianDate({ year: y, month: m, day: d }, dayOffset);
  return { ...date, branch: solar.branch, utcOffsetMinutes, historicalOffset, solar };
}

export function birthInfoFromForm(form: BirthFormState): BirthInfo {
  const r = resolveBirth(form);
  const hasPlace = !!form.province && !!form.city;
  return {
    year: r.year, month: r.month, day: r.day,
    hour: r.branch,
    gender: form.gender,
    name: form.name || undefined,
    province: form.province || undefined,
    city: form.city || undefined,
    longitude: hasPlace ? form.longitude : undefined,
    origInput: form.unknownTime ? undefined : {
      year: parseInt(form.year) || 0,
      month: parseInt(form.month) || 0,
      day: parseInt(form.day) || 0,
      clockHour: parseInt(form.clockHour) || 0,
      clockMinute: parseInt(form.clockMinute) || 0,
    },
  };
}
