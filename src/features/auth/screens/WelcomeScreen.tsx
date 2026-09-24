import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { WelcomeHero } from "@/features/auth/components/WelcomeHero";
import { WelcomeFeatureStrip } from "@/features/auth/components/WelcomeFeatureStrip";
import { colors, radius, spacing } from "@/shared/theme";

export function WelcomeScreen() {
  return (
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.topGlowOne} />
      <View style={styles.topGlowTwo} />

      <WelcomeHero />

      <View style={styles.copy}>
        <View style={styles.kickerRow}>
          <View style={styles.kickerDot} />
          <Text style={styles.kicker}>WELCOME TO THE PARTY</Text>
          <View style={styles.kickerDot} />
        </View>

        <Text style={styles.brand}>YouGo</Text>
        <Text style={styles.tagline}>TALK • PLAY • CONNECT</Text>

        <Text style={styles.headline}>
          Where conversations{"\n"}
          <Text style={styles.headlineAccent}>turn into connections.</Text>
        </Text>

        <Text style={styles.body}>
          Join live voice rooms, video hangouts, games and communities built around your vibe.
        </Text>
      </View>

      <WelcomeFeatureStrip />

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/language")}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <View style={styles.ctaGlow} />
          <Text style={styles.ctaLabel}>ENTER YOUGO</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </Pressable>

        <View style={styles.socialProof}>
          <View style={styles.avatarStack}>
            <View style={[styles.avatar, styles.avatarA]}><Text style={styles.avatarText}>M</Text></View>
            <View style={[styles.avatar, styles.avatarB]}><Text style={styles.avatarText}>A</Text></View>
            <View style={[styles.avatar, styles.avatarC]}><Text style={styles.avatarText}>S</Text></View>
          </View>
          <View style={styles.proofCopy}>
            <Text style={styles.proofTitle}>Live rooms are happening now</Text>
            <Text style={styles.proofSub}>Find your people. Own the vibe.</Text>
          </View>
        </View>

        <Text style={styles.note}>
          By continuing, you agree to YouGo community and safety rules.
        </Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 0,
    paddingBottom: 22,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  topGlowOne: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    top: -170,
    right: -160,
    backgroundColor: "rgba(116,67,255,0.10)",
  },
  topGlowTwo: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    left: -170,
    top: 170,
    backgroundColor: "rgba(232,60,185,0.07)",
  },
  copy: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  kickerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  kickerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.cyan,
  },
  kicker: {
    color: "#9EA3B8",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  brand: {
    color: colors.text,
    fontSize: 48,
    lineHeight: 54,
    fontWeight: "900",
    letterSpacing: -2,
  },
  tagline: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.5,
    marginTop: 2,
  },
  headline: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 18,
  },
  headlineAccent: {
    color: "#C282FF",
  },
  body: {
    color: colors.textMuted,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 11,
    maxWidth: 330,
  },
  actions: {
    gap: 12,
  },
  cta: {
    minHeight: 58,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: colors.primary,
    shadowOpacity: 0.45,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  ctaGlow: {
    position: "absolute",
    width: "38%",
    height: 120,
    left: -12,
    top: -32,
    transform: [{ rotate: "22deg" }],
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  ctaPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  ctaLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  ctaArrow: {
    position: "absolute",
    right: 20,
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  socialProof: {
    minHeight: 58,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.03)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  avatarStack: {
    width: 76,
    flexDirection: "row",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarA: { backgroundColor: "#7F3FD9" },
  avatarB: { backgroundColor: "#D93F86", marginLeft: -8 },
  avatarC: { backgroundColor: "#2B8FBE", marginLeft: -8 },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  proofCopy: { flex: 1 },
  proofTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: "900",
  },
  proofSub: {
    color: colors.textMuted,
    fontSize: 7,
    marginTop: 2,
  },
  note: {
    color: "#666B7E",
    textAlign: "center",
    fontSize: 8,
    lineHeight: 13,
  },
});
