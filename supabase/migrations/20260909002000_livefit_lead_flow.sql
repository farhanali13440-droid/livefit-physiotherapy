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

alter table public.leads alter column email drop not null;
alter table public.leads add column if not exists lead_status text not null default 'New', add column if not exists lead_created boolean not null default true, add column if not exists gclid text, add column if not exists fbclid text;
alter table public.leads alter column contact_method set default 'Not Selected';

alter table public.lead_events add column if not exists lead_id uuid references public.leads(id) on delete set null, add column if not exists contact_method text, add column if not exists gclid text, add column if not exists fbclid text, add column if not exists event_data jsonb not null default '{}'::jsonb;
alter table public.lead_events drop constraint if exists lead_events_event_type_check;
alter table public.lead_events add constraint lead_events_event_type_check check (event_type in ('assessment_cta_click','assessment_form_view','assessment_form_submit','contact_method_selected','call_click','whatsapp_click','call_click_direct','whatsapp_click_direct','booking_cta_click'));

create index if not exists leads_source_idx on public.leads(source);
create index if not exists leads_contact_method_idx on public.leads(contact_method);
create index if not exists leads_utm_campaign_idx on public.leads(utm_campaign);
create index if not exists lead_events_lead_id_idx on public.lead_events(lead_id);

drop policy if exists "Public can create leads" on public.leads;

create or replace function public.create_livefit_lead(
  p_name text,
  p_phone text,
  p_email text default null,
  p_contact_method text default 'Not Selected',
  p_source text default null,
  p_utm_source text default null,
  p_utm_medium text default null,
  p_utm_campaign text default null,
  p_utm_content text default null,
  p_utm_term text default null,
  p_landing_page text default null,
  p_referrer text default null,
  p_gclid text default null,
  p_fbclid text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_phone text := regexp_replace(trim(coalesce(p_phone, '')), '[^0-9+]', '', 'g');
  v_email text := nullif(lower(trim(coalesce(p_email, ''))), '');
  v_existing uuid;
  v_id uuid;
begin
  if nullif(trim(coalesce(p_name, '')), '') is null then raise exception 'Name is required'; end if;
  if v_phone = '' then raise exception 'Phone number is required'; end if;
  select id into v_existing from public.leads where created_at >= now() - interval '24 hours' and (phone = v_phone or (v_email is not null and email = v_email)) order by created_at desc limit 1;
  if v_existing is not null then return v_existing; end if;
  insert into public.leads (name,phone,email,contact_method,source,utm_source,utm_medium,utm_campaign,utm_content,utm_term,landing_page,referrer,gclid,fbclid,lead_status,lead_created)
  values (trim(p_name),v_phone,v_email,case when p_contact_method in ('Call','WhatsApp') then p_contact_method else 'Not Selected' end,p_source,p_utm_source,p_utm_medium,p_utm_campaign,p_utm_content,p_utm_term,p_landing_page,p_referrer,p_gclid,p_fbclid,'New',true)
  returning id into v_id;
  return v_id;
end;
$$;
revoke all on function public.create_livefit_lead(text,text,text,text,text,text,text,text,text,text,text,text,text,text) from public;
grant execute on function public.create_livefit_lead(text,text,text,text,text,text,text,text,text,text,text,text,text,text) to anon, authenticated;

create or replace function public.update_livefit_lead_contact_method(p_lead_id uuid,p_contact_method text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_contact_method not in ('Not Selected','Call','WhatsApp') then raise exception 'Invalid contact method'; end if;
  update public.leads set contact_method=p_contact_method where id=p_lead_id;
  return found;
end;
$$;
revoke all on function public.update_livefit_lead_contact_method(uuid,text) from public;
grant execute on function public.update_livefit_lead_contact_method(uuid,text) to anon, authenticated;
