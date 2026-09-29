-- YouGo core backend schema
-- Safe to apply to a NEW YouGo Supabase project. Do not apply to unrelated projects.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Ugo User',
  username text,
  avatar_url text,
  birth_date date,
  gender text not null default 'prefer-not-to-say'
    check (gender in ('female','male','other','prefer-not-to-say')),
  country text not null default 'IN',
  language text not null default 'en',
  interests text[] not null default '{}',
  level integer not null default 1 check (level >= 1),
  vip_level integer not null default 0 check (vip_level >= 0),
  svip_level integer not null default 0 check (svip_level >= 0),
  charm bigint not null default 0 check (charm >= 0),
  wealth bigint not null default 0 check (wealth >= 0),
  profile_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_unique
  on public.profiles (lower(username))
  where username is not null;

create table if not exists public.wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  diamonds bigint not null default 0 check (diamonds >= 0),
  coins bigint not null default 0 check (coins >= 0),
  event_tokens bigint not null default 0 check (event_tokens >= 0),
  free_spins integer not null default 0 check (free_spins >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('recharge','gift-send','gift-receive','reward','store-purchase')),
  currency text not null check (currency in ('diamonds','coins','event_tokens','free_spins')),
  amount bigint not null,
  status text not null default 'completed'
    check (status in ('pending','completed','failed','reversed')),
  reference_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists wallet_transactions_user_created_idx
  on public.wallet_transactions(user_id, created_at desc);

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  mode text not null default 'voice' check (mode in ('voice','video','game')),
  privacy text not null default 'public' check (privacy in ('public','private')),
  language text not null default 'en',
  level integer not null default 1 check (level >= 1),
  audience_count integer not null default 0 check (audience_count >= 0),
  announcement text,
  is_live boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists rooms_live_created_idx
  on public.rooms(is_live, created_at desc);

create table if not exists public.room_members (
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member'
    check (role in ('owner','admin','moderator','member')),
  is_muted boolean not null default false,
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create index if not exists room_members_user_idx
  on public.room_members(user_id, joined_at desc);

create table if not exists public.room_seats (
  room_id uuid not null references public.rooms(id) on delete cascade,
  seat_no smallint not null check (seat_no between 1 and 27),
  user_id uuid references auth.users(id) on delete set null,
  is_locked boolean not null default false,
  is_muted boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (room_id, seat_no),
  unique (room_id, user_id)
);

create table if not exists public.room_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  type text not null default 'text'
    check (type in ('text','system','gift','entry','announcement')),
  body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists room_messages_room_created_idx
  on public.room_messages(room_id, created_at desc);

create table if not exists public.private_conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.private_conversation_members (
  conversation_id uuid not null references public.private_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create index if not exists private_conversation_members_user_idx
  on public.private_conversation_members(user_id);

create table if not exists public.private_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.private_conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  type text not null default 'text'
    check (type in ('text','image','voice','gift','system')),
  body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists private_messages_conversation_created_idx
  on public.private_messages(conversation_id, created_at desc);

create table if not exists public.follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  following_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create table if not exists public.gifts (
  id text primary key,
  name text not null,
  diamond_cost bigint not null check (diamond_cost >= 0),
  asset_key text not null,
  category text not null default 'popular',
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.gift_events (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid references auth.users(id) on delete set null,
  room_id uuid references public.rooms(id) on delete cascade,
  gift_id text not null references public.gifts(id),
  quantity integer not null default 1 check (quantity between 1 and 999),
  diamond_total bigint not null check (diamond_total >= 0),
  created_at timestamptz not null default now()
);

create index if not exists gift_events_room_created_idx
  on public.gift_events(room_id, created_at desc);

create table if not exists public.vip_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  vip_level integer not null default 0 check (vip_level >= 0),
  vip_points bigint not null default 0 check (vip_points >= 0),
  svip_level integer not null default 0 check (svip_level >= 0),
  expires_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 60),
  level integer not null default 1 check (level >= 1),
  charm bigint not null default 0 check (charm >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.family_members (
  family_id uuid not null references public.families(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member'
    check (role in ('owner','admin','member')),
  joined_at timestamptz not null default now(),
  primary key (family_id, user_id)
);

create table if not exists public.couples (
  id uuid primary key default gen_random_uuid(),
  user_a uuid not null references auth.users(id) on delete cascade,
  user_b uuid not null references auth.users(id) on delete cascade,
  bond_level integer not null default 1 check (bond_level >= 1),
  bond_points bigint not null default 0 check (bond_points >= 0),
  started_at timestamptz not null default now(),
  check (user_a <> user_b)
);

create unique index if not exists couples_pair_unique
  on public.couples (least(user_a, user_b), greatest(user_a, user_b));

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  enabled boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  check (ends_at > starts_at)
);

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  title text not null,
  target bigint not null check (target > 0),
  reward_type text not null check (reward_type in ('coins','event_tokens','free_spins','cosmetic')),
  reward_amount bigint not null default 0 check (reward_amount >= 0),
  enabled boolean not null default true
);

create table if not exists public.mission_progress (
  mission_id uuid not null references public.missions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  progress bigint not null default 0 check (progress >= 0),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (mission_id, user_id)
);

create table if not exists public.blocks (
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reported_user_id uuid references auth.users(id) on delete set null,
  room_id uuid references public.rooms(id) on delete set null,
  reason text not null,
  details text,
  status text not null default 'open'
    check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  data jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_created_idx
  on public.notifications(user_id, created_at desc);

-- New-user bootstrap.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'Ugo User'))
  on conflict (id) do nothing;

  insert into public.wallets (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.vip_state (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Timestamp triggers.
drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists wallets_set_updated_at on public.wallets;
create trigger wallets_set_updated_at before update on public.wallets
for each row execute function public.set_updated_at();

drop trigger if exists rooms_set_updated_at on public.rooms;
create trigger rooms_set_updated_at before update on public.rooms
for each row execute function public.set_updated_at();

drop trigger if exists private_conversations_set_updated_at on public.private_conversations;
create trigger private_conversations_set_updated_at before update on public.private_conversations
for each row execute function public.set_updated_at();

drop trigger if exists vip_state_set_updated_at on public.vip_state;
create trigger vip_state_set_updated_at before update on public.vip_state
for each row execute function public.set_updated_at();

drop trigger if exists families_set_updated_at on public.families;
create trigger families_set_updated_at before update on public.families
for each row execute function public.set_updated_at();

-- RLS.
alter table public.profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.rooms enable row level security;
alter table public.room_members enable row level security;
alter table public.room_seats enable row level security;
alter table public.room_messages enable row level security;
alter table public.private_conversations enable row level security;
alter table public.private_conversation_members enable row level security;
alter table public.private_messages enable row level security;
alter table public.follows enable row level security;
alter table public.gifts enable row level security;
alter table public.gift_events enable row level security;
alter table public.vip_state enable row level security;
alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.couples enable row level security;
alter table public.events enable row level security;
alter table public.missions enable row level security;
alter table public.mission_progress enable row level security;
alter table public.blocks enable row level security;
alter table public.reports enable row level security;
alter table public.notifications enable row level security;

-- Profiles: authenticated users can discover profiles; users only modify themselves.
create policy "profiles_authenticated_read" on public.profiles
for select to authenticated using (true);
create policy "profiles_self_update" on public.profiles
for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles_self_insert" on public.profiles
for insert to authenticated with check (id = auth.uid());

-- Wallet: strictly private. Client cannot directly mutate balances.
create policy "wallet_self_read" on public.wallets
for select to authenticated using (user_id = auth.uid());
create policy "wallet_transactions_self_read" on public.wallet_transactions
for select to authenticated using (user_id = auth.uid());

-- Rooms.
create policy "rooms_authenticated_read" on public.rooms
for select to authenticated
using (
  privacy = 'public'
  or owner_id = auth.uid()
  or exists (
    select 1 from public.room_members rm
    where rm.room_id = rooms.id and rm.user_id = auth.uid()
  )
);
create policy "rooms_owner_insert" on public.rooms
for insert to authenticated with check (owner_id = auth.uid());
create policy "rooms_owner_update" on public.rooms
for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "rooms_owner_delete" on public.rooms
for delete to authenticated using (owner_id = auth.uid());

-- Membership / seats.
create policy "room_members_visible_to_room_users" on public.room_members
for select to authenticated
using (
  user_id = auth.uid()
  or exists (select 1 from public.rooms r where r.id = room_id and r.owner_id = auth.uid())
);
create policy "room_members_self_join" on public.room_members
for insert to authenticated with check (user_id = auth.uid() and role = 'member');
create policy "room_members_self_leave" on public.room_members
for delete to authenticated using (user_id = auth.uid());

create policy "room_seats_authenticated_read" on public.room_seats
for select to authenticated using (true);

-- Room chat: signed-in users can read public room chat, and send as themselves.
create policy "room_messages_authenticated_read" on public.room_messages
for select to authenticated
using (
  exists (
    select 1 from public.rooms r
    where r.id = room_id
      and (
        r.privacy = 'public'
        or r.owner_id = auth.uid()
        or exists (
          select 1 from public.room_members rm
          where rm.room_id = r.id and rm.user_id = auth.uid()
        )
      )
  )
);
create policy "room_messages_self_insert" on public.room_messages
for insert to authenticated with check (sender_id = auth.uid());

-- Private conversations/messages: members only.
create policy "private_conversations_member_read" on public.private_conversations
for select to authenticated
using (
  exists (
    select 1 from public.private_conversation_members pcm
    where pcm.conversation_id = id and pcm.user_id = auth.uid()
  )
);
create policy "conversation_members_member_read" on public.private_conversation_members
for select to authenticated
using (
  exists (
    select 1 from public.private_conversation_members mine
    where mine.conversation_id = conversation_id and mine.user_id = auth.uid()
  )
);
create policy "private_messages_member_read" on public.private_messages
for select to authenticated
using (
  exists (
    select 1 from public.private_conversation_members pcm
    where pcm.conversation_id = conversation_id and pcm.user_id = auth.uid()
  )
);
create policy "private_messages_self_insert" on public.private_messages
for insert to authenticated
with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.private_conversation_members pcm
    where pcm.conversation_id = conversation_id and pcm.user_id = auth.uid()
  )
);

-- Social.
create policy "follows_authenticated_read" on public.follows
for select to authenticated using (true);
create policy "follows_self_insert" on public.follows
for insert to authenticated with check (follower_id = auth.uid());
create policy "follows_self_delete" on public.follows
for delete to authenticated using (follower_id = auth.uid());

-- Gifts/catalog.
create policy "gifts_authenticated_read" on public.gifts
for select to authenticated using (enabled = true);
create policy "gift_events_participant_read" on public.gift_events
for select to authenticated
using (sender_id = auth.uid() or recipient_id = auth.uid());

-- VIP.
create policy "vip_self_read" on public.vip_state
for select to authenticated using (user_id = auth.uid());

-- Family and couple.
create policy "families_authenticated_read" on public.families
for select to authenticated using (true);
create policy "family_members_authenticated_read" on public.family_members
for select to authenticated using (true);
create policy "couples_participant_read" on public.couples
for select to authenticated using (user_a = auth.uid() or user_b = auth.uid());

-- Events and missions are readable by signed-in users.
create policy "events_authenticated_read" on public.events
for select to authenticated using (enabled = true);
create policy "missions_authenticated_read" on public.missions
for select to authenticated using (enabled = true);
create policy "mission_progress_self_read" on public.mission_progress
for select to authenticated using (user_id = auth.uid());

-- Safety/privacy.
create policy "blocks_self_all" on public.blocks
for all to authenticated using (blocker_id = auth.uid()) with check (blocker_id = auth.uid());
create policy "reports_self_insert" on public.reports
for insert to authenticated with check (reporter_id = auth.uid());
create policy "reports_self_read" on public.reports
for select to authenticated using (reporter_id = auth.uid());
create policy "notifications_self_read" on public.notifications
for select to authenticated using (user_id = auth.uid());
create policy "notifications_self_update" on public.notifications
for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Realtime publication for room chat and private chat.
do $$
begin
  alter publication supabase_realtime add table public.room_messages;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.private_messages;
exception when duplicate_object then null;
end $$;

-- Seed gift catalog. These are virtual in-app items.
insert into public.gifts (id, name, diamond_cost, asset_key, category)
values
  ('rose', 'Rose', 10, 'gift.rose', 'popular'),
  ('couple-heart', 'Couple Heart', 50, 'gift.couple-heart', 'couple'),
  ('supercar', 'Supercar', 500, 'gift.supercar', 'luxury'),
  ('castle', 'Castle', 1000, 'gift.castle', 'luxury')
on conflict (id) do update set
  name = excluded.name,
  diamond_cost = excluded.diamond_cost,
  asset_key = excluded.asset_key,
  category = excluded.category;
