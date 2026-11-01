'use client';
/**
 * Bảng lá số 4×4 · 命盘
 * 12 ô cung bao quanh khối thông tin mệnh ở giữa; bấm cung để xem Tam phương Tứ chính.
 */
import { useState } from 'react';
import type { ZiweiChart, Palace, Star } from '@/lib/ziwei/types';
import { BRANCHES, STEMS } from '@/lib/ziwei/constants';
import PalaceCell, { type ChartDensity } from './PalaceCell';
import TimeNav, { type TimeView, getYearStemIndex, buildSiHuaOverlay } from './TimeNav';
import Bi, { hv } from './Bi';
import { BRANCHES_VI, STEMS_VI } from '@/lib/ziwei/hanviet';
import type { BrightnessDisplay } from '@/lib/ziwei/brightness';
import { SIHUA_WUXING, WUXING_META, WUXING_ORDER } from '@/lib/ziwei/wuxing';

interface ChartBoardProps {
  chart: ZiweiChart;
  onStarSelect?: (star: Star, palace: Palace) => void;
  onPalaceSelect?: (palace: Palace) => void;
  onSiHuaClick?: (starName: string, siHua: string, view: TimeView) => void;
  brightnessMode?: BrightnessDisplay | 'off';
  density?: ChartDensity;
  onDensityChange?: (d: ChartDensity) => void;
}

const BRANCH_GRID_POS: Record<number, [number, number]> = {
  5: [1, 1], 6: [1, 2], 7: [1, 3], 8: [1, 4],
  4: [2, 1], 9: [2, 4],
  3: [3, 1], 10: [3, 4],
  2: [4, 1], 1: [4, 2], 0: [4, 3], 11: [4, 4],
};

// Tâm mỗi ô theo % lưới, để vẽ đường Tam phương Tứ chính
const BRANCH_SVG_POS: Record<number, [number, number]> = {
  5: [12.5, 12.5], 6: [37.5, 12.5], 7: [62.5, 12.5], 8: [87.5, 12.5],
  4: [12.5, 37.5], 9: [87.5, 37.5],
  3: [12.5, 62.5], 10: [87.5, 62.5],
  2: [12.5, 87.5], 1: [37.5, 87.5], 0: [62.5, 87.5], 11: [87.5, 87.5],
};

/** 三方四正：本宫 + 对宫 + 两个三合宫 */
function getSanFangSiZheng(branch: number): [number, number, number, number] {
  return [branch, (branch + 6) % 12, (branch + 4) % 12, (branch + 8) % 12];
}

const ORDER = [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4];

export default function ChartBoard({
  chart, onStarSelect, onPalaceSelect, onSiHuaClick,
  brightnessMode = 'detail', density = 'compact', onDensityChange,
}: ChartBoardProps) {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [timeView, setTimeView] = useState<TimeView>('mingpan');
  const [liunianYear, setLiunianYear] = useState<number>(new Date().getFullYear());

  const palaceMap: Record<number, Palace> = {};
  chart.palaces.forEach(p => { palaceMap[p.branch] = p; });

  const currentDx = chart.daXians[chart.currentDaXianIndex];
  const overlayData: Record<string, string> = (() => {
    if (timeView === 'daxian' && currentDx) {
      const dxPalace = chart.palaces.find(p => p.branch === currentDx.palaceBranch);
      if (dxPalace) return buildSiHuaOverlay(dxPalace.stem);
    }
    if (timeView === 'liunian') return buildSiHuaOverlay(getYearStemIndex(liunianYear));
    return {};
  })();
  const overlayLabel = timeView === 'daxian' ? '限' : timeView === 'liunian' ? '年' : undefined;

  const handlePalaceClick = (branch: number) => {
    const deselect = selectedBranch === branch;
    setSelectedBranch(deselect ? null : branch);
    if (!deselect && palaceMap[branch]) onPalaceSelect?.(palaceMap[branch]);
  };

  const sanFang = selectedBranch !== null ? getSanFangSiZheng(selectedBranch) : null;
  const sanFangSet = sanFang ? new Set(sanFang) : null;
  const b = chart.birthInfo;
  const l = chart.lunarInfo;

  return (
    <div className="w-full">
      <TimeNav chart={chart} view={timeView} liunianYear={liunianYear} onViewChange={setTimeView} onYearChange={setLiunianYear} />

      {/* Lưới 12 cung */}
      <div className="cb-grid">
        {ORDER.map(branch => {
          const [row, col] = BRANCH_GRID_POS[branch];
          const palace = palaceMap[branch];
          if (!palace) return null;
          return (
            <div key={branch} style={{ gridRow: row, gridColumn: col }}>
              <PalaceCell
                palace={palace}
                onClick={() => handlePalaceClick(branch)}
                onStarClick={star => onStarSelect?.(star, palace)}
                isSelected={selectedBranch === branch}
                isSanFang={!!(sanFangSet?.has(branch) && selectedBranch !== branch)}
                overlayStarSiHua={Object.keys(overlayData).length ? overlayData : undefined}
                overlayLabel={overlayLabel}
                onSiHuaClick={(starName, siHua) => onSiHuaClick?.(starName, siHua, timeView)}
                brightnessMode={brightnessMode}
                density={density}
              />
            </div>
          );
        })}

        {/* Khối thông tin mệnh ở giữa */}
        <div className="cb-center" style={{ gridRow: '2 / 4', gridColumn: '2 / 4' }}>
          {b.name && <div className="cb-c-name">{b.name}</div>}
          <div className="cb-c-title"><Bi vi="Lá số Tử Vi Đẩu Số" zh="紫微斗数命盘" /></div>
          <dl className="cb-c-facts">
            <div><dt><Bi vi="Âm dương" zh="阴阳" /></dt><dd>{chart.yinYangGender ? <Bi vi={hv(chart.yinYangGender)} zh={chart.yinYangGender} /> : '—'}</dd></div>
            <div><dt><Bi vi="Cục" zh="五行局" /></dt><dd><Bi vi={hv(chart.wuxingJuName)} zh={chart.wuxingJuName} /></dd></div>
            <div><dt><Bi vi="Mệnh · Thân" zh="命 · 身" /></dt><dd>{BRANCHES_VI[chart.mingGongBranch]} · {BRANCHES_VI[chart.shenGongBranch]} <span className="bi-zh" lang="zh-CN">{BRANCHES[chart.mingGongBranch]}·{BRANCHES[chart.shenGongBranch]}</span></dd></div>
            {chart.mingZhu && <div><dt><Bi vi="Mệnh chủ · Thân chủ" zh="命主 · 身主" /></dt><dd>{hv(chart.mingZhu)} · {hv(chart.shenZhu)} <span className="bi-zh" lang="zh-CN">{chart.mingZhu}·{chart.shenZhu}</span></dd></div>}
            <div><dt><Bi vi="Năm" zh="年" /></dt><dd>{STEMS_VI[l.yearStem]} {BRANCHES_VI[l.yearBranch]} <span className="bi-zh" lang="zh-CN">{STEMS[l.yearStem]}{BRANCHES[l.yearBranch]}</span></dd></div>
            <div><dt><Bi vi="Âm lịch" zh="农历" /></dt><dd className="tabular-nums">{l.lunarDay}/{l.isLeapMonth ? 'N' : ''}{Math.abs(l.lunarMonth)}/{l.lunarYear}</dd></div>
          </dl>
          {currentDx && (
            <div className="cb-c-dx">
              <span><Bi vi="Đại hạn hiện tại" zh="当前大限" /></span>
              <b className="tabular-nums">{currentDx.startAge}–{currentDx.endAge}</b>
              <span>{hv(currentDx.palaceName)} <span className="bi-zh" lang="zh-CN">{currentDx.palaceName}</span></span>
            </div>
          )}
        </div>

        {/* Đường Tam phương Tứ chính */}
        {sanFang && (
          <svg className="cb-lines" width="100%" height="100%" aria-hidden="true">
            {(() => {
              const [p0, p1, p2, p3] = sanFang.map(x => BRANCH_SVG_POS[x]);
              const L = (a: number[], c: number[]) => (
                <line x1={`${a[0]}%`} y1={`${a[1]}%`} x2={`${c[0]}%`} y2={`${c[1]}%`} />
              );
              return (
                <>
                  {L(p0, p1)}{L(p0, p2)}{L(p2, p3)}{L(p3, p0)}
                  {[p0, p1, p2, p3].map((p, i) => <circle key={i} cx={`${p[0]}%`} cy={`${p[1]}%`} r={i === 0 ? 3.5 : 2.5} />)}
                </>
              );
            })()}
          </svg>
        )}
      </div>

      {/* Chú giải: quy luật màu */}
      <div className="cb-legend">
        <div className="cb-legend-group">
          <span className="cb-legend-label"><Bi vi="Ngũ hành sao" zh="星曜五行" /></span>
          {WUXING_ORDER.map(w => (
            <span key={w} className="cb-swatch" style={{ color: WUXING_META[w].cssVar }}>
              <i style={{ background: WUXING_META[w].cssVar }} />{WUXING_META[w].vi}<span lang="zh-CN">{w}</span>
            </span>
          ))}
        </div>
        <div className="cb-legend-group">
          <span className="cb-legend-label"><Bi vi="Tứ Hóa" zh="四化" /></span>
          {(['禄', '权', '科', '忌'] as const).map(h => {
            const c = WUXING_META[SIHUA_WUXING[h]].cssVar;
            const solid = h === '忌';
            return (
              <span key={h} className="pc-sihua" style={{ color: solid ? 'var(--t-bg)' : c, background: solid ? c : `color-mix(in srgb, ${c} 13%, transparent)`, borderColor: c, borderStyle: 'solid' }}>
                {hv(`化${h}`)}<span lang="zh-CN" className="pc-sihua-zh">化{h}</span>
              </span>
            );
          })}
          <span className="cb-legend-note"><Bi vi="theo hành: Lộc Thổ, Quyền Mộc, Khoa Thủy, Kỵ Thủy (tô đặc)" zh="禄土 权木 科水 忌水" /></span>
        </div>
        <div className="cb-legend-group">
          <span className="cb-legend-note"><Bi vi="Bấm cung để xem Tam phương Tứ chính · bấm sao để xem chi tiết" zh="点宫位看三方四正，点星曜看详解" /></span>
          {onDensityChange && (
            <button type="button" className="cb-toggle" onClick={() => onDensityChange(density === 'compact' ? 'full' : 'compact')} aria-pressed={density === 'full'}>
              {density === 'compact'
                ? <Bi vi="Hiện tất cả sao" zh="显示全部星曜" />
                : <Bi vi="Chỉ sao chính" zh="只看主要星曜" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
