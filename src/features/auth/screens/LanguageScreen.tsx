import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { colors, radius } from "@/shared/theme";

const languages = [
  { code: "en", label: "English", native: "English", icon: "A", helper: "Recommended" },
  { code: "te", label: "Telugu", native: "తెలుగు", icon: "తె", helper: "తెలుగులో కొనసాగించండి" },
  { code: "hi", label: "Hindi", native: "हिन्दी", icon: "हि", helper: "हिन्दी में जारी रखें" },
] as const;

export function LanguageScreen() {
  const { draft, updateDraft } = useAuthDraft();

  return (
    <AuthShell
      step="1 OF 4"
      title="Speak your language."
      subtitle="Choose how YouGo should talk to you. You can change this anytime."
    >
      <View style={styles.list}>
        {languages.map((item) => {
          const active = draft.language === item.code;
          return (
            <Pressable
              key={item.code}
              onPress={() => updateDraft({ language: item.code })}
              style={({ pressed }) => [
                styles.option,
                active && styles.optionActive,
                pressed && styles.optionPressed,
              ]}
            >
              <View style={[styles.icon, active && styles.iconActive]}>
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>

              <View style={styles.copy}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.helper}>{item.helper}</Text>
              </View>

              <View style={[styles.radio, active && styles.radioActive]}>
                {active ? <View style={styles.radioDot} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => router.push("/login")}
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
      >
        <Text style={styles.ctaLabel}>CONTINUE</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </Pressable>

      <Text style={styles.note}>YouGo supports more languages as the community grows.</Text>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  list: { gap: 10 },
  option: {
    minHeight: 74,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#0D0F18",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  optionActive: {
    borderColor: "rgba(182,97,255,0.55)",
    backgroundColor: "#171121",
  },
  optionPressed: { opacity: 0.9 },
  icon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.045)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconActive: { backgroundColor: "rgba(232,60,185,0.13)" },
  iconText: { color: colors.text, fontSize: 14, fontWeight: "900" },
  copy: { flex: 1, marginLeft: 12 },
  label: { color: colors.text, fontSize: 13, fontWeight: "900" },
  helper: { color: colors.textMuted, fontSize: 8, marginTop: 4 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#44495A",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  cta: {
    minHeight: 56,
    borderRadius: radius.lg,
    marginTop: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  ctaLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "900", letterSpacing: 1.2 },
  ctaArrow: { position: "absolute", right: 18, color: "#FFFFFF", fontSize: 20 },
  note: { color: "#646A7D", textAlign: "center", fontSize: 7, marginTop: 12 },
});
