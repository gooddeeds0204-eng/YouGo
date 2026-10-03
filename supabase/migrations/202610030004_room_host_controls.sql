-- Host room management actions.

create or replace function public.set_room_announcement(p_room_id uuid,p_announcement text)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if not exists(
    select 1 from public.room_members
    where room_id=p_room_id and user_id=v_user and role in ('owner','admin','moderator')
  ) then raise exception 'Moderator permission required'; end if;

  update public.rooms
  set announcement=nullif(trim(p_announcement),''),
      updated_at=now()
  where id=p_room_id;

  if found and nullif(trim(p_announcement),'') is not null then
    insert into public.room_messages(room_id,sender_id,type,body)
    values(p_room_id,v_user,'announcement',left(trim(p_announcement),500));
  end if;

  return found;
end;
$$;

revoke all on function public.set_room_announcement(uuid,text) from public;
grant execute on function public.set_room_announcement(uuid,text) to authenticated;

create or replace function public.set_room_seat_locked(p_room_id uuid,p_seat_no smallint,p_locked boolean)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if not exists(
    select 1 from public.room_members
    where room_id=p_room_id and user_id=v_user and role in ('owner','admin','moderator')
  ) then raise exception 'Moderator permission required'; end if;

  update public.room_seats
  set is_locked=p_locked,
      user_id=case when p_locked then null else user_id end,
      updated_at=now()
  where room_id=p_room_id and seat_no=p_seat_no;

  return found;
end;
$$;

revoke all on function public.set_room_seat_locked(uuid,smallint,boolean) from public;
grant execute on function public.set_room_seat_locked(uuid,smallint,boolean) to authenticated;

create or replace function public.mute_all_room_seats(p_room_id uuid,p_muted boolean)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if not exists(
    select 1 from public.room_members
    where room_id=p_room_id and user_id=v_user and role in ('owner','admin','moderator')
  ) then raise exception 'Moderator permission required'; end if;

  update public.room_seats set is_muted=p_muted,updated_at=now()
  where room_id=p_room_id and user_id is not null;

  update public.room_members set is_muted=p_muted
  where room_id=p_room_id and role not in ('owner');

  return true;
end;
$$;

revoke all on function public.mute_all_room_seats(uuid,boolean) from public;
grant execute on function public.mute_all_room_seats(uuid,boolean) to authenticated;

create or replace function public.remove_room_member(p_room_id uuid,p_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare
  v_actor uuid := auth.uid();
  v_actor_role text;
  v_target_role text;
begin
  if v_actor is null then raise exception 'Authentication required'; end if;

  select role into v_actor_role from public.room_members
  where room_id=p_room_id and user_id=v_actor;

  select role into v_target_role from public.room_members
  where room_id=p_room_id and user_id=p_user_id;

  if v_actor_role not in ('owner','admin','moderator') then raise exception 'Moderator permission required'; end if;
  if v_target_role='owner' then raise exception 'Owner cannot be removed'; end if;
  if v_actor_role='moderator' and v_target_role in ('admin','moderator') then raise exception 'Insufficient permission'; end if;
  if v_actor_role='admin' and v_target_role='admin' then raise exception 'Only owner can remove another admin'; end if;

  update public.room_seats set user_id=null,updated_at=now()
  where room_id=p_room_id and user_id=p_user_id;

  delete from public.room_members
  where room_id=p_room_id and user_id=p_user_id;

  return found;
end;
$$;

revoke all on function public.remove_room_member(uuid,uuid) from public;
grant execute on function public.remove_room_member(uuid,uuid) to authenticated;

create or replace function public.update_room_settings(p_room_id uuid,p_name text,p_privacy text,p_language text)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if not exists(select 1 from public.rooms where id=p_room_id and owner_id=v_user) then raise exception 'Owner permission required'; end if;
  if p_privacy not in ('public','private') then raise exception 'Invalid privacy'; end if;
  if char_length(trim(p_name))<1 or char_length(trim(p_name))>80 then raise exception 'Invalid room name'; end if;

  update public.rooms
  set name=trim(p_name),privacy=p_privacy,language=coalesce(nullif(trim(p_language),''),'en'),updated_at=now()
  where id=p_room_id;

  return found;
end;
$$;

revoke all on function public.update_room_settings(uuid,text,text,text) from public;
grant execute on function public.update_room_settings(uuid,text,text,text) to authenticated;
