-- Keep the existing lead-tracking tables and add the conversion events used by the website.
alter table public.lead_events drop constraint if exists lead_events_event_type_check;
alter table public.lead_events add constraint lead_events_event_type_check check (
  event_type in ('call_click','whatsapp_click','assessment_form_submit','booking_cta_click')
);

create index if not exists lead_events_page_idx on public.lead_events(page);
create index if not exists lead_events_cta_location_idx on public.lead_events(cta_location);
