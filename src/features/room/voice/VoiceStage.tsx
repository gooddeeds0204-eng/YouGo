import { StyleSheet, Text, View } from "react-native";
import { SeatGrid } from "@/features/room/seats/SeatGrid";
import { colors, radius } from "@/shared/theme";

type Props = { seatCount: number };

export function VoiceStage({ seatCount }: Props) {
  return (
    <View>
      <View style={styles.stage}>
        <Text style={styles.eyebrow}>VOICE MODE</Text>
        <Text style={styles.title}>Live voice room</Text>
        <Text style={styles.body}>Mic seats, host/admin roles and premium avatar frames live here.</Text>
      </View>
      <SeatGrid seatCount={seatCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { marginTop: 14, borderRadius: radius.lg, backgroundColor: "#22133C", borderWidth: 1, borderColor: colors.border, padding: 16 },
  eyebrow: { color: colors.primary, fontSize: 8, fontWeight: "900", letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: 22, fontWeight: "900", marginTop: 5 },
  body: { color: colors.textMuted, fontSize: 9, lineHeight: 14, marginTop: 6 },
});
