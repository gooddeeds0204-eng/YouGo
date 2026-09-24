import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { ChoiceChip } from "@/features/auth/components/ChoiceChip";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { useSession } from "@/core/session/SessionProvider";
import {
  isValidBirthDate,
  isValidDisplayName,
  isValidUsername,
  normalizeUsername,
} from "@/domains/users/profileRules";
import type { Gender } from "@/domains/users/profile";
import { colors } from "@/shared/theme";

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
    <AuthShell
      step="4 / 4"
      title="Create your profile"
      subtitle="Just the essentials. You can personalize everything else later."
    >
      <View style={styles.identityRow}>
        <Pressable style={styles.avatar}>
          <Text style={styles.avatarPlus}>＋</Text>
          <Text style={styles.avatarLabel}>PHOTO</Text>
        </Pressable>

        <View style={styles.identityFields}>
          <TextInput
            value={draft.displayName}
            onChangeText={(displayName) => updateDraft({ displayName })}
            placeholder="Display name"
            placeholderTextColor="#62687A"
            style={styles.input}
          />
          <TextInput
            value={draft.username}
            onChangeText={(username) => updateDraft({ username: normalizeUsername(username) })}
            placeholder="@username"
            placeholderTextColor="#62687A"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.sectionLabel}>BASIC DETAILS</Text>

      <TextInput
        value={draft.birthDate}
        onChangeText={(birthDate) => updateDraft({ birthDate })}
        placeholder="Birth date  •  YYYY-MM-DD"
        placeholderTextColor="#62687A"
        keyboardType="numbers-and-punctuation"
        maxLength={10}
        style={styles.input}
      />

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

      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>YOUR VIBE</Text>
        <Text style={styles.counter}>{draft.interests.length}/6</Text>
      </View>

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

      <Pressable
        disabled={!valid}
        onPress={() => {
          setUser({ id: "demo-user", displayName: draft.displayName.trim() });
          router.replace("/home");
        }}
        style={[styles.cta, !valid && styles.ctaDisabled]}
      >
        <Text style={styles.ctaLabel}>ENTER YOUGO</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </Pressable>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  identityRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#15111F",
    borderWidth: 1,
    borderColor: "rgba(182,97,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlus: { color: colors.primary, fontSize: 24, lineHeight: 26 },
  avatarLabel: { color: "#71768A", fontSize: 5.5, fontWeight: "900", marginTop: 3 },
  identityFields: { flex: 1, gap: 8 },
  input: {
    minHeight: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#0D0F17",
    color: colors.text,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  sectionRow: {
    marginTop: 14,
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionLabel: {
    color: "#777D91",
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginTop: 14,
    marginBottom: 7,
  },
  counter: { color: "#9A6ED8", fontSize: 7, fontWeight: "900" },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  cta: {
    minHeight: 52,
    borderRadius: 17,
    marginTop: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaDisabled: { opacity: 0.35 },
  ctaLabel: { color: "#FFFFFF", fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  ctaArrow: { position: "absolute", right: 17, color: "#FFFFFF", fontSize: 18 },
});
