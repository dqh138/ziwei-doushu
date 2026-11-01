/**
 * Hồi quy: độ sáng tinh diệu theo bảng của từng trường phái + định nghĩa hiển thị.
 * 星曜亮度：各流派亮度表输出等级、显示定义与越南五级对照。
 */
import assert from 'node:assert/strict';
import { generateChart, setBrightnessSchool } from '../../lib/ziwei/algorithm';
import { BRIGHTNESS_LEVELS, BRIGHTNESS_SCHOOLS, VN_LEVELS, brightnessTag } from '../../lib/ziwei/brightness';
import type { BirthInfo, StarBrightness } from '../../lib/ziwei/types';

const samples: BirthInfo[] = [];
for (let y = 1950; y < 2010; y += 9) for (let h = 0; h < 12; h += 2) for (const g of ['male', 'female'] as const)
  samples.push({ year: y, month: (y % 12) + 1, day: (y % 27) + 1, hour: h, gender: g });

const seen = (school: 'QS' | 'XD1' | 'ZZ' | 'XD2') => {
  const set = new Set<StarBrightness>();
  setBrightnessSchool(school);
  try {
    for (const b of samples) for (const p of generateChart(b).palaces) for (const s of p.stars) if (s.brightnessRaw) set.add(s.brightnessRaw);
  } finally {
    setBrightnessSchool('default');
  }
  return set;
};

const SEVEN = new Set<StarBrightness>(['庙', '旺', '得', '利', '平', '不', '陷']);
const FIVE = new Set<StarBrightness>(['庙', '旺', '平', '闲', '陷']);

for (const school of ['QS', 'XD1'] as const) {
  const s = seen(school);
  for (const l of s) assert.ok(SEVEN.has(l), `${school} ra bậc ngoài hệ 7 bậc: ${l}`);
  assert.ok(s.has('得') && s.has('利') && s.has('不'), `${school} phải có đủ các bậc chi tiết 得/利/不`);
}
for (const school of ['ZZ', 'XD2'] as const) {
  const s = seen(school);
  for (const l of s) assert.ok(FIVE.has(l), `${school} ra bậc ngoài hệ 5 bậc: ${l}`);
}

// Sau khi lập lá số với bảng khác, engine phải trở về Toàn Thư (mặc định)
const base = samples[0];
const defaultStars = JSON.stringify(generateChart(base).palaces.map(p => p.stars.map(s => s.brightnessRaw)));
seen('ZZ');
assert.equal(JSON.stringify(generateChart(base).palaces.map(p => p.stars.map(s => s.brightnessRaw))), defaultStars);

// Mọi bậc engine có thể trả về đều có định nghĩa, bản dịch và quy về được 5 bậc VN
for (const l of ['庙', '旺', '得', '利', '平', '不', '闲', '陷', '地'] as StarBrightness[]) {
  const d = BRIGHTNESS_LEVELS[l];
  assert.ok(d && d.vi && d.descVi && d.descZh, `thiếu định nghĩa ${l}`);
  assert.ok(VN_LEVELS[d.vn], `không quy được ${l} sang hệ VN`);
  assert.ok(brightnessTag(l, 'detail') && brightnessTag(l, 'vn'));
}
assert.equal(brightnessTag('利', 'vn')!.abbr, 'Đ');
assert.equal(brightnessTag('不', 'vn')!.abbr, 'H');
assert.equal(brightnessTag('闲', 'vn')!.abbr, 'B');
assert.equal(BRIGHTNESS_SCHOOLS.length, 4);

console.log('✓ brightness-levels: Toàn Thư/Hiện đại 1 = 7 bậc, Trung Châu/Hiện đại 2 = 5 bậc, trả về mặc định, đối chiếu VN đủ');
