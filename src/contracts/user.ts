export type UserId = string;

export type UserProfile = {
  id: UserId;
  displayName: string;
  username: string;
  avatarUrl?: string | null;
  level: number;
  vipLevel: number;
  svipLevel?: number;
  charm: number;
  wealth: number;
};
