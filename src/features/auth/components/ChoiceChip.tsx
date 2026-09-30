import { Pressable, StyleSheet, Text } from "react-native";
import { radius } from "@/shared/theme";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function ChoiceChip({ label, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.selected]}>
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip:{paddingHorizontal:15,paddingVertical:11,borderRadius:radius.pill,borderWidth:1.5,borderColor:"#E7E1F0",backgroundColor:"#FFFFFF"},
  selected:{borderColor:"#7A5CFF",backgroundColor:"#EEE9FF"},
  text:{color:"#7F778F",fontSize:12,fontWeight:"800"},
  selectedText:{color:"#6B4AF5"},
});
