import type { RealtimeChannel, RealtimeEnvelope } from "@/contracts/realtime";
import { getSupabaseClient } from "@/platform/supabase/client";

export type RealtimeUnsubscribe = () => void;

export function subscribeToRoomMessages(
  roomId: string,
  listener: (event: RealtimeEnvelope) => void,
): RealtimeUnsubscribe {
  const supabase = getSupabaseClient();
  if (!supabase) return () => undefined;

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
