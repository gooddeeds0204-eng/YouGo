export type RealtimeChannel =
  | "room-state"
  | "room-chat"
  | "private-chat"
  | "gifts"
  | "pk"
  | "game"
  | "notifications";

export type RealtimeEnvelope<TPayload = unknown> = {
  channel: RealtimeChannel;
  event: string;
  payload: TPayload;
  createdAt: string;
};
