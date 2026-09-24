import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "@/shared/theme";

const tiles = ["Maya", "Arjun", "Sana", "Join"];

export function VideoStage() {
  return (
    <View style={styles.wrap}>
      <View style={styles.grid}>
        {tiles.map((name, index) => (
          <View key={name} style={styles.tile}>
            <Text style={styles.avatar}>{index === 3 ? "+" : name[0]}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.note}>Video module owns camera grid and video controls only.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tile: { width: "48.8%", height: 150, borderRadius: radius.lg, backgroundColor: "#17213C", borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  avatar: { color: colors.text, fontSize: 30, fontWeight: "900" },
  name: { color: colors.text, fontSize: 9, fontWeight: "800", position: "absolute", left: 10, bottom: 9 },
  note: { color: colors.textMuted, textAlign: "center", fontSize: 8, marginTop: 10 },
});
