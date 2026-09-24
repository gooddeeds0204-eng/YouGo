import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "@/shared/theme";

const items = [
  ["🎙", "Talk live", "Voice"],
  ["🎥", "Go face-to-face", "Video"],
  ["🎮", "Play together", "Games"],
  ["✨", "Stand out", "VIP & Gifts"],
];

export function WelcomeFeatureStrip() {
  return (
    <View style={styles.wrap}>
      {items.map(([icon, title, label]) => (
        <View key={label} style={styles.item}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
          <View style={styles.copy}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.label}>{label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  item: {
    width: "48.7%",
    minHeight: 58,
    borderRadius: radius.lg,
    backgroundColor: "rgba(255,255,255,0.025)",
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: "rgba(160,84,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 16 },
  copy: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    color: colors.text,
    fontSize: 8,
    fontWeight: "900",
  },
  label: {
    color: colors.textMuted,
    fontSize: 6.5,
    marginTop: 2,
  },
});
