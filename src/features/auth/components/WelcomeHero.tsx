import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors } from "@/shared/theme";

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

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.12],
  });

  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.42, 0.08],
  });

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <View style={styles.wrap}>
      <View style={styles.glowA} />
      <View style={styles.glowB} />
      <View style={styles.glowC} />

      <Animated.View
        style={[
          styles.outerRing,
          { transform: [{ scale: ringScale }], opacity: ringOpacity },
        ]}
      />

      <Animated.View style={[styles.logoWrap, { transform: [{ translateY }] }]}>
        <View style={styles.logoHalo} />
        <View style={styles.logo}>
          <View style={styles.logoLineA} />
          <View style={styles.logoLineB} />
          <Text style={styles.logoText}>YG</Text>
          <View style={styles.playWrap}>
            <Text style={styles.play}>▶</Text>
          </View>
        </View>
      </Animated.View>

      <View style={[styles.spark, styles.sparkOne]} />
      <View style={[styles.spark, styles.sparkTwo]} />
      <View style={[styles.spark, styles.sparkThree]} />

      <Text style={styles.livePill}>● LIVE SOCIAL EXPERIENCE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  glowA: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(116,67,255,0.12)",
  },
  glowB: {
    position: "absolute",
    width: 168,
    height: 168,
    borderRadius: 84,
    backgroundColor: "rgba(232,60,185,0.10)",
  },
  glowC: {
    position: "absolute",
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(43,203,255,0.08)",
  },
  outerRing: {
    position: "absolute",
    width: 176,
    height: 176,
    borderRadius: 88,
    borderWidth: 1,
    borderColor: "#AA61FF",
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoHalo: {
    position: "absolute",
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "rgba(232,60,185,0.08)",
  },
  logo: {
    width: 118,
    height: 118,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#15111F",
    borderWidth: 1.5,
    borderColor: "#8C44F8",
    shadowColor: "#A64CFF",
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    overflow: "hidden",
  },
  logoLineA: {
    position: "absolute",
    width: 150,
    height: 26,
    backgroundColor: "rgba(232,60,185,0.14)",
    transform: [{ rotate: "-32deg" }],
  },
  logoLineB: {
    position: "absolute",
    width: 150,
    height: 20,
    backgroundColor: "rgba(43,203,255,0.11)",
    transform: [{ rotate: "34deg" }],
  },
  logoText: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -5,
  },
  playWrap: {
    position: "absolute",
    right: 17,
    bottom: 17,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
  },
  play: {
    color: "#FFFFFF",
    fontSize: 10,
    marginLeft: 2,
  },
  spark: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
  sparkOne: { left: "23%", top: 78 },
  sparkTwo: { right: "22%", top: 102, backgroundColor: colors.cyan },
  sparkThree: { right: "29%", bottom: 72, width: 4, height: 4 },
  livePill: {
    position: "absolute",
    bottom: 16,
    color: "#C9B8FF",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
});
