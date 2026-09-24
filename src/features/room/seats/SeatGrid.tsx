import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/shared/theme";

type Props = {
  seatCount: number;
};

export function SeatGrid({ seatCount }: Props) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: seatCount }).map((_, index) => (
        <View key={index} style={styles.seat}>
          <View style={[styles.avatar, index === 0 && styles.hostAvatar]}>
            <Text style={styles.avatarText}>{index === 0 ? "M" : "+"}</Text>
          </View>
          <Text style={styles.name}>{index === 0 ? "👑 Maya" : "Seat " + (index + 1)}</Text>
          <Text style={styles.role}>{index === 0 ? "OWNER" : "OPEN"}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 18, rowGap: 18 },
  seat: { width: "25%", alignItems: "center" },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  hostAvatar: { backgroundColor: "#7434C9", borderColor: colors.primary, borderWidth: 2 },
  avatarText: { color: colors.text, fontWeight: "900" },
  name: { color: colors.text, fontSize: 8, fontWeight: "800", marginTop: 6 },
  role: { color: colors.textMuted, fontSize: 6, marginTop: 2 },
});
