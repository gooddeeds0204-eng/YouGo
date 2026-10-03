import { getSupabaseClient } from "@/platform/supabase/client";

export type PrivateMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  type: "text" | "image" | "voice" | "gift" | "system";
  body: string | null;
  createdAt: string;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function getOrCreateConversation(otherUserId: string) {
  const supabase = getSupabaseClient();
  if (!supabase || !isUuid(otherUserId)) return null;

  const { data, error } = await supabase.rpc("get_or_create_private_conversation", {
    p_other_user: otherUserId,
  });

  if (error) throw error;
  return data as string;
}

export async function listPrivateMessages(conversationId: string, limit = 50): Promise<PrivateMessage[]> {
  const supabase = getSupabaseClient();
  if (!supabase || !isUuid(conversationId)) return [];

  const { data, error } = await supabase
    .from("private_messages")
    .select("id, conversation_id, sender_id, type, body, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    id: row.id,
    conversationId: row.conversation_id,
    senderId: row.sender_id,
    type: row.type,
    body: row.body,
    createdAt: row.created_at,
  }));
}

export async function sendPrivateMessage(conversationId: string, body: string) {
  const supabase = getSupabaseClient();
  if (!supabase || !isUuid(conversationId)) return null;

  const clean = body.trim();
  if (!clean) return null;

  const { data: auth } = await supabase.auth.getUser();
  const senderId = auth.user?.id;
  if (!senderId) throw new Error("Sign in before sending a message.");

  const { data, error } = await supabase
    .from("private_messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      type: "text",
      body: clean.slice(0, 2000),
    })
    .select("id, conversation_id, sender_id, type, body, created_at")
    .single();

  if (error) throw error;

  return {
    id: data.id,
    conversationId: data.conversation_id,
    senderId: data.sender_id,
    type: data.type,
    body: data.body,
    createdAt: data.created_at,
  } as PrivateMessage;
}


export type ConversationPreview = {
  id:string;
  otherUserId:string;
  name:string;
  avatarUrl:string|null;
  lastMessage:string;
  updatedAt:string;
};

export async function listConversations(limit=30):Promise<ConversationPreview[]>{
  const supabase=getSupabaseClient();
  if(!supabase)return [];

  const {data:auth}=await supabase.auth.getUser();
  const me=auth.user?.id;
  if(!me)return [];

  const mine=await supabase.from("private_conversation_members")
    .select("conversation_id")
    .eq("user_id",me)
    .limit(limit);
  if(mine.error)throw mine.error;

  const ids=(mine.data||[]).map((row:any)=>row.conversation_id);
  if(!ids.length)return [];

  const [members,messages]=await Promise.all([
    supabase.from("private_conversation_members")
      .select("conversation_id,user_id")
      .in("conversation_id",ids),
    supabase.from("private_messages")
      .select("conversation_id,body,created_at")
      .in("conversation_id",ids)
      .order("created_at",{ascending:false})
      .limit(200),
  ]);

  if(members.error)throw members.error;
  if(messages.error)throw messages.error;

  const otherByConversation=new Map<string,string>();
  for(const row of members.data||[]){
    if(row.user_id!==me)otherByConversation.set(row.conversation_id,row.user_id);
  }

  const otherIds=Array.from(new Set([...otherByConversation.values()]));
  let profiles:any[]=[];
  if(otherIds.length){
    const result=await supabase.from("profiles")
      .select("id,display_name,avatar_url")
      .in("id",otherIds);
    if(result.error)throw result.error;
    profiles=result.data||[];
  }
  const profileMap=new Map(profiles.map((row:any)=>[row.id,row]));
  const latest=new Map<string,{body:string|null;created_at:string}>();
  for(const row of messages.data||[]){
    if(!latest.has(row.conversation_id))latest.set(row.conversation_id,row);
  }

  return ids.map(id=>{
    const otherUserId=otherByConversation.get(id)||"";
    const profile:any=profileMap.get(otherUserId);
    const last=latest.get(id);
    return {
      id,
      otherUserId,
      name:profile?.display_name||"Ugo member",
      avatarUrl:profile?.avatar_url||null,
      lastMessage:last?.body||"Start a conversation",
      updatedAt:last?.created_at||new Date(0).toISOString(),
    };
  }).sort((a,b)=>new Date(b.updatedAt).getTime()-new Date(a.updatedAt).getTime());
}
