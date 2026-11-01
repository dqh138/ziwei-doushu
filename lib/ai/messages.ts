/** Thông báo song ngữ trả về trong luồng luận giải khi có sự cố. 流式返回的双语提示。 */
import Anthropic from '@anthropic-ai/sdk';
import { EmptyCompletionError } from './llm';

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
  // Ghi cả nguyên nhân gốc (e.cause) để đọc được trong Vercel → Logs; không bao giờ in khóa
  const cause = e instanceof Error && e.cause instanceof Error ? ` | cause: ${e.cause.name}: ${e.cause.message}` : '';
  console.error('[ai] completion error', e instanceof Error ? `${e.name}: ${e.message}${cause}`.replace(/sk-ant-[\w-]+/g, '[key]') : e);
  if (e instanceof EmptyCompletionError) {
    if (e.stopReason === 'refusal') {
      return 'Mô hình từ chối trả lời câu hỏi này. Hãy thử đặt câu hỏi khác hoặc chọn chủ đề khác.\n\n模型拒绝回答此问题，请换个问法或主题再试。';
    }
    if (e.stopReason === 'max_tokens') {
      return 'Mô hình nghĩ quá lâu và dùng hết giới hạn token trước khi viết. Hãy bấm lại chủ đề; nếu lặp lại, quản trị viên tăng AI_MAX_TOKENS trên Vercel.\n\n模型在输出前已用尽 token 上限，请调高 AI_MAX_TOKENS 或重试。';
    }
    return 'Mô hình không trả về nội dung (' + (e.stopReason ?? 'không rõ') + '). Vui lòng bấm lại chủ đề.\n\n模型未返回内容，请重试。';
  }
  if (e instanceof Anthropic.APIConnectionError && !(e instanceof Anthropic.APIConnectionTimeoutError)) {
    return '\n\nKhông kết nối được tới Claude. Quản trị viên hãy kiểm tra ANTHROPIC_API_KEY trên Vercel: phải là khóa API dạng sk-ant-api03-…, không có khoảng trắng hay xuống dòng, rồi Redeploy.\n\n'
      + '无法连接 Claude。请管理员检查 Vercel 上的 ANTHROPIC_API_KEY：须为 sk-ant-api03- 开头的 API 密钥，且无空格换行，然后重新部署。';
  }
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
