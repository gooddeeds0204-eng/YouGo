import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { WelcomeHero } from "@/features/auth/components/WelcomeHero";
import { WelcomeFeatureStrip } from "@/features/auth/components/WelcomeFeatureStrip";
import { WelcomeRoomPreview } from "@/features/auth/components/WelcomeRoomPreview";
import { colors, radius, spacing } from "@/shared/theme";

export function WelcomeScreen() {
  return (
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.bgOrbOne} />
      <View style={styles.bgOrbTwo} />
      <View style={styles.bgOrbThree} />

      <View style={styles.heroCard}>
        <WelcomeHero />

        <View style={styles.copy}>
          <View style={styles.kicker}>
            <View style={styles.kickerDot} />
            <Text style={styles.kickerText}>WELCOME TO YOUGO</Text>
            <View style={styles.kickerDot} />
          </View>

          <Text style={styles.brand}>YouGo</Text>
          <Text style={styles.tagline}>TALK • PLAY • CONNECT</Text>

          <Text style={styles.headline}>
            Your people. Your room.{"\n"}
            <Text style={styles.headlineAccent}>Your vibe.</Text>
          </Text>

          <Text style={styles.body}>
            Meet, talk, play and build your world in live social rooms that never lose the vibe.
          </Text>

          <View style={styles.metrics}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>18K+</Text>
              <Text style={styles.metricLabel}>online now</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metric}>
              <Text style={styles.metricValue}>24/7</Text>
              <Text style={styles.metricLabel}>live rooms</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metric}>
              <Text style={styles.metricValue}>3</Text>
              <Text style={styles.metricLabel}>room modes</Text>
            </View>
          </View>
        </View>
      </View>

      <WelcomeRoomPreview />

      <WelcomeFeatureStrip />

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/language")}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <View style={styles.ctaShine} />
          <View style={styles.ctaDot} />
          <Text style={styles.ctaLabel}>START YOUR VIBE</Text>
          <View style={styles.arrowWrap}><Text style={styles.arrow}>→</Text></View>
        </Pressable>

        <Text style={styles.loginHint}>
          Already part of YouGo? <Text style={styles.loginAccent}>Sign in</Text>
        </Text>

        <Text style={styles.note}>
          By continuing, you agree to YouGo community and safety rules.
        </Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 6,
    paddingBottom: 24,
    gap: 14,
    overflow: "hidden",
  },
  bgOrbOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -150,
    right: -135,
    backgroundColor: "rgba(116,67,255,0.09)",
  },
  bgOrbTwo: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    left: -155,
    top: 250,
    backgroundColor: "rgba(232,60,185,0.055)",
  },
  bgOrbThree: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    right: -120,
    top: 590,
    backgroundColor: "rgba(43,203,255,0.035)",
  },
  heroCard: {
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingBottom: 20,
    backgroundColor: "rgba(255,255,255,0.018)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.055)",
  },
  copy: {
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  kicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  kickerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.cyan,
  },
  kickerText: {
    color: "#8E93A8",
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  brand: {
    color: colors.text,
    fontSize: 46,
    lineHeight: 50,
    fontWeight: "900",
    letterSpacing: -2.1,
    marginTop: 7,
  },
  tagline: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2.7,
    marginTop: 1,
  },
  headline: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 16,
  },
  headlineAccent: {
    color: "#B979FF",
  },
  body: {
    color: colors.textMuted,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 8,
    maxWidth: 320,
  },
  metrics: {
    width: "100%",
    marginTop: 18,
    minHeight: 52,
    borderRadius: radius.lg,
    backgroundColor: "rgba(255,255,255,0.025)",
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  metric: {
    flex: 1,
    alignItems: "center",
  },
  metricValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "900",
  },
  metricLabel: {
    color: "#767C91",
    fontSize: 6,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 22,
    backgroundColor: colors.border,
  },
  actions: {
    gap: 9,
    paddingTop: 3,
  },
  cta: {
    minHeight: 60,
    borderRadius: 20,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: colors.primary,
    shadowOpacity: 0.48,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  ctaShine: {
    position: "absolute",
    width: 130,
    height: 120,
    left: 22,
    top: -36,
    transform: [{ rotate: "20deg" }],
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  ctaDot: {
    position: "absolute",
    left: 18,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    opacity: 0.9,
  },
  ctaLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.25,
  },
  arrowWrap: {
    position: "absolute",
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  ctaPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  loginHint: {
    color: "#777D91",
    textAlign: "center",
    fontSize: 8,
    marginTop: 2,
  },
  loginAccent: {
    color: "#D4AAFF",
    fontWeight: "900",
  },
  note: {
    color: "#5D6273",
    textAlign: "center",
    fontSize: 7,
    lineHeight: 12,
  },
});
