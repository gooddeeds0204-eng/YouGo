import { getSupabaseClient } from "@/platform/supabase/client";
import type { RoomMode } from "@/contracts/room";

const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type PublicRoom={
  id:string;
  name:string;
  mode:RoomMode;
  level:number;
  audienceCount:number;
  ownerId:string;
  announcement:string|null;
};

export type RoomSeat={
  seatNo:number;
  userId:string|null;
  displayName:string|null;
  avatarUrl:string|null;
  level:number|null;
  vipLevel:number|null;
  isLocked:boolean;
  isMuted:boolean;
};

export async function listPublicRooms(limit=30):Promise<PublicRoom[]>{
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data,error}=await supabase.from("rooms")
    .select("id,name,mode,level,audience_count,owner_id,announcement")
    .eq("privacy","public")
    .eq("is_live",true)
    .order("audience_count",{ascending:false})
    .limit(limit);
  if(error)throw error;
  return (data||[]).map((row:any)=>({
    id:row.id,name:row.name,mode:row.mode,level:row.level,
    audienceCount:row.audience_count,ownerId:row.owner_id,announcement:row.announcement,
  }));
}

export async function listRoomSeats(roomId:string):Promise<RoomSeat[]>{
  const supabase=getSupabaseClient();
  if(!supabase||!UUID_RE.test(roomId))return [];
  const {data,error}=await supabase.from("room_seats")
    .select("seat_no,user_id,is_locked,is_muted")
    .eq("room_id",roomId)
    .order("seat_no",{ascending:true});
  if(error)throw error;

  const ids=(data||[]).map((row:any)=>row.user_id).filter(Boolean);
  let profiles:any[]=[];
  if(ids.length){
    const result=await supabase.from("profiles")
      .select("id,display_name,avatar_url,level,vip_level")
      .in("id",Array.from(new Set(ids)));
    if(result.error)throw result.error;
    profiles=result.data||[];
  }
  const map=new Map(profiles.map(row=>[row.id,row]));

  return (data||[]).map((row:any)=>{
    const p:any=row.user_id?map.get(row.user_id):null;
    return {
      seatNo:row.seat_no,
      userId:row.user_id,
      displayName:p?.display_name||null,
      avatarUrl:p?.avatar_url||null,
      level:p?.level??null,
      vipLevel:p?.vip_level??null,
      isLocked:row.is_locked,
      isMuted:row.is_muted,
    };
  });
}

export async function claimRoomSeat(roomId:string,seatNo:number){
  const supabase=getSupabaseClient();
  if(!supabase||!UUID_RE.test(roomId))return null;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return null;
  const {data,error}=await supabase.rpc("claim_room_seat",{p_room_id:roomId,p_seat_no:seatNo});
  if(error)throw error;
  return data;
}

export async function leaveRoomSeat(roomId:string){
  const supabase=getSupabaseClient();
  if(!supabase||!UUID_RE.test(roomId))return false;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return false;
  const {data,error}=await supabase.rpc("leave_room_seat",{p_room_id:roomId});
  if(error)throw error;
  return Boolean(data);
}

export async function listRoomMembers(roomId:string){
  const supabase=getSupabaseClient();
  if(!supabase||!UUID_RE.test(roomId))return [];
  const {data,error}=await supabase.from("room_members")
    .select("user_id,role,is_muted,joined_at")
    .eq("room_id",roomId)
    .order("joined_at",{ascending:true});
  if(error)throw error;
  const ids=(data||[]).map((row:any)=>row.user_id);
  if(!ids.length)return [];
  const profiles=await supabase.from("profiles")
    .select("id,display_name,avatar_url,level,vip_level")
    .in("id",ids);
  if(profiles.error)throw profiles.error;
  const map=new Map((profiles.data||[]).map((row:any)=>[row.id,row]));
  return (data||[]).map((row:any)=>({
    ...row,
    profile:map.get(row.user_id)||null,
  }));
}

export async function setRoomMemberRole(roomId:string,userId:string,role:"admin"|"moderator"|"member"){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data,error}=await supabase.rpc("set_room_member_role",{p_room_id:roomId,p_user_id:userId,p_role:role});
  if(error)throw error;
  return Boolean(data);
}

export async function setRoomMemberMuted(roomId:string,userId:string,muted:boolean){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data,error}=await supabase.rpc("set_room_member_muted",{p_room_id:roomId,p_user_id:userId,p_muted:muted});
  if(error)throw error;
  return Boolean(data);
}

export async function addMusicToRoom(roomId:string,title:string,artist?:string){
  const supabase=getSupabaseClient();
  if(!supabase||!UUID_RE.test(roomId))return null;
  const {data:auth}=await supabase.auth.getUser();
  const userId=auth.user?.id;
  if(!userId)return null;
  const {data,error}=await supabase.from("room_music_queue")
    .insert({room_id:roomId,added_by:userId,title:title.trim(),artist:artist?.trim()||null})
    .select("id")
    .single();
  if(error)throw error;
  return data.id as string;
}

export async function listRoomMusic(roomId:string){
  const supabase=getSupabaseClient();
  if(!supabase||!UUID_RE.test(roomId))return [];
  const {data,error}=await supabase.from("room_music_queue")
    .select("id,title,artist,status,position,created_at")
    .eq("room_id",roomId)
    .in("status",["queued","playing"])
    .order("position",{ascending:true})
    .order("created_at",{ascending:true});
  if(error)throw error;
  return data||[];
}

export async function createRoomPk(roomId:string){
  const supabase=getSupabaseClient();
  if(!supabase||!UUID_RE.test(roomId))return null;
  const {data:auth}=await supabase.auth.getUser();
  const userId=auth.user?.id;
  if(!userId)return null;
  const {data,error}=await supabase.from("room_pk_matches")
    .insert({room_a:roomId,created_by:userId,status:"waiting"})
    .select("id,status")
    .single();
  if(error)throw error;
  return data;
}

export async function createGameSession(roomId:string,gameKey:string){
  const supabase=getSupabaseClient();
  if(!supabase||!UUID_RE.test(roomId))return null;
  const {data:auth}=await supabase.auth.getUser();
  const userId=auth.user?.id;
  if(!userId)return null;
  const {data,error}=await supabase.from("game_sessions")
    .insert({room_id:roomId,game_key:gameKey,created_by:userId,status:"waiting"})
    .select("id,status")
    .single();
  if(error)throw error;
  return data;
}
