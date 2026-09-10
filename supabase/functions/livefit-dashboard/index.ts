import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Vary": "Origin",
});

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const SESSION_TTL_SECONDS = 8 * 60 * 60;

type SessionPayload = { iat: number; exp: number };

function originForRequest(req: Request) {
  const configured = Deno.env.get("LIVEFIT_APP_ORIGIN") || "";
  const origin = req.headers.get("Origin") || "";
  return configured && origin === configured ? configured : configured || origin;
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

async function signingKey() {
  const secret = Deno.env.get("LIVEFIT_SESSION_SECRET");
  if (!secret) throw new Error("LIVEFIT_SESSION_SECRET is not configured");
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function signPayload(payload: string) {
  const signature = await crypto.subtle.sign("HMAC", await signingKey(), encoder.encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

async function verifySession(req: Request) {
  const cookie = req.headers.get("Cookie") || "";
  const match = cookie.match(/(?:^|;\s*)livefit_owner_session=([^;]+)/);
  if (!match) return false;
  const [payload, signature] = decodeURIComponent(match[1]).split(".");
  if (!payload || !signature) return false;
  try {
    const valid = await crypto.subtle.verify("HMAC", await signingKey(), fromBase64Url(signature), encoder.encode(payload));
    if (!valid) return false;
    const parsed = JSON.parse(decoder.decode(fromBase64Url(payload))) as SessionPayload;
    return Number.isFinite(parsed.exp) && parsed.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function json(req: Request, body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(originForRequest(req)), "Content-Type": "application/json", ...extraHeaders },
  });
}

function supabaseAdmin() {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("Supabase server configuration is missing");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

Deno.serve(async (req) => {
  const origin = originForRequest(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(origin) });

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "dashboard";
    const ownerEmail = Deno.env.get("LIVEFIT_OWNER_EMAIL");
    const ownerPassword = Deno.env.get("LIVEFIT_OWNER_PASSWORD");

    if (action === "login" && req.method === "POST") {
      if (!ownerEmail || !ownerPassword) return json(req, { error: "Owner login is not configured." }, 500);
      const body = await req.json().catch(() => ({}));
      if (body.email !== ownerEmail || body.password !== ownerPassword) return json(req, { error: "Invalid email or password." }, 401);
      const now = Math.floor(Date.now() / 1000);
      const payload = toBase64Url(encoder.encode(JSON.stringify({ iat: now, exp: now + SESSION_TTL_SECONDS })));
      const token = `${payload}.${await signPayload(payload)}`;
      const cookie = `livefit_owner_session=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
      return json(req, { ok: true }, 200, { "Set-Cookie": cookie });
    }

    if (action === "logout" && req.method === "POST") {
      return json(req, { ok: true }, 200, { "Set-Cookie": "livefit_owner_session=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0" });
    }

    if (!(await verifySession(req))) return json(req, { error: "Unauthorized" }, 401);

    const db = supabaseAdmin();

    if (action === "update-lead" && req.method === "PATCH") {
      const body = await req.json();
      const allowed: Record<string, unknown> = {};
      if (typeof body.lead_status === "string") allowed.lead_status = body.lead_status;
      if (typeof body.notes === "string") allowed.notes = body.notes;
      if (!Object.keys(allowed).length) return json(req, { error: "No valid fields supplied." }, 400);
      const { data, error } = await db.from("leads").update(allowed).eq("id", body.id).select("*").single();
      if (error) return json(req, { error: error.message }, 400);
      return json(req, { lead: data });
    }

    const [leadResult, eventResult] = await Promise.all([
      db.from("leads").select("*").order("created_at", { ascending: false }),
      db.from("lead_events").select("*").order("created_at", { ascending: false }).limit(2000),
    ]);
    if (leadResult.error) return json(req, { error: leadResult.error.message }, 500);
    if (eventResult.error) return json(req, { error: eventResult.error.message }, 500);
    return json(req, { leads: leadResult.data || [], events: eventResult.data || [] });
  } catch (error) {
    return json(req, { error: error instanceof Error ? error.message : "Unexpected server error." }, 500);
  }
});
