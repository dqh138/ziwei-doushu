'use client';
import { useEffect, useState } from 'react';
import BirthForm from '@/components/BirthForm';
import ChartBoard from '@/components/ChartBoard';
import InsightPanel from '@/components/InsightPanel';
import StarDetailPanel from '@/components/StarDetailPanel';
import BrightnessLegend from '@/components/BrightnessLegend';
import type { ChartDensity } from '@/components/PalaceCell';
import { generateChart, setBrightnessSchool } from '@/lib/ziwei/algorithm';
import type { BirthInfo, ZiweiChart, Palace, Star } from '@/lib/ziwei/types';
import type { BrightnessDisplay, BrightnessSchoolId } from '@/lib/ziwei/brightness';
import { BRANCHES } from '@/lib/ziwei/constants';
import { BRANCHES_VI } from '@/lib/ziwei/hanviet';
import Bi, { hv } from '@/components/Bi';

/**
 * 命盘页 —— 开源版「排盘引擎 Demo」
 *
 * Bố cục: thanh tóm tắt ngày sinh ở trên; bên trái là panel lá số (lá số + độ sáng),
 * bên phải là panel luận giải dính cố định khi cuộn. Dưới 1024px hai panel xếp chồng.
 */
const LS_SCHOOL = 'ziwei-brightness-school';
const LS_MODE = 'ziwei-brightness-mode';
const LS_DENSITY = 'ziwei-chart-density';

/** Lập lá số theo một bảng độ sáng; engine dùng biến toàn cục nên trả về mặc định ngay sau đó. */
function buildChart(info: BirthInfo, school: BrightnessSchoolId): ZiweiChart {
  setBrightnessSchool(school);
  try {
    return { ...generateChart(info), brightnessSchool: school };
  } finally {
    setBrightnessSchool('default');
  }
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function ChartPage() {
  const [birth, setBirth] = useState<BirthInfo | null>(null);
  const [school, setSchool] = useState<BrightnessSchoolId>('QS');
  const [mode, setMode] = useState<BrightnessDisplay | 'off'>('detail');
  const [density, setDensity] = useState<ChartDensity>('compact');
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [selectedStar, setSelectedStar] = useState<{ star: Star; palace: Palace } | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(LS_SCHOOL);
      if (s === 'QS' || s === 'XD1' || s === 'ZZ' || s === 'XD2') setSchool(s);
      const m = localStorage.getItem(LS_MODE);
      if (m === 'detail' || m === 'vn' || m === 'off') setMode(m);
      const d = localStorage.getItem(LS_DENSITY);
      if (d === 'compact' || d === 'full') setDensity(d);
    } catch { /* trình duyệt chặn lưu trữ */ }
  }, []);

  useEffect(() => {
    if (!birth) return;
    const next = buildChart(birth, school);
    setChart(next);
    setSelectedStar(sel => {
      if (!sel) return null;
      const p = next.palaces.find(pp => pp.branch === sel.palace.branch);
      const s = p?.stars.find(ss => ss.name === sel.star.name);
      return p && s ? { star: s, palace: p } : null;
    });
  }, [birth, school]);

  const persist = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* bỏ qua */ } };
  const changeSchool = (s: BrightnessSchoolId) => { setSchool(s); persist(LS_SCHOOL, s); };
  const changeMode = (m: BrightnessDisplay | 'off') => { setMode(m); persist(LS_MODE, m); };
  const changeDensity = (d: ChartDensity) => { setDensity(d); persist(LS_DENSITY, d); };
  const reset = () => { setBirth(null); setChart(null); setSelectedPalace(null); setSelectedStar(null); };

  // ── Chưa lập lá số: form ──
  if (!birth || !chart) {
    return (
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          <Bi block vi="Lập lá số Tử Vi Đẩu Số" zh="紫微斗数排盘" />
        </h1>
        <p style={{ color: 'var(--t-faint)', marginBottom: 32, fontSize: 14, lineHeight: 1.7 }}>
          <Bi block vi="Nhập năm, tháng, ngày, giờ sinh, engine lập lá số mã nguồn mở sẽ lập lá số ngay lập tức. (Trang này là bản demo của engine, giao diện thương mại đầy đủ không nằm trong phạm vi mã nguồn mở; lõi lập lá số được mở hoàn toàn.)" zh="输入出生年月日时，开源排盘引擎即时生成命盘。（本页为引擎 Demo，完整商业版界面不在开源范围；排盘内核完全开放。）" />
        </p>
        <BirthForm onSubmit={(info: BirthInfo) => setBirth(info)} />
      </main>
    );
  }

  // ── Đã lập lá số ──
  const o = chart.birthInfo.origInput;
  const ming = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  const mingStars = ming?.stars.filter(s => s.type === 'major').map(s => s.name) ?? [];

  return (
    <main className="chart-page">
      {/* Thanh tóm tắt */}
      <header className="chart-summary">
        <button type="button" className="chart-back" onClick={reset}>
          ← <Bi vi="Lập lại" zh="重新起盘" />
        </button>
        <div className="chart-summary-main">
          <div className="chart-summary-title">
            {chart.birthInfo.name || <Bi vi="Lá số" zh="命盘" />}
            <span className="chart-summary-ming">
              <Bi vi={`Mệnh ${mingStars.length ? mingStars.map(hv).join(' · ') : 'Vô chính diệu'}`} zh={`命宫 ${mingStars.join('·') || '空宫'}`} />
            </span>
          </div>
          <div className="chart-summary-meta">
            <span>{chart.birthInfo.gender === 'male' ? <Bi vi="Nam" zh="男" /> : <Bi vi="Nữ" zh="女" />}</span>
            <span className="tabular-nums">
              {o ? `${o.day}/${o.month}/${o.year} · ${pad(o.clockHour)}:${pad(o.clockMinute)}` : `${chart.birthInfo.day}/${chart.birthInfo.month}/${chart.birthInfo.year}`}
            </span>
            <span><Bi vi={`Giờ ${BRANCHES_VI[chart.birthInfo.hour]}`} zh={`${BRANCHES[chart.birthInfo.hour]}时`} /></span>
            {chart.birthInfo.city && <span>{chart.birthInfo.city}</span>}
            <span><Bi vi={hv(chart.wuxingJuName)} zh={chart.wuxingJuName} /></span>
          </div>
        </div>
      </header>

      <div className="chart-workspace">
        {/* Vùng trái: lá số */}
        <section className="chart-panel" aria-label="Lá số">
          <ChartBoard
            chart={chart}
            onPalaceSelect={setSelectedPalace}
            onStarSelect={(star, palace) => setSelectedStar({ star, palace })}
            brightnessMode={mode}
            density={density}
            onDensityChange={changeDensity}
          />
          <BrightnessLegend school={school} onSchoolChange={changeSchool} mode={mode} onModeChange={changeMode} />
        </section>

        {/* Vùng phải: luận giải */}
        <aside className="reading-panel" aria-label="Luận giải">
          <div className="reading-head">
            <span className="reading-title"><Bi vi="Luận giải" zh="命理解读" /></span>
            <span className="reading-sub">
              {selectedPalace
                ? <Bi vi={`Đang xem cung ${hv(selectedPalace.name)}`} zh={`当前：${selectedPalace.name}`} />
                : <Bi vi="Theo thể hệ Nghê Hải Hạ" zh="倪海厦体系" />}
            </span>
          </div>
          {selectedStar && (
            <StarDetailPanel star={selectedStar.star} palaceName={selectedStar.palace.name} onClose={() => setSelectedStar(null)} />
          )}
          <InsightPanel chart={chart} selectedPalace={selectedPalace} />
        </aside>
      </div>
    </main>
  );
}
