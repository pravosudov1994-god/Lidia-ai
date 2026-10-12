import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

// Native Cloudflare Workers AI. No API token required: binding comes from
// wrangler.jsonc and is deployed with this Worker.
type CloudflareAI = {
  run(model: string, options: Record<string, unknown>): Promise<unknown>;
};
type NativeLimiter = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};
export type MotinCloudflareBindings = {
  AI?: CloudflareAI;
  MOTIN_AI_RATE_PER_CLIENT?: NativeLimiter;
  MOTIN_AI_RATE_GLOBAL?: NativeLimiter;
};

export function getMotinCloudflareBindings(): MotinCloudflareBindings | null {
  try {
    return getCloudflareContext().env as unknown as MotinCloudflareBindings;
  } catch {
    // In local Next.js development, OpenNext context can be unavailable.
    return null;
  }
}

type TextMessage = {
  role: "user" | "assistant";
  content: string;
  hasAttachments: boolean;
};

// The fallback is deliberately text-only: never claim to have read files.
const SYSTEM = [
  "Вы — Motin AI, опытный ИИ-маркетинговый директор Motin Group.",
  "Помогайте бизнесу находить точки роста, улучшать продажи, рекламу и лидогенерацию.",
  "Отвечайте по-русски, обращайтесь на Вы, кратко, точно и практически.",
  "Не придумывайте цифры, результаты, кейсы или данные о конкурентах.",
  "Отделяйте подтверждённые факты от гипотез.",
  "Предлагайте 1–3 приоритетных действия и при необходимости один уточняющий вопрос.",
  "Если пользователь просит файл или картинку, не утверждайте, что создали файл, пока это не сделано.",
].join(" ");

function extractCloudflareReply(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const data = value as {
    response?: unknown;
    choices?: Array<{ message?: { content?: unknown }; text?: unknown }>;
  };
  if (typeof data.response === "string") return data.response.trim();
  const choice = data.choices?.[0];
  const content = choice?.message?.content ?? choice?.text;
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .filter((part): part is { text: string } =>
        Boolean(part && typeof part === "object" && typeof part.text === "string"))
      .map((part) => part.text)
      .join("\n")
      .trim();
  }
  return "";
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function replyWithWorkersAi(request: Request, messages: TextMessage[]) {
  const env = getMotinCloudflareBindings();
  if (!env?.AI) {
    return jsonError("ИИ временно недоступен. Подключение Cloudflare Workers AI ещё не завершено.", 503);
  }
  // Fail closed if distributed protection is not deployed. Per-isolate limits
  // are not a substitute for the Cloudflare native rate limiting bindings.
  if (!env.MOTIN_AI_RATE_PER_CLIENT || !env.MOTIN_AI_RATE_GLOBAL) {
    return jsonError("ИИ временно недоступен: проверяется защита от перегрузки.", 503);
  }

  if (messages.some((message) => message.hasAttachments)) {
    return jsonError(
      "Сейчас бесплатный режим Motin AI поддерживает только текстовые сообщения. Отправьте вопрос без вложений.",
      422,
    );
  }

  try {
    const ip = request.headers.get("cf-connecting-ip") || "anonymous";
    const [userRate, globalRate] = await Promise.all([
      env.MOTIN_AI_RATE_PER_CLIENT.limit({ key: "chat:" + ip }),
      env.MOTIN_AI_RATE_GLOBAL.limit({ key: "motin-ai-text-global" }),
    ]);
    if (!userRate.success || !globalRate.success) {
      return jsonError("Лимит запросов достигнут. Попробуйте через минуту.", 429);
    }

    // Hard limits on model input and output size limit the cost of each call.
    const recent = messages.slice(-8).map((message) => ({
      role: message.role,
      content: message.content.slice(0, 900),
    }));
    const total = recent.reduce((n, message) => n + message.content.length, 0);
    if (total > 5000) {
      return jsonError("Слишком длинный диалог. Начните новый чат.", 413);
    }

    const data = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
      messages: [{ role: "system", content: SYSTEM }, ...recent],
      max_completion_tokens: 450,
      stream: false,
      chat_template_kwargs: { enable_thinking: false },
    });
    const reply = extractCloudflareReply(data);
    if (!reply) return jsonError("Модель не вернула ответ. Повторите запрос позже.", 502);
    return NextResponse.json({ reply }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    // Do not expose provider error internals to public callers.
    console.error("Workers AI chat failed", error instanceof Error ? error.name : "unknown");
    return jsonError("ИИ временно недоступен. Попробуйте ещё раз чуть позже.", 503);
  }
}
