-- Allow authenticated LiveFit owners to read/update lead data while keeping it private.
-- Anonymous/public clients retain no table-level access.
grant select, update on table public.leads to authenticated;
grant select on table public.lead_events to authenticated;
grant select on table public.owner_users to authenticated;

-- Ensure event data remains owner-only at the RLS layer.
drop policy if exists "Owners can read events" on public.lead_events;
create policy "Owners can read events" on public.lead_events
  for select to authenticated
  using (public.is_livefit_owner());

-- Explicitly deny anonymous table access.
revoke all on table public.leads from anon;
revoke all on table public.lead_events from anon;
revoke all on table public.owner_users from anon;
