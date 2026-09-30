import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title?: string;
  subtitle?: string;
  onSearch?: () => void;
  onBell?: () => void;
};

export function DarkTopBar({ title = "Ugo", subtitle = "Party • Voice • Games", onSearch, onBell }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        <View style={styles.logo}><Text style={styles.logoText}>U</Text></View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={onSearch} style={styles.icon}><Text style={styles.iconText}>⌕</Text></Pressable>
        <Pressable onPress={onBell} style={styles.icon}>
          <Text style={styles.iconText}>♢</Text>
          <View style={styles.dot} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  brand:{flexDirection:"row",alignItems:"center",gap:10},
  logo:{width:42,height:42,borderRadius:15,backgroundColor:"#8B5CFF",alignItems:"center",justifyContent:"center",shadowColor:"#8B5CFF",shadowOpacity:.24,shadowRadius:10,shadowOffset:{width:0,height:5},elevation:5},
  logoText:{color:"#FFFFFF",fontSize:22,fontWeight:"900"},
  title:{color:"#241E38",fontSize:21,fontWeight:"900",letterSpacing:-.5},
  subtitle:{color:"#958DA8",fontSize:9,fontWeight:"700",marginTop:1},
  actions:{flexDirection:"row",gap:8},
  icon:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"rgba(76,55,140,.10)",alignItems:"center",justifyContent:"center",shadowColor:"#725DA5",shadowOpacity:.08,shadowRadius:8,elevation:2},
  iconText:{color:"#463C61",fontSize:18,fontWeight:"800"},
  dot:{position:"absolute",right:8,top:7,width:7,height:7,borderRadius:4,backgroundColor:"#FF5FA2",borderWidth:1.5,borderColor:"#FFFFFF"},
});
