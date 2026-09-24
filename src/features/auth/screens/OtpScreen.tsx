import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { OtpBoxes } from "@/features/auth/components/OtpBoxes";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";
import { colors, radius } from "@/shared/theme";

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
      step="3 OF 4"
      title="Check your messages."
      subtitle={"Enter the 6-digit code sent to +91 " + (draft.phone || "your number") + "."}
    >
      <View style={styles.iconWrap}>
        <View style={styles.iconHalo}><Text style={styles.icon}>✉</Text></View>
        <Text style={styles.iconTitle}>OTP sent successfully</Text>
        <Text style={styles.iconSub}>For this preview, any 6 digits will continue.</Text>
      </View>

      <OtpBoxes value={otp} onChange={setOtp} />

      <Pressable
        disabled={otp.length !== 6 || busy}
        onPress={verify}
        style={({ pressed }) => [
          styles.cta,
          (otp.length !== 6 || busy) && styles.ctaDisabled,
          pressed && otp.length === 6 && !busy && styles.ctaPressed,
        ]}
      >
        <Text style={styles.ctaLabel}>{busy ? "VERIFYING..." : "VERIFY & CONTINUE"}</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </Pressable>

      <View style={styles.resendCard}>
        <View>
          <Text style={styles.resendTitle}>Didn’t receive the code?</Text>
          <Text style={styles.resendSub}>Check your network or request another OTP.</Text>
        </View>
        <Pressable><Text style={styles.resendAction}>RESEND</Text></Pressable>
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  iconWrap: { alignItems: "center", marginBottom: 18 },
  iconHalo: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "rgba(116,67,255,0.11)",
    borderWidth: 1,
    borderColor: "rgba(182,97,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { color: "#D2A6FF", fontSize: 24 },
  iconTitle: { color: colors.text, fontSize: 11, fontWeight: "900", marginTop: 10 },
  iconSub: { color: colors.textMuted, fontSize: 7, marginTop: 4 },
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
  ctaLabel: { color: "#FFFFFF", fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  ctaArrow: { position: "absolute", right: 18, color: "#FFFFFF", fontSize: 20 },
  resendCard: {
    minHeight: 60,
    borderRadius: radius.lg,
    marginTop: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#0D0F17",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resendTitle: { color: colors.text, fontSize: 8, fontWeight: "900" },
  resendSub: { color: colors.textMuted, fontSize: 6.5, marginTop: 3 },
  resendAction: { color: "#D48BFF", fontSize: 8, fontWeight: "900", letterSpacing: 0.8 },
});
