alter table public.leads
  add column if not exists notes text not null default '';

alter table public.leads
  drop constraint if exists leads_lead_status_check;

alter table public.leads
  add constraint leads_lead_status_check
  check (lead_status in ('New','Contacted','Assessment Booked','Completed','No Response','Cancelled'));

update public.leads
set lead_status = 'New'
where lead_status is null
   or lead_status not in ('New','Contacted','Assessment Booked','Completed','No Response','Cancelled');

revoke all on table public.leads from anon;
revoke all on table public.leads from authenticated;

create policy "Owners can update lead records" on public.leads
  for update to authenticated
  using (public.is_livefit_owner())
  with check (public.is_livefit_owner());

create index if not exists leads_status_idx on public.leads(lead_status);
create index if not exists leads_created_at_source_idx on public.leads(created_at desc, source);
