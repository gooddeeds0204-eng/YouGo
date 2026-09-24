import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";
import {
  isValidIndianPhone,
  normalizeIndianPhone,
} from "@/domains/users/profileRules";

export function PhoneScreen() {
  const { draft, updateDraft } = useAuthDraft();
  const [phone, setPhone] = useState(draft.phone);
  const [busy, setBusy] = useState(false);
  const valid = isValidIndianPhone(phone);

  const continueWithOtp = async () => {
    const normalized = normalizeIndianPhone(phone);
    if (!isValidIndianPhone(normalized) || busy) return;
    setBusy(true);
    updateDraft({ phone: normalized });
    const result = await demoAuthService.sendOtp(normalized);
    setBusy(false);
    router.push({ pathname: "/otp", params: { challengeId: result.challengeId } });
  };

  return (
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>

      <Text style={styles.title}>Phone number</Text>

      <View style={styles.form}>
        <View style={[styles.phoneField, valid && styles.phoneFieldActive]}>
          <Pressable style={styles.codeBox}>
            <Text style={styles.code}>+91</Text>
            <Text style={styles.chevron}>⌄</Text>
          </Pressable>
          <View style={styles.divider} />
          <TextInput
            value={phone}
            onChangeText={(value) => setPhone(normalizeIndianPhone(value))}
            keyboardType="phone-pad"
            placeholder="Enter phone number"
            placeholderTextColor="#A4A6AA"
            maxLength={10}
            autoFocus
            style={styles.input}
          />
        </View>

        <Pressable
          disabled={!valid || busy}
          onPress={continueWithOtp}
          style={[styles.primary, (!valid || busy) && styles.primaryDisabled]}
        >
          <Text style={styles.primaryText}>{busy ? "Sending..." : "Continue"}</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push({ pathname: "/password", params: { phone } })}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Login with password</Text>
        </Pressable>
      </View>
    </LightAuthScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 8,
  },
  back: {
    width: 42,
    height: 42,
    justifyContent: "center",
  },
  backText: {
    color: "#6A6C70",
    fontSize: 40,
    lineHeight: 40,
    fontWeight: "300",
  },
  title: {
    color: "#1A1C20",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 25,
  },
  form: {
    marginTop: 68,
    paddingHorizontal: 30,
  },
  phoneField: {
    minHeight: 64,
    borderRadius: 22,
    backgroundColor: "#F5F5F6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  phoneFieldActive: {
    backgroundColor: "#F2F8F6",
  },
  codeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  code: {
    color: "#25272B",
    fontSize: 18,
    fontWeight: "700",
  },
  chevron: {
    color: "#25272B",
    fontSize: 20,
  },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: "#DEDFE2",
    marginHorizontal: 13,
  },
  input: {
    flex: 1,
    color: "#25272B",
    fontSize: 17,
    fontWeight: "500",
  },
  primary: {
    minHeight: 58,
    borderRadius: 29,
    backgroundColor: "#28D1AC",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 34,
  },
  primaryDisabled: {
    backgroundColor: "#A6A7AA",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  linkButton: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 12,
  },
  linkText: {
    color: "#32CDAA",
    fontSize: 15,
    fontWeight: "800",
  },
});
