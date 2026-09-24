import { Pressable, StyleSheet, Text, View } from "react-native";
import { UgoMark } from "@/shared/ui/UgoMark";
import { colors } from "@/shared/theme";

type Props = {
  title?: string;
  subtitle?: string;
  onSearch?: () => void;
  onBell?: () => void;
};

export function DarkTopBar({ title = "Ugo", subtitle = "Live. Social. Together.", onSearch, onBell }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        <UgoMark size={34} light />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onSearch} style={styles.icon}><Text style={styles.iconText}>⌕</Text></Pressable>
        <Pressable onPress={onBell} style={styles.icon}>
          <Text style={styles.iconText}>♢</Text>
          <View style={styles.dot} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { color: colors.text, fontSize: 15, fontWeight: "900" },
  subtitle: { color: colors.textMuted, fontSize: 6.5, marginTop: 2 },
  actions: { flexDirection: "row", gap: 8 },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#11131E",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { color: colors.text, fontSize: 18 },
  dot: { position: "absolute", right: 8, top: 7, width: 5, height: 5, borderRadius: 3, backgroundColor: colors.primary },
});
