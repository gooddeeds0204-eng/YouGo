import { StyleSheet, Text, View } from "react-native";
import { roomToolRegistry } from "@/registries/roomToolRegistry";
import { colors, radius } from "@/shared/theme";

export function RoomToolsPreview() {
  const tools = roomToolRegistry.filter((tool) => tool.enabled && tool.group === "basic").slice(0, 4);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Basic room tools</Text>
      <View style={styles.row}>
        {tools.map((tool) => (
          <View key={tool.id} style={styles.tool}>
            <Text style={styles.icon}>{tool.icon}</Text>
            <Text style={styles.label}>{tool.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 22 },
  title: { color: colors.text, fontWeight: "900", fontSize: 12 },
  row: { flexDirection: "row", gap: 8, marginTop: 10 },
  tool: { flex: 1, minHeight: 68, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 },
  icon: { fontSize: 20 },
  label: { color: colors.textMuted, fontSize: 7, textAlign: "center", marginTop: 4 },
});
