import { getSupabaseClient } from "@/platform/supabase/client";

export async function blockUser(userId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me||me===userId)return false;
  const {error}=await supabase.from("blocks").upsert(
    {blocker_id:me,blocked_id:userId},
    {onConflict:"blocker_id,blocked_id",ignoreDuplicates:true},
  );
  if(error)throw error;
  return true;
}

export async function unblockUser(userId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return false;
  const {error}=await supabase.from("blocks")
    .delete()
    .eq("blocker_id",me)
    .eq("blocked_id",userId);
  if(error)throw error;
  return true;
}

export async function listBlockedUsers(){
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return [];
  const {data,error}=await supabase.from("blocks")
    .select("blocked_id,created_at")
    .eq("blocker_id",me)
    .order("created_at",{ascending:false});
  if(error)throw error;
  const ids=(data||[]).map((row:any)=>row.blocked_id);
  if(!ids.length)return [];
  const profiles=await supabase.from("profiles")
    .select("id,display_name,username,avatar_url")
    .in("id",ids);
  if(profiles.error)throw profiles.error;
  return profiles.data||[];
}

export async function reportTarget(input:{
  userId?:string|null;
  roomId?:string|null;
  reason:string;
  details?:string;
}){
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return null;
  const {data,error}=await supabase.from("reports")
    .insert({
      reporter_id:me,
      reported_user_id:input.userId||null,
      room_id:input.roomId||null,
      reason:input.reason,
      details:input.details?.trim()||null,
    })
    .select("id")
    .single();
  if(error)throw error;
  return data.id as string;
}
