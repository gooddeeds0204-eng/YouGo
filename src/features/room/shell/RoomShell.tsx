import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import type { RoomMode } from "@/contracts/room";
import { seatsForRoomLevel } from "@/config/roomLevels";
import { RoomModeTabs } from "@/features/room/components/RoomModeTabs";
import { VoiceStage } from "@/features/room/voice/VoiceStage";
import { VideoStage } from "@/features/room/video/VideoStage";
import { GameStage } from "@/features/room/game-mode/GameStage";
import { RoomAudienceBar } from "@/features/room/audience/RoomAudienceBar";
import { RoomToolsPreview } from "@/features/room/tools/RoomToolsPreview";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors, radius, spacing } from "@/shared/theme";

type Props = {
  roomId: string;
};

export function RoomShell({ roomId }: Props) {
  const [mode, setMode] = useState<RoomMode>("voice");
  const roomLevel = 1;
  const seatCount = seatsForRoomLevel(roomLevel);

  return (
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => router.back()}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.roomName}>Late Night Talks ✨</Text>
          <Text style={styles.meta}>#{roomId} · LV.{roomLevel} · 1.8K online</Text>
        </View>
        <Pressable style={styles.more}><Text style={styles.moreText}>•••</Text></Pressable>
      </View>

      <RoomModeTabs mode={mode} onChange={setMode} />

      {mode === "voice" ? <VoiceStage seatCount={seatCount} /> : null}
      {mode === "video" ? <VideoStage /> : null}
      {mode === "game" ? <GameStage /> : null}

      <RoomAudienceBar />
      <RoomToolsPreview />

      <View style={styles.bottomBar}>
        <Pressable style={styles.control}><Text>🎤</Text><Text style={styles.controlLabel}>Mic</Text></Pressable>
        <Pressable style={styles.control}><Text>🎵</Text><Text style={styles.controlLabel}>Music</Text></Pressable>
        <Pressable style={[styles.control, styles.gift]}><Text>🎁</Text><Text style={styles.controlLabel}>Gift</Text></Pressable>
        <Pressable style={styles.control}><Text>🎮</Text><Text style={styles.controlLabel}>Games</Text></Pressable>
        <Pressable style={styles.control}><Text>•••</Text><Text style={styles.controlLabel}>More</Text></Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 4, paddingBottom: 12 },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  back: { width: 38, height: 38, borderRadius: radius.md, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  backText: { color: colors.text, fontSize: 28, marginTop: -3 },
  headerCopy: { flex: 1 },
  roomName: { color: colors.text, fontSize: 15, fontWeight: "900" },
  meta: { color: colors.textMuted, fontSize: 8, marginTop: 3 },
  more: { width: 38, height: 38, borderRadius: radius.md, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  moreText: { color: colors.text },
  bottomBar: { marginTop: "auto", flexDirection: "row", justifyContent: "space-around", paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  control: { alignItems: "center", minWidth: 52, gap: 3 },
  gift: { transform: [{ scale: 1.08 }] },
  controlLabel: { color: colors.textMuted, fontSize: 7 },
});
