import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type Props = PropsWithChildren<{
  contentStyle?: ViewStyle;
  scroll?: boolean;
}>;

export function LightAuthScreen({ children, contentStyle, scroll = false }: Props) {
  const body = scroll ? (
    <ScrollView
      style={styles.fill}
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.fill, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.orbA}/>
      <View style={styles.orbB}/>
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:"#F9F7FF",overflow:"hidden"},
  fill:{flex:1},
  content:{paddingHorizontal:20},
  orbA:{position:"absolute",width:260,height:260,borderRadius:130,backgroundColor:"rgba(139,92,255,.10)",right:-120,top:-80},
  orbB:{position:"absolute",width:220,height:220,borderRadius:110,backgroundColor:"rgba(255,95,162,.08)",left:-110,bottom:80},
});
