-- Server-authoritative gift send transaction.

create or replace function public.send_gift(
  p_gift_id text,
  p_quantity integer default 1,
  p_room_id uuid default null,
  p_recipient_id uuid default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sender uuid := auth.uid();
  v_unit_cost bigint;
  v_total bigint;
  v_balance bigint;
  v_event_id uuid;
begin
  if v_sender is null then
    raise exception 'authentication required';
  end if;

  if p_quantity < 1 or p_quantity > 999 then
    raise exception 'invalid gift quantity';
  end if;

  select diamond_cost
    into v_unit_cost
  from public.gifts
  where id = p_gift_id
    and enabled = true;

  if v_unit_cost is null then
    raise exception 'gift not found or disabled';
  end if;

  v_total := v_unit_cost * p_quantity;

  select diamonds
    into v_balance
  from public.wallets
  where user_id = v_sender
  for update;

  if v_balance is null then
    raise exception 'wallet not found';
  end if;

  if v_balance < v_total then
    raise exception 'insufficient diamonds';
  end if;

  if p_room_id is not null and not exists (
    select 1 from public.rooms
    where id = p_room_id and is_live = true
  ) then
    raise exception 'room not found or not live';
  end if;

  if p_recipient_id is not null and p_recipient_id = v_sender then
    raise exception 'cannot send a gift to yourself';
  end if;

  update public.wallets
  set diamonds = diamonds - v_total
  where user_id = v_sender;

  update public.profiles
  set wealth = wealth + v_total
  where id = v_sender;

  if p_recipient_id is not null then
    update public.profiles
    set charm = charm + v_total
    where id = p_recipient_id;
  end if;

  insert into public.gift_events (
    sender_id,
    recipient_id,
    room_id,
    gift_id,
    quantity,
    diamond_total
  )
  values (
    v_sender,
    p_recipient_id,
    p_room_id,
    p_gift_id,
    p_quantity,
    v_total
  )
  returning id into v_event_id;

  insert into public.wallet_transactions (
    user_id,
    type,
    currency,
    amount,
    reference_id,
    metadata
  )
  values (
    v_sender,
    'gift-send',
    'diamonds',
    -v_total,
    v_event_id::text,
    jsonb_build_object(
      'gift_id', p_gift_id,
      'quantity', p_quantity,
      'room_id', p_room_id,
      'recipient_id', p_recipient_id
    )
  );

  return jsonb_build_object(
    'gift_event_id', v_event_id,
    'diamond_total', v_total,
    'remaining_diamonds', v_balance - v_total
  );
end;
$$;

revoke all on function public.send_gift(text, integer, uuid, uuid) from public;
grant execute on function public.send_gift(text, integer, uuid, uuid) to authenticated;
