import type { RoomMode } from "@/contracts/room";
import { getSupabaseClient } from "@/platform/supabase/client";
import { getSupabasePublicConfig } from "@/platform/supabase/config";

export type LiveKitCredentials = {
  token: string;
  url: string;
};

export async function getLiveKitCredentials(
  roomId: string,
  mode: RoomMode,
): Promise<LiveKitCredentials | null> {
  const supabase = getSupabaseClient();
  const supabaseConfig = getSupabasePublicConfig();

  if (!supabase || !supabaseConfig) return null;

  const { data } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;
  if (!accessToken) throw new Error("Sign in before joining live audio or video.");

  const response = await fetch(
    supabaseConfig.url + "/functions/v1/livekit-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        apikey: supabaseConfig.publishableKey,
      },
      body: JSON.stringify({ roomId, mode }),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Could not create LiveKit token.");
  }

  const json = (await response.json()) as LiveKitCredentials;
  return json;
}
