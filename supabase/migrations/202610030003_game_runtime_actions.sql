-- Server-authoritative lightweight party game actions.

create or replace function public.perform_game_action(
  p_session_id uuid,
  p_action text default 'play'
)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user uuid := auth.uid();
  v_session public.game_sessions%rowtype;
  v_result jsonb := '{}'::jsonb;
  v_roll integer;
  v_score integer;
  v_round integer;
begin
  if v_user is null then raise exception 'Authentication required'; end if;

  select * into v_session
  from public.game_sessions
  where id=p_session_id
  for update;

  if not found then raise exception 'Game session not found'; end if;
  if not public.is_room_member(v_session.room_id) then raise exception 'Join room first'; end if;
  if v_session.status in ('completed','cancelled') then raise exception 'Game session is closed'; end if;

  if v_session.status='waiting' then
    update public.game_sessions set status='live',updated_at=now() where id=p_session_id;
  end if;

  v_round := coalesce((v_session.state->>'round')::integer,0)+1;
  v_score := coalesce((v_session.state->>'score')::integer,0);

  case v_session.game_key
    when 'lucky-dice' then
      v_roll := 1 + floor(random()*6)::integer;
      v_score := v_score + v_roll;
      v_result := jsonb_build_object('kind','dice','value',v_roll,'score',v_score);
    when 'spin-win' then
      v_roll := floor(random()*6)::integer;
      v_result := jsonb_build_object('kind','spin','value',v_roll,'label',(array['10 pts','20 pts','Try again','50 pts','Bonus','25 pts'])[v_roll+1]);
      v_score := v_score + (array[10,20,0,50,40,25])[v_roll+1];
    when 'diamond-hunt' then
      v_roll := 1 + floor(random()*20)::integer;
      v_score := v_score + v_roll;
      v_result := jsonb_build_object('kind','diamonds','value',v_roll,'score',v_score);
    when 'greedy' then
      if p_action='collect' then
        v_result := jsonb_build_object('kind','collect','value',v_score,'score',v_score);
      else
        v_roll := floor(random()*100)::integer;
        if v_roll < 35 then
          v_score := 0;
          v_result := jsonb_build_object('kind','bust','value',0,'score',0);
        else
          v_roll := 5 + floor(random()*26)::integer;
          v_score := v_score + v_roll;
          v_result := jsonb_build_object('kind','gain','value',v_roll,'score',v_score);
        end if;
      end if;
    when 'eat-ball' then
      v_roll := 1 + floor(random()*10)::integer;
      v_score := v_score + v_roll;
      v_result := jsonb_build_object('kind','eat','value',v_roll,'score',v_score);
    when 'cards' then
      v_roll := 1 + floor(random()*13)::integer;
      v_score := v_score + v_roll;
      v_result := jsonb_build_object('kind','card','value',v_roll,'score',v_score);
    when 'ludo' then
      v_roll := 1 + floor(random()*6)::integer;
      v_score := least(57,v_score+v_roll);
      v_result := jsonb_build_object('kind','ludo','value',v_roll,'position',v_score);
    when 'truth-dare' then
      v_roll := floor(random()*8)::integer;
      v_result := jsonb_build_object(
        'kind','prompt','value',v_roll,
        'label',(array[
          'Truth: What made you smile today?',
          'Dare: Sing one line of a song.',
          'Truth: What is your dream trip?',
          'Dare: Compliment someone in the room.',
          'Truth: What is your funniest habit?',
          'Dare: Use only emojis for one minute.',
          'Truth: Which game do you play most?',
          'Dare: Say a tongue twister.'
        ])[v_roll+1]
      );
    else
      v_roll := 1 + floor(random()*6)::integer;
      v_score := v_score + v_roll;
      v_result := jsonb_build_object('kind','score','value',v_roll,'score',v_score);
  end case;

  update public.game_sessions
  set state=jsonb_build_object(
      'round',v_round,
      'score',v_score,
      'last_result',v_result,
      'last_player',v_user,
      'updated_at',now()
    ),
    updated_at=now()
  where id=p_session_id;

  return jsonb_build_object(
    'session_id',p_session_id,
    'game_key',v_session.game_key,
    'round',v_round,
    'score',v_score,
    'result',v_result
  );
end;
$$;

revoke all on function public.perform_game_action(uuid,text) from public;
grant execute on function public.perform_game_action(uuid,text) to authenticated;

create or replace function public.finish_game_session(p_session_id uuid)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user uuid := auth.uid();
  v_room uuid;
begin
  if v_user is null then raise exception 'Authentication required'; end if;

  select room_id into v_room from public.game_sessions where id=p_session_id;
  if not found then raise exception 'Game session not found'; end if;
  if not public.is_room_member(v_room) then raise exception 'Join room first'; end if;

  update public.game_sessions
  set status='completed',updated_at=now()
  where id=p_session_id and status not in ('completed','cancelled');

  return found;
end;
$$;

revoke all on function public.finish_game_session(uuid) from public;
grant execute on function public.finish_game_session(uuid) to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.game_sessions;
exception when duplicate_object then null;
end $$;
