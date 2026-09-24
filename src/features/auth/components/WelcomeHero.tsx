import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "@/shared/theme";

export function WelcomeHero() {
  const pulse = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ]),
    );
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2200, useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2200, useNativeDriver: true }),
      ]),
    );

    pulseLoop.start();
    floatLoop.start();

    return () => {
      pulseLoop.stop();
      floatLoop.stop();
    };
  }, [float, pulse]);

  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.34, 0.05] });
  const translateY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });

  return (
    <View style={styles.wrap}>
      <View style={styles.auraOne} />
      <View style={styles.auraTwo} />
      <View style={styles.orbitOne} />
      <View style={styles.orbitTwo} />

      <Animated.View
        style={[
          styles.pulseRing,
          { transform: [{ scale: ringScale }], opacity: ringOpacity },
        ]}
      />

      <Animated.View style={[styles.logoWrap, { transform: [{ translateY }] }]}>
        <View style={styles.logoGlow} />
        <View style={styles.logo}>
          <View style={styles.logoSlashPink} />
          <View style={styles.logoSlashBlue} />
          <Text style={styles.logoText}>YG</Text>
          <View style={styles.playWrap}>
            <Text style={styles.play}>▶</Text>
          </View>
        </View>
      </Animated.View>

      <View style={[styles.spark, styles.sparkOne]} />
      <View style={[styles.spark, styles.sparkTwo]} />
      <View style={[styles.spark, styles.sparkThree]} />

      <View style={styles.status}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>LIVE SOCIAL • ALWAYS ON</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 244,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  auraOne: {
    position: "absolute",
    width: 228,
    height: 228,
    borderRadius: 114,
    backgroundColor: "rgba(116,67,255,0.10)",
  },
  auraTwo: {
    position: "absolute",
    width: 156,
    height: 156,
    borderRadius: 78,
    backgroundColor: "rgba(232,60,185,0.08)",
  },
  orbitOne: {
    position: "absolute",
    width: 176,
    height: 176,
    borderRadius: 88,
    borderWidth: 1,
    borderColor: "rgba(166,76,255,0.18)",
  },
  orbitTwo: {
    position: "absolute",
    width: 138,
    height: 138,
    borderRadius: 69,
    borderWidth: 1,
    borderColor: "rgba(43,203,255,0.10)",
  },
  pulseRing: {
    position: "absolute",
    width: 194,
    height: 194,
    borderRadius: 97,
    borderWidth: 1,
    borderColor: "#A85CFF",
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoGlow: {
    position: "absolute",
    width: 134,
    height: 134,
    borderRadius: 38,
    backgroundColor: "rgba(194,73,255,0.10)",
  },
  logo: {
    width: 108,
    height: 108,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121019",
    borderWidth: 1.5,
    borderColor: "#914CFF",
    shadowColor: "#B44DFF",
    shadowOpacity: 0.5,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 9 },
    elevation: 12,
    overflow: "hidden",
  },
  logoSlashPink: {
    position: "absolute",
    width: 145,
    height: 25,
    backgroundColor: "rgba(232,60,185,0.15)",
    transform: [{ rotate: "-31deg" }],
  },
  logoSlashBlue: {
    position: "absolute",
    width: 145,
    height: 19,
    backgroundColor: "rgba(43,203,255,0.10)",
    transform: [{ rotate: "32deg" }],
  },
  logoText: {
    color: colors.text,
    fontSize: 39,
    fontWeight: "900",
    letterSpacing: -5,
  },
  playWrap: {
    position: "absolute",
    right: 13,
    bottom: 13,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  play: { color: "#FFFFFF", fontSize: 9, marginLeft: 2 },
  spark: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  sparkOne: { left: "25%", top: 60 },
  sparkTwo: { right: "24%", top: 86, backgroundColor: colors.cyan },
  sparkThree: { right: "30%", bottom: 57, width: 4, height: 4 },
  status: {
    position: "absolute",
    bottom: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.035)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.cyan,
  },
  statusText: {
    color: "#B8B5D6",
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
});
