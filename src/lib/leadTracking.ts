import { supabase } from "./supabase";

export type LeadEventType =
  | "assessment_cta_click"
  | "assessment_form_view"
  | "assessment_form_submit"
  | "contact_method_selected"
  | "call_click"
  | "whatsapp_click"
  | "call_click_direct"
  | "whatsapp_click_direct"
  | "booking_cta_click";

const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type Attribution = Record<(typeof ATTRIBUTION_KEYS)[number], string | null> & {
  landing_page: string;
  referrer: string | null;
  source: string | null;
  gclid: string | null;
};

function getStoredAttribution(): Partial<Attribution> | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(window.localStorage.getItem("livefit_attribution") || "null"); } catch { return null; }
}

function getAttribution(): Attribution {
  if (typeof window === "undefined") return { utm_source:null,utm_medium:null,utm_campaign:null,utm_content:null,utm_term:null,landing_page:"",referrer:null,source:null,gclid:null };
  const params = new URLSearchParams(window.location.search);
  const stored = getStoredAttribution();
  const value = (key: (typeof ATTRIBUTION_KEYS)[number]) => params.get(key) || stored?.[key] || null;
  const gclid = params.get("gclid") || stored?.gclid || null;
  const utmSource = value("utm_source")?.toLowerCase() || null;
  const referrer = document.referrer || stored?.referrer || null;
  const referrerHost = (() => { try { return referrer ? new URL(referrer).hostname.toLowerCase() : ""; } catch { return ""; } })();
  let source: string | null = null;
  if (utmSource) source = ["google","googleads","adwords"].includes(utmSource) ? "Google Ads" : ["meta","facebook","instagram"].includes(utmSource) ? "Meta Ads" : utmSource;
  else if (gclid) source = "Google Ads";
  else if (params.get("fbclid") || /facebook\.com|instagram\.com/i.test(referrerHost)) source = "Meta Ads";
  else if (referrerHost.includes("google.")) source = "Organic";
  else if (!referrer) source = "Direct";
  else source = "Other";
  const attribution: Attribution = { utm_source:value("utm_source"),utm_medium:value("utm_medium"),utm_campaign:value("utm_campaign"),utm_content:value("utm_content"),utm_term:value("utm_term"),gclid,landing_page:stored?.landing_page || `${window.location.origin}${window.location.pathname}`,referrer,source };
  window.localStorage.setItem("livefit_attribution", JSON.stringify(attribution));
  return attribution;
}

export async function trackLeadEvent(eventType: LeadEventType,page:string,ctaLocation:string,options?:{leadId?:string|null;contactMethod?:"call"|"whatsapp";eventData?:Record<string,unknown>}) {
  if (!supabase) return;
  const attribution = getAttribution();
  const inferredContact = options?.contactMethod || (typeof options?.eventData?.contactMethod === "string" ? options.eventData.contactMethod as "call"|"whatsapp" : null);
  const { error } = await supabase.from("lead_events").insert({event_type:eventType,page,cta_location:ctaLocation,lead_id:options?.leadId||null,contact_method:inferredContact,event_data:options?.eventData||{},...attribution});
  if (error) console.error("LiveFit lead event tracking failed", error);
}

export async function createLead(input:{name:string;phone:string;email?:string|null}) {
  if (!supabase) throw new Error("Lead tracking is not configured yet.");
  const attribution = getAttribution();
  const { data,error } = await supabase.rpc("create_livefit_lead",{p_name:input.name.trim(),p_phone:input.phone.trim(),p_email:input.email?.trim()||null,p_contact_method:"Not Selected",p_source:attribution.source,p_utm_source:attribution.utm_source,p_utm_medium:attribution.utm_medium,p_utm_campaign:attribution.utm_campaign,p_utm_content:attribution.utm_content,p_utm_term:attribution.utm_term,p_landing_page:attribution.landing_page,p_referrer:attribution.referrer,p_gclid:attribution.gclid});
  if (error) throw error;
  if (!data) throw new Error("The lead could not be saved. Please try again.");
  return {id:String(data),lead_created:true};
}

export async function updateLeadContactMethod(leadId:string,contactMethod:"Call"|"WhatsApp") {
  if (!supabase) throw new Error("Lead tracking is not configured yet.");
  const {data,error}=await supabase.rpc("update_livefit_lead_contact_method",{p_lead_id:leadId,p_contact_method:contactMethod});
  if(error) throw error;
  if(!data) throw new Error("This lead could not be updated. Please try again.");
}

export function captureInitialAttribution(){if(typeof window!=="undefined")getAttribution();}
