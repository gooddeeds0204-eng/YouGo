import type { UserProfileDraft } from "@/domains/users/profile";
import type { UserProfile } from "@/contracts/user";
import { getSupabaseClient } from "@/platform/supabase/client";

export async function upsertMyProfile(userId: string, draft: UserProfileDraft) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      display_name: draft.displayName.trim(),
      username: draft.username.trim().toLowerCase(),
      avatar_url: draft.avatarUri ?? null,
      birth_date: draft.birthDate || null,
      gender: draft.gender,
      country: draft.country,
      language: draft.language,
      interests: draft.interests,
      profile_complete: true,
      updated_at: new Date().toISOString(),
    })
    .select("id, display_name, username, avatar_url, level, vip_level, charm, wealth")
    .single();

  if (error) throw error;

  return {
    id: data.id,
    displayName: data.display_name,
    username: data.username,
    avatarUrl: data.avatar_url,
    level: data.level,
    vipLevel: data.vip_level,
    charm: data.charm,
    wealth: data.wealth,
  } satisfies UserProfile;
}

export async function getProfile(userId: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, username, avatar_url, level, vip_level, charm, wealth")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    displayName: data.display_name,
    username: data.username,
    avatarUrl: data.avatar_url,
    level: data.level,
    vipLevel: data.vip_level,
    charm: data.charm,
    wealth: data.wealth,
  } satisfies UserProfile;
}
