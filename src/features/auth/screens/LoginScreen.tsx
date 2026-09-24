import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";
import {
  isValidIndianPhone,
  normalizeIndianPhone,
} from "@/domains/users/profileRules";
import { colors, radius } from "@/shared/theme";

export function LoginScreen() {
  const { draft, updateDraft } = useAuthDraft();
  const [phone, setPhone] = useState(draft.phone);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const normalized = normalizeIndianPhone(phone);
    if (!isValidIndianPhone(normalized) || busy) return;

    setBusy(true);
    updateDraft({ phone: normalized });
    const result = await demoAuthService.sendOtp(normalized);
    setBusy(false);

    router.push({
      pathname: "/otp",
      params: { challengeId: result.challengeId },
    });
  };

  const valid = isValidIndianPhone(phone);

  return (
    <AuthShell
      step="2 OF 4"
      title="Your number. Your identity."
      subtitle="We’ll send a secure 6-digit OTP. Your number stays private from other users."
    >
      <View style={styles.security}>
        <View style={styles.securityIcon}><Text style={styles.securityIconText}>✦</Text></View>
        <View style={styles.securityCopy}>
          <Text style={styles.securityTitle}>Private by default</Text>
          <Text style={styles.securitySub}>Phone numbers are used only for account verification.</Text>
        </View>
      </View>

      <Text style={styles.label}>MOBILE NUMBER</Text>

      <View style={[styles.phoneRow, valid && styles.phoneRowValid]}>
        <View style={styles.country}>
          <Text style={styles.flag}>🇮🇳</Text>
          <Text style={styles.code}>+91</Text>
        </View>
        <View style={styles.divider} />
        <TextInput
          value={phone}
          onChangeText={(value) => setPhone(normalizeIndianPhone(value))}
          keyboardType="phone-pad"
          placeholder="98765 43210"
          placeholderTextColor="#5F6577"
          style={styles.input}
          maxLength={10}
          autoFocus
        />
        {valid ? <Text style={styles.validMark}>✓</Text> : null}
      </View>

      <View style={styles.quickInfo}>
        <View style={styles.infoItem}><Text style={styles.infoIcon}>⚡</Text><Text style={styles.infoText}>Fast OTP</Text></View>
        <View style={styles.infoItem}><Text style={styles.infoIcon}>🛡</Text><Text style={styles.infoText}>Secure</Text></View>
        <View style={styles.infoItem}><Text style={styles.infoIcon}>🔒</Text><Text style={styles.infoText}>Private</Text></View>
      </View>

      <Pressable
        disabled={!valid || busy}
        onPress={submit}
        style={({ pressed }) => [
          styles.cta,
          (!valid || busy) && styles.ctaDisabled,
          pressed && valid && !busy && styles.ctaPressed,
        ]}
      >
        <Text style={styles.ctaLabel}>{busy ? "SENDING OTP..." : "SEND OTP"}</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </Pressable>

      <Text style={styles.legal}>Standard SMS charges may apply depending on your carrier.</Text>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  security: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: radius.lg,
    padding: 12,
    backgroundColor: "rgba(116,67,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(116,67,255,0.16)",
  },
  securityIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(232,60,185,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  securityIconText: { color: "#D59CFF", fontSize: 16 },
  securityCopy: { flex: 1 },
  securityTitle: { color: colors.text, fontSize: 9, fontWeight: "900" },
  securitySub: { color: colors.textMuted, fontSize: 7, lineHeight: 11, marginTop: 3 },
  label: {
    color: "#777D91",
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1.3,
    marginTop: 18,
    marginBottom: 7,
  },
  phoneRow: {
    minHeight: 62,
    borderRadius: radius.lg,
    backgroundColor: "#0C0E16",
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  phoneRowValid: { borderColor: "rgba(57,217,138,0.42)" },
  country: { flexDirection: "row", alignItems: "center", gap: 7 },
  flag: { fontSize: 18 },
  code: { color: colors.text, fontWeight: "900", fontSize: 13 },
  divider: { width: 1, height: 24, backgroundColor: colors.border, marginHorizontal: 11 },
  input: { flex: 1, color: colors.text, fontSize: 18, fontWeight: "800", outlineStyle: "none" } as any,
  validMark: { color: colors.success, fontSize: 16, fontWeight: "900" },
  quickInfo: { flexDirection: "row", gap: 8, marginTop: 11 },
  infoItem: {
    flex: 1,
    minHeight: 42,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.02)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  infoIcon: { fontSize: 11 },
  infoText: { color: "#888EA1", fontSize: 7, fontWeight: "800" },
  cta: {
    minHeight: 56,
    borderRadius: radius.lg,
    marginTop: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaDisabled: { opacity: 0.35 },
  ctaPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  ctaLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "900", letterSpacing: 1.2 },
  ctaArrow: { position: "absolute", right: 18, color: "#FFFFFF", fontSize: 20 },
  legal: { color: "#5F6576", textAlign: "center", fontSize: 7, marginTop: 11 },
});
