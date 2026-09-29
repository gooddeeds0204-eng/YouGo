import type { User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/platform/supabase/client";

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
};

export interface AuthService {
  sendOtp(phone: string): Promise<SendOtpResult>;
  verifyOtp(challengeId: string, code: string): Promise<VerifyOtpResult>;
  signInWithPassword(phone: string, password: string): Promise<AuthUser>;
  getCurrentUser(): Promise<AuthUser | null>;
  signOut(): Promise<void>;
  onAuthStateChange(listener: (user: AuthUser | null) => void): () => void;
}

function toAuthUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    id: user.id,
    displayName:
      user.user_metadata?.display_name ||
      user.user_metadata?.name ||
      user.phone ||
      "Ugo User",
  };
}

const demoAuthService: AuthService = {
  async sendOtp(phone) {
    return { challengeId: "demo:" + phone };
  },
  async verifyOtp(challengeId, code) {
    if (!challengeId.startsWith("demo:") || code.length !== 6) {
      throw new Error("Invalid demo OTP");
    }
    return { userId: "demo-user", isNewUser: true };
  },
  async signInWithPassword(phone, password) {
    if (phone.length !== 10 || password.length < 4) {
      throw new Error("Invalid demo credentials");
    }
    return { id: "demo-user", displayName: "Ugo User" };
  },
  async getCurrentUser() {
    return null;
  },
  async signOut() {},
  onAuthStateChange() {
    return () => undefined;
  },
};

const supabaseAuthService: AuthService = {
  async sendOtp(phone) {
    const supabase = getSupabaseClient();
    if (!supabase) return demoAuthService.sendOtp(phone);

    const fullPhone = "+91" + phone;
    const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone });
    if (error) throw error;

    return { challengeId: "supabase:" + fullPhone };
  },

  async verifyOtp(challengeId, code) {
    const supabase = getSupabaseClient();
    if (!supabase) return demoAuthService.verifyOtp(challengeId, code);

    const phone = challengeId.replace(/^supabase:/, "");
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: "sms",
    });

    if (error) throw error;
    if (!data.user) throw new Error("OTP verification did not return a user.");

    return {
      userId: data.user.id,
      isNewUser: !Boolean(data.user.user_metadata?.profile_complete),
    };
  },

  async signInWithPassword(phone, password) {
    const supabase = getSupabaseClient();
    if (!supabase) return demoAuthService.signInWithPassword(phone, password);

    const { data, error } = await supabase.auth.signInWithPassword({
      phone: "+91" + phone,
      password,
    });

    if (error) throw error;
    const user = toAuthUser(data.user);
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
    const supabase = getSupabaseClient();
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  onAuthStateChange(listener) {
    const supabase = getSupabaseClient();
    if (!supabase) return () => undefined;

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      listener(toAuthUser(session?.user ?? null));
    });

    return () => data.subscription.unsubscribe();
  },
};

export const authService: AuthService = supabaseAuthService;
export { demoAuthService };
