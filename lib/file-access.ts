import { createHmac, timingSafeEqual } from "node:crypto";
type Action = "read" | "delete";
const LIFE_MS = 24 * 60 * 60 * 1000;
export function fileAccessConfigured() {
  return Boolean(process.env.FILE_LINK_SECRET && process.env.FILE_LINK_SECRET.length >= 32);
}
function signature(id: string, action: Action, expires: number) {
  const secret = process.env.FILE_LINK_SECRET;
  if (!secret || secret.length < 32) throw new Error("FILE_LINK_SECRET is not configured");
  return createHmac("sha256", secret).update(action + ":" + id + ":" + expires).digest("hex");
}
export function signFileAccess(id: string, action: Action) {
  const expires = Date.now() + LIFE_MS;
  return { expires, signature: signature(id, action, expires) };
}
export function verifyFileAccess(id: string, action: Action, exp: number | string | null | undefined, sig: string | null | undefined) {
  if (!fileAccessConfigured() || !id || typeof sig !== "string" || !/^[a-f0-9]{64}$/.test(sig)) return false;
  const expires = Number(exp);
  if (!Number.isSafeInteger(expires) || expires < Date.now() || expires > Date.now() + LIFE_MS + 60_000) return false;
  const expected = Buffer.from(signature(id, action, expires), "hex");
  const received = Buffer.from(sig, "hex");
  return received.length === expected.length && timingSafeEqual(received, expected);
}
