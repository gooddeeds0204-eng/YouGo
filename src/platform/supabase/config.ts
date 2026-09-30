export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

const UGO_PUBLIC_CONFIG: SupabasePublicConfig = {
  url: "https://ohbvkbglmfmlmbxlknpa.supabase.co",
  publishableKey: "sb_publishable_-MAnKiQ3jrMx33AIJa3WWw_HQS3cH_F",
};

export function getSupabasePublicConfig(): SupabasePublicConfig {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey =
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (url && publishableKey) {
    return { url, publishableKey };
  }

  // Publishable keys are client-side identifiers. This fallback keeps
  // the GitHub web preview and Expo builds connected to the Ugo project.
  return UGO_PUBLIC_CONFIG;
}

export function hasSupabaseConfig() {
  return true;
}
