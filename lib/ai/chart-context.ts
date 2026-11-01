/**
 * Chuyển lá số thành văn bản có cấu trúc để gửi cho AI.
 * 把命盘整理成结构化文字，供 AI 解读。
 *
 * Server luôn tự lập lại lá số từ ngày giờ sinh (không tin dữ liệu lá số gửi từ trình duyệt),
 * nên mọi tên sao/cung ở đây đều do engine sinh ra.
 */
import { generateChart, setBrightnessSchool } from '@/lib/ziwei/algorithm';
import { BRIGHTNESS_SCHOOLS, type BrightnessSchoolId } from '@/lib/ziwei/brightness';
import { STEMS, BRANCHES, SI_HUA_TABLE } from '@/lib/ziwei/constants';
import { detectPatterns } from '@/lib/ziwei/patterns';
import { hv } from '@/lib/ziwei/hanviet';
import type { BirthInfo, ZiweiChart } from '@/lib/ziwei/types';

/** Chỉ lấy các trường cần để lập lá số; kiểm tra kiểu dữ liệu. Sai thì trả null. */
export function sanitizeBirthInfo(raw: unknown): BirthInfo | null {
  if (!raw || typeof raw !== 'object') return null;
  const b = raw as Record<string, unknown>;
  const int = (v: unknown) => (typeof v === 'number' && Number.isInteger(v) ? v : NaN);
  const year = int(b.year), month = int(b.month), day = int(b.day), hour = int(b.hour);
  if (!(year >= 1900 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= 31 && hour >= 0 && hour <= 11)) return null;
  if (b.gender !== 'male' && b.gender !== 'female') return null;
  const longitude = typeof b.longitude === 'number' && Number.isFinite(b.longitude) ? b.longitude : undefined;
  return { year, month, day, hour, gender: b.gender, longitude };
}

const SCHOOL_IDS = BRIGHTNESS_SCHOOLS.map(s => s.id) as readonly string[];

/**
 * Lập lại lá số từ BirthInfo theo bảng độ sáng người dùng đang xem; ngày không tồn tại thì trả null.
 * setBrightnessSchool là biến toàn cục của engine, nhưng generateChart chạy đồng bộ nên
 * đổi → lập → trả về mặc định trong cùng một lượt là an toàn giữa các request.
 */
export function rebuildChart(raw: unknown, school?: unknown): ZiweiChart | null {
  const info = sanitizeBirthInfo(raw);
  if (!info) return null;
  const sc: BrightnessSchoolId = typeof school === 'string' && SCHOOL_IDS.includes(school) ? school as BrightnessSchoolId : 'QS';
  setBrightnessSchool(sc);
  try {
    return { ...generateChart(info), brightnessSchool: sc };
  } catch {
    return null;
  } finally {
    setBrightnessSchool('default');
  }
}

const SIHUA_ORDER = ['禄', '权', '科', '忌'] as const;

function yearStemIndex(year: number) {
  return ((year - 4) % 10 + 10) % 10;
}

function sihuaLine(stemIdx: number) {
  const stars = SI_HUA_TABLE[stemIdx];
  return SIHUA_ORDER.map((h, i) => `${stars[i]}化${h}`).join('、');
}

/** Văn bản mô tả lá số (thuật ngữ chữ Hán, kèm âm Hán-Việt cho tên cung/sao chính) */
export function chartToContext(chart: ZiweiChart, opts?: { label?: string; now?: Date }): string {
  const now = opts?.now ?? new Date();
  const thisYear = now.getFullYear();
  const b = chart.birthInfo;
  const l = chart.lunarInfo;
  const lines: string[] = [];

  lines.push(`【${opts?.label ?? '命盘'}】`);
  lines.push(`性别：${b.gender === 'male' ? '男' : '女'}（${chart.yinYangGender ?? ''}）`);
  lines.push(`公历：${b.year}年${b.month}月${b.day}日，时辰：${BRANCHES[b.hour]}时（${hv(BRANCHES[b.hour])}）`);
  lines.push(`农历：${l.lunarYear}年${l.isLeapMonth ? '闰' : ''}${Math.abs(l.lunarMonth)}月${l.lunarDay}日，年干支：${STEMS[l.yearStem]}${BRANCHES[l.yearBranch]}`);
  if (l.fourPillars) lines.push(`四柱：${l.fourPillars.join(' ')}`);
  lines.push(`五行局：${chart.wuxingJuName}（${hv(chart.wuxingJuName)}）`);
  lines.push(`命宫在${BRANCHES[chart.mingGongBranch]}，身宫在${BRANCHES[chart.shenGongBranch]}；命主：${chart.mingZhu ?? '—'}，身主：${chart.shenZhu ?? '—'}`);
  lines.push(`生年四化（${STEMS[l.yearStem]}干）：${sihuaLine(l.yearStem)}`);
  lines.push(`当前公历年份：${thisYear}（虚岁约 ${chart.currentAge}）`);
  lines.push('');
  const sch = BRIGHTNESS_SCHOOLS.find(s => s.id === chart.brightnessSchool) ?? BRIGHTNESS_SCHOOLS[0];
  lines.push(`亮度表：${sch.zh}（${sch.levels}级${sch.levels === 7 ? '：庙>旺>得>利>平>不>陷' : '：庙>旺>平>闲>陷'}）；论断时请按此表说明各星亮度`);
  lines.push('【十二宫】（宫名｜宫干支｜大限岁数｜星曜：亮度/四化）');

  // Bắt đầu từ cung Mệnh, đi theo thứ tự 12 cung
  const order = [...chart.palaces].sort((a, b2) => {
    const da = ((chart.mingGongBranch - a.branch) % 12 + 12) % 12;
    const db = ((chart.mingGongBranch - b2.branch) % 12 + 12) % 12;
    return da - db;
  });
  for (const p of order) {
    const tags = [p.isMingGong ? '命宫' : '', p.isShenGong ? '身宫' : ''].filter(Boolean).join('·');
    const fmt = (types: string[]) => p.stars
      .filter(s => types.includes(s.type))
      .map(s => `${s.name}${s.brightnessRaw ? `(${s.brightnessRaw})` : ''}${s.siHua ? `化${s.siHua}` : ''}`)
      .join('、');
    const major = fmt(['major']) || '空宫' + (p.borrowedStars?.length ? `（借对宫${p.borrowedFromName ?? ''}：${p.borrowedStars.join('、')}）` : '');
    const lucky = fmt(['lucky']);
    const sha = fmt(['sha']);
    const minor = fmt(['minor']);
    const self = p.selfSihua?.length ? `；宫干自化：${p.selfSihua.map(s => `${s.starName}化${s.siHua}`).join('、')}` : '';
    lines.push(
      `- ${p.name}（${hv(p.name)}）${tags ? `［${tags}］` : ''}｜${STEMS[p.stem]}${BRANCHES[p.branch]}｜${p.daXianAge ? `${p.daXianAge[0]}–${p.daXianAge[1]}岁` : ''}｜主星：${major}`
      + (lucky ? `；吉星：${lucky}` : '')
      + (sha ? `；煞星：${sha}` : '')
      + (minor ? `；杂曜：${minor}` : '')
      + self,
    );
  }

  const dx = chart.daXians[chart.currentDaXianIndex];
  if (dx) {
    lines.push('');
    lines.push(`【当前大限】${dx.startAge}–${dx.endAge}岁，走${dx.palaceName}（${hv(dx.palaceName)}）`
      + (dx.siHua ? `，大限四化（${dx.siHua.stemName}干）：${dx.siHua.lu}化禄、${dx.siHua.quan}化权、${dx.siHua.ke}化科、${dx.siHua.ji}化忌` : ''));
  }
  const ys = yearStemIndex(thisYear);
  lines.push(`【${thisYear}流年】年干支：${STEMS[ys]}${BRANCHES[((thisYear - 4) % 12 + 12) % 12]}，流年四化：${sihuaLine(ys)}`);

  const patterns = detectPatterns(chart);
  if (patterns.length) {
    lines.push('');
    lines.push('【格局识别】（程序按古书条件检测）');
    for (const pt of patterns) {
      lines.push(`- ${pt.name}（${hv(pt.name)}），等级：${pt.level}${pt.palaces.length ? `，涉及：${pt.palaces.join('、')}` : ''}`);
    }
  }
  return lines.join('\n');
}
