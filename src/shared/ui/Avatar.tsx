import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  size?: number;
  tone?: string;
  ring?: string;
  badge?: string;
};

export function Avatar({ name, size = 46, tone = "#6F46D9", ring = "transparent", badge }: Props) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: tone,
            borderColor: ring,
          },
        ]}
      >
        <Text style={[styles.initial, { fontSize: size * 0.34 }]}>{name.slice(0, 1).toUpperCase()}</Text>
      </View>
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "relative" },
  avatar: { borderWidth: 2, alignItems: "center", justifyContent: "center" },
  initial: { color: "#FFFFFF", fontWeight: "900" },
  badge: {
    position: "absolute",
    right: -3,
    bottom: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: "#E83CB9",
    borderWidth: 2,
    borderColor: "#080912",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#FFFFFF", fontSize: 6, fontWeight: "900" },
});
