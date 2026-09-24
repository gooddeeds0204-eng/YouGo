import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppScreen } from "@/shared/ui/AppScreen";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { ChoiceChip } from "@/features/auth/components/ChoiceChip";
import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { spacing } from "@/shared/theme";

const languages = [
  ["en", "English"],
  ["te", "తెలుగు"],
  ["hi", "हिन्दी"],
] as const;

export function LanguageScreen() {
  const { draft, updateDraft } = useAuthDraft();

  return (
    <AppScreen contentStyle={styles.screen}>
      <AuthHeader
        eyebrow="LANGUAGE"
        title="Choose your language"
        subtitle="You can change this later from Settings."
      />

      <View style={styles.options}>
        {languages.map(([code, label]) => (
          <ChoiceChip
            key={code}
            label={label}
            selected={draft.language === code}
            onPress={() => updateDraft({ language: code })}
          />
        ))}
      </View>

      <PrimaryButton label="Continue" onPress={() => router.push("/login")} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 56,
    paddingBottom: 28,
    justifyContent: "space-between",
  },
  options: {
    gap: spacing.md,
    alignItems: "flex-start",
  },
});
