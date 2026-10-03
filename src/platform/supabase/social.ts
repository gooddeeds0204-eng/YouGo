import { getSupabaseClient } from "@/platform/supabase/client";

export type SocialProfile = {
  id:string;
  displayName:string;
  username:string|null;
  avatarUrl:string|null;
  level:number;
  vipLevel:number;
  charm:number;
  wealth:number;
};

export type MomentItem = {
  id:string;
  userId:string;
  displayName:string;
  username:string|null;
  avatarUrl:string|null;
  kind:"status"|"photo"|"video";
  body:string|null;
  mediaUrl:string|null;
  likesCount:number;
  commentsCount:number;
  createdAt:string;
};

function mapProfile(row:any):SocialProfile{
  return {
    id:row.id,
    displayName:row.display_name,
    username:row.username,
    avatarUrl:row.avatar_url,
    level:row.level,
    vipLevel:row.vip_level,
    charm:Number(row.charm||0),
    wealth:Number(row.wealth||0),
  };
}

async function profilesByIds(ids:string[]){
  const supabase=getSupabaseClient();
  if(!supabase||!ids.length)return new Map<string,SocialProfile>();
  const {data,error}=await supabase
    .from("profiles")
    .select("id,display_name,username,avatar_url,level,vip_level,charm,wealth")
    .in("id",Array.from(new Set(ids)));
  if(error)throw error;
  return new Map((data||[]).map((row:any)=>[row.id,mapProfile(row)]));
}

export async function searchProfiles(query:string,limit=20){
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const clean=query.trim().replace(/[%_,]/g,"");
  let request=supabase
    .from("profiles")
    .select("id,display_name,username,avatar_url,level,vip_level,charm,wealth")
    .eq("profile_complete",true)
    .limit(limit);

  if(clean){
    request=request.or(`display_name.ilike.%${clean}%,username.ilike.%${clean}%`);
  }else{
    request=request.order("charm",{ascending:false});
  }

  const {data,error}=await request;
  if(error)throw error;
  return (data||[]).map(mapProfile);
}

export async function followUser(userId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me||me===userId)return false;
  const {error}=await supabase.from("follows").upsert(
    {follower_id:me,following_id:userId},
    {onConflict:"follower_id,following_id",ignoreDuplicates:true},
  );
  if(error)throw error;
  return true;
}

export async function unfollowUser(userId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return false;
  const {error}=await supabase.from("follows")
    .delete()
    .eq("follower_id",me)
    .eq("following_id",userId);
  if(error)throw error;
  return true;
}

export async function isFollowing(userId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return false;
  const {data,error}=await supabase.from("follows")
    .select("following_id")
    .eq("follower_id",me)
    .eq("following_id",userId)
    .maybeSingle();
  if(error)throw error;
  return Boolean(data);
}

export async function getFollowCounts(userId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return {followers:0,following:0};
  const [followers,following]=await Promise.all([
    supabase.from("follows").select("*",{count:"exact",head:true}).eq("following_id",userId),
    supabase.from("follows").select("*",{count:"exact",head:true}).eq("follower_id",userId),
  ]);
  if(followers.error)throw followers.error;
  if(following.error)throw following.error;
  return {followers:followers.count||0,following:following.count||0};
}

export async function recordProfileVisit(profileId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return;
  const {data:auth}=await supabase.auth.getUser();
  const visitorId=auth.user?.id;
  if(!visitorId||visitorId===profileId)return;
  const {error}=await supabase.from("profile_visits").insert({
    visitor_id:visitorId,
    profile_id:profileId,
  });
  if(error)throw error;
}

export async function listProfileVisitors(limit=20){
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return [];
  const {data,error}=await supabase.from("profile_visits")
    .select("visitor_id,visited_at")
    .eq("profile_id",me)
    .order("visited_at",{ascending:false})
    .limit(limit);
  if(error)throw error;
  const profiles=await profilesByIds((data||[]).map((row:any)=>row.visitor_id));
  return (data||[]).map((row:any)=>({
    profile:profiles.get(row.visitor_id)||null,
    visitedAt:row.visited_at,
  })).filter((item:any)=>item.profile);
}

export async function listMoments(limit=30):Promise<MomentItem[]>{
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data,error}=await supabase.from("moments")
    .select("id,user_id,kind,body,media_url,likes_count,comments_count,created_at")
    .order("created_at",{ascending:false})
    .limit(limit);
  if(error)throw error;
  const profiles=await profilesByIds((data||[]).map((row:any)=>row.user_id));
  return (data||[]).map((row:any)=>{
    const profile=profiles.get(row.user_id);
    return {
      id:row.id,
      userId:row.user_id,
      displayName:profile?.displayName||"Ugo member",
      username:profile?.username||null,
      avatarUrl:profile?.avatarUrl||null,
      kind:row.kind,
      body:row.body,
      mediaUrl:row.media_url,
      likesCount:row.likes_count,
      commentsCount:row.comments_count,
      createdAt:row.created_at,
    };
  });
}

export async function createMoment(body:string){
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  const userId=auth.user?.id;
  const clean=body.trim();
  if(!userId||!clean)return null;
  const {data,error}=await supabase.from("moments")
    .insert({user_id:userId,kind:"status",body:clean.slice(0,500)})
    .select("id")
    .single();
  if(error)throw error;
  return data.id as string;
}

export async function toggleMomentLike(momentId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return null;
  const {data,error}=await supabase.rpc("toggle_moment_like",{p_moment_id:momentId});
  if(error)throw error;
  return data as {liked:boolean;likes_count:number};
}
