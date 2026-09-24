import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import type { RoomMode } from "@/contracts/room";
import { seatsForRoomLevel } from "@/config/roomLevels";
import { roomToolRegistry } from "@/registries/roomToolRegistry";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors, radius, spacing } from "@/shared/theme";

type Props = {
  roomId: string;
};

export function RoomShell({ roomId }: Props) {
  const [mode, setMode] = useState<RoomMode>("voice");
  const roomLevel = 1;
  const seatCount = seatsForRoomLevel(roomLevel);
  const basicTools = useMemo(
    () => roomToolRegistry.filter((tool) => tool.enabled && tool.group === "basic"),
    [],
  );

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

      <View style={styles.modeTabs}>
        {(["voice", "video", "game"] as RoomMode[]).map((item) => (
          <Pressable key={item} onPress={() => setMode(item)} style={[styles.modeTab, mode === item && styles.modeTabActive]}>
            <Text style={[styles.modeText, mode === item && styles.modeTextActive]}>
              {item === "voice" ? "🎙 Voice" : item === "video" ? "🎥 Video" : "🎮 Game"}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.stage}>
        <Text style={styles.stageEyebrow}>PERSISTENT ROOM SHELL</Text>
        <Text style={styles.stageTitle}>{mode.toUpperCase()} MODE</Text>
        <Text style={styles.stageBody}>
          Room ID, roles, audience, chat, gifts, VIP state and event state remain unchanged while modes switch.
        </Text>
      </View>

      <View style={styles.seatGrid}>
        {Array.from({ length: seatCount }).map((_, index) => (
          <View key={index} style={styles.seat}>
            <View style={[styles.avatar, index === 0 && styles.hostAvatar]}>
              <Text style={styles.avatarText}>{index === 0 ? "M" : "+"}</Text>
            </View>
            <Text style={styles.seatName}>{index === 0 ? "👑 Maya" : "Seat " + (index + 1)}</Text>
            <Text style={styles.seatRole}>{index === 0 ? "OWNER" : "OPEN"}</Text>
          </View>
        ))}
      </View>

      <View style={styles.toolPreview}>
        <Text style={styles.toolTitle}>Basic room tools</Text>
        <View style={styles.toolRow}>
          {basicTools.slice(0, 4).map((tool) => (
            <View key={tool.id} style={styles.tool}>
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <Text style={styles.toolLabel}>{tool.title}</Text>
            </View>
          ))}
        </View>
      </View>

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
  back: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  backText: { color: colors.text, fontSize: 28, marginTop: -3 },
  headerCopy: { flex: 1 },
  roomName: { color: colors.text, fontSize: 15, fontWeight: "900" },
  meta: { color: colors.textMuted, fontSize: 8, marginTop: 3 },
  more: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  moreText: { color: colors.text },
  modeTabs: { flexDirection: "row", backgroundColor: colors.surface, borderRadius: radius.md, padding: 5, marginTop: 14 },
  modeTab: { flex: 1, paddingVertical: 9, borderRadius: radius.sm, alignItems: "center" },
  modeTabActive: { backgroundColor: "#6A39D5" },
  modeText: { color: colors.textMuted, fontSize: 9, fontWeight: "800" },
  modeTextActive: { color: colors.text },
  stage: { marginTop: 14, borderRadius: radius.lg, backgroundColor: "#22133C", borderWidth: 1, borderColor: colors.border, padding: 16 },
  stageEyebrow: { color: colors.primary, fontSize: 8, fontWeight: "900", letterSpacing: 1.1 },
  stageTitle: { color: colors.text, fontSize: 22, fontWeight: "900", marginTop: 5 },
  stageBody: { color: colors.textMuted, fontSize: 9, lineHeight: 14, marginTop: 6 },
  seatGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 18, rowGap: 18 },
  seat: { width: "25%", alignItems: "center" },
  avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  hostAvatar: { backgroundColor: "#7434C9", borderColor: colors.primary, borderWidth: 2 },
  avatarText: { color: colors.text, fontWeight: "900" },
  seatName: { color: colors.text, fontSize: 8, fontWeight: "800", marginTop: 6 },
  seatRole: { color: colors.textMuted, fontSize: 6, marginTop: 2 },
  toolPreview: { marginTop: 22 },
  toolTitle: { color: colors.text, fontWeight: "900", fontSize: 12 },
  toolRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  tool: { flex: 1, minHeight: 68, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 },
  toolIcon: { fontSize: 20 },
  toolLabel: { color: colors.textMuted, fontSize: 7, textAlign: "center", marginTop: 4 },
  bottomBar: { marginTop: "auto", flexDirection: "row", justifyContent: "space-around", paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  control: { alignItems: "center", minWidth: 52, gap: 3 },
  gift: { transform: [{ scale: 1.08 }] },
  controlLabel: { color: colors.textMuted, fontSize: 7 },
});
