import { StyleSheet, Text, View } from "react-native";
import { enabledGames } from "@/registries/gameRegistry";
import { colors, radius } from "@/shared/theme";

export function GameStage() {
  const games = enabledGames();

  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>GAME MODE</Text>
      <Text style={styles.title}>Choose a room game</Text>
      <View style={styles.grid}>
        {games.map((game) => (
          <View key={game.id} style={styles.card}>
            <Text style={styles.icon}>{game.icon}</Text>
            <Text style={styles.name}>{game.name}</Text>
            <Text style={styles.sub}>{game.supportsGamePk ? "Game PK" : "Room activity"}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 16 },
  eyebrow: { color: colors.cyan, fontSize: 8, fontWeight: "900", letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: 20, fontWeight: "900", marginTop: 5, marginBottom: 12 },
  grid: { flexDirection: "row", gap: 8 },
  card: { flex: 1, minHeight: 110, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: 12 },
  icon: { fontSize: 26 },
  name: { color: colors.text, fontWeight: "900", fontSize: 10, marginTop: 8 },
  sub: { color: colors.textMuted, fontSize: 7, marginTop: 3 },
});
