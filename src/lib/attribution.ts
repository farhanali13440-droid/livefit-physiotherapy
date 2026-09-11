export type Attribution = {
  source: string | null;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
};

const STORAGE_KEY = "livefit_attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const EMPTY: Attribution = {
  source: null,
  landing_page: null,
  referrer: null,
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
  utm_term: null,
  gclid: null,
  fbclid: null,
};

function stored(): Partial<Attribution> | null {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function classify(utmSource: string | null, gclid: string | null, fbclid: string | null, referrer: string | null): string {
  const s = utmSource?.toLowerCase() || null;
  if (gclid || (s && ["google", "googleads", "google-ads", "adwords"].includes(s))) return "Google Ads";
  if (fbclid || (s && ["meta", "facebook", "instagram", "fb", "ig"].includes(s))) return "Meta Ads";
  let host = "";
  try {
    host = referrer ? new URL(referrer).hostname.toLowerCase() : "";
  } catch {
    host = "";
  }
  if (/facebook\.com|instagram\.com/.test(host)) return "Meta Ads";
  if (host.includes("google.")) return "Organic";
  if (s) return s;
  if (!referrer) return "Direct";
  return "Other";
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return { ...EMPTY };
  const params = new URLSearchParams(window.location.search);
  const prev = stored();
  const pick = (key: (typeof UTM_KEYS)[number]) => params.get(key) || prev?.[key] || null;
  const gclid = params.get("gclid") || prev?.gclid || null;
  const fbclid = params.get("fbclid") || prev?.fbclid || null;
  const referrer = prev?.referrer || document.referrer || null;
  const attribution: Attribution = {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_content: pick("utm_content"),
    utm_term: pick("utm_term"),
    gclid,
    fbclid,
    referrer,
    landing_page: prev?.landing_page || `${window.location.origin}${window.location.pathname}`,
    source: null,
  };
  attribution.source = classify(attribution.utm_source, gclid, fbclid, referrer);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    /* storage unavailable */
  }
  return attribution;
}

export function captureInitialAttribution() {
  if (typeof window !== "undefined") getAttribution();
}
