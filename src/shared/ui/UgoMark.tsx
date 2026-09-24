import { StyleSheet, Text, View, type ViewStyle } from "react-native";

type Props = {
  size?: number;
  light?: boolean;
  style?: ViewStyle;
};

export function UgoMark({ size = 70, light = false, style }: Props) {
  const ink = light ? "#FFFFFF" : "#FFF23F";
  const bubble = light ? "#FFFFFF" : "#24252A";
  const play = light ? "#2B2D34" : "#FFFFFF";

  return (
    <View style={[styles.row, { height: size }, style]}>
      <Text style={[styles.letter, { color: ink, fontSize: size * 0.82, lineHeight: size }]}>U</Text>
      <View
        style={[
          styles.bubble,
          {
            width: size * 0.54,
            height: size * 0.54,
            borderRadius: size * 0.27,
            backgroundColor: bubble,
            marginHorizontal: -size * 0.1,
          },
        ]}
      >
        <View
          style={[
            styles.tail,
            {
              width: size * 0.16,
              height: size * 0.16,
              right: size * 0.05,
              bottom: -size * 0.045,
              backgroundColor: bubble,
            },
          ]}
        />
        <Text style={[styles.play, { color: play, fontSize: size * 0.13 }]}>▶</Text>
      </View>
      <Text style={[styles.letter, { color: ink, fontSize: size * 0.82, lineHeight: size }]}>G</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  letter: { fontWeight: "900", letterSpacing: -5 },
  bubble: { alignItems: "center", justifyContent: "center", zIndex: 2 },
  tail: { position: "absolute", transform: [{ rotate: "40deg" }] },
  play: { marginLeft: 2, zIndex: 3 },
});
