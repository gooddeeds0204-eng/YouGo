import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "@/shared/theme";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function AuthHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  eyebrow: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
});
