import { getAttribution } from "./attribution";
import { recordCtaEvent } from "./leads.functions";

export type CtaEventType =
  | "assessment_cta_click"
  | "assessment_form_view"
  | "assessment_form_submit"
  | "call_click"
  | "whatsapp_click"
  | "contact_method_selected";

export async function trackCta(
  eventType: CtaEventType,
  page: string,
  ctaLocation: string,
  contactMethod?: string,
) {
  try {
    await recordCtaEvent({
      data: {
        event_type: eventType,
        page,
        cta_location: ctaLocation,
        contact_method: contactMethod ?? null,
        attribution: getAttribution(),
      },
    });
  } catch {
    /* never block the visitor */
  }
}
