-- First-party event tracking, multi-tenant via the `site` column.
--
-- Access model: RLS is ON and there are deliberately NO policies, so neither
-- the anon key nor an authenticated user can read or write this table. The only
-- writer is the /api/e route handler, which uses the service role key
-- (service role bypasses RLS) from the server.

create table if not exists public.events (
  id            bigint generated always as identity primary key,
  site          text not null,
  event_name    text not null,
  target        text,
  path          text,
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  session_id    text not null,
  country       text,
  created_at    timestamptz not null default now()
);

create index if not exists events_site_created_at_idx
  on public.events (site, created_at desc);

create index if not exists events_site_event_created_at_idx
  on public.events (site, event_name, created_at desc);

alter table public.events enable row level security;

-- Belt and braces: even though RLS blocks them, don't hand out table grants.
revoke all on table public.events from anon, authenticated;
