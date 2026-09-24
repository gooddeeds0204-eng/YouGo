import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { ChoiceChip } from "@/features/auth/components/ChoiceChip";
import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { useSession } from "@/core/session/SessionProvider";
import {
  isValidBirthDate,
  isValidDisplayName,
  isValidUsername,
  normalizeUsername,
} from "@/domains/users/profileRules";
import type { Gender } from "@/domains/users/profile";
import { colors, radius, spacing } from "@/shared/theme";

const interests = ["Music", "Games", "Friends", "Travel", "Movies", "Fashion", "Sports", "Food"];
const genders: Array<{ value: Gender; label: string }> = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export function ProfileSetupScreen() {
  const { draft, updateDraft } = useAuthDraft();
  const { setUser } = useSession();

  const valid =
    isValidDisplayName(draft.displayName) &&
    isValidUsername(draft.username) &&
    isValidBirthDate(draft.birthDate) &&
    draft.interests.length >= 2;

  const toggleInterest = (item: string) => {
    const next = draft.interests.includes(item)
      ? draft.interests.filter((value) => value !== item)
      : [...draft.interests, item].slice(0, 6);

    updateDraft({ interests: next });
  };

  return (
    <AppScreen scroll contentStyle={styles.screen}>
      <AuthHeader
        eyebrow="CREATE PROFILE"
        title="Make YouGo yours"
        subtitle="Add the basics now. You can edit them later."
      />

      <View style={styles.avatar}><Text style={styles.avatarText}>＋</Text></View>

      <View style={styles.form}>
        <Text style={styles.label}>Display name</Text>
        <TextInput
          value={draft.displayName}
          onChangeText={(displayName) => updateDraft({ displayName })}
          placeholder="Your name"
          placeholderTextColor="#666B7D"
          style={styles.input}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          value={draft.username}
          onChangeText={(username) => updateDraft({ username: normalizeUsername(username) })}
          placeholder="yougo_name"
          placeholderTextColor="#666B7D"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text style={styles.label}>Birth date</Text>
        <TextInput
          value={draft.birthDate}
          onChangeText={(birthDate) => updateDraft({ birthDate })}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#666B7D"
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          style={styles.input}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.chips}>
          {genders.map((item) => (
            <ChoiceChip
              key={item.value}
              label={item.label}
              selected={draft.gender === item.value}
              onPress={() => updateDraft({ gender: item.value })}
            />
          ))}
        </View>

        <Text style={styles.label}>Choose at least 2 interests</Text>
        <View style={styles.chips}>
          {interests.map((item) => (
            <ChoiceChip
              key={item}
              label={item}
              selected={draft.interests.includes(item)}
              onPress={() => toggleInterest(item)}
            />
          ))}
        </View>

        <PrimaryButton
          label="Enter YouGo"
          disabled={!valid}
          onPress={() => {
            setUser({ id: "demo-user", displayName: draft.displayName.trim() });
            router.replace("/home");
          }}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 42, paddingBottom: 32 },
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
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
});
