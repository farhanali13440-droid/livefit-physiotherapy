import { supabase } from "./supabase";

export type LeadEventType = "call_click" | "whatsapp_click" | "assessment_form_submit" | "booking_cta_click";
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type Attribution = Record<(typeof ATTRIBUTION_KEYS)[number], string | null> & { landing_page: string; referrer: string | null; source: string | null };

function getAttribution(): Attribution {
  if (typeof window === "undefined") return { utm_source:null,utm_medium:null,utm_campaign:null,utm_content:null,utm_term:null,landing_page:"",referrer:null,source:null };
  const params = new URLSearchParams(window.location.search);
  let stored: Partial<Attribution> | null = null;
  try { stored = JSON.parse(window.localStorage.getItem("livefit_attribution") || "null"); } catch { stored = null; }
  const value = (key: (typeof ATTRIBUTION_KEYS)[number]) => params.get(key) || stored?.[key] || null;
  const utmSource = value("utm_source")?.toLowerCase() || null;
  const gclid = params.get("gclid") || stored?.utm_content || null;
  const fbclid = params.get("fbclid");
  const referrer = document.referrer || stored?.referrer || null;
  const referrerHost = (() => { try { return referrer ? new URL(referrer).hostname.toLowerCase() : ""; } catch { return ""; } })();
  let source: string | null = null;
  if (utmSource) source = ["google","googleads","adwords"].includes(utmSource) ? "Google Ads" : ["meta","facebook","instagram"].includes(utmSource) ? "Meta Ads" : value("utm_source");
  else if (params.get("gclid") || gclid && referrerHost.includes("google")) source = "Google Ads";
  else if (fbclid || /facebook\.com|instagram\.com/i.test(referrerHost)) source = "Meta Ads";
  else if (referrerHost.includes("google.")) source = "Organic";
  else if (!referrer) source = "Direct";
  const attribution = { utm_source:value("utm_source"),utm_medium:value("utm_medium"),utm_campaign:value("utm_campaign"),utm_content:value("utm_content"),utm_term:value("utm_term"),landing_page:stored?.landing_page || `${window.location.origin}${window.location.pathname}`,referrer,source };
  window.localStorage.setItem("livefit_attribution", JSON.stringify(attribution));
  return attribution;
}

export async function trackLeadEvent(eventType: LeadEventType, page: string, ctaLocation: string) {
  if (!supabase) return;
  const attribution = getAttribution();
  await supabase.from("lead_events").insert({ event_type:eventType, page, cta_location:ctaLocation, ...attribution });
}

export async function createLead(input: { name:string; phone:string; email:string }) {
  if (!supabase) throw new Error("Lead tracking is not configured yet.");
  const attribution = getAttribution();
  const phone = input.phone.trim().replace(/[^\d+]/g, "");
  const email = input.email.trim().toLowerCase();
  const recentCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: existing } = await supabase.from("leads").select("id").or(`phone.eq.${phone},email.eq.${email}`).gte("created_at", recentCutoff).limit(1);
  if (existing?.length) return existing[0];
  const { data, error } = await supabase.from("leads").insert({ name:input.name.trim(), phone, email, contact_method:"Not Contacted", ...attribution }).select("id").single();
  if (error) throw error;
  return data;
}

export function captureInitialAttribution() { if (typeof window !== "undefined") getAttribution(); }
