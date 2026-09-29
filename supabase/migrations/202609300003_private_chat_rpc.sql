-- Secure private conversation bootstrap.

create or replace function public.get_or_create_private_conversation(
  p_other_user uuid
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_me uuid := auth.uid();
  v_conversation uuid;
begin
  if v_me is null then
    raise exception 'authentication required';
  end if;

  if p_other_user is null or p_other_user = v_me then
    raise exception 'invalid conversation participant';
  end if;

  select pcm_me.conversation_id
    into v_conversation
  from public.private_conversation_members pcm_me
  where pcm_me.user_id = v_me
    and exists (
      select 1
      from public.private_conversation_members pcm_other
      where pcm_other.conversation_id = pcm_me.conversation_id
        and pcm_other.user_id = p_other_user
    )
    and (
      select count(*)
      from public.private_conversation_members pcm_count
      where pcm_count.conversation_id = pcm_me.conversation_id
    ) = 2
  limit 1;

  if v_conversation is not null then
    return v_conversation;
  end if;

  insert into public.private_conversations default values
  returning id into v_conversation;

  insert into public.private_conversation_members (conversation_id, user_id)
  values
    (v_conversation, v_me),
    (v_conversation, p_other_user);

  return v_conversation;
end;
$$;

revoke all on function public.get_or_create_private_conversation(uuid) from public;
grant execute on function public.get_or_create_private_conversation(uuid) to authenticated;
