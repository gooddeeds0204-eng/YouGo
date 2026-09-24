import { Pressable, StyleSheet, Text, View } from "react-native";
import type { RoomMode } from "@/contracts/room";
import { colors, radius } from "@/shared/theme";

type Props = {
  mode: RoomMode;
  onChange: (mode: RoomMode) => void;
};

export function RoomModeTabs({ mode, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      {(["voice", "video", "game"] as RoomMode[]).map((item) => (
        <Pressable
          key={item}
          onPress={() => onChange(item)}
          style={[styles.tab, mode === item && styles.active]}
        >
          <Text style={[styles.text, mode === item && styles.activeText]}>
            {item === "voice" ? "🎙 Voice" : item === "video" ? "🎥 Video" : "🎮 Game"}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 5,
    marginTop: 14,
  },
  tab: { flex: 1, paddingVertical: 9, borderRadius: radius.sm, alignItems: "center" },
  active: { backgroundColor: "#6A39D5" },
  text: { color: colors.textMuted, fontSize: 9, fontWeight: "800" },
  activeText: { color: colors.text },
});
