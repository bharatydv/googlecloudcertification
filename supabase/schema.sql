-- GCP Prep — Supabase schema.
--
-- Run once against a new project: Supabase dashboard → SQL Editor → paste →
-- Run. Safe to re-run; every statement is idempotent.
--
-- There is no profiles table on purpose. The only profile field this site has
-- is a display name, and Supabase already stores that on the user record as
-- `raw_user_meta_data.full_name`, written at sign-up and by the account page.
-- A table would add a trigger, a policy and a join for one string.

-- ---------------------------------------------------------------------------
-- Synced study progress
--
-- One row per user holding the whole ProgressState as JSON — roadmap steps,
-- read topics, bookmarks, attempt history and active days. It is stored as a
-- single document rather than normalised into tables because it is only ever
-- read and written whole, by one user, as one object: the client merges local
-- and remote copies in `lib/progress-state.ts` and writes the result back.
-- Normalising it would buy queryability nobody needs and cost a migration
-- every time a field is added to the shape.
-- ---------------------------------------------------------------------------

create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.progress is
  'Per-user study progress, mirrored from the browser. Shape: src/lib/progress-state.ts ProgressState.';

-- Row level security is the only thing standing between one learner's
-- progress and another's: the app talks to Supabase with the anon key and the
-- caller's own JWT, never a service-role key, so these policies are enforced
-- on every single query this application makes.
alter table public.progress enable row level security;

drop policy if exists "Users read own progress" on public.progress;
create policy "Users read own progress"
  on public.progress for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Users insert own progress" on public.progress;
create policy "Users insert own progress"
  on public.progress for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users update own progress" on public.progress;
create policy "Users update own progress"
  on public.progress for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users delete own progress" on public.progress;
create policy "Users delete own progress"
  on public.progress for delete
  using ((select auth.uid()) = user_id);

-- Keep updated_at honest even if a row is ever touched outside the app.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists progress_touch_updated_at on public.progress;
create trigger progress_touch_updated_at
  before update on public.progress
  for each row execute function public.touch_updated_at();
