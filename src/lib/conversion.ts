declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fire the Google Ads Website Lead conversion for a phone call CTA click.
 * Safe to attach to any tel:+923323337337 link; does nothing if gtag is not loaded.
 */
export function trackPhoneConversion() {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: "AW-18406446829/eDAcCKz_7egcEO2t8MhE",
  });
}
