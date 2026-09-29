import type { RealtimeChannel, RealtimeEnvelope } from "@/contracts/realtime";
import { getSupabaseClient } from "@/platform/supabase/client";

export type RealtimeUnsubscribe = () => void;

export function subscribeToRoomMessages(
  roomId: string,
  listener: (event: RealtimeEnvelope) => void,
): RealtimeUnsubscribe {
  const supabase = getSupabaseClient();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(roomId);
  if (!supabase || !isUuid) return () => undefined;

  const channel = supabase
    .channel("room-chat:" + roomId)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "room_messages",
        filter: "room_id=eq." + roomId,
      },
      (payload) => {
        listener({
          channel: "room-chat" satisfies RealtimeChannel,
          event: "message.created",
          payload: payload.new,
          createdAt: new Date().toISOString(),
        });
      },
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
