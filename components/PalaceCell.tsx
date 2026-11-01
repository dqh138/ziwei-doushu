'use client';
/**
 * Ô cung trên lá số · 命盘宫格
 *
 * Quy luật hiển thị:
 *  · Màu tên sao = ngũ hành của sao (lib/ziwei/wuxing.ts); sao chưa có hành thống nhất → trung tính.
 *  · Tứ Hóa = ngũ hành Tứ Hóa (Lộc Thổ, Quyền Mộc, Khoa Thủy, Kỵ Thủy); Kỵ tô đặc để tách khỏi Khoa.
 *  · Độ sáng = thang đậm/nhạt trung tính (không thêm màu).
 *  · Vàng kim chỉ cho trạng thái: cung đang chọn, Tam phương Tứ chính, đại hạn hiện tại.
 */
import type { Palace, Star, StarBrightness } from '@/lib/ziwei/types';
import { STEMS, BRANCHES } from '@/lib/ziwei/constants';
import { hv } from './Bi';
import { STEMS_VI, BRANCHES_VI, SIHUA_VI } from '@/lib/ziwei/hanviet';
import { BRIGHTNESS_LEVELS, brightnessTag, type BrightnessDisplay } from '@/lib/ziwei/brightness';
import { CORE_LUCKY, CORE_SHA, SIHUA_WUXING, WUXING_META, starColor } from '@/lib/ziwei/wuxing';

export type ChartDensity = 'compact' | 'full';

interface PalaceCellProps {
  palace: Palace;
  onClick?: () => void;
  onStarClick?: (star: Star) => void;
  isSelected?: boolean;
  isSanFang?: boolean;
  delay?: number;
  /** 叠加四化：星名 → 四化类型（'禄'/'权'/'科'/'忌'） */
  overlayStarSiHua?: Record<string, string>;
  /** 叠加标签：'年'（流年）或 '限'（大限） */
  overlayLabel?: string;
  onSiHuaClick?: (starName: string, siHua: string) => void;
  brightnessMode?: BrightnessDisplay | 'off';
  density?: ChartDensity;
}

/** Thang đậm nhạt theo bậc độ sáng (1 = Miếu … 7 = Hãm) */
const RANK_OPACITY: Record<number, number> = { 1: 1, 2: 0.9, 3: 0.8, 4: 0.72, 5: 0.62, 6: 0.52, 7: 0.46 };

function BrightTag({ level, mode, full }: { level?: StarBrightness; mode: BrightnessDisplay | 'off'; full?: boolean }) {
  if (mode === 'off') return null;
  const t = brightnessTag(level, mode);
  if (!t || !level) return null;
  const def = BRIGHTNESS_LEVELS[level];
  return (
    <span
      title={`${def.vi} ${def.zh} (${def.zhFull}) — ${def.descVi}${mode === 'vn' && def.vnNote ? ` ${def.vnNote}` : ''}`}
      className="pc-bright"
      style={{
        opacity: RANK_OPACITY[t.rank] ?? 0.6,
        fontWeight: t.rank <= 2 ? 600 : 400,
        textDecoration: t.rank === 7 ? 'underline dotted' : undefined,
      }}
    >
      {full ? t.vi : t.abbr}<span lang="zh-CN" className="pc-bright-zh">{t.zh}</span>
    </span>
  );
}

function SiHuaBadge({ siHua, overlayLabel, onClick }: { siHua: string; overlayLabel?: string; onClick?: (e: React.MouseEvent) => void }) {
  const wx = SIHUA_WUXING[siHua];
  const c = wx ? WUXING_META[wx].cssVar : 'var(--wx-none)';
  const solid = siHua === '忌';
  const overlay = !!overlayLabel;
  return (
    <span
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      title={`${overlay ? `${hv(overlayLabel!)} ` : ''}Hóa ${SIHUA_VI[siHua]} 化${siHua}${wx ? ` · hành ${WUXING_META[wx].vi}` : ''}`}
      className="pc-sihua"
      style={{
        color: solid ? 'var(--t-bg)' : c,
        background: solid ? c : `color-mix(in srgb, ${c} 13%, transparent)`,
        borderColor: c,
        borderStyle: overlay ? 'dashed' : 'solid',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      {overlay && <span className="pc-sihua-pre">{hv(overlayLabel!)}</span>}
      {SIHUA_VI[siHua] ?? siHua}<span lang="zh-CN" className="pc-sihua-zh">{siHua}</span>
    </span>
  );
}

function StarName({ star, size }: { star: Star; size: 'major' | 'minor' | 'misc' }) {
  const c = starColor(star.name);
  return (
    <span className={`pc-star pc-star-${size}`} style={{ color: c }}>
      {hv(star.name)}<span lang="zh-CN" className="pc-star-zh">{star.name}</span>
    </span>
  );
}

export default function PalaceCell({
  palace, onClick, onStarClick, isSelected, isSanFang,
  overlayStarSiHua, overlayLabel, onSiHuaClick, brightnessMode = 'detail', density = 'compact',
}: PalaceCellProps) {
  const { branch, stem, name, stars, daXianAge, isCurrentDaXian, isMingGong, isShenGong } = palace;
  const full = density === 'full';

  const majors = stars.filter(s => s.type === 'major');
  const lucky = stars.filter(s => s.type === 'lucky' && (full || CORE_LUCKY.has(s.name)));
  const sha = stars.filter(s => s.type === 'sha' && (full || CORE_SHA.has(s.name)));
  const misc = full ? stars.filter(s => s.type === 'minor') : [];

  const badges = (s: Star) => {
    const ov = overlayStarSiHua?.[s.name];
    return (
      <>
        {s.siHua && <SiHuaBadge siHua={s.siHua} />}
        {ov && <SiHuaBadge siHua={ov} overlayLabel={overlayLabel} onClick={e => { e.stopPropagation(); onSiHuaClick?.(s.name, ov); }} />}
      </>
    );
  };

  const starBtn = (s: Star, size: 'minor' | 'misc') => (
    <span key={s.name} className="pc-item" onClick={e => { e.stopPropagation(); onStarClick?.(s); }}>
      <StarName star={s} size={size} />
      <BrightTag level={s.brightnessRaw} mode={brightnessMode} />
      {badges(s)}
    </span>
  );

  const nameVi = hv(name);
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } }}
      aria-pressed={!!isSelected}
      aria-label={`Cung ${nameVi}`}
      className="pc"
      data-state={isSelected ? 'selected' : isSanFang ? 'sanfang' : undefined}
    >
      {/* Đầu ô: tên cung + đại hạn */}
      <div className="pc-head">
        <span className="pc-name" data-ming={isMingGong || undefined}>
          {nameVi}<span lang="zh-CN" className="pc-name-zh">{name}</span>
        </span>
        {isShenGong && <span className="pc-chip" title="Cung Thân 身宫">Thân<span lang="zh-CN">身</span></span>}
        {daXianAge && (
          <span className="pc-age pc-age-head" data-current={isCurrentDaXian || undefined} title={isCurrentDaXian ? 'Đại hạn hiện tại 当前大限' : 'Đại hạn 大限'}>
            {daXianAge[0]}–{daXianAge[1]}
          </span>
        )}
      </div>

      {/* Chính tinh */}
      <div className="pc-majors">
        {majors.length === 0 && (
          <span className="pc-empty">
            Vô chính diệu<span lang="zh-CN">空宫</span>
            {palace.borrowedStars?.length ? <span className="pc-borrow"> · mượn {palace.borrowedStars.map(hv).join(', ')}</span> : null}
          </span>
        )}
        {majors.map(s => (
          <div key={s.name} className="pc-major" onClick={e => { e.stopPropagation(); onStarClick?.(s); }}>
            <StarName star={s} size="major" />
            <BrightTag level={s.brightnessRaw} mode={brightnessMode} full />
            {badges(s)}
          </div>
        ))}
      </div>

      {/* Cát tinh / sát tinh / tạp diệu */}
      {lucky.length > 0 && <div className="pc-row">{lucky.map(s => starBtn(s, 'minor'))}</div>}
      {sha.length > 0 && <div className="pc-row">{sha.map(s => starBtn(s, 'minor'))}</div>}
      {misc.length > 0 && <div className="pc-row pc-row-misc">{misc.map(s => starBtn(s, 'misc'))}</div>}

      {/* Chân ô: can chi (+ đại hạn trên màn hình hẹp) */}
      <div className="pc-foot">
        <span className="pc-gz">{STEMS_VI[stem]} {BRANCHES_VI[branch]}<span lang="zh-CN">{STEMS[stem]}{BRANCHES[branch]}</span></span>
        {daXianAge && <span className="pc-age pc-age-foot" data-current={isCurrentDaXian || undefined}>{daXianAge[0]}–{daXianAge[1]}</span>}
      </div>
    </div>
  );
}
