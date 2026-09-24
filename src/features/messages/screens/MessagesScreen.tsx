import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors, radius } from "@/shared/theme";

const chats = [
  ["M", "Maya", "That PK was crazy 😂", "2m"],
  ["A", "Arjun", "Join our game room tonight?", "18m"],
  ["S", "Sana", "Sent you a couple gift 💞", "1h"],
  ["K", "Kiran", "Family event starts at 9!", "Yesterday"],
];

export function MessagesScreen() {
  return (
    <AppScreen scroll contentStyle={styles.screen}>
      <Text style={styles.eyebrow}>YOUR PEOPLE</Text>
      <Text style={styles.title}>Messages</Text>
      <View style={styles.tabs}>
        <Text style={styles.activeTab}>Chats</Text>
        <Text style={styles.tab}>Activity</Text>
        <Text style={styles.tab}>Requests</Text>
      </View>

      <View style={styles.list}>
        {chats.map(([avatar, name, message, time]) => (
          <View key={name} style={styles.row}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{avatar}</Text></View>
            <View style={styles.copy}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.time}>{time}</Text>
              </View>
              <Text style={styles.message}>{message}</Text>
            </View>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 18, paddingBottom: 28, gap: 12 },
  eyebrow: { color: colors.secondary, fontSize: 10, fontWeight: "900", letterSpacing: 1.3 },
  title: { color: colors.text, fontSize: 32, fontWeight: "900" },
  tabs: { flexDirection: "row", gap: 20, marginVertical: 8 },
  activeTab: { color: colors.text, fontWeight: "900", borderBottomWidth: 2, borderBottomColor: colors.primary, paddingBottom: 7 },
  tab: { color: colors.textMuted, fontWeight: "700", paddingBottom: 7 },
  list: { gap: 8 },
  row: { flexDirection: "row", gap: 11, backgroundColor: colors.surface, borderRadius: radius.lg, padding: 12, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#5D35D0", alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.text, fontWeight: "900" },
  copy: { flex: 1 },
  nameRow: { flexDirection: "row", justifyContent: "space-between" },
  name: { color: colors.text, fontWeight: "900" },
  time: { color: colors.textMuted, fontSize: 8 },
  message: { color: colors.textMuted, fontSize: 10, marginTop: 4 },
});
