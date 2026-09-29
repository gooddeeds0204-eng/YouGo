import type { WalletBalance } from "@/contracts/wallet";
import { getSupabaseClient } from "@/platform/supabase/client";

export async function getMyWallet(): Promise<WalletBalance | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("wallets")
    .select("diamonds, coins, event_tokens, free_spins")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    diamonds: data.diamonds,
    coins: data.coins,
    eventTokens: data.event_tokens,
    freeSpins: data.free_spins,
  };
}


export type WalletTransactionRow = {
  id: string;
  type: string;
  currency: string;
  amount: number;
  createdAt: string;
};

export async function listMyWalletTransactions(limit = 20): Promise<WalletTransactionRow[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return [];

  const { data, error } = await supabase
    .from("wallet_transactions")
    .select("id, type, currency, amount, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    id: row.id,
    type: row.type,
    currency: row.currency,
    amount: row.amount,
    createdAt: row.created_at,
  }));
}
