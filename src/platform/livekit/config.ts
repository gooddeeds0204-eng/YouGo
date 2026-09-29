export function getLiveKitPublicUrl() {
  return process.env.EXPO_PUBLIC_LIVEKIT_URL?.trim() || null;
}

export function hasLiveKitConfig() {
  return Boolean(getLiveKitPublicUrl());
}
