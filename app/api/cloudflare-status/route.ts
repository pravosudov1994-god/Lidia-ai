import { NextResponse } from "next/server";
import { getCloudflareAiStatus } from "../../../lib/cloudflare-ai";
import { getMotinCloudflareBindings } from "../../../lib/workers-chat";

export async function GET() {
  const legacy = getCloudflareAiStatus();
  const env = getMotinCloudflareBindings();
  const nativeBindingReady = Boolean(
    env?.AI && env.MOTIN_AI_RATE_PER_CLIENT && env.MOTIN_AI_RATE_GLOBAL,
  );
  return NextResponse.json({
    ...legacy,
    configured: legacy.configured || nativeBindingReady,
    workersAiBinding: nativeBindingReady,
    chatProvider: process.env.OPENAI_API_KEY ? "openai" : nativeBindingReady ? "cloudflare" : "not_configured",
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
