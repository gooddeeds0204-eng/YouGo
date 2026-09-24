export type RoomToolGroup = "basic" | "entertainment" | "other";

export type RoomToolManifest = {
  id: string;
  title: string;
  icon: string;
  group: RoomToolGroup;
  enabled: boolean;
};

export const roomToolRegistry: RoomToolManifest[] = [
  { id: "members", title: "Members", icon: "👥", group: "basic", enabled: true },
  { id: "room-settings", title: "Room settings", icon: "⚙️", group: "basic", enabled: true },
  { id: "seat-settings", title: "Seat settings", icon: "💺", group: "basic", enabled: true },
  { id: "broadcast", title: "Broadcast", icon: "📢", group: "basic", enabled: true },
  { id: "room-pk", title: "Room PK", icon: "⚔️", group: "entertainment", enabled: true },
  { id: "game-pk", title: "Game PK", icon: "🏁", group: "entertainment", enabled: true },
  { id: "games", title: "Games", icon: "🎮", group: "entertainment", enabled: true },
  { id: "music", title: "Music", icon: "🎵", group: "entertainment", enabled: true },
  { id: "lucky-pocket", title: "Lucky Pocket", icon: "🧧", group: "other", enabled: true },
  { id: "entry-effects", title: "Entry effects", icon: "✨", group: "other", enabled: true },
];
