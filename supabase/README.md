# LiveFit Lead Tracking Setup

1. Create or connect a Supabase project.
2. Run `migrations/20260909000000_livefit_lead_tracking.sql` in the Supabase SQL Editor.
3. In Supabase Authentication, create the private owner user with email/password. Do not enable public sign-up for this owner portal.
4. Copy that user's UUID and run:

```sql
insert into public.owner_users (user_id) values ('OWNER_USER_UUID');
```

5. Add these frontend environment variables in Lovable/Vite:

```text
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use only the Supabase anon/publishable key in the browser. Never put a service-role key in frontend code.

The public website can insert leads and click events, but RLS prevents public reads. Only a user listed in `owner_users` can read/update leads and read event data.
