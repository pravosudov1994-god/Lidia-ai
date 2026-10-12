import { NextResponse } from "next/server";
const recent = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 5000) return NextResponse.json({ error: "Слишком большой запрос." }, { status: 413 });
  let body: Record<string, unknown>;
  try {
    const data: unknown = await request.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) throw Error("Bad body");
    body = data as Record<string, unknown>;
  } catch { return NextResponse.json({ error: "Некорректная заявка." }, { status: 400 }); }
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "";
  const niche = typeof body.niche === "string" ? body.niche.trim().slice(0, 300) : "";
  if (!name || phone.replace(/\D/g, "").length < 10) return NextResponse.json({ error: "Укажите имя и корректный телефон." }, { status: 400 });
  const botToken = process.env.LEADS_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.LEADS_TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return NextResponse.json({ error: "Приём заявок пока не подключён. Попробуйте позже." }, { status: 503 });
  // Per-instance guard only. In production add Cloudflare WAF / Turnstile / shared rate limits.
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (hits.length >= 3) return NextResponse.json({ error: "Слишком много заявок. Попробуйте позже." }, { status: 429 });
  recent.set(ip, [...hits, now]);
  if (recent.size > 3000) recent.clear();
  const clean = (str: string) => str.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  const message = ["Новая заявка — Motin AI", "Имя: " + clean(name), "Телефон: " + clean(phone), "Задача: " + clean(niche || "Не указана")].join("\n");
  try {
    const upstream = await fetch("https://api.telegram.org/bot" + botToken + "/sendMessage", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }), signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok) throw Error("Telegram delivery failed");
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Не удалось доставить заявку. Попробуйте позже." }, { status: 502 }); }
}