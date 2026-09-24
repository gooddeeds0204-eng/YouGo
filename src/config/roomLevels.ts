export type RoomLevelRule = {
  minLevel: number;
  seats: number;
};

export const roomLevelRules: RoomLevelRule[] = [
  { minLevel: 1, seats: 8 },
  { minLevel: 5, seats: 12 },
  { minLevel: 10, seats: 16 },
  { minLevel: 20, seats: 20 },
  { minLevel: 30, seats: 27 },
];

export function seatsForRoomLevel(level: number) {
  return roomLevelRules.reduce(
    (current, rule) => (level >= rule.minLevel ? rule.seats : current),
    8,
  );
}
