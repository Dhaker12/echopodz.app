-- EchoPodz data model v1. Paste into Supabase > SQL Editor and run once.
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique, avatar_url text, created_at timestamptz default now()
);
create table action_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null, category text not null,
  unit_label text, co2_g_per_unit numeric  -- null until the methodology is validated
);
create table challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null, description text, partner_name text,
  starts_at timestamptz, ends_at timestamptz, target_actions int
);
create table actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles on delete cascade,
  template_id uuid references action_templates,
  challenge_id uuid references challenges,
  title text not null, category text, note text, photo_url text,
  parent_action_id uuid references actions,   -- set = this is an Echo
  root_action_id uuid references actions,     -- the original action of the chain
  created_at timestamptz default now()
);
create table challenge_participants (
  challenge_id uuid references challenges, user_id uuid references profiles,
  joined_at timestamptz default now(), primary key (challenge_id, user_id)
);
create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null, starts_at timestamptz, location text, organizer text
);

create function set_root() returns trigger language plpgsql as $$
begin
  if new.parent_action_id is not null then
    select coalesce(root_action_id, id) into new.root_action_id
    from actions where id = new.parent_action_id;
  end if;
  return new;
end $$;
create trigger actions_root before insert on actions
  for each row execute function set_root();

alter table profiles enable row level security;
alter table actions enable row level security;
alter table challenge_participants enable row level security;
alter table action_templates enable row level security;
alter table challenges enable row level security;
alter table events enable row level security;
create policy "read all" on profiles for select using (true);
create policy "own profile" on profiles for all using (auth.uid() = id);
create policy "read actions" on actions for select using (true);
create policy "insert own" on actions for insert with check (auth.uid() = user_id);
create policy "own joins" on challenge_participants for all using (auth.uid() = user_id);
create policy "read joins" on challenge_participants for select using (true);
create policy "read templates" on action_templates for select using (true);
create policy "read challenges" on challenges for select using (true);
create policy "read events" on events for select using (true);
