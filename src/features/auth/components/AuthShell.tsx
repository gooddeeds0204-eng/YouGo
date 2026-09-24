import type { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors, radius } from "@/shared/theme";

type Props = PropsWithChildren<{
  step: string;
  title: string;
  subtitle: string;
  onBack?: () => void;
}>;

export function AuthShell({ step, title, subtitle, onBack, children }: Props) {
  return (
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <View style={styles.headerRow}>
        <Pressable
          accessibilityRole="button"
          onPress={onBack ?? (() => router.back())}
          style={styles.back}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <View style={styles.miniBrand}>
          <View style={styles.mark}><Text style={styles.markText}>YG</Text></View>
          <View>
            <Text style={styles.brand}>YouGo</Text>
            <Text style={styles.tag}>TALK • PLAY • CONNECT</Text>
          </View>
        </View>

        <View style={styles.stepPill}><Text style={styles.stepText}>{step}</Text></View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>WELCOME IN</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.card}>
        {children}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    paddingBottom: 28,
    gap: 22,
    overflow: "hidden",
  },
  glowOne: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    top: -150,
    right: -130,
    backgroundColor: "rgba(116,67,255,0.09)",
  },
  glowTwo: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    left: -150,
    top: 310,
    backgroundColor: "rgba(232,60,185,0.055)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.035)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 30,
    marginTop: -2,
  },
  miniBrand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  mark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#25133A",
    borderWidth: 1,
    borderColor: "#8145D8",
    alignItems: "center",
    justifyContent: "center",
  },
  markText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: -1,
  },
  brand: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "900",
  },
  tag: {
    color: "#747A90",
    fontSize: 5.5,
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 2,
  },
  stepPill: {
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.025)",
  },
  stepText: {
    color: "#A8ADBF",
    fontSize: 7,
    fontWeight: "900",
  },
  hero: {
    paddingTop: 14,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.8,
  },
  title: {
    color: colors.text,
    fontSize: 33,
    lineHeight: 37,
    fontWeight: "900",
    letterSpacing: -1.2,
    marginTop: 7,
    maxWidth: 330,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
    maxWidth: 330,
  },
  card: {
    borderRadius: 28,
    padding: 18,
    backgroundColor: "rgba(255,255,255,0.025)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
});
