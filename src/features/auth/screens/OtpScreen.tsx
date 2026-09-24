import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";

export function OtpScreen() {
  const { challengeId = "" } = useLocalSearchParams<{ challengeId?: string }>();
  const { draft } = useAuthDraft();
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const valid = otp.length === 6;

  const verify = async () => {
    if (!valid || busy) return;
    setBusy(true);
    await demoAuthService.verifyOtp(challengeId, otp);
    setBusy(false);
    router.replace("/profile-setup");
  };

  return (
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>

      <Text style={styles.title}>OTP verification</Text>
      <Text style={styles.subtitle}>Code sent to +91 {draft.phone || "your number"}</Text>

      <View style={styles.form}>
        <TextInput
          value={otp}
          onChangeText={(value) => setOtp(value.replace(/\D/g, "").slice(0, 6))}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoFocus
          placeholder="•  •  •  •  •  •"
          placeholderTextColor="#B4B5B8"
          maxLength={6}
          style={styles.otpInput}
        />

        <Pressable
          disabled={!valid || busy}
          onPress={verify}
          style={[styles.primary, (!valid || busy) && styles.primaryDisabled]}
        >
          <Text style={styles.primaryText}>{busy ? "Verifying..." : "Verify"}</Text>
        </Pressable>

        <Pressable style={styles.linkButton}>
          <Text style={styles.linkText}>Resend OTP</Text>
        </Pressable>
      </View>

      <Text style={styles.preview}>Preview mode: any 6 digits will work.</Text>
    </LightAuthScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 10 },
  back: {
    width: 42,
    height: 42,
    justifyContent: "center",
  },
  backText: {
    color: "#66686C",
    fontSize: 42,
    lineHeight: 42,
    fontWeight: "300",
  },
  title: {
    color: "#181A1D",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 24,
  },
  subtitle: {
    color: "#8B8D91",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  form: {
    marginTop: 64,
    paddingHorizontal: 38,
  },
  otpInput: {
    minHeight: 66,
    borderRadius: 22,
    backgroundColor: "#F5F5F6",
    color: "#222428",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 7,
    textAlign: "center",
    paddingHorizontal: 14,
  },
  primary: {
    minHeight: 58,
    borderRadius: 29,
    backgroundColor: "#28D2AD",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 34,
  },
  primaryDisabled: {
    backgroundColor: "#A8A9AB",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  linkButton: {
    alignItems: "center",
    paddingVertical: 20,
  },
  linkText: {
    color: "#34CFAE",
    fontSize: 15,
    fontWeight: "800",
  },
  preview: {
    color: "#A1A3A8",
    fontSize: 10,
    textAlign: "center",
    marginTop: 28,
  },
});
