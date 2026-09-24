export const featureFlags = {
  voiceRooms: true,
  videoRooms: true,
  gameRooms: true,
  roomPk: true,
  gamePk: true,
  gifts: true,
  vip: true,
  svip: true,
  couples: true,
  families: true,
  moments: true,
  photoWall: true,
  profileVisitors: true,
  monthlyEvents: true,
  luckyPocket: true,
  diamondHunt: true,
  spinWin: true,
} as const;

export type FeatureFlag = keyof typeof featureFlags;
