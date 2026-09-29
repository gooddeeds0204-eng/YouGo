import type { RoomMode, RoomState } from "@/contracts/room";
import { getSupabaseClient } from "@/platform/supabase/client";

export async function createRoom(input: {
  name: string;
  mode: RoomMode;
  privacy: "public" | "private";
}) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data: auth } = await supabase.auth.getUser();
  const ownerId = auth.user?.id;
  if (!ownerId) throw new Error("Sign in before creating a room.");

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

  return {
    id: data.id,
    name: data.name,
    ownerId: data.owner_id,
    level: data.level,
    mode: data.mode,
    audienceCount: data.audience_count,
  } satisfies RoomState;
}

export async function setRoomMode(roomId: string, mode: RoomMode) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("rooms")
    .update({ mode, updated_at: new Date().toISOString() })
    .eq("id", roomId)
    .select("id, name, owner_id, level, mode, audience_count")
    .single();

  if (error) throw error;

  return {
    id: data.id,
    name: data.name,
    ownerId: data.owner_id,
    level: data.level,
    mode: data.mode,
    audienceCount: data.audience_count,
  } satisfies RoomState;
}
