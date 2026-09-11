CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  source text,
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  gclid text,
  fbclid text,
  contact_method text NOT NULL DEFAULT 'Not Selected',
  status text NOT NULL DEFAULT 'New',
  notes text
);

CREATE TABLE public.cta_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  event_type text NOT NULL,
  page text,
  cta_location text,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  contact_method text,
  source text,
  campaign text,
  landing_page text
);

CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX cta_events_created_at_idx ON public.cta_events (created_at DESC);

GRANT ALL ON public.leads TO service_role;
GRANT ALL ON public.cta_events TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cta_events ENABLE ROW LEVEL SECURITY;