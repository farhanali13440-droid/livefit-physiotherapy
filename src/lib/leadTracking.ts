import { supabase } from "./supabase";

export type LeadEventType = "call_click" | "whatsapp_click";
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type Attribution = Record<(typeof ATTRIBUTION_KEYS)[number], string | null> & { landing_page: string; referrer: string | null; source: string | null };

function getAttribution(): Attribution {
  if (typeof window === "undefined") return { utm_source:null,utm_medium:null,utm_campaign:null,utm_content:null,utm_term:null,landing_page:"",referrer:null,source:null };
  const params = new URLSearchParams(window.location.search);
  let stored: Partial<Attribution> | null = null;
  try { stored = JSON.parse(window.localStorage.getItem("livefit_attribution") || "null"); } catch { stored = null; }
  const value = (key: (typeof ATTRIBUTION_KEYS)[number]) => params.get(key) || stored?.[key] || null;
  const utmSource = value("utm_source")?.toLowerCase() || null;
  const referrer = document.referrer || stored?.referrer || null;
  let source: string | null = null;
  if (utmSource) source = ["google","googleads","adwords"].includes(utmSource) ? "Google Ads" : ["meta","facebook","instagram"].includes(utmSource) ? "Meta Ads" : value("utm_source");
  else if (referrer && /google\./i.test(referrer)) source = "Organic";
  else if (!referrer) source = "Direct";
  const attribution = { utm_source:value("utm_source"),utm_medium:value("utm_medium"),utm_campaign:value("utm_campaign"),utm_content:value("utm_content"),utm_term:value("utm_term"),landing_page:stored?.landing_page || `${window.location.origin}${window.location.pathname}`,referrer,source };
  window.localStorage.setItem("livefit_attribution", JSON.stringify(attribution));
  return attribution;
}

export async function trackLeadEvent(eventType: LeadEventType, page: string, ctaLocation: string) {
  if (!supabase) return;
  const attribution = getAttribution();
  void supabase.from("lead_events").insert({ event_type:eventType, page, cta_location:ctaLocation, ...attribution });
}

export async function createLead(input: { name:string; phone:string; email:string }) {
  if (!supabase) throw new Error("Lead tracking is not configured yet.");
  const attribution = getAttribution();
  const { error } = await supabase.from("leads").insert({ name:input.name.trim(), phone:input.phone.trim(), email:input.email.trim().toLowerCase(), contact_method:"Not Contacted", ...attribution });
  if (error) throw error;
}

export function captureInitialAttribution() { if (typeof window !== "undefined") getAttribution(); }
