export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey =
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey) return null;

  return { url, publishableKey };
}

export function hasSupabaseConfig() {
  return getSupabasePublicConfig() !== null;
}
