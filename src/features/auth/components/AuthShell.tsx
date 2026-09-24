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
      <View style={styles.headerRow}>
        <Pressable onPress={onBack ?? (() => router.back())} style={styles.back}>
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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.card}>{children}</View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    paddingBottom: 24,
    gap: 14,
    overflow: "hidden",
  },
  glowOne: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    top: -145,
    right: -135,
    backgroundColor: "rgba(116,67,255,0.07)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  back: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: colors.text, fontSize: 27, lineHeight: 29, marginTop: -2 },
  miniBrand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mark: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#211331",
    borderWidth: 1,
    borderColor: "#6F39B9",
    alignItems: "center",
    justifyContent: "center",
  },
  markText: { color: colors.text, fontWeight: "900", fontSize: 12, letterSpacing: -1 },
  brand: { color: colors.text, fontSize: 11, fontWeight: "900" },
  tag: { color: "#686D80", fontSize: 5, fontWeight: "900", letterSpacing: 0.9, marginTop: 2 },
  stepPill: {
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  stepText: { color: "#8F94A7", fontSize: 6.5, fontWeight: "900" },
  hero: { paddingTop: 12, paddingBottom: 4 },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 6,
    maxWidth: 335,
  },
  card: {
    borderRadius: 24,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.022)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
});
