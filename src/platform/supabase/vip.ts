import { getSupabaseClient } from "@/platform/supabase/client";

export type VipState={
  vipLevel:number;
  vipPoints:number;
  svipLevel:number;
  expiresAt:string|null;
};

export async function getMyVipState():Promise<VipState|null>{
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return null;

  const {data,error}=await supabase.from("vip_state")
    .select("vip_level,vip_points,svip_level,expires_at")
    .eq("user_id",me)
    .maybeSingle();
  if(error)throw error;
  if(!data)return null;

  return {
    vipLevel:data.vip_level,
    vipPoints:Number(data.vip_points||0),
    svipLevel:data.svip_level,
    expiresAt:data.expires_at,
  };
}
