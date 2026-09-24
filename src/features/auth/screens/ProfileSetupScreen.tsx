import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { colors, radius, spacing } from "@/shared/theme";

const interests = ["Music", "Games", "Friends", "Travel", "Movies", "Fashion"];

export function ProfileSetupScreen() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
    );

  return (
    <AppScreen scroll contentStyle={styles.screen}>
      <Text style={styles.eyebrow}>CREATE YOUR PROFILE</Text>
      <Text style={styles.title}>Make YouGo yours</Text>
      <Text style={styles.subtitle}>You can change these details anytime.</Text>

      <View style={styles.avatar}><Text style={styles.avatarText}>＋</Text></View>

      <View style={styles.form}>
        <Text style={styles.label}>Display name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="#666B7D"
          style={styles.input}
        />

        <Text style={styles.label}>Choose interests</Text>
        <View style={styles.chips}>
          {interests.map((item) => {
            const active = selected.includes(item);
            return (
              <Pressable key={item} onPress={() => toggle(item)} style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <PrimaryButton
          label="Enter YouGo"
          disabled={!name.trim()}
          onPress={() => router.replace("/(tabs)")}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 42, paddingBottom: 32 },
  eyebrow: { color: colors.secondary, fontWeight: "900", fontSize: 10, letterSpacing: 1.4 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900", marginTop: 8 },
  subtitle: { color: colors.textMuted, fontSize: 13, marginTop: 8 },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginVertical: 28,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  avatarText: { color: colors.primary, fontSize: 32 },
  form: { gap: spacing.md },
  label: { color: colors.text, fontWeight: "800", fontSize: 12, marginTop: 4 },
  input: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: spacing.lg,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.lg },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { borderColor: colors.primary, backgroundColor: "#32142D" },
  chipText: { color: colors.textMuted, fontSize: 12, fontWeight: "700" },
  chipTextActive: { color: colors.text },
});
