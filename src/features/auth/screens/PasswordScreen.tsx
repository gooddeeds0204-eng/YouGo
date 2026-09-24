import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";
import { useSession } from "@/core/session/SessionProvider";
import {
  isValidIndianPhone,
  normalizeIndianPhone,
} from "@/domains/users/profileRules";

export function PasswordScreen() {
  const params = useLocalSearchParams<{ phone?: string }>();
  const { draft, updateDraft } = useAuthDraft();
  const { setUser } = useSession();
  const [phone, setPhone] = useState(normalizeIndianPhone(params.phone || draft.phone));
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const valid = isValidIndianPhone(phone) && password.length >= 4;

  const login = () => {
    if (!valid) return;
    updateDraft({ phone });
    setUser({ id: "demo-user", displayName: "YouGo User" });
    router.replace("/home");
  };

  const useOtp = async () => {
    const normalized = normalizeIndianPhone(phone);
    if (!isValidIndianPhone(normalized)) return;
    updateDraft({ phone: normalized });
    const result = await demoAuthService.sendOtp(normalized);
    router.push({ pathname: "/otp", params: { challengeId: result.challengeId } });
  };

  return (
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>

      <Text style={styles.title}>Phone login</Text>

      <View style={styles.form}>
        <View style={styles.field}>
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
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!show}
            placeholder="Password"
            placeholderTextColor="#A6A7AA"
            style={styles.inputPassword}
          />
          <Pressable onPress={() => setShow((current) => !current)}>
            <Text style={styles.eye}>{show ? "◉" : "◌"}</Text>
          </Pressable>
        </View>

        <Pressable
          disabled={!valid}
          onPress={login}
          style={[styles.primary, !valid && styles.primaryDisabled]}
        >
          <Text style={styles.primaryText}>Login</Text>
        </Pressable>

        <Pressable onPress={useOtp} style={styles.linkButton}>
          <Text style={styles.linkText}>OTP verification</Text>
        </Pressable>
      </View>
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
  form: {
    marginTop: 66,
    paddingHorizontal: 38,
    gap: 20,
  },
  field: {
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
  inputPassword: {
    flex: 1,
    color: "#222428",
    fontSize: 17,
    paddingHorizontal: 8,
  },
  eye: {
    color: "#9EA0A4",
    fontSize: 24,
    paddingHorizontal: 6,
  },
  primary: {
    minHeight: 58,
    borderRadius: 29,
    backgroundColor: "#28D2AD",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
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
    paddingVertical: 4,
  },
  linkText: {
    color: "#34CFAE",
    fontSize: 15,
    fontWeight: "800",
  },
});
