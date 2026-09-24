import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { colors, radius, spacing } from "@/shared/theme";

export function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const [otp, setOtp] = useState("");

  return (
    <AppScreen contentStyle={styles.screen}>
      <View>
        <Text style={styles.eyebrow}>VERIFY ACCOUNT</Text>
        <Text style={styles.title}>Enter the 6-digit code</Text>
        <Text style={styles.subtitle}>Sent to +91 {phone || "your number"}</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          placeholder="• • • • • •"
          placeholderTextColor="#666B7D"
          style={styles.otp}
          maxLength={6}
          textAlign="center"
        />
        <PrimaryButton
          label="Verify OTP"
          disabled={otp.length !== 6}
          onPress={() => router.replace("/profile-setup")}
        />
        <Text style={styles.resend}>Didn’t receive it? Resend code</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 56, gap: 42 },
  eyebrow: { color: colors.secondary, fontWeight: "900", fontSize: 10, letterSpacing: 1.4 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900", marginTop: 8 },
  subtitle: { color: colors.textMuted, fontSize: 13, marginTop: 10 },
  form: { gap: spacing.lg },
  otp: {
    minHeight: 64,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 7,
  },
  resend: { color: colors.primary, textAlign: "center", fontSize: 12, fontWeight: "700" },
});
