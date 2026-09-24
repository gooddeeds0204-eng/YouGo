import { useRef } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius } from "@/shared/theme";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function OtpBoxes({ value, onChange }: Props) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()} style={styles.wrap}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, "").slice(0, 6))}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
        textContentType="oneTimeCode"
        style={styles.hiddenInput}
      />

      <View style={styles.boxRow}>
        {Array.from({ length: 6 }).map((_, index) => {
          const digit = value[index] ?? "";
          const active = index === value.length && value.length < 6;

          return (
            <View key={index} style={[styles.box, active && styles.activeBox, digit && styles.filledBox]}>
              <Text style={styles.digit}>{digit || "•"}</Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  boxRow: {
    flexDirection: "row",
    gap: 7,
    justifyContent: "space-between",
  },
  box: {
    flex: 1,
    aspectRatio: 0.82,
    maxHeight: 64,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#0E1019",
    alignItems: "center",
    justifyContent: "center",
  },
  activeBox: {
    borderColor: "#B661FF",
    backgroundColor: "#171122",
  },
  filledBox: {
    borderColor: "rgba(232,60,185,0.42)",
  },
  digit: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
});
