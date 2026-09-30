import type { User } from "@supabase/supabase-js";
import { getSupabaseClient, requireSupabaseClient } from "@/platform/supabase/client";

export type SendOtpResult = {
  challengeId: string;
};

export type VerifyOtpResult = {
  userId: string;
  isNewUser: boolean;
};

export type AuthUser = {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  profileComplete: boolean;
  phone: string | null;
};

export interface AuthService {
  sendOtp(phone: string): Promise<SendOtpResult>;
  verifyOtp(challengeId: string, code: string): Promise<VerifyOtpResult>;
  signInWithPassword(phone: string, password: string): Promise<AuthUser>;
  getCurrentUser(): Promise<AuthUser | null>;
  signOut(): Promise<void>;
  onAuthStateChange(listener: (user: AuthUser | null) => void): () => void;
}

async function toAuthUser(user: User | null): Promise<AuthUser | null> {
  if (!user) return null;

  const supabase = requireSupabaseClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name, avatar_url, profile_complete")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.warn("Could not load profile for auth session:", error.message);
  }

  return {
    id: user.id,
    displayName:
      profile?.display_name ||
      user.user_metadata?.display_name ||
      user.user_metadata?.name ||
      user.phone ||
      "Ugo User",
    avatarUrl: profile?.avatar_url || user.user_metadata?.avatar_url || null,
    profileComplete: Boolean(profile?.profile_complete || user.user_metadata?.profile_complete),
    phone: user.phone || null,
  };
}

const supabaseAuthService: AuthService = {
  async sendOtp(phone) {
    const supabase = requireSupabaseClient();
    const fullPhone = "+91" + phone;

    const { error } = await supabase.auth.signInWithOtp({
      phone: fullPhone,
      options: { shouldCreateUser: true },
    });
    if (error) throw error;

    return { challengeId: "supabase:" + fullPhone };
  },

  async verifyOtp(challengeId, code) {
    const supabase = requireSupabaseClient();
    const phone = challengeId.replace(/^supabase:/, "");

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: "sms",
    });

    if (error) throw error;
    if (!data.user) throw new Error("OTP verification did not return a user.");

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("profile_complete")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) throw profileError;

    return {
      userId: data.user.id,
      isNewUser: !Boolean(profile?.profile_complete),
    };
  },

  async signInWithPassword(phone, password) {
    const supabase = requireSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      phone: "+91" + phone,
      password,
    });

    if (error) throw error;
    const user = await toAuthUser(data.user);
    if (!user) throw new Error("Login did not return a user.");
    return user;
  },

  async getCurrentUser() {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return toAuthUser(data.user);
  },

  async signOut() {
    const supabase = requireSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  onAuthStateChange(listener) {
    const supabase = getSupabaseClient();
    if (!supabase) return () => undefined;

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      void toAuthUser(session?.user ?? null)
        .then(listener)
        .catch(() => listener(null));
    });

    return () => data.subscription.unsubscribe();
  },
};

export const authService: AuthService = supabaseAuthService;
