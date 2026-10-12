import { NextResponse } from "next/server";

// Best-effort per-instance throttle. Cloudflare WAF / distributed rate limits
// are still mandatory for public launch because Worker isolates do not share memory.
const WINDOW = 15 * 60 * 1000;
const hits = new Map<string, { start: number; count: number }>();
export function aiRateLimit(request: Request, operation: string, maxRequests: number): NextResponse | null {
  const ip = request.headers.get("cf-connecting-ip") || "anonymous";
  const now = Date.now();
  const key = operation + ":" + ip;
  let state = hits.get(key);
  if (!state || now - state.start > WINDOW) {
    state = { start: now, count: 0 };
    hits.set(key, state);
  }
  if (state.count >= maxRequests) {
    const retryAfter = Math.max(1, Math.ceil((WINDOW - (now - state.start)) / 1000));
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте немного позже." },
      { status: 429, headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" } },
    );
  }
  state.count++;
  if (hits.size > 5000) hits.clear();
  return null;
}
