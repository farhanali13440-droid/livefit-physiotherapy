create extension if not exists pgcrypto;

alter table public.leads add column if not exists contact_update_token uuid;

update public.leads
set contact_update_token = gen_random_uuid()
where contact_update_token is null;

alter table public.leads alter column contact_update_token set default gen_random_uuid();
create unique index if not exists leads_contact_update_token_idx on public.leads(contact_update_token);

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
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_phone text := regexp_replace(trim(coalesce(p_phone, '')), '[^0-9+]', '', 'g');
  v_email text := nullif(lower(trim(coalesce(p_email, ''))), '');
  v_existing uuid;
  v_token uuid;
  v_id uuid;
begin
  if nullif(trim(coalesce(p_name, '')), '') is null then raise exception 'Name is required'; end if;
  if v_phone = '' then raise exception 'Phone number is required'; end if;
  select id, contact_update_token into v_existing, v_token
  from public.leads
  where created_at >= now() - interval '24 hours'
    and (phone = v_phone or (v_email is not null and email = v_email))
  order by created_at desc limit 1;
  if v_existing is not null then
    if v_token is null then update public.leads set contact_update_token=gen_random_uuid() where id=v_existing returning contact_update_token into v_token; end if;
    return jsonb_build_object('id', v_existing, 'lead_created', false, 'contact_update_token', v_token);
  end if;
  insert into public.leads (name,phone,email,contact_method,source,utm_source,utm_medium,utm_campaign,utm_content,utm_term,landing_page,referrer,gclid,fbclid,lead_status,lead_created,contact_update_token)
  values (trim(p_name),v_phone,v_email,case when p_contact_method in ('Call','WhatsApp') then p_contact_method else 'Not Selected' end,p_source,p_utm_source,p_utm_medium,p_utm_campaign,p_utm_content,p_utm_term,p_landing_page,p_referrer,p_gclid,p_fbclid,'New',true,gen_random_uuid())
  returning id, contact_update_token into v_id, v_token;
  return jsonb_build_object('id', v_id, 'lead_created', true, 'contact_update_token', v_token);
end;
$$;
revoke all on function public.create_livefit_lead(text,text,text,text,text,text,text,text,text,text,text,text,text,text) from public;
grant execute on function public.create_livefit_lead(text,text,text,text,text,text,text,text,text,text,text,text,text,text) to anon, authenticated;

create or replace function public.update_livefit_lead_contact_method(p_lead_id uuid,p_contact_update_token uuid,p_contact_method text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_contact_method not in ('Not Selected','Call','WhatsApp') then raise exception 'Invalid contact method'; end if;
  update public.leads set contact_method=p_contact_method where id=p_lead_id and contact_update_token=p_contact_update_token;
  return found;
end;
$$;
revoke all on function public.update_livefit_lead_contact_method(uuid,uuid,text) from public;
grant execute on function public.update_livefit_lead_contact_method(uuid,uuid,text) to anon, authenticated;
