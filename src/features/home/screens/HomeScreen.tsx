import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { colors, radius } from "@/shared/theme";
import { enabledGames } from "@/registries/gameRegistry";

const rooms = [
  { id: "late-night", title: "Late Night Talks ✨", type: "VOICE", online: "1.8K", accent: "#5B226A" },
  { id: "telugu-vibes", title: "Telugu Vibes 🔥", type: "TRENDING", online: "932", accent: "#114A64" },
  { id: "music-lounge", title: "Music Lounge 🎧", type: "MUSIC", online: "674", accent: "#53213F" },
  { id: "game-arena", title: "Game Arena ⚡", type: "GAME", online: "515", accent: "#263662" },
];

export function HomeScreen() {
  const games = enabledGames();

  return (
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>YouGo</Text>
          <Text style={styles.tagline}>Talk • Play • Connect</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.icon}><Text>⌕</Text></Pressable>
          <Pressable style={styles.icon}><Text>♢</Text></Pressable>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.live}>● LIVE NOW</Text>
        <Text style={styles.heroTitle}>Find your people.{"\n"}Own the vibe.</Text>
        <Text style={styles.heroBody}>Voice rooms, video hangouts and games in one persistent social space.</Text>
        <Pressable style={styles.heroButton} onPress={() => router.push("/room/late-night")}>
          <Text style={styles.heroButtonText}>Join featured room →</Text>
        </Pressable>
      </View>

      <View style={styles.quickRow}>
        {[
          ["🎉", "Events"],
          ["🏆", "Ranking"],
          ["🎮", "Games"],
          ["🫶", "Family"],
          ["✨", "Moments"],
          ["👑", "VIP"],
        ].map(([icon, label]) => (
          <Pressable key={label} style={styles.quickItem}>
            <Text style={styles.quickIcon}>{icon}</Text>
            <Text style={styles.quickLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <SectionTitle eyebrow="DISCOVER" title="Live rooms" />
      <View style={styles.roomGrid}>
        {rooms.map((room) => (
          <Pressable
            key={room.id}
            onPress={() => router.push({ pathname: "/room/[roomId]", params: { roomId: room.id } })}
            style={[styles.roomCard, { backgroundColor: room.accent }]}
          >
            <View style={styles.roomMeta}>
              <Text style={styles.roomType}>{room.type}</Text>
              <Text style={styles.roomOnline}>👥 {room.online}</Text>
            </View>
            <Text style={styles.roomEmoji}>{room.type === "GAME" ? "🎮" : room.type === "MUSIC" ? "🎵" : "🎙"}</Text>
            <Text style={styles.roomTitle}>{room.title}</Text>
            <Text style={styles.roomSub}>8 seats • Tap to join</Text>
          </Pressable>
        ))}
      </View>

      <SectionTitle eyebrow="PLUG-IN MODULES" title="Games ready to register" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gameRow}>
        {games.map((game) => (
          <View key={game.id} style={styles.gameCard}>
            <Text style={styles.gameIcon}>{game.icon}</Text>
            <Text style={styles.gameName}>{game.name}</Text>
            <Text style={styles.gameSub}>{game.supportsGamePk ? "Game PK ready" : "Solo/room activity"}</Text>
          </View>
        ))}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 8, paddingBottom: 28, gap: 18 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { color: colors.text, fontSize: 24, fontWeight: "900" },
  tagline: { color: colors.textMuted, fontSize: 9, marginTop: 2, letterSpacing: 0.8 },
  headerActions: { flexDirection: "row", gap: 8 },
  icon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  hero: { borderRadius: radius.xl, padding: 22, backgroundColor: "#251243", borderWidth: 1, borderColor: colors.border },
  live: { color: "#FF7CB7", fontSize: 9, fontWeight: "900" },
  heroTitle: { color: colors.text, fontSize: 29, fontWeight: "900", marginTop: 12, lineHeight: 31 },
  heroBody: { color: "#BABDCD", fontSize: 12, lineHeight: 18, marginTop: 10, maxWidth: 290 },
  heroButton: { marginTop: 18, alignSelf: "flex-start", backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 11, borderRadius: radius.md },
  heroButtonText: { color: colors.text, fontWeight: "900", fontSize: 11 },
  quickRow: { flexDirection: "row", justifyContent: "space-between", gap: 6 },
  quickItem: { flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: radius.md, backgroundColor: colors.surface },
  quickIcon: { fontSize: 20 },
  quickLabel: { color: colors.textMuted, fontSize: 8, fontWeight: "800", marginTop: 4 },
  roomGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  roomCard: { width: "48.4%", minHeight: 176, borderRadius: radius.lg, padding: 13, justifyContent: "space-between", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  roomMeta: { flexDirection: "row", justifyContent: "space-between" },
  roomType: { color: colors.text, fontSize: 8, fontWeight: "900" },
  roomOnline: { color: "#D8DAE5", fontSize: 8 },
  roomEmoji: { fontSize: 36, textAlign: "center" },
  roomTitle: { color: colors.text, fontWeight: "900", fontSize: 13 },
  roomSub: { color: "#C1C4D0", fontSize: 8 },
  gameRow: { gap: 10, paddingRight: 12 },
  gameCard: { width: 142, backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14, borderWidth: 1, borderColor: colors.border },
  gameIcon: { fontSize: 28 },
  gameName: { color: colors.text, fontWeight: "900", marginTop: 8 },
  gameSub: { color: colors.textMuted, fontSize: 8, marginTop: 4 },
});
