import { useLocalSearchParams } from "expo-router";
import { RoomShell } from "@/features/room/shell/RoomShell";

export default function RoomRoute() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  return <RoomShell roomId={roomId || "room"} />;
}
