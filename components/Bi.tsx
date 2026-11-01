/**
 * Bi — hiển thị song ngữ: tiếng Việt trước, tiếng Trung (giản thể) sau.
 * 双语显示：越南语在前，简体中文在后。
 *
 * <Bi vi="Lập lá số" zh="排盘" />                → Lập lá số 排盘
 * <Bi block vi="Đoạn văn…" zh="段落……" />         → hai khối xếp chồng
 * <HV zh="紫微" />                                → Tử Vi 紫微 (tự đọc Hán-Việt)
 * bi('Lập lá số', '排盘')                          → 'Lập lá số · 排盘' (cho title/placeholder/metadata)
 */
import type { ReactNode, CSSProperties } from 'react';
import { hv } from '@/lib/ziwei/hanviet';

export function bi(vi: string, zh: string, sep = ' · '): string {
  return `${vi}${sep}${zh}`;
}

interface BiProps {
  vi: ReactNode;
  zh: ReactNode;
  /** Xếp tiếng Trung xuống dòng riêng (dùng cho đoạn văn, tiêu đề lớn) */
  block?: boolean;
  className?: string;
  zhClassName?: string;
  style?: CSSProperties;
}

export default function Bi({ vi, zh, block, className, zhClassName, style }: BiProps) {
  if (block) {
    return (
      <span className={`bi-block ${className ?? ''}`} style={style}>
        <span className="bi-vi block">{vi}</span>
        <span className={`bi-zh block ${zhClassName ?? ''}`} lang="zh-CN">{zh}</span>
      </span>
    );
  }
  return (
    <span className={className} style={style}>
      <span className="bi-vi">{vi}</span>{' '}
      <span className={`bi-zh ${zhClassName ?? ''}`} lang="zh-CN">{zh}</span>
    </span>
  );
}

/** Thuật ngữ Hán: tự đọc âm Hán-Việt rồi kèm chữ Hán. */
export function HV({ zh, block, className, zhClassName, style }: Omit<BiProps, 'vi' | 'zh'> & { zh: string }) {
  if (!zh) return null;
  const vi = hv(zh);
  if (vi === zh) return <span className={className} style={style}>{zh}</span>;
  return <Bi vi={vi} zh={zh} block={block} className={className} zhClassName={zhClassName} style={style} />;
}

export { hv };
