import { createServerFn } from "@tanstack/react-start";

export type AttributionInput = {
  source?: string | null;
  landing_page?: string | null;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
};

type SubmitLeadInput = {
  name: string;
  phone: string;
  email?: string | null;
  attribution?: AttributionInput;
};

type CtaEventInput = {
  event_type: string;
  page?: string | null;
  cta_location?: string | null;
  contact_method?: string | null;
  attribution?: AttributionInput;
};

const clean = (value: unknown, max = 300) =>
  typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: SubmitLeadInput) => {
    const name = clean(input?.name, 120);
    const phone = clean(input?.phone, 40);
    if (!name) throw new Error("Please enter your name.");
    if (!phone) throw new Error("Please enter your phone number.");
    return { name, phone, email: clean(input?.email, 160), attribution: input?.attribution ?? {} };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { leadSession } = await import("./livefit-session.server");
    const a = data.attribution;
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        source: clean(a.source, 60) ?? "Direct",
        landing_page: clean(a.landing_page, 500),
        referrer: clean(a.referrer, 500),
        utm_source: clean(a.utm_source, 120),
        utm_medium: clean(a.utm_medium, 120),
        utm_campaign: clean(a.utm_campaign, 160),
        utm_content: clean(a.utm_content, 160),
        utm_term: clean(a.utm_term, 160),
        gclid: clean(a.gclid, 300),
        fbclid: clean(a.fbclid, 300),
        contact_method: "Not Selected",
        status: "New",
      })
      .select("id")
      .single();
    if (error || !lead) throw new Error("We could not save your details right now. Please try again in a moment.");

    const session = await leadSession();
    await session.update({ leadId: lead.id as string });

    await supabaseAdmin.from("cta_events").insert({
      event_type: "assessment_form_submit",
      page: "/book-assessment",
      cta_location: "assessment_form",
      lead_id: lead.id as string,
      source: clean(a.source, 60) ?? "Direct",
      campaign: clean(a.utm_campaign, 160),
      landing_page: clean(a.landing_page, 500),
    });

    return { id: lead.id as string };
  });

export const recordCtaEvent = createServerFn({ method: "POST" })
  .inputValidator((input: CtaEventInput) => {
    const eventType = clean(input?.event_type, 60);
    if (!eventType) throw new Error("Missing event type.");
    return {
      event_type: eventType,
      page: clean(input?.page, 200),
      cta_location: clean(input?.cta_location, 120),
      contact_method: clean(input?.contact_method, 40),
      attribution: input?.attribution ?? {},
    };
  })
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { leadSession } = await import("./livefit-session.server");
      const session = await leadSession();
      const a = data.attribution;
      await supabaseAdmin.from("cta_events").insert({
        event_type: data.event_type,
        page: data.page,
        cta_location: data.cta_location,
        contact_method: data.contact_method,
        lead_id: session.data.leadId ?? null,
        source: clean(a.source, 60) ?? "Direct",
        campaign: clean(a.utm_campaign, 160),
        landing_page: clean(a.landing_page, 500),
      });
    } catch {
      /* tracking must never block a visitor action */
    }
    return { ok: true };
  });

export const setContactMethod = createServerFn({ method: "POST" })
  .inputValidator((input: { contact_method: "Call" | "WhatsApp" }) => {
    if (input?.contact_method !== "Call" && input?.contact_method !== "WhatsApp") {
      throw new Error("Invalid contact method.");
    }
    return { contact_method: input.contact_method };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { leadSession } = await import("./livefit-session.server");
    const session = await leadSession();
    const leadId = session.data.leadId;
    if (!leadId) return { ok: false as const };
    await supabaseAdmin.from("leads").update({ contact_method: data.contact_method }).eq("id", leadId);
    await supabaseAdmin.from("cta_events").insert({
      event_type: "contact_method_selected",
      page: "/book-assessment",
      cta_location: "contact_choice",
      lead_id: leadId,
      contact_method: data.contact_method,
    });
    return { ok: true as const };
  });
