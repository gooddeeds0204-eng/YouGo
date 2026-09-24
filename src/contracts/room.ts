export type RoomMode = "voice" | "video" | "game";

export type RoomRole = "owner" | "admin" | "moderator" | "member";

export type RoomIdentity = {
  id: string;
  name: string;
  ownerId: string;
  level: number;
};

export type RoomState = RoomIdentity & {
  mode: RoomMode;
  audienceCount: number;
};

export interface RoomModeAdapter {
  mode: RoomMode;
  enter(room: RoomIdentity): Promise<void>;
  leave(roomId: string): Promise<void>;
}
