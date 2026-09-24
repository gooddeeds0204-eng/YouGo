import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors } from "@/shared/theme";

export default function UserProfileRoute() {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  return (
    <AppScreen contentStyle={styles.screen}>
      <View>
        <Text style={styles.eyebrow}>USER PROFILE</Text>
        <Text style={styles.title}>@{userId || "user"}</Text>
        <Text style={styles.sub}>Profile module will render here.</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 24 },
  eyebrow: { color: colors.secondary, fontSize: 9, fontWeight: "900" },
  title: { color: colors.text, fontSize: 28, fontWeight: "900", marginTop: 8 },
  sub: { color: colors.textMuted, fontSize: 11, marginTop: 6 },
});
