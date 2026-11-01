/** Thông báo song ngữ trả về trong luồng luận giải khi có sự cố. 流式返回的双语提示。 */
import Anthropic from '@anthropic-ai/sdk';

export const MSG_NOT_CONFIGURED =
  'Máy chủ chưa được cấu hình khóa AI. Quản trị viên cần thêm biến môi trường ANTHROPIC_API_KEY trên Vercel rồi deploy lại.\n\n'
  + '服务器尚未配置 AI 密钥，请管理员在 Vercel 添加环境变量 ANTHROPIC_API_KEY 后重新部署。';

export const MSG_BAD_CHART =
  'Không đọc được dữ liệu lá số, vui lòng lập lại lá số.\n\n命盘数据无效，请重新起盘。';

export const MSG_BAD_REQUEST =
  'Yêu cầu không hợp lệ, vui lòng thử lại.\n\n请求无效，请重试。';

export function msgRateLimited(waitSeconds: number): string {
  const mins = Math.max(1, Math.ceil(waitSeconds / 60));
  return `Bạn đã dùng hết lượt luận giải trong thời gian này, vui lòng quay lại sau khoảng ${mins} phút.\n\n`
    + `本时段解读次数已用完，请约 ${mins} 分钟后再试。`;
}

export function msgFromError(e: unknown): string {
  console.error('[ai] completion error', e instanceof Error ? e.message : e);
  if (e instanceof Anthropic.AuthenticationError || e instanceof Anthropic.PermissionDeniedError) {
    return '\n\nKhóa API Claude không hợp lệ hoặc không có quyền. Quản trị viên cần kiểm tra ANTHROPIC_API_KEY (khóa đúng bắt đầu bằng sk-ant-).\n\nClaude API 密钥无效或无权限，请检查 ANTHROPIC_API_KEY。';
  }
  if (e instanceof Anthropic.RateLimitError || e instanceof Anthropic.InternalServerError) {
    return '\n\nDịch vụ AI đang quá tải, vui lòng thử lại sau ít phút.\n\nAI 服务繁忙，请稍后再试。';
  }
  if (e instanceof Anthropic.BadRequestError && /credit|balance|billing/i.test(e.message)) {
    return '\n\nTài khoản API Claude đã hết tiền. Quản trị viên cần nạp thêm trong Claude Console.\n\nClaude API 账户余额不足，请管理员充值。';
  }
  return '\n\nLuận giải bị gián đoạn, vui lòng thử lại.\n\n解读中断，请重试。';
}
