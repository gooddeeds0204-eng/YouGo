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
import { colors } from "@/shared/theme";

export function LoginScreen() {
  const { draft, updateDraft } = useAuthDraft();
  const [phone, setPhone] = useState(draft.phone);
  const [busy, setBusy] = useState(false);
  const valid = isValidIndianPhone(phone);

  const submit = async () => {
    const normalized = normalizeIndianPhone(phone);
    if (!isValidIndianPhone(normalized) || busy) return;
    setBusy(true);
    updateDraft({ phone: normalized });
    const result = await demoAuthService.sendOtp(normalized);
    setBusy(false);
    router.push({ pathname: "/otp", params: { challengeId: result.challengeId } });
  };

  return (
    <AuthShell
      step="2 / 4"
      title="Enter your number"
      subtitle="We’ll send a 6-digit OTP. Your phone number is never shown on your profile."
    >
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

      <View style={styles.infoLine}>
        <Text style={styles.infoIcon}>🔒</Text>
        <Text style={styles.infoText}>Secure OTP verification • private by default</Text>
      </View>

      <Pressable
        disabled={!valid || busy}
        onPress={submit}
        style={[styles.cta, (!valid || busy) && styles.ctaDisabled]}
      >
        <Text style={styles.ctaLabel}>{busy ? "SENDING..." : "SEND OTP"}</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </Pressable>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#777D91",
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: 7,
  },
  phoneRow: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "#0C0E16",
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
  },
  phoneRowValid: { borderColor: "rgba(57,217,138,0.42)" },
  country: { flexDirection: "row", alignItems: "center", gap: 6 },
  flag: { fontSize: 17 },
  code: { color: colors.text, fontWeight: "900", fontSize: 13 },
  divider: { width: 1, height: 22, backgroundColor: colors.border, marginHorizontal: 10 },
  input: { flex: 1, color: colors.text, fontSize: 17, fontWeight: "800" },
  validMark: { color: colors.success, fontSize: 15, fontWeight: "900" },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 2,
  },
  infoIcon: { fontSize: 10 },
  infoText: { color: "#707688", fontSize: 7.5 },
  cta: {
    minHeight: 52,
    borderRadius: 17,
    marginTop: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaDisabled: { opacity: 0.35 },
  ctaLabel: { color: "#FFFFFF", fontSize: 11, fontWeight: "900", letterSpacing: 1.1 },
  ctaArrow: { position: "absolute", right: 17, color: "#FFFFFF", fontSize: 18 },
});
