import Bi from '@/components/Bi';

export const metadata = {
  title: 'Chính sách quyền riêng tư · Lá số Tử Vi | 隐私政策 · 紫微命盘',
  description: 'Chính sách quyền riêng tư của Lá số Tử Vi · 紫微命盘隐私政策',
};

const H2 = { fontSize: 18, marginTop: 32, marginBottom: 12 } as const;
const UL = { paddingLeft: 24 } as const;

/** Một mục danh sách: nhãn in đậm (tùy chọn) + nội dung, tiếng Việt trước, tiếng Trung sau */
function Li({ bv, bz, vi, zh }: { bv?: string; bz?: string; vi: string; zh: string }) {
  return (
    <li style={{ marginBottom: 6 }}>
      <span className="block">{bv && <strong>{bv}: </strong>}{vi}</span>
      <span className="block bi-zh" lang="zh-CN">{bz && <strong>{bz}：</strong>}{zh}</span>
    </li>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--tx-3)', textDecoration: 'none' }}>
          <span style={{ fontSize: '16px' }}>‹</span>
          <Bi vi="Về trang chủ" zh="返回首页" />
        </a>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.08em' }}><Bi vi="Lá số Tử Vi" zh="紫微命盘" /></span>
      </header>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}><Bi block vi="Chính sách quyền riêng tư" zh="隐私政策" /></h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}><Bi vi="Cập nhật lần cuối: tháng 4/2026" zh="最后更新：2026年4月" /></p>

        <h2 style={H2}><Bi block vi="1. Thông tin chúng tôi thu thập" zh="1. 我们收集的信息" /></h2>
        <p><Bi block vi="Để cung cấp dịch vụ lập lá số và luận giải Tử Vi, chúng tôi có thể thu thập các thông tin sau:" zh="为提供紫微命盘排盘与解读服务，我们可能收集以下信息：" /></p>
        <ul style={UL}>
          <Li bv="Thông tin cần cho lá số" bz="命盘必要信息" vi="họ tên (không bắt buộc), năm tháng ngày sinh dương lịch, giờ sinh, giới tính, kinh độ nơi sinh" zh="姓名（选填）、出生公历年月日、出生时辰、性别、出生地经度" />
          <Li bv="Thông tin tài khoản (sau khi đăng ký)" bz="账号信息（注册后）" vi="số điện thoại (dùng để xác thực SMS và dịch vụ hội viên)" zh="手机号（用于短信验证与会员服务）" />
          <Li bv="Thông tin tương tác" bz="交互信息" vi="lượt bấm, lượt xem và lịch sử lá số của bạn trên trang" zh="你在站内的点击、浏览、命盘历史记录" />
          <Li bv="Thông tin phản hồi" bz="反馈信息" vi="đánh giá “đúng / không đúng” và phản hồi bằng chữ của bạn về nội dung luận giải" zh="你对解读内容的“准 / 不准”打分与文字反馈" />
          <Li bv="Thông tin thanh toán" bz="支付信息" vi="khi mua hội viên hoặc dịch vụ lẻ sẽ được xử lý qua bên thanh toán thứ ba (Alipay / WeChat Pay), nền tảng không lưu số thẻ hay mật khẩu đầy đủ" zh="购买会员或单项服务时通过第三方支付（支付宝 / 微信支付）处理，本平台不存储完整卡号或密码" />
        </ul>

        <h2 style={H2}><Bi block vi="2. Chúng tôi sử dụng thông tin như thế nào" zh="2. 我们如何使用信息" /></h2>
        <ul style={UL}>
          <Li vi="Thông tin lá số chỉ dùng cho lần luận giải này và lịch sử lá số trong tài khoản của bạn" zh="命盘信息仅用于本次解读与你账号下的历史命盘记录" />
          <Li vi="Số điện thoại dùng để đăng ký, đăng nhập, thông báo đơn hàng" zh="手机号用于注册、登录、订单通知" />
          <Li vi="Thông tin phản hồi dùng để liên tục cải thiện chất lượng nội dung mệnh lý (phân tích tổng hợp sau khi đã ẩn danh)" zh="反馈信息用于持续改进命理内容质量（脱敏后聚合分析）" />
          <Li vi="Dữ liệu tổng hợp có thể được dùng cho nghiên cứu ngành và tối ưu nền tảng" zh="聚合数据可能用于行业研究与平台优化" />
        </ul>

        <h2 style={H2}><Bi block vi="3. Chia sẻ thông tin và bên thứ ba" zh="3. 信息共享与第三方" /></h2>
        <p><Bi block vi="Ngoài các trường hợp sau, chúng tôi không chia sẻ thông tin cá nhân của bạn cho bên thứ ba:" zh="除以下情形外，我们不会向第三方共享你的个人信息：" /></p>
        <ul style={UL}>
          <Li vi="Nhà cung cấp dịch vụ thanh toán (Alipay / WeChat Pay): xử lý thanh toán đơn hàng" zh="支付服务商（支付宝 / 微信支付）：处理订单结算" />
          <Li vi="Nhà cung cấp dịch vụ SMS (như SMS Alibaba Cloud): gửi mã xác thực" zh="短信服务商（如阿里云短信）：发送验证码" />
          <Li vi="Nhà cung cấp dịch vụ đám mây (như Vercel / Cloudflare / Alibaba Cloud): hạ tầng kỹ thuật" zh="云服务商（如 Vercel / Cloudflare / 阿里云）：技术承载" />
          <Li vi="Dịch vụ AI luận giải (như Anthropic Claude): xử lý các cuộc hội thoại “hỏi tự do” của bạn (đã ẩn danh hóa)" zh="AI 解读服务（如 Anthropic Claude）：处理你的“自由追问”对话（已做匿名化）" />
          <Li vi="Yêu cầu hợp pháp của cơ quan tư pháp hoặc cơ quan nhà nước theo quy định pháp luật" zh="司法机关或政府部门基于法律法规的合法要求" />
        </ul>

        <h2 style={H2}><Bi block vi="4. Bảo mật thông tin" zh="4. 信息安全" /></h2>
        <p><Bi block vi="Chúng tôi áp dụng các biện pháp kỹ thuật và quản lý phổ biến trong ngành để bảo vệ thông tin của bạn (mã hóa truyền tải HTTPS, mã hóa lưu trữ cơ sở dữ liệu, kiểm soát quyền truy cập…). Tuy nhiên xin lưu ý, truyền tải qua internet không thể bảo đảm an toàn 100%." zh="我们采取业界常见的技术与管理手段保护你的信息（HTTPS 传输加密、数据库加密存储、访问权限控制等）。但请注意，互联网传输无法保证 100% 安全。" /></p>

        <h2 style={H2}><Bi block vi="5. Quyền của bạn" zh="5. 你的权利" /></h2>
        <ul style={UL}>
          <Li bv="Tra cứu" bz="查询" vi="có thể xem toàn bộ lịch sử lá số và đơn hàng qua trung tâm tài khoản" zh="可通过账号中心查看你的所有历史命盘与订单" />
          <Li bv="Xóa" bz="删除" vi="liên hệ bộ phận chăm sóc khách hàng để xóa lá số cụ thể trong tài khoản / hủy tài khoản" zh="联系客服删除账号下指定命盘 / 注销账号" />
          <Li bv="Xuất dữ liệu" bz="导出" vi="có thể yêu cầu xuất toàn bộ dữ liệu cá nhân của bạn" zh="可申请导出你的全部个人数据" />
        </ul>

        <h2 style={H2}><Bi block vi="6. Cookie và lưu trữ cục bộ" zh="6. Cookie 与本地存储" /></h2>
        <p><Bi block vi="Trang dùng cookie / localStorage để: lưu lựa chọn giao diện tối/sáng, lịch sử lá số gần đây, trạng thái đăng nhập hội viên. Bạn có thể tắt trong cài đặt trình duyệt, nhưng một số tính năng có thể bị ảnh hưởng." zh="本站使用 cookie / localStorage 用于：保存你的暗黑/亮色主题偏好、最近的命盘历史、会员登录状态。你可在浏览器设置中关闭，但部分功能可能受影响。" /></p>

        <h2 style={H2}><Bi block vi="7. Người chưa thành niên" zh="7. 未成年人" /></h2>
        <p><Bi block vi="Nội dung mệnh lý của nền tảng dành cho người dùng thành niên từ 18 tuổi trở lên. Người chưa thành niên vui lòng sử dụng khi có sự đồng ý của người giám hộ, và không được dùng phần luận giải cho các quyết định trọng đại trong đời." zh="本平台命理内容面向 18 岁以上成年用户。未成年人请在监护人同意下使用，并不得将解读用于重大人生决策。" /></p>

        <h2 style={H2}><Bi block vi="8. Thay đổi chính sách" zh="8. 政策变更" /></h2>
        <p><Bi block vi="Chính sách này có thể được cập nhật không định kỳ. Thay đổi quan trọng sẽ được thông báo rõ ràng. Tiếp tục sử dụng đồng nghĩa với việc đồng ý phiên bản đã cập nhật." zh="本政策可能不定期更新。重大变更将以显著方式通知。继续使用即表示同意更新后的版本。" /></p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/terms" style={{ color: 'var(--ac)' }}><Bi vi="Điều khoản dịch vụ" zh="服务条款" /></a> · <a href="/" style={{ color: 'var(--ac)' }}><Bi vi="Về trang chủ" zh="返回首页" /></a>
        </p>
      </main>
    </>
  );
}
