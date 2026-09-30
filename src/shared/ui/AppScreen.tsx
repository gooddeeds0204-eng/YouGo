import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/shared/theme";

type Props = PropsWithChildren<{
  scroll?: boolean;
  contentStyle?: ViewStyle;
  dark?: boolean;
}>;

export function AppScreen({ children, scroll = false, contentStyle, dark = false }: Props) {
  const safeStyle = [styles.safe, dark && styles.dark];

  if (scroll) {
    return (
      <SafeAreaView style={safeStyle}>
        <ScrollView
          style={styles.fill}
          contentContainerStyle={[styles.content, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={safeStyle}>
      <View style={[styles.content, styles.fill, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:colors.background},
  dark:{backgroundColor:"#171321"},
  fill:{flex:1},
  content:{paddingHorizontal:16,width:"100%",maxWidth:520,alignSelf:"center"},
});
