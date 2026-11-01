import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Lá số Tử Vi · Tử Vi Đẩu Số chính tông Nghê Hải Hạ | 紫微命盘 · 倪海厦正宗紫微斗数',
  description: 'Dựa trên thể hệ Tử Vi Đẩu Số chính tông Nghê Hải Hạ, AI luận giải chuyên sâu cách cục lá số, đại hạn lưu niên, tình cảm, sự nghiệp, tài lộc, sức khỏe. 基于倪海厦正宗紫微斗数体系，AI深度解读您的命盘格局、大限流年、感情事业财富健康全方位解析',
  keywords: 'tử vi, tử vi đẩu số, lá số tử vi, Nghê Hải Hạ, Tử Vi Đẩu Số Toàn Thư, 14 chính tinh, 12 cung, 紫微斗数, 倪海厦, 紫微斗数全集, 紫微斗数全书, 骨髓赋, 命盘, 命理, 14主星, 12宫位',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lá số Tử Vi · Tử Vi Đẩu Số chính tông Nghê Hải Hạ | 紫微命盘 · 倪海厦正宗紫微斗数',
    description: 'Dựa trên thể hệ Tử Vi Đẩu Số chính tông Nghê Hải Hạ, AI luận giải chuyên sâu cách cục lá số, đại hạn lưu niên, tình cảm, sự nghiệp, tài lộc, sức khỏe. 基于倪海厦正宗紫微斗数体系，AI深度解读您的命盘格局、大限流年、感情事业财富健康全方位解析',
    url: SITE_URL,
    siteName: 'Nghiên cứu Tử Vi · 紫微研究',
    locale: 'vi_VN',
    alternateLocale: ['zh_CN'],
    type: 'website',
  },
  // 站长平台验证（拿到 verification code 后填入对应字段，重新部署即可）
  verification: {
    // Google Search Console: 在 https://search.google.com/search-console 添加站点后获取
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    // Bing Webmaster Tools: 在 https://www.bing.com/webmasters 添加站点后获取
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      // 百度站长（等执照下来后）
      'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || '',
      // 360 站长（等执照下来后）
      '360-site-verification': process.env.NEXT_PUBLIC_360_VERIFICATION || '',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('ziwei-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);else document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();` }} />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
