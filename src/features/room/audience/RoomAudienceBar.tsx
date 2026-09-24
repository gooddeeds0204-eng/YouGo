import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/shared/theme";

export function RoomAudienceBar() {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>👥 Audience 1.8K</Text>
      <Text style={styles.avatars}>R  S  K  +99</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, marginTop: 14, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  text: { color: colors.textMuted, fontSize: 8 },
  avatars: { color: colors.text, fontSize: 8, fontWeight: "800" },
});
