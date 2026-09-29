-- Security and index hardening after initial Ugo deployment.

alter function public.set_updated_at() set search_path = public;

-- Trigger-only functions must never be callable through the API.
revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;

revoke execute on function public.handle_new_room() from public;
revoke execute on function public.handle_new_room() from anon;
revoke execute on function public.handle_new_room() from authenticated;

-- Security-definer helpers / RPCs are authenticated-only.
revoke execute on function public.is_room_member(uuid) from public;
revoke execute on function public.is_room_member(uuid) from anon;
grant execute on function public.is_room_member(uuid) to authenticated;

revoke execute on function public.is_conversation_member(uuid) from public;
revoke execute on function public.is_conversation_member(uuid) from anon;
grant execute on function public.is_conversation_member(uuid) to authenticated;

revoke execute on function public.send_gift(text, integer, uuid, uuid) from public;
revoke execute on function public.send_gift(text, integer, uuid, uuid) from anon;
grant execute on function public.send_gift(text, integer, uuid, uuid) to authenticated;

revoke execute on function public.get_or_create_private_conversation(uuid) from public;
revoke execute on function public.get_or_create_private_conversation(uuid) from anon;
grant execute on function public.get_or_create_private_conversation(uuid) to authenticated;

-- Cover foreign keys used by joins, deletes, moderation and analytics.
create index if not exists blocks_blocked_id_idx
  on public.blocks(blocked_id);

create index if not exists couples_user_a_idx
  on public.couples(user_a);
create index if not exists couples_user_b_idx
  on public.couples(user_b);

create index if not exists families_owner_id_idx
  on public.families(owner_id);
create index if not exists family_members_user_id_idx
  on public.family_members(user_id);

create index if not exists follows_following_id_idx
  on public.follows(following_id);

create index if not exists gift_events_gift_id_idx
  on public.gift_events(gift_id);
create index if not exists gift_events_recipient_id_idx
  on public.gift_events(recipient_id);
create index if not exists gift_events_sender_id_idx
  on public.gift_events(sender_id);

create index if not exists mission_progress_user_id_idx
  on public.mission_progress(user_id);
create index if not exists missions_event_id_idx
  on public.missions(event_id);

create index if not exists private_messages_sender_id_idx
  on public.private_messages(sender_id);

create index if not exists reports_reported_user_id_idx
  on public.reports(reported_user_id);
create index if not exists reports_reporter_id_idx
  on public.reports(reporter_id);
create index if not exists reports_room_id_idx
  on public.reports(room_id);

create index if not exists room_messages_sender_id_idx
  on public.room_messages(sender_id);
create index if not exists room_seats_user_id_idx
  on public.room_seats(user_id);
create index if not exists rooms_owner_id_idx
  on public.rooms(owner_id);
