import type { RoomMode, RoomState } from "@/contracts/room";
import { getSupabaseClient } from "@/platform/supabase/client";

export type RoomMessage = {
  id: string;
  roomId: string;
  senderId: string;
  type: "text" | "system" | "gift" | "entry" | "announcement";
  body: string | null;
  createdAt: string;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function mapRoom(data: any): RoomState {
  return {
    id: data.id,
    name: data.name,
    ownerId: data.owner_id,
    level: data.level,
    mode: data.mode,
    audienceCount: data.audience_count,
  };
}

export async function createRoom(input: {
  name: string;
  mode: RoomMode;
  privacy: "public" | "private";
}) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data: auth } = await supabase.auth.getUser();
  const ownerId = auth.user?.id;
  if (!ownerId) return null;

  const { data, error } = await supabase
    .from("rooms")
    .insert({
      owner_id: ownerId,
      name: input.name.trim(),
      mode: input.mode,
      privacy: input.privacy,
    })
    .select("id, name, owner_id, level, mode, audience_count")
    .single();

  if (error) throw error;
  return mapRoom(data);
}

export async function getRoom(roomId: string) {
  const supabase = getSupabaseClient();
  if (!supabase || !isUuid(roomId)) return null;

  const { data, error } = await supabase
    .from("rooms")
    .select("id, name, owner_id, level, mode, audience_count")
    .eq("id", roomId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRoom(data) : null;
}

export async function joinRoom(roomId: string) {
  const supabase = getSupabaseClient();
  if (!supabase || !isUuid(roomId)) return;

  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return;

  const { error } = await supabase
    .from("room_members")
    .upsert(
      { room_id: roomId, user_id: userId, role: "member" },
      { onConflict: "room_id,user_id", ignoreDuplicates: true },
    );

  if (error) throw error;
}

export async function setRoomMode(roomId: string, mode: RoomMode) {
  const supabase = getSupabaseClient();
  if (!supabase || !isUuid(roomId)) return null;

  const { data, error } = await supabase
    .from("rooms")
    .update({ mode, updated_at: new Date().toISOString() })
    .eq("id", roomId)
    .select("id, name, owner_id, level, mode, audience_count")
    .single();

  if (error) throw error;
  return mapRoom(data);
}

export async function listRoomMessages(roomId: string, limit = 30): Promise<RoomMessage[]> {
  const supabase = getSupabaseClient();
  if (!supabase || !isUuid(roomId)) return [];

  const { data, error } = await supabase
    .from("room_messages")
    .select("id, room_id, sender_id, type, body, created_at")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    id: row.id,
    roomId: row.room_id,
    senderId: row.sender_id,
    type: row.type,
    body: row.body,
    createdAt: row.created_at,
  }));
}

export async function sendRoomMessage(roomId: string, body: string) {
  const supabase = getSupabaseClient();
  if (!supabase || !isUuid(roomId)) return null;

  const clean = body.trim();
  if (!clean) return null;

  const { data: auth } = await supabase.auth.getUser();
  const senderId = auth.user?.id;
  if (!senderId) return null;

  const { data, error } = await supabase
    .from("room_messages")
    .insert({
      room_id: roomId,
      sender_id: senderId,
      type: "text",
      body: clean.slice(0, 500),
    })
    .select("id, room_id, sender_id, type, body, created_at")
    .single();

  if (error) throw error;

  return {
    id: data.id,
    roomId: data.room_id,
    senderId: data.sender_id,
    type: data.type,
    body: data.body,
    createdAt: data.created_at,
  } as RoomMessage;
}
