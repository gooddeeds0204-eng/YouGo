import { getSupabaseClient } from "@/platform/supabase/client";
import type { SocialProfile } from "@/platform/supabase/social";

export type EventItem={
  id:string;
  name:string;
  startsAt:string;
  endsAt:string;
  metadata:Record<string,unknown>;
};

export type MissionItem={
  id:string;
  title:string;
  target:number;
  rewardType:string;
  rewardAmount:number;
  progress:number;
};

export type RankingItem={
  id:string;
  name:string;
  avatarUrl:string|null;
  value:number;
  label:string;
};

export async function listActiveEvents():Promise<EventItem[]>{
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const now=new Date().toISOString();
  const {data,error}=await supabase.from("events")
    .select("id,name,starts_at,ends_at,metadata")
    .eq("enabled",true)
    .lte("starts_at",now)
    .gte("ends_at",now)
    .order("ends_at",{ascending:true});
  if(error)throw error;
  return (data||[]).map((row:any)=>({
    id:row.id,name:row.name,startsAt:row.starts_at,endsAt:row.ends_at,metadata:row.metadata||{},
  }));
}

export async function listMyMissions():Promise<MissionItem[]>{
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data:auth}=await supabase.auth.getUser();
  const userId=auth.user?.id;

  const {data,error}=await supabase.from("missions")
    .select("id,title,target,reward_type,reward_amount")
    .eq("enabled",true)
    .limit(20);
  if(error)throw error;

  let progressMap=new Map<string,number>();
  if(userId&&(data||[]).length){
    const ids=(data||[]).map((row:any)=>row.id);
    const progress=await supabase.from("mission_progress")
      .select("mission_id,progress")
      .eq("user_id",userId)
      .in("mission_id",ids);
    if(progress.error)throw progress.error;
    progressMap=new Map((progress.data||[]).map((row:any)=>[row.mission_id,Number(row.progress||0)]));
  }

  return (data||[]).map((row:any)=>({
    id:row.id,
    title:row.title,
    target:Number(row.target),
    rewardType:row.reward_type,
    rewardAmount:Number(row.reward_amount),
    progress:progressMap.get(row.id)||0,
  }));
}

export async function claimDailyCheckin(){
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return null;
  const {data,error}=await supabase.rpc("claim_daily_checkin");
  if(error)throw error;
  return data as {already_claimed:boolean;streak:number;reward_amount:number};
}

async function mapProfiles(rows:any[],valueKey:"charm"|"wealth",label:string):Promise<RankingItem[]>{
  return rows.map((row:any)=>({
    id:row.id,
    name:row.display_name,
    avatarUrl:row.avatar_url,
    value:Number(row[valueKey]||0),
    label,
  }));
}

export async function getCharmRanking(limit=10){
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data,error}=await supabase.from("profiles")
    .select("id,display_name,avatar_url,charm")
    .eq("profile_complete",true)
    .order("charm",{ascending:false})
    .limit(limit);
  if(error)throw error;
  return mapProfiles(data||[],"charm","Charm");
}

export async function getWealthRanking(limit=10){
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data,error}=await supabase.from("profiles")
    .select("id,display_name,avatar_url,wealth")
    .eq("profile_complete",true)
    .order("wealth",{ascending:false})
    .limit(limit);
  if(error)throw error;
  return mapProfiles(data||[],"wealth","Wealth");
}

export async function getGiftRanking(limit=5):Promise<RankingItem[]>{
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const since=new Date(Date.now()-30*24*60*60*1000).toISOString();
  const {data,error}=await supabase.from("gift_events")
    .select("sender_id,diamond_total")
    .gte("created_at",since)
    .order("created_at",{ascending:false})
    .limit(1000);
  if(error)throw error;

  const totals=new Map<string,number>();
  for(const row of data||[]){
    totals.set(row.sender_id,(totals.get(row.sender_id)||0)+Number(row.diamond_total||0));
  }
  const ids=[...totals.entries()].sort((a,b)=>b[1]-a[1]).slice(0,limit).map(([id])=>id);
  if(!ids.length)return [];

  const profiles=await supabase.from("profiles")
    .select("id,display_name,avatar_url")
    .in("id",ids);
  if(profiles.error)throw profiles.error;
  const map=new Map((profiles.data||[]).map((row:any)=>[row.id,row]));

  return ids.map(id=>{
    const p:any=map.get(id);
    return {id,name:p?.display_name||"Ugo member",avatarUrl:p?.avatar_url||null,value:totals.get(id)||0,label:"Gifts"};
  });
}

export async function getFamilyRanking(limit=10){
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data,error}=await supabase.from("families")
    .select("id,name,charm")
    .order("charm",{ascending:false})
    .limit(limit);
  if(error)throw error;
  return (data||[]).map((row:any)=>({
    id:row.id,name:row.name,avatarUrl:null,value:Number(row.charm||0),label:"Family charm",
  }));
}

export async function listAchievements(){
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data,error}=await supabase.from("achievements")
    .select("id,title,description,icon")
    .eq("enabled",true);
  if(error)throw error;
  return data||[];
}
