/**
 * POST /api/interpret — AI luận giải một lá số (stream SSE).
 * Body: { chart: ZiweiChart, messages: { role, content }[] }
 * Server chỉ lấy chart.birthInfo rồi tự lập lại lá số bằng engine.
 */
import { rebuildChart, chartToContext } from '@/lib/ai/chart-context';
import { INTERPRET_SYSTEM } from '@/lib/ai/prompts';
import { aiConfigured, sanitizeMessages, sseResponse, streamCompletion } from '@/lib/ai/llm';
import { clientIp, takeToken } from '@/lib/ai/rate-limit';
import { MSG_BAD_CHART, MSG_BAD_REQUEST, MSG_NOT_CONFIGURED, msgFromError, msgRateLimited } from '@/lib/ai/messages';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function* once(text: string) { yield text; }

export async function POST(req: Request) {
  let body: { chart?: { birthInfo?: unknown; brightnessSchool?: unknown }; messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return sseResponse(once(MSG_BAD_REQUEST), msgFromError);
  }

  if (!aiConfigured()) return sseResponse(once(MSG_NOT_CONFIGURED), msgFromError);

  const chart = rebuildChart(body.chart?.birthInfo, body.chart?.brightnessSchool);
  if (!chart) return sseResponse(once(MSG_BAD_CHART), msgFromError);

  const messages = sanitizeMessages(body.messages);
  if (!messages) return sseResponse(once(MSG_BAD_REQUEST), msgFromError);

  const wait = takeToken(clientIp(req));
  if (wait > 0) return sseResponse(once(msgRateLimited(wait)), msgFromError);

  const system = `${INTERPRET_SYSTEM}\n\n以下是用户的命盘数据（由排盘引擎生成）：\n${chartToContext(chart)}`;
  return sseResponse(streamCompletion(system, messages, req.signal), msgFromError);
}
