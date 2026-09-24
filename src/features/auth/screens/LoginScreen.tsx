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

      <View style={styles.bgLime} />
      <View style={styles.bgMint} />
      <View style={styles.bgTeal} />
      <View style={styles.softCircleOne} />
      <View style={styles.softCircleTwo} />
      <View style={styles.softSquare} />

      <Text style={[styles.floatingEmoji, styles.musicOne]}>♪</Text>
      <Text style={[styles.floatingEmoji, styles.musicTwo]}>♫</Text>
      <Text style={[styles.floatingEmoji, styles.mic]}>🎤</Text>
      <Text style={[styles.floatingEmoji, styles.gamepad]}>🎮</Text>
      <Text style={[styles.floatingEmoji, styles.star]}>★</Text>

      <View style={styles.content}>
        <View style={styles.brandBlock}>
          <View style={styles.logoRow}>
            <Text style={styles.logoLetter}>Y</Text>
            <View style={styles.logoBubble}>
              <View style={styles.logoTail} />
              <Text style={styles.logoPlay}>▶</Text>
            </View>
            <Text style={styles.logoLetter}>G</Text>
          </View>

          <Text style={styles.brand}>YouGo</Text>
          <Text style={styles.brandLine}>Talk • Play • Connect</Text>
          <Text style={styles.heroLine}>Chat, play and meet your people</Text>
        </View>

        <View style={styles.signInBlock}>
          <Pressable
            onPress={() => providerPreview("Facebook")}
            style={({ pressed }) => [styles.provider, pressed && styles.pressed]}
          >
            <View style={[styles.providerLogo, styles.fbLogo]}>
              <Text style={styles.fbText}>f</Text>
            </View>
            <Text style={styles.providerLabel}>Continue with Facebook</Text>
          </Pressable>

          <Pressable
            onPress={() => providerPreview("Google")}
            style={({ pressed }) => [styles.provider, pressed && styles.pressed]}
          >
            <View style={styles.providerLogo}>
              <Text style={styles.googleG}>G</Text>
            </View>
            <Text style={styles.providerLabel}>Continue with Google</Text>
          </Pressable>

          <View style={styles.quickRow}>
            <Pressable onPress={() => router.push("/phone")} style={styles.quickButton}>
              <Text style={styles.quickPhone}>▣</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/phone")} style={styles.quickButton}>
              <Text style={styles.quickPhone}>☎</Text>
            </Pressable>
            <Pressable onPress={() => providerPreview("Email")} style={styles.quickButton}>
              <Text style={styles.quickMail}>✉</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.bottomBlock}>
          <Pressable onPress={() => router.push("/language")} style={styles.languagePill}>
            <Text style={styles.globe}>◎</Text>
            <Text style={styles.language}>English</Text>
            <Text style={styles.chevron}>›</Text>
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
    backgroundColor: "#37E64D",
  },
  bgLime: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "58%",
    backgroundColor: "#43E945",
  },
  bgMint: {
    position: "absolute",
    left: -80,
    right: -80,
    top: "38%",
    height: "40%",
    borderTopLeftRadius: 240,
    borderTopRightRadius: 240,
    backgroundColor: "#32DB87",
    transform: [{ rotate: "-5deg" }],
  },
  bgTeal: {
    position: "absolute",
    left: -100,
    right: -100,
    bottom: -70,
    height: "48%",
    borderTopLeftRadius: 260,
    borderTopRightRadius: 260,
    backgroundColor: "#20C8BE",
    transform: [{ rotate: "3deg" }],
  },
  softCircleOne: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    right: -36,
    top: 188,
    backgroundColor: "rgba(255,239,70,0.20)",
  },
  softCircleTwo: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    left: -46,
    top: 392,
    backgroundColor: "rgba(53,189,255,0.15)",
  },
  softSquare: {
    position: "absolute",
    width: 82,
    height: 82,
    borderRadius: 24,
    right: 34,
    bottom: 142,
    backgroundColor: "rgba(255,239,70,0.18)",
    transform: [{ rotate: "17deg" }],
  },
  floatingEmoji: {
    position: "absolute",
    opacity: 0.18,
  },
  musicOne: { left: 34, top: 115, fontSize: 44, transform: [{ rotate: "-13deg" }] },
  musicTwo: { left: 18, top: 290, fontSize: 34, transform: [{ rotate: "10deg" }] },
  mic: { left: 86, top: 200, fontSize: 48, transform: [{ rotate: "17deg" }] },
  gamepad: { right: 18, top: 300, fontSize: 54, transform: [{ rotate: "-8deg" }] },
  star: { right: 62, bottom: 210, fontSize: 46, color: "#FFF138" },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 22,
    justifyContent: "space-between",
  },
  brandBlock: {
    alignItems: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 92,
  },
  logoLetter: {
    color: "#FFF33B",
    fontSize: 72,
    lineHeight: 78,
    fontWeight: "900",
    letterSpacing: -6,
  },
  logoBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginHorizontal: -5,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  logoTail: {
    position: "absolute",
    bottom: -6,
    right: 6,
    width: 17,
    height: 17,
    backgroundColor: "#262626",
    transform: [{ rotate: "38deg" }],
  },
  logoPlay: {
    color: "#FFFFFF",
    fontSize: 12,
    marginLeft: 2,
    zIndex: 3,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    marginTop: -2,
  },
  brandLine: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.4,
    marginTop: 5,
  },
  heroLine: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 20,
  },
  signInBlock: {
    gap: 13,
    paddingHorizontal: 4,
  },
  provider: {
    minHeight: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    shadowColor: "#128A6E",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 4,
  },
  providerLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F6F7F9",
    alignItems: "center",
    justifyContent: "center",
  },
  fbLogo: {
    backgroundColor: "#5F8EEA",
  },
  fbText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 5,
  },
  googleG: {
    color: "#4285F4",
    fontSize: 23,
    fontWeight: "900",
  },
  providerLabel: {
    color: "#2B2D31",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 14,
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    marginTop: 12,
  },
  quickButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.96)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#128A6E",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  quickPhone: {
    color: "#2ECDA8",
    fontSize: 24,
    fontWeight: "900",
  },
  quickMail: {
    color: "#6F7891",
    fontSize: 22,
    fontWeight: "900",
  },
  bottomBlock: {
    alignItems: "center",
    gap: 14,
  },
  languagePill: {
    minHeight: 44,
    borderRadius: 22,
    paddingHorizontal: 18,
    backgroundColor: "rgba(255,255,255,0.24)",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  globe: {
    color: "#FFFFFF",
    fontSize: 17,
  },
  language: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  chevron: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  legal: {
    color: "rgba(255,255,255,0.84)",
    fontSize: 8.5,
    lineHeight: 14,
    textAlign: "center",
    maxWidth: 325,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
});
