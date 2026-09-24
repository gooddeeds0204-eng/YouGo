import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors, radius } from "@/shared/theme";

const menu = [
  ["🎙", "Host Center", "Room stats, missions and moderation"],
  ["💞", "Couple Space", "Bond, gifts and memories"],
  ["🎁", "Gift Collection", "Received and couple gifts"],
  ["👀", "Profile Visitors", "Recent visitors"],
  ["🫶", "My Family", "Family level and missions"],
  ["🛍", "Store", "Frames, vehicles and effects"],
  ["🛡", "Safety & Privacy", "Blocking, reports and controls"],
];

export function ProfileScreen() {
  return (
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.avatar}><Text style={styles.avatarText}>Y</Text></View>
      <Text style={styles.name}>You</Text>
      <Text style={styles.id}>@yougo_user · ID 248520</Text>

      <View style={styles.badges}>
        <Text style={styles.badge}>LV.12</Text>
        <Text style={styles.badge}>VIP 2</Text>
        <Text style={styles.badge}>💎 3,480</Text>
      </View>

      <View style={styles.stats}>
        <View><Text style={styles.statValue}>12.8K</Text><Text style={styles.statLabel}>Followers</Text></View>
        <View><Text style={styles.statValue}>486</Text><Text style={styles.statLabel}>Following</Text></View>
        <View><Text style={styles.statValue}>1.2M</Text><Text style={styles.statLabel}>Charm</Text></View>
      </View>

      <View style={styles.menu}>
        {menu.map(([icon, title, sub]) => (
          <View key={title} style={styles.menuRow}>
            <Text style={styles.menuIcon}>{icon}</Text>
            <View style={styles.menuCopy}>
              <Text style={styles.menuTitle}>{title}</Text>
              <Text style={styles.menuSub}>{sub}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { alignItems: "center", paddingTop: 24, paddingBottom: 30 },
  avatar: { width: 94, height: 94, borderRadius: 47, backgroundColor: "#7336DF", borderWidth: 3, borderColor: colors.primary, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.text, fontSize: 34, fontWeight: "900" },
  name: { color: colors.text, fontSize: 28, fontWeight: "900", marginTop: 12 },
  id: { color: colors.textMuted, fontSize: 10, marginTop: 3 },
  badges: { flexDirection: "row", gap: 6, marginTop: 12 },
  badge: { color: colors.text, fontSize: 8, backgroundColor: colors.surface, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 },
  stats: { width: "100%", flexDirection: "row", justifyContent: "space-around", marginVertical: 22, paddingVertical: 16, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  statValue: { color: colors.text, fontWeight: "900", textAlign: "center" },
  statLabel: { color: colors.textMuted, fontSize: 8, marginTop: 3 },
  menu: { width: "100%", gap: 8 },
  menuRow: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: radius.lg, padding: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  menuIcon: { fontSize: 20 },
  menuCopy: { flex: 1 },
  menuTitle: { color: colors.text, fontWeight: "900", fontSize: 11 },
  menuSub: { color: colors.textMuted, fontSize: 8, marginTop: 3 },
  arrow: { color: colors.textMuted, fontSize: 22 },
});
