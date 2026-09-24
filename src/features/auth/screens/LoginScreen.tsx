import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { colors, radius, spacing } from "@/shared/theme";

export function LoginScreen() {
  const [phone, setPhone] = useState("");

  return (
    <AppScreen contentStyle={styles.screen}>
      <View>
        <Text style={styles.eyebrow}>WELCOME BACK</Text>
        <Text style={styles.title}>Enter your mobile number</Text>
        <Text style={styles.subtitle}>We’ll send an OTP to verify your account.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.phoneRow}>
          <View style={styles.code}><Text style={styles.codeText}>+91</Text></View>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="98765 43210"
            placeholderTextColor="#666B7D"
            style={styles.input}
            maxLength={10}
          />
        </View>

        <PrimaryButton
          label="Send OTP"
          disabled={phone.trim().length < 10}
          onPress={() => router.push({ pathname: "/otp", params: { phone } })}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 56, gap: 42 },
  eyebrow: { color: colors.secondary, fontWeight: "900", fontSize: 10, letterSpacing: 1.4 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900", marginTop: 8, maxWidth: 290 },
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 20, marginTop: 10 },
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
  codeText: { color: colors.text, fontWeight: "800" },
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
