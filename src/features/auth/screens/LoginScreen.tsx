import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";
import {
  isValidIndianPhone,
  normalizeIndianPhone,
} from "@/domains/users/profileRules";
import { colors, radius, spacing } from "@/shared/theme";

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

  return (
    <AppScreen contentStyle={styles.screen}>
      <AuthHeader
        eyebrow="SIGN IN"
        title="Enter your mobile number"
        subtitle="We’ll verify your number with a 6-digit OTP."
      />

      <View style={styles.form}>
        <View style={styles.phoneRow}>
          <View style={styles.code}><TextInput editable={false} value="+91" style={styles.codeText} /></View>
          <TextInput
            value={phone}
            onChangeText={(value) => setPhone(normalizeIndianPhone(value))}
            keyboardType="phone-pad"
            placeholder="98765 43210"
            placeholderTextColor="#666B7D"
            style={styles.input}
            maxLength={10}
          />
        </View>

        <PrimaryButton
          label={busy ? "Sending..." : "Send OTP"}
          disabled={!isValidIndianPhone(phone) || busy}
          onPress={submit}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 56, gap: 42 },
  form: { gap: spacing.lg },
  phoneRow: { flexDirection: "row", gap: spacing.sm },
  code: {
    minWidth: 64,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  codeText: {
    color: colors.text,
    fontWeight: "800",
    textAlign: "center",
  },
  input: {
    flex: 1,
    minHeight: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
  },
});
