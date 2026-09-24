import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { OtpBoxes } from "@/features/auth/components/OtpBoxes";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";
import { colors } from "@/shared/theme";

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
    <AuthShell
      step="3 / 4"
      title="Verify your number"
      subtitle={"Code sent to +91 " + (draft.phone || "your number")}
    >
      <OtpBoxes value={otp} onChange={setOtp} />

      <Text style={styles.previewNote}>Preview mode: enter any 6 digits.</Text>

      <Pressable
        disabled={otp.length !== 6 || busy}
        onPress={verify}
        style={[styles.cta, (otp.length !== 6 || busy) && styles.ctaDisabled]}
      >
        <Text style={styles.ctaLabel}>{busy ? "VERIFYING..." : "VERIFY & CONTINUE"}</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </Pressable>

      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Didn’t receive it?</Text>
        <Pressable><Text style={styles.resendAction}>Resend OTP</Text></Pressable>
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  previewNote: {
    color: "#6E7487",
    textAlign: "center",
    fontSize: 7,
    marginTop: 9,
  },
  cta: {
    minHeight: 52,
    borderRadius: 17,
    marginTop: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaDisabled: { opacity: 0.35 },
  ctaLabel: { color: "#FFFFFF", fontSize: 10.5, fontWeight: "900", letterSpacing: 0.9 },
  ctaArrow: { position: "absolute", right: 17, color: "#FFFFFF", fontSize: 18 },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 12,
  },
  resendText: { color: colors.textMuted, fontSize: 8 },
  resendAction: { color: "#D58EFF", fontSize: 8, fontWeight: "900" },
});
