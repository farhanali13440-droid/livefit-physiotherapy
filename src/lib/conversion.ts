declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_SEND_TO = "AW-18406446829/eDAcCKz_7egcEO2t8MhE";

function fireGoogleAds() {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: GOOGLE_ADS_SEND_TO });
}

function fireMeta(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

/** Phone CTA click (tel:+923323337337). Fires once per click. */
export function trackPhoneConversion() {
  fireGoogleAds();
  fireMeta("Contact", { content_name: "phone_call" });
}

/** Booking request submitted / booking CTA completed. */
export function trackBookingConversion() {
  fireGoogleAds();
  fireMeta("Lead", { content_name: "physiotherapy_consultation", value: 1499, currency: "PKR" });
}
