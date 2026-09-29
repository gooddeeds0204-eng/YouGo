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
