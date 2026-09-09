create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  contact_method text not null default 'Not Contacted',
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  landing_page text,
  referrer text,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('call_click','whatsapp_click')),
  page text not null,
  cta_location text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  landing_page text,
  referrer text,
  created_at timestamptz not null default now()
);

create table if not exists public.owner_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
alter table public.lead_events enable row level security;
alter table public.owner_users enable row level security;

create or replace function public.is_livefit_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.owner_users where user_id = auth.uid());
$$;

revoke all on function public.is_livefit_owner() from public;
grant execute on function public.is_livefit_owner() to anon, authenticated;

 drop policy if exists "Public can create leads" on public.leads;
create policy "Public can create leads" on public.leads for insert to anon, authenticated with check (true);

 drop policy if exists "Owners can read leads" on public.leads;
create policy "Owners can read leads" on public.leads for select to authenticated using (public.is_livefit_owner());

 drop policy if exists "Owners can update leads" on public.leads;
create policy "Owners can update leads" on public.leads for update to authenticated using (public.is_livefit_owner()) with check (public.is_livefit_owner());

 drop policy if exists "Public can create events" on public.lead_events;
create policy "Public can create events" on public.lead_events for insert to anon, authenticated with check (true);

 drop policy if exists "Owners can read events" on public.lead_events;
create policy "Owners can read events" on public.lead_events for select to authenticated using (public.is_livefit_owner());

 drop policy if exists "Owners can read owner users" on public.owner_users;
create policy "Owners can read owner users" on public.owner_users for select to authenticated using (user_id = auth.uid());

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists lead_events_created_at_idx on public.lead_events(created_at desc);
create index if not exists lead_events_type_idx on public.lead_events(event_type);
