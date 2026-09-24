import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { OtpBoxes } from "@/features/auth/components/OtpBoxes";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";
import { colors, spacing } from "@/shared/theme";

export function OtpScreen() {
  const { challengeId = "" } = useLocalSearchParams<{ challengeId?: string }>();
  const { draft } = useAuthDraft();
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);

  const verify = async () => {
    if (otp.length !== 6 || busy) return;
    setBusy(true);
    await demoAuthService.verifyOtp(challengeId, otp);
    setBusy(false);
    router.replace("/profile-setup");
  };

  return (
    <AppScreen contentStyle={styles.screen}>
      <AuthHeader
        eyebrow="VERIFY ACCOUNT"
        title="Enter the 6-digit code"
        subtitle={"Sent to +91 " + (draft.phone || "your number")}
      />

      <View style={styles.form}>
        <OtpBoxes value={otp} onChange={setOtp} />
        <PrimaryButton
          label={busy ? "Verifying..." : "Verify OTP"}
          disabled={otp.length !== 6 || busy}
          onPress={verify}
        />
        <Text style={styles.resend}>Didn’t receive it? Resend code</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 56, gap: 42 },
  form: { gap: spacing.lg },
  resend: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
  },
});
