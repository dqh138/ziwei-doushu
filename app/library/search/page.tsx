/**
 * /library/search?q=xxx — 搜索结果页
 */

import Link from 'next/link';
import { searchClassics, getParagraphById } from '@/lib/classics';
import Bi from '@/components/Bi';
import { libVi } from '../vi';

export const metadata = {
  title: 'Tìm kiếm · Kho cổ thư | 搜索 · 古籍原典库',
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = sp.q?.trim() || '';
  const hits = q ? searchClassics(q, 50) : [];

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/library" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.3em', textDecoration: 'none' }}>
          ← <Bi vi="Kho cổ thư" zh="古籍库" />
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.2em' }}>
          <Bi vi="Kết quả tìm kiếm" zh="搜索结果" />
        </div>
        <Link href="/" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em', textDecoration: 'none' }}>
          <Bi vi="Trang chủ" zh="首页" /> →
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div style={{ fontSize: '13px', color: 'var(--tx-3)', letterSpacing: '0.15em', marginBottom: '4px' }}>
            <Bi vi="Từ khóa tìm kiếm" zh="搜索关键词" />
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.1em' }}>
            「{q || <Bi vi="(trống)" zh="（空）" />}」
          </h1>
          <div style={{ fontSize: '12px', color: 'var(--tx-3)', marginTop: '8px' }}>
            <Bi
              vi={<>Tìm thấy <strong style={{ color: 'var(--ac)' }}>{hits.length}</strong> đoạn nguyên văn cổ thư khớp</>}
              zh={<>共找到 {hits.length} 条古籍原文匹配</>}
            />
          </div>
        </div>

        {hits.length === 0 ? (
          <div style={{
            background: 'var(--bg-card)',
            padding: '40px 20px',
            borderRadius: '12px',
            textAlign: 'center',
            color: 'var(--tx-2)',
            border: '1px solid rgba(184,146,42,0.15)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.4 }}>📜</div>
            {q ? (
              <>
                <div style={{ fontSize: '14px', marginBottom: '6px' }}><Bi block vi="Chưa tìm thấy từ khóa này trong các cổ thư đã thu thập" zh="暂未在已收录古籍中找到这个关键词" /></div>
                <div style={{ fontSize: '11px', color: 'var(--tx-3)', lineHeight: 1.7 }}>
                  <Bi block vi="Chúng tôi đang tiếp tục bổ sung nội dung. Lưu ý: cổ thư là chữ Hán nên hãy tìm bằng chữ Hán, thử:" zh="我们持续补充内容中。可尝试搜索：" />
                  <span style={{ color: 'var(--ac)' }}>七杀朝斗 / 双禄朝垣 / 化忌 / 紫微 / 命宫 / 机月同梁</span>
                </div>
              </>
            ) : (
              <div style={{ fontSize: '13px' }}><Bi block vi="Vui lòng nhập từ khóa cần tìm" zh="请输入要搜索的关键词" /></div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {hits.map((hit, i) => {
              const ctx = getParagraphById(hit.paragraphId);
              const chapterIdx = ctx?.chapterIdx ?? 0;
              return (
                <Link
                  key={i}
                  href={`/library/${hit.bookSlug}/${chapterIdx}#${hit.paragraphId}`}
                  style={{
                    display: 'block',
                    background: 'var(--bg-card)',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(184,146,42,0.18)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    color: 'var(--tx-3)',
                    marginBottom: '8px',
                    letterSpacing: '0.1em',
                  }}>
                    <span style={{ color: 'var(--ac)', fontWeight: 600 }}>《{libVi(hit.bookTitle)}》 <span className="bi-zh">《{hit.bookTitle}》</span></span>
                    <span style={{ opacity: 0.5 }}>·</span>
                    <Bi vi={libVi(hit.chapterTitle)} zh={hit.chapterTitle} />
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: 'var(--tx-0)',
                      lineHeight: 1.9,
                      letterSpacing: '0.02em',
                    }}
                    dangerouslySetInnerHTML={{ __html: hit.snippet }}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        mark { background: rgba(184,146,42,0.3); color: #8b6a14; padding: 0 2px; border-radius: 2px; font-weight: 600; }
      `}</style>
    </div>
  );
}
