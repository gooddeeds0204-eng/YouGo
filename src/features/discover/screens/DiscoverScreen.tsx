import { StyleSheet, Text, TextInput, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors, radius, spacing } from "@/shared/theme";

const categories = [
  ["🎙", "Voice rooms"],
  ["🎥", "Video rooms"],
  ["🎮", "Game rooms"],
  ["🎵", "Music"],
  ["💫", "Meet people"],
  ["🫶", "Families"],
];

export function DiscoverScreen() {
  return (
    <AppScreen scroll contentStyle={styles.screen}>
      <Text style={styles.eyebrow}>EXPLORE YOUGO</Text>
      <Text style={styles.title}>Discover</Text>
      <TextInput
        placeholder="Search users, room ID, family..."
        placeholderTextColor="#686D80"
        style={styles.search}
      />
      <View style={styles.filters}>
        {["For you", "🇮🇳 India", "🌍 Global", "Telugu", "Gaming"].map((item) => (
          <View key={item} style={styles.filter}><Text style={styles.filterText}>{item}</Text></View>
        ))}
      </View>
      <View style={styles.grid}>
        {categories.map(([icon, title]) => (
          <View key={title} style={styles.card}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSub}>Explore active communities</Text>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 18, paddingBottom: 28, gap: 14 },
  eyebrow: { color: colors.secondary, fontSize: 10, fontWeight: "900", letterSpacing: 1.3 },
  title: { color: colors.text, fontSize: 32, fontWeight: "900" },
  search: { minHeight: 50, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, color: colors.text, paddingHorizontal: spacing.lg },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  filter: { borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, paddingVertical: 8 },
  filterText: { color: colors.textMuted, fontSize: 10, fontWeight: "700" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  card: { width: "48.4%", minHeight: 128, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: 14 },
  icon: { fontSize: 28 },
  cardTitle: { color: colors.text, fontWeight: "900", marginTop: 12 },
  cardSub: { color: colors.textMuted, fontSize: 8, marginTop: 4 },
});
