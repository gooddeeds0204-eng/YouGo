import { StyleSheet, TextInput, View } from "react-native";
import { colors, radius } from "@/shared/theme";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function OtpBoxes({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <TextInput
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, "").slice(0, 6))}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
        textContentType="oneTimeCode"
        style={styles.input}
        placeholder="• • • • • •"
        placeholderTextColor="#666B7D"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%" },
  input: {
    width: "100%",
    minHeight: 66,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 8,
    textAlign: "center",
  },
});
