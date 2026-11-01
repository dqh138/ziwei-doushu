/**
 * POST /api/heming — AI hợp lá số hai người (stream SSE).
 * Body: { chartA: ZiweiChart, chartB: ZiweiChart, question?: string }
 */
import { rebuildChart, chartToContext } from '@/lib/ai/chart-context';
import { HEMING_SYSTEM } from '@/lib/ai/prompts';
import { aiConfigured, sseResponse, streamCompletion } from '@/lib/ai/llm';
import { clientIp, takeToken } from '@/lib/ai/rate-limit';
import { MSG_BAD_CHART, MSG_BAD_REQUEST, MSG_NOT_CONFIGURED, msgFromError, msgRateLimited } from '@/lib/ai/messages';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function* once(text: string) { yield text; }

export async function POST(req: Request) {
  let body: { chartA?: { birthInfo?: unknown; brightnessSchool?: unknown }; chartB?: { birthInfo?: unknown; brightnessSchool?: unknown }; question?: unknown };
  try {
    body = await req.json();
  } catch {
    return sseResponse(once(MSG_BAD_REQUEST), msgFromError);
  }

  if (!aiConfigured()) return sseResponse(once(MSG_NOT_CONFIGURED), msgFromError);

  const a = rebuildChart(body.chartA?.birthInfo, body.chartA?.brightnessSchool);
  const b = rebuildChart(body.chartB?.birthInfo, body.chartB?.brightnessSchool);
  if (!a || !b) return sseResponse(once(MSG_BAD_CHART), msgFromError);

  const wait = takeToken(clientIp(req));
  if (wait > 0) return sseResponse(once(msgRateLimited(wait)), msgFromError);

  const question = typeof body.question === 'string' ? body.question.trim().slice(0, 1000) : '';
  const system = `${HEMING_SYSTEM}\n\n以下是两人的命盘数据（由排盘引擎生成）：\n${chartToContext(a, { label: '甲方命盘 · Bên A' })}\n\n${chartToContext(b, { label: '乙方命盘 · Bên B' })}`;
  const userText = question
    ? `Câu hỏi về hợp lá số / 合盘问题：${question}`
    : 'Hãy phân tích hợp lá số của hai người theo cấu trúc mặc định. / 请按默认结构分析两人合盘。';

  return sseResponse(streamCompletion(system, [{ role: 'user', content: userText }], req.signal), msgFromError);
}
