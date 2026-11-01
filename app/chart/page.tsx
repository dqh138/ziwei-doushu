'use client';
import { useEffect, useState } from 'react';
import BirthForm from '@/components/BirthForm';
import ChartBoard from '@/components/ChartBoard';
import InsightPanel from '@/components/InsightPanel';
import StarDetailPanel from '@/components/StarDetailPanel';
import BrightnessLegend from '@/components/BrightnessLegend';
import { generateChart, setBrightnessSchool } from '@/lib/ziwei/algorithm';
import type { BirthInfo, ZiweiChart, Palace, Star } from '@/lib/ziwei/types';
import type { BrightnessDisplay, BrightnessSchoolId } from '@/lib/ziwei/brightness';
import Bi from '@/components/Bi';

/**
 * 命盘页 —— 开源版「排盘引擎 Demo」
 *
 * 这是一个最小可运行示例：用本仓库的排盘引擎 generateChart() 配合基础 UI
 * 组件，渲染一张完整紫微命盘 + 基础解读，并支持本命 / 大限 / 流年切换。
 *
 * Bổ sung: hiện độ sáng tinh diệu theo bảng của từng trường phái (Toàn Thư 7 bậc, Trung Châu 5 bậc…),
 * kiểu hiển thị chi tiết TQ/ĐL hoặc 5 bậc Việt Nam; bấm vào sao để xem chi tiết.
 */
const LS_SCHOOL = 'ziwei-brightness-school';
const LS_MODE = 'ziwei-brightness-mode';

/** Lập lá số theo một bảng độ sáng; engine dùng biến toàn cục nên trả về mặc định ngay sau đó. */
function buildChart(info: BirthInfo, school: BrightnessSchoolId): ZiweiChart {
  setBrightnessSchool(school);
  try {
    return { ...generateChart(info), brightnessSchool: school };
  } finally {
    setBrightnessSchool('default');
  }
}

export default function ChartPage() {
  const [birth, setBirth] = useState<BirthInfo | null>(null);
  const [school, setSchool] = useState<BrightnessSchoolId>('QS');
  const [mode, setMode] = useState<BrightnessDisplay | 'off'>('detail');
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [selectedStar, setSelectedStar] = useState<{ star: Star; palace: Palace } | null>(null);

  // Nhớ lựa chọn của người dùng
  useEffect(() => {
    try {
      const s = localStorage.getItem(LS_SCHOOL);
      if (s === 'QS' || s === 'XD1' || s === 'ZZ' || s === 'XD2') setSchool(s);
      const m = localStorage.getItem(LS_MODE);
      if (m === 'detail' || m === 'vn' || m === 'off') setMode(m);
    } catch { /* trình duyệt chặn lưu trữ */ }
  }, []);

  // Lập (lại) lá số khi đổi thông tin sinh hoặc bảng độ sáng
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

  const changeSchool = (s: BrightnessSchoolId) => {
    setSchool(s);
    try { localStorage.setItem(LS_SCHOOL, s); } catch { /* bỏ qua */ }
  };
  const changeMode = (m: BrightnessDisplay | 'off') => {
    setMode(m);
    try { localStorage.setItem(LS_MODE, m); } catch { /* bỏ qua */ }
  };

  // ── 未起盘：展示出生信息表单 ──
  if (!birth || !chart) {
    return (
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          <Bi block vi="Lập lá số Tử Vi Đẩu Số" zh="紫微斗数排盘" />
        </h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: 14, lineHeight: 1.7 }}>
          <Bi block vi="Nhập năm, tháng, ngày, giờ sinh, engine lập lá số mã nguồn mở sẽ lập lá số ngay lập tức. (Trang này là bản demo của engine, giao diện thương mại đầy đủ không nằm trong phạm vi mã nguồn mở; lõi lập lá số được mở hoàn toàn.)" zh="输入出生年月日时，开源排盘引擎即时生成命盘。（本页为引擎 Demo，完整商业版界面不在开源范围；排盘内核完全开放。）" />
        </p>
        <BirthForm onSubmit={(info: BirthInfo) => setBirth(info)} />
      </main>
    );
  }

  // ── 已起盘：命盘 + 解读 ──
  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      <button
        type="button"
        onClick={() => { setBirth(null); setChart(null); setSelectedPalace(null); setSelectedStar(null); }}
        style={{
          marginBottom: 16, padding: '6px 14px', cursor: 'pointer',
          border: '1px solid #ccc', borderRadius: 8, background: 'transparent',
        }}
      >
        ← <Bi vi="Lập lại lá số" zh="重新起盘" />
      </button>

      <div className="chart-demo-grid">
        <div>
          <ChartBoard
            chart={chart}
            onPalaceSelect={setSelectedPalace}
            onStarSelect={(star, palace) => setSelectedStar({ star, palace })}
            brightnessMode={mode}
          />
          <BrightnessLegend school={school} onSchoolChange={changeSchool} mode={mode} onModeChange={changeMode} />
        </div>
        <div className="flex flex-col gap-3">
          {selectedStar && (
            <StarDetailPanel
              star={selectedStar.star}
              palaceName={selectedStar.palace.name}
              onClose={() => setSelectedStar(null)}
            />
          )}
          <div style={{ minHeight: 520 }} className="flex flex-col">
            <InsightPanel chart={chart} selectedPalace={selectedPalace} />
          </div>
        </div>
      </div>
    </main>
  );
}
