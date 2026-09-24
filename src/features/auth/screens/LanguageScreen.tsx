import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { colors, radius } from "@/shared/theme";

const languages = [
  { code: "en", label: "English", helper: "Recommended", icon: "A" },
  { code: "te", label: "తెలుగు", helper: "Telugu", icon: "తె" },
  { code: "hi", label: "हिन्दी", helper: "Hindi", icon: "हि" },
] as const;

export function LanguageScreen() {
  const { draft, updateDraft } = useAuthDraft();

  return (
    <AuthShell
      step="1 / 4"
      title="Choose your language"
      subtitle="Pick one now. You can change it later in Settings."
    >
      <View style={styles.list}>
        {languages.map((item) => {
          const active = draft.language === item.code;
          return (
            <Pressable
              key={item.code}
              onPress={() => updateDraft({ language: item.code })}
              style={[styles.option, active && styles.optionActive]}
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

      <Pressable onPress={() => router.push("/login")} style={styles.cta}>
        <Text style={styles.ctaLabel}>CONTINUE</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </Pressable>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  list: { gap: 8 },
  option: {
    minHeight: 62,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#0D0F17",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
  },
  optionActive: {
    borderColor: "rgba(232,60,185,0.45)",
    backgroundColor: "#17101E",
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconActive: { backgroundColor: "rgba(232,60,185,0.12)" },
  iconText: { color: colors.text, fontSize: 13, fontWeight: "900" },
  copy: { flex: 1, marginLeft: 10 },
  label: { color: colors.text, fontSize: 12, fontWeight: "900" },
  helper: { color: colors.textMuted, fontSize: 7, marginTop: 3 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3F4455",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: colors.primary },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  cta: {
    minHeight: 52,
    borderRadius: 17,
    marginTop: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaLabel: { color: "#FFFFFF", fontSize: 11, fontWeight: "900", letterSpacing: 1.1 },
  ctaArrow: { position: "absolute", right: 17, color: "#FFFFFF", fontSize: 18 },
});
