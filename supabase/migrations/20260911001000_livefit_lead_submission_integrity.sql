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
  v_id uuid;
  v_token uuid;
begin
  if nullif(trim(coalesce(p_name, '')), '') is null then raise exception 'Name is required'; end if;
  if v_phone = '' then raise exception 'Phone number is required'; end if;

  insert into public.leads (
    name, phone, email, contact_method, source,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    landing_page, referrer, gclid, fbclid, lead_status, lead_created, contact_update_token
  )
  values (
    trim(p_name), v_phone, v_email,
    case when p_contact_method in ('Call','WhatsApp') then p_contact_method else 'Not Selected' end,
    p_source, p_utm_source, p_utm_medium, p_utm_campaign, p_utm_content, p_utm_term,
    p_landing_page, p_referrer, p_gclid, p_fbclid, 'New', true, gen_random_uuid()
  )
  returning id, contact_update_token into v_id, v_token;

  return jsonb_build_object('id', v_id, 'lead_created', true, 'contact_update_token', v_token);
end;
$$;

revoke all on function public.create_livefit_lead(text,text,text,text,text,text,text,text,text,text,text,text,text,text) from public;
grant execute on function public.create_livefit_lead(text,text,text,text,text,text,text,text,text,text,text,text,text,text) to anon, authenticated;
