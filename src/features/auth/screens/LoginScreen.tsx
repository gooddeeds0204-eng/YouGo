import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

function providerPreview(name: string) {
  Alert.alert("Preview mode", name + " sign-in will be connected in the backend phase.");
}

export function LoginScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />
      <View style={styles.orbOne} />
      <View style={styles.orbTwo} />
      <View style={styles.orbThree} />

      <View style={styles.content}>
        <View style={styles.brandWrap}>
          <View style={styles.logo}>
            <Text style={styles.logoY}>Y</Text>
            <View style={styles.logoChat}><Text style={styles.logoPlay}>▶</Text></View>
            <Text style={styles.logoG}>G</Text>
          </View>

          <Text style={styles.title}>YouGo</Text>
          <Text style={styles.subtitle}>Talk, play, meet and belong.</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => providerPreview("Facebook")}
            style={({ pressed }) => [styles.providerButton, pressed && styles.pressed]}
          >
            <View style={[styles.providerIcon, styles.facebookIcon]}>
              <Text style={styles.facebookText}>f</Text>
            </View>
            <Text style={styles.providerText}>Continue with Facebook</Text>
          </Pressable>

          <Pressable
            onPress={() => providerPreview("Google")}
            style={({ pressed }) => [styles.providerButton, pressed && styles.pressed]}
          >
            <View style={styles.providerIcon}>
              <Text style={styles.googleText}>G</Text>
            </View>
            <Text style={styles.providerText}>Continue with Google</Text>
          </Pressable>

          <View style={styles.quickRow}>
            <Pressable
              onPress={() => router.push("/phone")}
              style={({ pressed }) => [styles.quickButton, pressed && styles.pressed]}
            >
              <Text style={styles.quickIcon}>▣</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/phone")}
              style={({ pressed }) => [styles.quickButton, pressed && styles.pressed]}
            >
              <Text style={styles.phoneIcon}>☎</Text>
            </Pressable>

            <Pressable
              onPress={() => providerPreview("Email")}
              style={({ pressed }) => [styles.quickButton, pressed && styles.pressed]}
            >
              <Text style={styles.mailIcon}>✉</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.bottom}>
          <Pressable onPress={() => router.push("/language")} style={styles.languagePill}>
            <Text style={styles.languageGlobe}>◎</Text>
            <Text style={styles.languageText}>English</Text>
            <Text style={styles.languageArrow}>›</Text>
          </Pressable>

          <Text style={styles.legal}>
            By continuing, you agree to YouGo Terms, Privacy Policy and Community Guidelines.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#35DB73",
  },
  bgTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#43E64C",
  },
  bgBottom: {
    position: "absolute",
    left: -80,
    right: -80,
    bottom: -80,
    height: "60%",
    borderTopLeftRadius: 260,
    borderTopRightRadius: 260,
    backgroundColor: "#22CDB9",
    transform: [{ rotate: "-4deg" }],
  },
  orbOne: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    right: -55,
    top: 170,
    backgroundColor: "rgba(255,236,77,0.20)",
  },
  orbTwo: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    left: -35,
    top: 360,
    backgroundColor: "rgba(34,203,255,0.16)",
  },
  orbThree: {
    position: "absolute",
    width: 76,
    height: 76,
    borderRadius: 24,
    right: 42,
    bottom: 185,
    backgroundColor: "rgba(255,232,63,0.17)",
    transform: [{ rotate: "18deg" }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 54,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  brandWrap: {
    alignItems: "center",
  },
  logo: {
    width: 132,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logoY: {
    color: "#FFF642",
    fontSize: 72,
    lineHeight: 80,
    fontWeight: "900",
    transform: [{ rotate: "-7deg" }],
    marginRight: -10,
  },
  logoG: {
    color: "#FFF642",
    fontSize: 72,
    lineHeight: 80,
    fontWeight: "900",
    transform: [{ rotate: "7deg" }],
    marginLeft: -10,
  },
  logoChat: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  logoPlay: {
    color: "#FFFFFF",
    fontSize: 13,
    marginLeft: 2,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 4,
  },
  subtitle: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
  },
  actions: {
    gap: 14,
    paddingHorizontal: 8,
  },
  providerButton: {
    minHeight: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "#178E70",
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  providerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F7F8FA",
    alignItems: "center",
    justifyContent: "center",
  },
  facebookIcon: {
    backgroundColor: "#5D8BE8",
  },
  facebookText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 5,
  },
  googleText: {
    color: "#4285F4",
    fontSize: 24,
    fontWeight: "900",
  },
  providerText: {
    color: "#303236",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 14,
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 26,
    marginTop: 12,
  },
  quickButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.96)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#178E70",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  quickIcon: {
    color: "#33CDA1",
    fontSize: 25,
    fontWeight: "900",
  },
  phoneIcon: {
    color: "#3D9DFF",
    fontSize: 24,
    fontWeight: "900",
  },
  mailIcon: {
    color: "#7B86A6",
    fontSize: 23,
    fontWeight: "900",
  },
  bottom: {
    alignItems: "center",
    gap: 16,
  },
  languagePill: {
    minHeight: 46,
    borderRadius: 23,
    paddingHorizontal: 18,
    backgroundColor: "rgba(255,255,255,0.28)",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  languageGlobe: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  languageText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  languageArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    marginTop: -2,
  },
  legal: {
    color: "rgba(255,255,255,0.86)",
    fontSize: 9,
    lineHeight: 15,
    textAlign: "center",
    maxWidth: 320,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
});
