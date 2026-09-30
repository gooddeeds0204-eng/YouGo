import type { ImagePickerAsset } from "expo-image-picker";
import { requireSupabaseClient } from "@/platform/supabase/client";

function extensionForAsset(asset: ImagePickerAsset) {
  const fromName = asset.fileName?.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName;
  if (asset.mimeType === "image/png") return "png";
  if (asset.mimeType === "image/webp") return "webp";
  return "jpg";
}

export async function uploadMyAvatar(userId: string, asset: ImagePickerAsset) {
  const supabase = requireSupabaseClient();
  const response = await fetch(asset.uri);
  const bytes = await response.arrayBuffer();
  const ext = extensionForAsset(asset);
  const path = `${userId}/avatar.${ext}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(path, bytes, {
      contentType: asset.mimeType || "image/jpeg",
      upsert: true,
      cacheControl: "3600",
    });

  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  return data.publicUrl + "?v=" + Date.now();
}
