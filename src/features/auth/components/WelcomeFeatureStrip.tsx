import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "@/shared/theme";

const items = [
  ["🎙", "Voice"],
  ["🎥", "Video"],
  ["🎮", "Games"],
  ["🎁", "Gifts"],
];

export function WelcomeFeatureStrip() {
  return (
    <View style={styles.wrap}>
      {items.map(([icon, label]) => (
        <View key={label} style={styles.item}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 8,
  },
  item: {
    flex: 1,
    minHeight: 66,
    borderRadius: radius.lg,
    backgroundColor: "rgba(255,255,255,0.035)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 20 },
  label: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: "800",
    marginTop: 5,
  },
});
