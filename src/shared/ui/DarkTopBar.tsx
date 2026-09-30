import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title?: string;
  subtitle?: string;
  onSearch?: () => void;
  onBell?: () => void;
};

export function DarkTopBar({ title = "Ugo", subtitle = "Find your room", onSearch, onBell }: Props) {
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
          <View style={styles.dot}/>
        </Pressable>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  brand:{flexDirection:"row",alignItems:"center",gap:10},
  logo:{width:44,height:44,borderRadius:15,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center"},
  logoText:{color:"#FFFFFF",fontSize:23,fontWeight:"900"},
  title:{color:"#211D2C",fontSize:22,fontWeight:"900"},
  subtitle:{color:"#8B8496",fontSize:12,fontWeight:"600",marginTop:1},
  actions:{flexDirection:"row",gap:8},
  icon:{width:44,height:44,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  iconText:{color:"#484154",fontSize:20,fontWeight:"800"},
  dot:{position:"absolute",right:8,top:7,width:8,height:8,borderRadius:4,backgroundColor:"#F6549C",borderWidth:2,borderColor:"#FFFFFF"},
});
