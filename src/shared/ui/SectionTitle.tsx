import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "@/shared/theme";

type Props = {
  eyebrow?: string;
  title: string;
};

export function SectionTitle({ eyebrow, title }: Props) {
  return (
    <View style={styles.wrap}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.xs },
  eyebrow: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.3,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
});
