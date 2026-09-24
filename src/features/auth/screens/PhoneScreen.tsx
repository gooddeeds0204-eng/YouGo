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
        <View style={styles.phoneBox}>
          <Pressable style={styles.codeBox}>
            <Text style={styles.code}>+91</Text>
            <Text style={styles.chevron}>⌄</Text>
          </Pressable>

          <TextInput
            value={phone}
            onChangeText={(value) => setPhone(normalizeIndianPhone(value))}
            keyboardType="phone-pad"
            placeholder="Phone number"
            placeholderTextColor="#A6A7AA"
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
    paddingTop: 10,
  },
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
  form: {
    marginTop: 70,
    paddingHorizontal: 38,
  },
  phoneBox: {
    minHeight: 62,
    borderRadius: 22,
    backgroundColor: "#F5F5F6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  codeBox: {
    minWidth: 78,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  code: {
    color: "#2B2D30",
    fontSize: 18,
    fontWeight: "700",
  },
  chevron: {
    color: "#2B2D30",
    fontSize: 21,
  },
  input: {
    flex: 1,
    color: "#222428",
    fontSize: 17,
    paddingHorizontal: 8,
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
});
