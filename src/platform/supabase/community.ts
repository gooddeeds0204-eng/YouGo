import { getSupabaseClient } from "@/platform/supabase/client";

export type FamilyState={
  id:string;
  name:string;
  level:number;
  charm:number;
  role:"owner"|"admin"|"member";
  memberCount:number;
};

export type CoupleState={
  id:string;
  otherUserId:string;
  otherName:string;
  otherAvatarUrl:string|null;
  bondLevel:number;
  bondPoints:number;
  startedAt:string;
};

export async function getMyFamily():Promise<FamilyState|null>{
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return null;

  const membership=await supabase.from("family_members")
    .select("family_id,role")
    .eq("user_id",me)
    .maybeSingle();
  if(membership.error)throw membership.error;
  if(!membership.data)return null;

  const family=await supabase.from("families")
    .select("id,name,level,charm")
    .eq("id",membership.data.family_id)
    .single();
  if(family.error)throw family.error;

  const count=await supabase.from("family_members")
    .select("*",{count:"exact",head:true})
    .eq("family_id",membership.data.family_id);
  if(count.error)throw count.error;

  return {
    id:family.data.id,
    name:family.data.name,
    level:family.data.level,
    charm:Number(family.data.charm||0),
    role:membership.data.role,
    memberCount:count.count||0,
  };
}

export async function listFamilies(limit=20){
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const {data,error}=await supabase.from("families")
    .select("id,name,level,charm")
    .order("charm",{ascending:false})
    .limit(limit);
  if(error)throw error;

  return Promise.all((data||[]).map(async(row:any)=>{
    const count=await supabase.from("family_members")
      .select("*",{count:"exact",head:true})
      .eq("family_id",row.id);
    return {
      id:row.id,
      name:row.name,
      level:row.level,
      charm:Number(row.charm||0),
      memberCount:count.count||0,
    };
  }));
}

export async function createFamily(name:string){
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return null;
  const {data,error}=await supabase.rpc("create_family",{p_name:name.trim()});
  if(error)throw error;
  return data as string;
}

export async function joinFamily(familyId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return false;
  const {data,error}=await supabase.rpc("join_family",{p_family_id:familyId});
  if(error)throw error;
  return Boolean(data);
}

export async function leaveFamily(familyId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return false;
  const {data,error}=await supabase.rpc("leave_family",{p_family_id:familyId});
  if(error)throw error;
  return Boolean(data);
}

export async function getMyCouple():Promise<CoupleState|null>{
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return null;

  const {data,error}=await supabase.from("couples")
    .select("id,user_a,user_b,bond_level,bond_points,started_at")
    .or(`user_a.eq.${me},user_b.eq.${me}`)
    .maybeSingle();
  if(error)throw error;
  if(!data)return null;

  const other=data.user_a===me?data.user_b:data.user_a;
  const profile=await supabase.from("profiles")
    .select("display_name,avatar_url")
    .eq("id",other)
    .maybeSingle();
  if(profile.error)throw profile.error;

  return {
    id:data.id,
    otherUserId:other,
    otherName:profile.data?.display_name||"Ugo member",
    otherAvatarUrl:profile.data?.avatar_url||null,
    bondLevel:data.bond_level,
    bondPoints:Number(data.bond_points||0),
    startedAt:data.started_at,
  };
}

export async function createCouple(otherUserId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return null;
  const {data,error}=await supabase.rpc("create_couple",{p_other_user:otherUserId});
  if(error)throw error;
  return data as string;
}

export async function breakCouple(coupleId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return false;
  const {data,error}=await supabase.rpc("break_couple",{p_couple_id:coupleId});
  if(error)throw error;
  return Boolean(data);
}
