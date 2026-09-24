import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "@/shared/theme";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function ChoiceChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: "#32142D",
  },
  text: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  selectedText: {
    color: colors.text,
  },
});
