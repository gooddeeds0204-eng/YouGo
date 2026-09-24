export type WalletBalance = {
  diamonds: number;
  coins: number;
  eventTokens: number;
  freeSpins: number;
};

export type WalletTransactionType =
  | "recharge"
  | "gift-send"
  | "gift-receive"
  | "reward"
  | "store-purchase";
