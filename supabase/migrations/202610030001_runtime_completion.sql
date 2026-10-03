-- Ugo runtime completion: social feed, profile visits, check-ins,
-- store/inventory, room seats/tools and PK/game state.

insert into public.gifts (id,name,diamond_cost,asset_key,category,enabled)
values
  ('ice-cream','Ice Cream',100,'ice-cream','popular',true),
  ('rocket','Rocket',5000,'rocket','event',true),
  ('crown','Crown',8888,'crown','luxury',true),
  ('galaxy','Galaxy',12999,'galaxy','event',true)
on conflict (id) do update
set name=excluded.name,
    diamond_cost=excluded.diamond_cost,
    asset_key=excluded.asset_key,
    category=excluded.category,
    enabled=excluded.enabled;

create table if not exists public.profile_visits (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid not null references auth.users(id) on delete cascade,
  visited_at timestamptz not null default now(),
  check (visitor_id <> profile_id)
);

create index if not exists profile_visits_profile_time_idx
  on public.profile_visits(profile_id, visited_at desc);

alter table public.profile_visits enable row level security;

drop policy if exists profile_visits_owner_read on public.profile_visits;
create policy profile_visits_owner_read on public.profile_visits
for select to authenticated
using (profile_id = (select auth.uid()) or visitor_id = (select auth.uid()));

drop policy if exists profile_visits_self_insert on public.profile_visits;
create policy profile_visits_self_insert on public.profile_visits
for insert to authenticated
with check (visitor_id = (select auth.uid()));

create table if not exists public.moments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null default 'status'
    check (kind in ('status','photo','video')),
  body text,
  media_url text,
  likes_count integer not null default 0 check (likes_count >= 0),
  comments_count integer not null default 0 check (comments_count >= 0),
  created_at timestamptz not null default now(),
  check (body is not null or media_url is not null)
);

create index if not exists moments_created_idx on public.moments(created_at desc);
create index if not exists moments_user_created_idx on public.moments(user_id,created_at desc);

alter table public.moments enable row level security;

drop policy if exists moments_read on public.moments;
create policy moments_read on public.moments
for select to authenticated using (true);

drop policy if exists moments_self_insert on public.moments;
create policy moments_self_insert on public.moments
for insert to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists moments_self_update on public.moments;
create policy moments_self_update on public.moments
for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists moments_self_delete on public.moments;
create policy moments_self_delete on public.moments
for delete to authenticated
using (user_id = (select auth.uid()));

create table if not exists public.moment_likes (
  moment_id uuid not null references public.moments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (moment_id,user_id)
);

alter table public.moment_likes enable row level security;

drop policy if exists moment_likes_read on public.moment_likes;
create policy moment_likes_read on public.moment_likes
for select to authenticated using (true);

drop policy if exists moment_likes_self_insert on public.moment_likes;
create policy moment_likes_self_insert on public.moment_likes
for insert to authenticated with check (user_id = (select auth.uid()));

drop policy if exists moment_likes_self_delete on public.moment_likes;
create policy moment_likes_self_delete on public.moment_likes
for delete to authenticated using (user_id = (select auth.uid()));

create or replace function public.toggle_moment_like(p_moment_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_liked boolean;
  v_count integer;
begin
  if v_user is null then
    raise exception 'Authentication required';
  end if;

  if exists (
    select 1 from public.moment_likes
    where moment_id=p_moment_id and user_id=v_user
  ) then
    delete from public.moment_likes where moment_id=p_moment_id and user_id=v_user;
    update public.moments
      set likes_count=greatest(likes_count-1,0)
      where id=p_moment_id
      returning likes_count into v_count;
    v_liked := false;
  else
    insert into public.moment_likes(moment_id,user_id) values(p_moment_id,v_user);
    update public.moments
      set likes_count=likes_count+1
      where id=p_moment_id
      returning likes_count into v_count;
    v_liked := true;
  end if;

  return jsonb_build_object('liked',v_liked,'likes_count',coalesce(v_count,0));
end;
$$;

revoke all on function public.toggle_moment_like(uuid) from public;
grant execute on function public.toggle_moment_like(uuid) to authenticated;

create table if not exists public.daily_checkins (
  user_id uuid not null references auth.users(id) on delete cascade,
  checkin_date date not null default current_date,
  streak integer not null default 1 check (streak >= 1),
  reward_type text not null default 'coins'
    check (reward_type in ('coins','event_tokens','free_spins')),
  reward_amount bigint not null default 0 check (reward_amount >= 0),
  created_at timestamptz not null default now(),
  primary key(user_id,checkin_date)
);

alter table public.daily_checkins enable row level security;

drop policy if exists daily_checkins_self_read on public.daily_checkins;
create policy daily_checkins_self_read on public.daily_checkins
for select to authenticated using (user_id=(select auth.uid()));

create or replace function public.claim_daily_checkin()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_yesterday_streak integer := 0;
  v_streak integer := 1;
  v_reward bigint;
begin
  if v_user is null then
    raise exception 'Authentication required';
  end if;

  if exists (
    select 1 from public.daily_checkins
    where user_id=v_user and checkin_date=current_date
  ) then
    select streak,reward_amount into v_streak,v_reward
    from public.daily_checkins
    where user_id=v_user and checkin_date=current_date;
    return jsonb_build_object('already_claimed',true,'streak',v_streak,'reward_amount',v_reward);
  end if;

  select streak into v_yesterday_streak
  from public.daily_checkins
  where user_id=v_user and checkin_date=current_date-1;

  if found then v_streak := v_yesterday_streak+1; end if;
  v_reward := least(50 + ((v_streak-1)*10), 200);

  insert into public.daily_checkins(user_id,checkin_date,streak,reward_type,reward_amount)
  values(v_user,current_date,v_streak,'coins',v_reward);

  update public.wallets
  set coins=coins+v_reward, updated_at=now()
  where user_id=v_user;

  insert into public.wallet_transactions(user_id,type,currency,amount,metadata)
  values(v_user,'reward','coins',v_reward,jsonb_build_object('source','daily_checkin','streak',v_streak));

  return jsonb_build_object('already_claimed',false,'streak',v_streak,'reward_amount',v_reward);
end;
$$;

revoke all on function public.claim_daily_checkin() from public;
grant execute on function public.claim_daily_checkin() to authenticated;

create table if not exists public.achievements (
  id text primary key,
  title text not null,
  description text not null,
  icon text not null default '🏆',
  enabled boolean not null default true
);

create table if not exists public.user_achievements (
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key(user_id,achievement_id)
);

alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;

drop policy if exists achievements_read on public.achievements;
create policy achievements_read on public.achievements
for select to authenticated using (enabled);

drop policy if exists user_achievements_read on public.user_achievements;
create policy user_achievements_read on public.user_achievements
for select to authenticated using (true);

insert into public.achievements(id,title,description,icon)
values
 ('first-room','First Room','Join your first Ugo room','🎙'),
 ('first-gift','First Gift','Send your first gift','🎁'),
 ('social-10','Social Spark','Follow 10 people','✨'),
 ('host-10h','Room Regular','Host 10 room hours','🏆')
on conflict(id) do nothing;

create table if not exists public.store_items (
  id text primary key,
  name text not null,
  category text not null check (category in ('frame','vehicle','bubble','entry_effect','badge','theme')),
  currency text not null check (currency in ('diamonds','coins')),
  price bigint not null check (price >= 0),
  asset_key text not null,
  enabled boolean not null default true,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.user_inventory (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null references public.store_items(id) on delete cascade,
  quantity integer not null default 1 check (quantity >= 1),
  equipped boolean not null default false,
  acquired_at timestamptz not null default now(),
  primary key(user_id,item_id)
);

alter table public.store_items enable row level security;
alter table public.user_inventory enable row level security;

drop policy if exists store_items_read on public.store_items;
create policy store_items_read on public.store_items
for select to authenticated using (enabled);

drop policy if exists inventory_self_read on public.user_inventory;
create policy inventory_self_read on public.user_inventory
for select to authenticated using (user_id=(select auth.uid()));

insert into public.store_items(id,name,category,currency,price,asset_key,metadata)
values
 ('royal-frame','Royal Halo','frame','diamonds',800,'royal-frame','{"rarity":"epic"}'),
 ('neon-ride','Neon Ride','vehicle','diamonds',1500,'neon-ride','{"rarity":"epic"}'),
 ('gold-bubble','Gold Chat Bubble','bubble','coins',5000,'gold-bubble','{"rarity":"rare"}'),
 ('galaxy-entry','Galaxy Entry','entry_effect','diamonds',2200,'galaxy-entry','{"rarity":"legendary"}'),
 ('star-badge','Star Badge','badge','coins',2500,'star-badge','{"rarity":"rare"}'),
 ('midnight-theme','Midnight Room Theme','theme','diamonds',1800,'midnight-theme','{"rarity":"epic"}')
on conflict(id) do update set
  name=excluded.name,category=excluded.category,currency=excluded.currency,
  price=excluded.price,asset_key=excluded.asset_key,enabled=true,metadata=excluded.metadata;

create or replace function public.buy_store_item(p_item_id text)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user uuid := auth.uid();
  v_item public.store_items%rowtype;
  v_balance bigint;
begin
  if v_user is null then raise exception 'Authentication required'; end if;

  select * into v_item from public.store_items where id=p_item_id and enabled=true;
  if not found then raise exception 'Store item not found'; end if;

  if exists(select 1 from public.user_inventory where user_id=v_user and item_id=p_item_id) then
    return jsonb_build_object('owned',true,'item_id',p_item_id);
  end if;

  if v_item.currency='diamonds' then
    select diamonds into v_balance from public.wallets where user_id=v_user for update;
    if coalesce(v_balance,0) < v_item.price then raise exception 'Not enough diamonds'; end if;
    update public.wallets set diamonds=diamonds-v_item.price,updated_at=now() where user_id=v_user;
  else
    select coins into v_balance from public.wallets where user_id=v_user for update;
    if coalesce(v_balance,0) < v_item.price then raise exception 'Not enough coins'; end if;
    update public.wallets set coins=coins-v_item.price,updated_at=now() where user_id=v_user;
  end if;

  insert into public.user_inventory(user_id,item_id) values(v_user,p_item_id);
  insert into public.wallet_transactions(user_id,type,currency,amount,reference_id,metadata)
  values(v_user,'store-purchase',v_item.currency,-v_item.price,p_item_id,jsonb_build_object('item',v_item.name));

  return jsonb_build_object('owned',true,'item_id',p_item_id,'currency',v_item.currency,'price',v_item.price);
end;
$$;

revoke all on function public.buy_store_item(text) from public;
grant execute on function public.buy_store_item(text) to authenticated;

create or replace function public.equip_store_item(p_item_id text)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user uuid := auth.uid();
  v_category text;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  select category into v_category from public.store_items where id=p_item_id;
  if not found then raise exception 'Item not found'; end if;
  if not exists(select 1 from public.user_inventory where user_id=v_user and item_id=p_item_id) then
    raise exception 'Item not owned';
  end if;

  update public.user_inventory ui
  set equipped=false
  from public.store_items si
  where ui.user_id=v_user and ui.item_id=si.id and si.category=v_category;

  update public.user_inventory
  set equipped=true
  where user_id=v_user and item_id=p_item_id;

  return true;
end;
$$;

revoke all on function public.equip_store_item(text) from public;
grant execute on function public.equip_store_item(text) to authenticated;

create table if not exists public.room_music_queue (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  added_by uuid not null references auth.users(id) on delete cascade,
  title text not null,
  artist text,
  status text not null default 'queued' check (status in ('queued','playing','played','skipped')),
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists room_music_queue_room_idx
  on public.room_music_queue(room_id,status,position,created_at);

alter table public.room_music_queue enable row level security;

drop policy if exists room_music_read on public.room_music_queue;
create policy room_music_read on public.room_music_queue
for select to authenticated using (public.is_room_member(room_id));

drop policy if exists room_music_add on public.room_music_queue;
create policy room_music_add on public.room_music_queue
for insert to authenticated
with check (added_by=(select auth.uid()) and public.is_room_member(room_id));

create table if not exists public.room_pk_matches (
  id uuid primary key default gen_random_uuid(),
  room_a uuid not null references public.rooms(id) on delete cascade,
  room_b uuid references public.rooms(id) on delete set null,
  status text not null default 'waiting' check(status in ('waiting','live','completed','cancelled')),
  score_a bigint not null default 0 check(score_a>=0),
  score_b bigint not null default 0 check(score_b>=0),
  starts_at timestamptz,
  ends_at timestamptz,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.room_pk_matches enable row level security;

drop policy if exists room_pk_read on public.room_pk_matches;
create policy room_pk_read on public.room_pk_matches
for select to authenticated using (true);

drop policy if exists room_pk_create on public.room_pk_matches;
create policy room_pk_create on public.room_pk_matches
for insert to authenticated
with check (created_by=(select auth.uid()));

create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  game_key text not null,
  status text not null default 'waiting' check(status in ('waiting','live','completed','cancelled')),
  state jsonb not null default '{}'::jsonb,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.game_sessions enable row level security;

drop policy if exists game_sessions_read on public.game_sessions;
create policy game_sessions_read on public.game_sessions
for select to authenticated using (public.is_room_member(room_id));

drop policy if exists game_sessions_create on public.game_sessions;
create policy game_sessions_create on public.game_sessions
for insert to authenticated
with check (created_by=(select auth.uid()) and public.is_room_member(room_id));

create or replace function public.claim_room_seat(p_room_id uuid,p_seat_no smallint)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user uuid := auth.uid();
  v_seat public.room_seats%rowtype;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if not public.is_room_member(p_room_id) then raise exception 'Join room first'; end if;

  select * into v_seat
  from public.room_seats
  where room_id=p_room_id and seat_no=p_seat_no
  for update;

  if not found then raise exception 'Seat not found'; end if;
  if v_seat.is_locked then raise exception 'Seat is locked'; end if;
  if v_seat.user_id is not null and v_seat.user_id<>v_user then raise exception 'Seat is occupied'; end if;

  update public.room_seats set user_id=null,updated_at=now()
  where room_id=p_room_id and user_id=v_user;

  update public.room_seats set user_id=v_user,updated_at=now()
  where room_id=p_room_id and seat_no=p_seat_no;

  return jsonb_build_object('seat_no',p_seat_no,'user_id',v_user);
end;
$$;

revoke all on function public.claim_room_seat(uuid,smallint) from public;
grant execute on function public.claim_room_seat(uuid,smallint) to authenticated;

create or replace function public.leave_room_seat(p_room_id uuid)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  update public.room_seats set user_id=null,updated_at=now()
  where room_id=p_room_id and user_id=v_user;
  return true;
end;
$$;

revoke all on function public.leave_room_seat(uuid) from public;
grant execute on function public.leave_room_seat(uuid) to authenticated;

create or replace function public.set_room_member_role(p_room_id uuid,p_user_id uuid,p_role text)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if p_role not in ('admin','moderator','member') then raise exception 'Invalid role'; end if;
  if not exists(select 1 from public.rooms where id=p_room_id and owner_id=v_user) then
    raise exception 'Owner permission required';
  end if;
  update public.room_members set role=p_role
  where room_id=p_room_id and user_id=p_user_id and role<>'owner';
  return found;
end;
$$;

revoke all on function public.set_room_member_role(uuid,uuid,text) from public;
grant execute on function public.set_room_member_role(uuid,uuid,text) to authenticated;

create or replace function public.set_room_member_muted(p_room_id uuid,p_user_id uuid,p_muted boolean)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if not exists(
    select 1 from public.room_members
    where room_id=p_room_id and user_id=v_user and role in ('owner','admin','moderator')
  ) then raise exception 'Moderator permission required'; end if;

  update public.room_members set is_muted=p_muted
  where room_id=p_room_id and user_id=p_user_id;
  update public.room_seats set is_muted=p_muted,updated_at=now()
  where room_id=p_room_id and user_id=p_user_id;
  return found;
end;
$$;

revoke all on function public.set_room_member_muted(uuid,uuid,boolean) from public;
grant execute on function public.set_room_member_muted(uuid,uuid,boolean) to authenticated;

create index if not exists gift_events_created_idx on public.gift_events(created_at desc);
create index if not exists gift_events_sender_created_idx on public.gift_events(sender_id,created_at desc);
create index if not exists gift_events_recipient_created_idx on public.gift_events(recipient_id,created_at desc);

do $$
begin
  alter publication supabase_realtime add table public.room_seats;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.room_members;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.gift_events;
exception when duplicate_object then null;
end $$;

insert into public.events(name,starts_at,ends_at,enabled,metadata)
select
  'Ugo October Carnival',
  date_trunc('month',now()),
  date_trunc('month',now()) + interval '1 month' - interval '1 second',
  true,
  '{"theme":"monthly","icon":"🎉"}'::jsonb
where not exists (
  select 1 from public.events
  where starts_at <= now() and ends_at >= now() and metadata->>'theme'='monthly'
);

insert into public.missions(event_id,title,target,reward_type,reward_amount,enabled)
select e.id,'Join 3 rooms',3,'coins',100,true
from public.events e
where e.starts_at<=now() and e.ends_at>=now()
and not exists(select 1 from public.missions m where m.event_id=e.id and m.title='Join 3 rooms')
limit 1;

insert into public.missions(event_id,title,target,reward_type,reward_amount,enabled)
select e.id,'Send 5 gifts',5,'event_tokens',50,true
from public.events e
where e.starts_at<=now() and e.ends_at>=now()
and not exists(select 1 from public.missions m where m.event_id=e.id and m.title='Send 5 gifts')
limit 1;
