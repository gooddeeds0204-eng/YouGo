import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { colors, radius, spacing } from "@/shared/theme";

export function WelcomeScreen() {
  return (
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>YG</Text>
        <Text style={styles.play}>▶</Text>
      </View>

      <View style={styles.copy}>
        <Text style={styles.brand}>YouGo</Text>
        <Text style={styles.tagline}>Talk • Play • Connect</Text>
        <Text style={styles.body}>
          Live rooms, video hangouts, games, gifts and communities — all in one place.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Get started" onPress={() => router.push("/login")} />
        <Text style={styles.note}>By continuing, you agree to YouGo community and safety rules.</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
    paddingTop: 72,
    paddingBottom: 28,
  },
  logo: {
    width: 106,
    height: 106,
    alignSelf: "center",
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#281049",
    borderWidth: 1,
    borderColor: "#B04CFF",
  },
  logoText: {
    color: colors.text,
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -5,
  },
  play: {
    position: "absolute",
    color: colors.primary,
    fontSize: 12,
  },
  copy: {
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  brand: {
    color: colors.text,
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  tagline: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  body: {
    marginTop: spacing.md,
    color: colors.textMuted,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.md,
  },
  note: {
    color: colors.textMuted,
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
  },
});
