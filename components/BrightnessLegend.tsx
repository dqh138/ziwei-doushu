'use client';
/**
 * Chú giải độ sáng tinh diệu + bộ chọn bảng độ sáng và kiểu hiển thị.
 * 星曜亮度图例 + 亮度表流派与显示方式切换。
 */
import { useState } from 'react';
import Bi from './Bi';
import {
  BRIGHTNESS_LEVELS, BRIGHTNESS_SCHOOLS, FIVE_LEVEL_ZZ_ORDER, SEVEN_LEVEL_ORDER, VN_LEVELS,
  type BrightnessDisplay, type BrightnessSchoolId, type VnLevel,
} from '@/lib/ziwei/brightness';
import type { StarBrightness } from '@/lib/ziwei/types';

interface Props {
  school: BrightnessSchoolId;
  onSchoolChange: (s: BrightnessSchoolId) => void;
  mode: BrightnessDisplay | 'off';
  onModeChange: (m: BrightnessDisplay | 'off') => void;
}

const chip = (active: boolean): React.CSSProperties => ({
  fontSize: '10px', padding: '3px 8px', borderRadius: '999px', cursor: 'pointer',
  border: `1px solid ${active ? 'rgba(212,168,67,0.55)' : 'var(--t-border)'}`,
  background: active ? 'rgba(212,168,67,0.12)' : 'transparent',
  color: active ? 'var(--t-gold)' : 'var(--t-faint)',
});

function LevelPill({ level, vnMode }: { level: StarBrightness; vnMode: boolean }) {
  const d = BRIGHTNESS_LEVELS[level];
  const vn = VN_LEVELS[d.vn];
  const color = vnMode ? vn.color : d.color;
  return (
    <span title={d.descVi} className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5"
      style={{ border: `1px solid ${color}55`, color, fontSize: '10px' }}>
      <b>{vnMode ? d.vn : d.abbr}</b>
      <Bi vi={vnMode ? vn.vi : d.vi} zh={vnMode ? vn.zh : d.zh} />
    </span>
  );
}

export default function BrightnessLegend({ school, onSchoolChange, mode, onModeChange }: Props) {
  const [open, setOpen] = useState(false);
  const schoolDef = BRIGHTNESS_SCHOOLS.find(s => s.id === school)!;
  const order = schoolDef.levels === 5 ? FIVE_LEVEL_ZZ_ORDER : SEVEN_LEVEL_ORDER;

  return (
    <div className="mt-3 rounded-xl px-3 py-2.5 text-[10px]" style={{ border: '1px solid var(--t-border)', color: 'var(--t-faint)' }}>
      {/* Hàng 1: tiêu đề + bậc của bảng đang dùng */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-medium mr-1" style={{ color: 'var(--t-gold)' }}>
          <Bi vi="Độ sáng" zh="亮度" />
        </span>
        {mode === 'vn'
          ? (Object.keys(VN_LEVELS) as VnLevel[]).map(k => (
              <span key={k} className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5"
                style={{ border: `1px solid ${VN_LEVELS[k].color}55`, color: VN_LEVELS[k].color }}>
                <b>{k}</b><Bi vi={VN_LEVELS[k].vi} zh={VN_LEVELS[k].zh} />
              </span>
            ))
          : order.map(l => <LevelPill key={l} level={l} vnMode={false} />)}
        <button type="button" onClick={() => setOpen(o => !o)} className="ml-auto underline underline-offset-2" style={{ color: 'var(--t-faint)' }}>
          {open ? <Bi vi="Thu gọn" zh="收起" /> : <Bi vi="Bảng đối chiếu & cài đặt" zh="对照表与设置" />}
        </button>
      </div>

      {open && (
        <div className="mt-3 space-y-3">
          {/* Chọn bảng độ sáng */}
          <div>
            <div className="mb-1.5" style={{ color: 'var(--t-text2)' }}><Bi vi="Bảng độ sáng theo trường phái" zh="亮度表流派" /></div>
            <div className="flex flex-wrap gap-1.5">
              {BRIGHTNESS_SCHOOLS.map(s => (
                <button key={s.id} type="button" style={chip(school === s.id)} onClick={() => onSchoolChange(s.id)} title={s.note}>
                  <Bi vi={`${s.vi} · ${s.levels} bậc`} zh={`${s.zh} · ${s.levels}级`} />
                </button>
              ))}
            </div>
            <div className="mt-1" style={{ opacity: 0.8 }}>{schoolDef.note}</div>
          </div>

          {/* Kiểu hiển thị */}
          <div>
            <div className="mb-1.5" style={{ color: 'var(--t-text2)' }}><Bi vi="Cách hiện trên lá số" zh="命盘显示方式" /></div>
            <div className="flex flex-wrap gap-1.5">
              <button type="button" style={chip(mode === 'detail')} onClick={() => onModeChange('detail')}>
                <Bi vi="Chi tiết kiểu TQ/Đài Loan" zh="中国/台湾细分等级" />
              </button>
              <button type="button" style={chip(mode === 'vn')} onClick={() => onModeChange('vn')}>
                <Bi vi="5 bậc kiểu Việt Nam (M V Đ B H)" zh="越南五级" />
              </button>
              <button type="button" style={chip(mode === 'off')} onClick={() => onModeChange('off')}>
                <Bi vi="Ẩn" zh="隐藏" />
              </button>
            </div>
          </div>

          {/* Bảng đối chiếu */}
          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ borderCollapse: 'collapse', minWidth: 460 }}>
              <thead>
                <tr style={{ color: 'var(--t-text2)' }}>
                  <th className="py-1 pr-2 font-medium"><Bi vi="Bậc" zh="等级" /></th>
                  <th className="py-1 pr-2 font-medium"><Bi vi="Ý nghĩa" zh="含义" /></th>
                  <th className="py-1 pr-2 font-medium"><Bi vi="Toàn Thư 7 bậc" zh="全书七级" /></th>
                  <th className="py-1 pr-2 font-medium"><Bi vi="Trung Châu 5 bậc" zh="中州五级" /></th>
                  <th className="py-1 font-medium"><Bi vi="Việt Nam 5 bậc" zh="越南五级" /></th>
                </tr>
              </thead>
              <tbody>
                {(['庙', '旺', '得', '利', '平', '闲', '不', '陷'] as StarBrightness[]).map(l => {
                  const d = BRIGHTNESS_LEVELS[l];
                  const vn = VN_LEVELS[d.vn];
                  return (
                    <tr key={l} style={{ borderTop: '1px solid var(--t-border)' }}>
                      <td className="py-1.5 pr-2 align-top whitespace-nowrap" style={{ color: d.color }}>
                        <b>{d.abbr}</b> <Bi vi={d.vi} zh={`${d.zh}（${d.zhFull}）`} />
                      </td>
                      <td className="py-1.5 pr-2 align-top" style={{ color: 'var(--t-text2)' }}>
                        <Bi block vi={d.descVi} zh={d.descZh} />
                      </td>
                      <td className="py-1.5 pr-2 align-top">{SEVEN_LEVEL_ORDER.includes(l) ? '✓' : '—'}</td>
                      <td className="py-1.5 pr-2 align-top">{FIVE_LEVEL_ZZ_ORDER.includes(l) ? '✓' : '—'}</td>
                      <td className="py-1.5 align-top whitespace-nowrap" style={{ color: vn.color }}>
                        {d.vn} · {vn.vi}{d.vnNote ? ' *' : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-1.5 leading-relaxed" style={{ opacity: 0.85 }}>
              <Bi block
                vi="* Hệ Việt Nam không tách riêng Lợi, Nhàn, Bất; khi chọn kiểu Việt Nam các bậc này được gộp vào bậc gần nhất. Độ sáng chỉ là một yếu tố: còn phải xét Tứ Hóa, sát tinh và cách cục."
                zh="* 越南体系不单列利、闲、不；选越南五级时并入最接近的等级。亮度只是一个因素，仍须结合四化、煞星与格局论断。"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
