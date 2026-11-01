/**
 * Hồi quy: nơi sinh Việt Nam + múi giờ lịch sử + giờ mặt trời thật.
 * 越南出生地与历史时区回归测试。
 */
import assert from 'node:assert/strict';
import type { BirthFormState } from '../../components/BirthForm';
import { resolveBirth } from '../../lib/ziwei/birth-time';
import { vnUtcOffsetMinutes, VN_PROVINCES, findVnPlace } from '../../lib/ziwei/vietnam';

const base: BirthFormState = {
  name: '', year: '', month: '', day: '', clockHour: '0', clockMinute: '0',
  unknownTime: false, province: '', city: '', longitude: 120, gender: 'male', country: 'VN',
};
const form = (o: Partial<BirthFormState>): BirthFormState => {
  const f = { ...base, ...o };
  if (f.country === 'VN' && f.province && f.city) f.longitude = findVnPlace(f.province, f.city)!.longitude;
  return f;
};

// 34 tỉnh, 63 tỉnh cũ, không trùng tên
assert.equal(VN_PROVINCES.length, 34);
const places = VN_PROVINCES.flatMap(p => p.places.map(pl => pl.name));
assert.equal(places.length, 63 + 1, '63 tỉnh cũ + Phú Quốc');
assert.equal(new Set(places).size, places.length);

// Múi giờ lịch sử
assert.equal(vnUtcOffsetMinutes(1990, 6, 15, false), 420);
assert.equal(vnUtcOffsetMinutes(1970, 3, 10, true), 480, 'miền Nam 1960–1975 dùng UTC+8');
assert.equal(vnUtcOffsetMinutes(1970, 3, 10, false), 420, 'miền Bắc 1970 dùng UTC+7');
assert.equal(vnUtcOffsetMinutes(1975, 6, 12, true), 480);
assert.equal(vnUtcOffsetMinutes(1975, 6, 13, true), 420, 'thống nhất UTC+7 từ 13/6/1975');
assert.equal(vnUtcOffsetMinutes(1957, 5, 1, true), 420, 'miền Nam 7/1955–1959 dùng UTC+7');
assert.equal(vnUtcOffsetMinutes(1944, 5, 1, false), 480, 'toàn quốc 1943–3/1945 dùng UTC+8');
assert.equal(vnUtcOffsetMinutes(1945, 6, 1, false), 540, 'toàn quốc 3–9/1945 dùng UTC+9');

// Hà Nội 1990-06-15 10:30 → giờ Tỵ
{
  const r = resolveBirth(form({ year: '1990', month: '6', day: '15', clockHour: '10', clockMinute: '30', province: 'Hà Nội', city: 'Hà Nội' }));
  assert.equal(r.utcOffsetMinutes, 420);
  assert.equal(r.branch, 5);
  assert.ok(Math.abs(r.solar!.longitudeCorrectionMinutes - 3.4) < 0.01);
}

// Sài Gòn 1970-03-10 09:20 (đồng hồ UTC+8) → ~08:16 giờ mặt trời → giờ Thìn.
// Nếu coi nhầm là UTC+7 sẽ ra ~09:16 → giờ Tỵ (sai).
{
  const r = resolveBirth(form({ year: '1970', month: '3', day: '10', clockHour: '9', clockMinute: '20', province: 'TP. Hồ Chí Minh', city: 'TP. Hồ Chí Minh (Sài Gòn)' }));
  assert.equal(r.utcOffsetMinutes, 480);
  assert.equal(r.historicalOffset, true);
  assert.equal(r.branch, 4);
}

// Cùng giờ đó ở Hà Nội (UTC+7) → giờ Tỵ
{
  const r = resolveBirth(form({ year: '1970', month: '3', day: '10', clockHour: '9', clockMinute: '20', province: 'Hà Nội', city: 'Hà Nội' }));
  assert.equal(r.utcOffsetMinutes, 420);
  assert.equal(r.branch, 5);
}

// Giờ Tý muộn: Hà Nội 2000-01-01 23:30 → lập lá số ngày 2000-01-02, giờ Tý
{
  const r = resolveBirth(form({ year: '2000', month: '1', day: '1', clockHour: '23', clockMinute: '30', province: 'Hà Nội', city: 'Hà Nội' }));
  assert.equal(r.branch, 0);
  assert.deepEqual([r.year, r.month, r.day], [2000, 1, 2]);
}

// Không chọn nơi sinh: giữ giờ đồng hồ, không hiệu chỉnh
{
  const r = resolveBirth(form({ year: '1990', month: '6', day: '15', clockHour: '8', clockMinute: '59' }));
  assert.equal(r.solar!.corrected, false);
  assert.equal(r.branch, 4);
}

// Trung Quốc: vẫn tính theo giờ Bắc Kinh UTC+8, kinh tuyến 120°
{
  const r = resolveBirth({ ...base, country: 'CN', year: '1990', month: '6', day: '15', clockHour: '10', clockMinute: '30', province: '北京市', city: '北京', longitude: 116.4 });
  assert.equal(r.utcOffsetMinutes, 480);
  assert.ok(Math.abs(r.solar!.longitudeCorrectionMinutes - (-14.4)) < 0.01);
  assert.equal(r.branch, 5);
}

// Không rõ giờ sinh → giờ Tý, không đổi ngày
{
  const r = resolveBirth(form({ year: '1990', month: '6', day: '15', unknownTime: true, province: 'Hà Nội', city: 'Hà Nội' }));
  assert.equal(r.branch, 0);
  assert.equal(r.solar, null);
}

console.log('✓ vn-birth-time: 34 tỉnh / 63 tỉnh cũ, múi giờ lịch sử, giờ mặt trời thật, giờ Tý muộn đều đúng');
