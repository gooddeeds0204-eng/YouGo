import { getSupabaseClient } from "@/platform/supabase/client";

export type GiftSendResult = {
  giftEventId: string;
  diamondTotal: number;
  remainingDiamonds: number;
};

export async function sendGift(input: {
  giftId: string;
  quantity: number;
  roomId?: string | null;
  recipientId?: string | null;
}): Promise<GiftSendResult | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("send_gift", {
    p_gift_id: input.giftId,
    p_quantity: input.quantity,
    p_room_id: input.roomId ?? null,
    p_recipient_id: input.recipientId ?? null,
  });

  if (error) throw error;

  return {
    giftEventId: data.gift_event_id,
    diamondTotal: data.diamond_total,
    remainingDiamonds: data.remaining_diamonds,
  };
}
