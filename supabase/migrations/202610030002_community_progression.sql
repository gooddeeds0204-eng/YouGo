-- Community creation, couple state, mission progression, notifications and achievements.

create or replace function public.create_family(p_name text)
returns uuid
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user uuid := auth.uid();
  v_family uuid;
  v_name text := trim(p_name);
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if char_length(v_name) < 2 or char_length(v_name) > 60 then raise exception 'Family name must be 2-60 characters'; end if;
  if exists(select 1 from public.family_members where user_id=v_user) then raise exception 'Already in a family'; end if;
  insert into public.families(owner_id,name) values(v_user,v_name) returning id into v_family;
  insert into public.family_members(family_id,user_id,role) values(v_family,v_user,'owner');
  return v_family;
end;
$$;

revoke all on function public.create_family(text) from public;
grant execute on function public.create_family(text) to authenticated;

create or replace function public.join_family(p_family_id uuid)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if not exists(select 1 from public.families where id=p_family_id) then raise exception 'Family not found'; end if;
  if exists(select 1 from public.family_members where user_id=v_user) then raise exception 'Already in a family'; end if;
  insert into public.family_members(family_id,user_id,role) values(p_family_id,v_user,'member');
  return true;
end;
$$;

revoke all on function public.join_family(uuid) from public;
grant execute on function public.join_family(uuid) to authenticated;

create or replace function public.leave_family(p_family_id uuid)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if exists(select 1 from public.families where id=p_family_id and owner_id=v_user) then
    raise exception 'Family owner cannot leave before transferring ownership';
  end if;
  delete from public.family_members where family_id=p_family_id and user_id=v_user;
  return found;
end;
$$;

revoke all on function public.leave_family(uuid) from public;
grant execute on function public.leave_family(uuid) to authenticated;

create or replace function public.create_couple(p_other_user uuid)
returns uuid
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user uuid := auth.uid();
  v_id uuid;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if p_other_user is null or p_other_user=v_user then raise exception 'Choose another user'; end if;
  if not exists(select 1 from public.profiles where id=p_other_user) then raise exception 'User not found'; end if;
  if exists(select 1 from public.couples where user_a in (v_user,p_other_user) or user_b in (v_user,p_other_user)) then
    raise exception 'One of these users is already in a couple';
  end if;
  insert into public.couples(user_a,user_b) values(v_user,p_other_user) returning id into v_id;
  insert into public.notifications(user_id,type,title,body,data)
  values(p_other_user,'couple','New couple connection','A Ugo member created a Couple Space with you.',jsonb_build_object('couple_id',v_id,'from_user',v_user));
  return v_id;
end;
$$;

revoke all on function public.create_couple(uuid) from public;
grant execute on function public.create_couple(uuid) to authenticated;

create or replace function public.break_couple(p_couple_id uuid)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  delete from public.couples where id=p_couple_id and (user_a=v_user or user_b=v_user);
  return found;
end;
$$;

revoke all on function public.break_couple(uuid) from public;
grant execute on function public.break_couple(uuid) to authenticated;

create or replace function public.reward_mission_progress(p_user uuid,p_title text,p_amount bigint default 1)
returns void
language plpgsql
security definer
set search_path=public
as $$
declare
  v_mission record;
  v_old bigint;
  v_new bigint;
begin
  for v_mission in
    select m.id,m.target,m.reward_type,m.reward_amount
    from public.missions m
    left join public.events e on e.id=m.event_id
    where m.enabled=true and m.title=p_title
      and (m.event_id is null or (e.enabled=true and e.starts_at<=now() and e.ends_at>=now()))
  loop
    select progress into v_old from public.mission_progress
    where mission_id=v_mission.id and user_id=p_user for update;

    if not found then
      v_old:=0;
      insert into public.mission_progress(mission_id,user_id,progress) values(v_mission.id,p_user,0);
    end if;

    if v_old>=v_mission.target then continue; end if;
    v_new:=least(v_old+p_amount,v_mission.target);

    update public.mission_progress
    set progress=v_new,
        completed_at=case when v_new>=v_mission.target then coalesce(completed_at,now()) else completed_at end,
        updated_at=now()
    where mission_id=v_mission.id and user_id=p_user;

    if v_old<v_mission.target and v_new>=v_mission.target then
      if v_mission.reward_type='coins' then
        update public.wallets set coins=coins+v_mission.reward_amount,updated_at=now() where user_id=p_user;
      elsif v_mission.reward_type='event_tokens' then
        update public.wallets set event_tokens=event_tokens+v_mission.reward_amount,updated_at=now() where user_id=p_user;
      elsif v_mission.reward_type='free_spins' then
        update public.wallets set free_spins=free_spins+v_mission.reward_amount::integer,updated_at=now() where user_id=p_user;
      end if;

      if v_mission.reward_type in ('coins','event_tokens','free_spins') then
        insert into public.wallet_transactions(user_id,type,currency,amount,reference_id,metadata)
        values(p_user,'reward',v_mission.reward_type,v_mission.reward_amount,v_mission.id::text,jsonb_build_object('source','mission','title',p_title));
      end if;

      insert into public.notifications(user_id,type,title,body,data)
      values(p_user,'mission','Mission completed',p_title || ' completed. Reward added to your wallet.',jsonb_build_object('mission_id',v_mission.id));
    end if;
  end loop;
end;
$$;

revoke all on function public.reward_mission_progress(uuid,text,bigint) from public;

create or replace function public.on_room_member_progress()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  perform public.reward_mission_progress(new.user_id,'Join 3 rooms',1);
  insert into public.user_achievements(user_id,achievement_id) values(new.user_id,'first-room') on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists trg_room_member_progress on public.room_members;
create trigger trg_room_member_progress after insert on public.room_members
for each row execute function public.on_room_member_progress();

create or replace function public.on_gift_event_progress()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  perform public.reward_mission_progress(new.sender_id,'Send 5 gifts',1);
  update public.vip_state set vip_points=vip_points+new.diamond_total,updated_at=now() where user_id=new.sender_id;
  insert into public.user_achievements(user_id,achievement_id) values(new.sender_id,'first-gift') on conflict do nothing;

  if new.recipient_id is not null then
    insert into public.notifications(user_id,type,title,body,data)
    values(new.recipient_id,'gift','You received a gift','A gift was sent to you in Ugo.',jsonb_build_object('gift_event_id',new.id,'gift_id',new.gift_id,'quantity',new.quantity));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_gift_event_progress on public.gift_events;
create trigger trg_gift_event_progress after insert on public.gift_events
for each row execute function public.on_gift_event_progress();

create or replace function public.on_follow_notification()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare v_count bigint;
begin
  insert into public.notifications(user_id,type,title,body,data)
  values(new.following_id,'follow','New follower','Someone followed you on Ugo.',jsonb_build_object('follower_id',new.follower_id));

  select count(*) into v_count from public.follows where follower_id=new.follower_id;
  if v_count>=10 then
    insert into public.user_achievements(user_id,achievement_id) values(new.follower_id,'social-10') on conflict do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_follow_notification on public.follows;
create trigger trg_follow_notification after insert on public.follows
for each row execute function public.on_follow_notification();
