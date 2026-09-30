import { Pressable, StyleSheet, Text, View } from "react-native";

type Props={
  title?:string;
  subtitle?:string;
  onSearch?:()=>void;
  onBell?:()=>void;
};

export function DarkTopBar({title="Ugo",subtitle="Live rooms for you",onSearch,onBell}:Props){
  return(
    <View style={styles.row}>
      <View style={styles.brand}>
        <View style={styles.logoOuter}>
          <View style={styles.logo}><Text style={styles.logoText}>U</Text></View>
        </View>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.premiumDot}/>
          </View>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={onSearch} style={styles.icon}><Text style={styles.iconText}>⌕</Text></Pressable>
        <Pressable onPress={onBell} style={styles.icon}>
          <Text style={styles.bell}>♢</Text>
          <View style={styles.dot}/>
        </Pressable>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  brand:{flexDirection:"row",alignItems:"center",gap:11},
  logoOuter:{width:48,height:48,borderRadius:17,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center"},
  logo:{width:40,height:40,borderRadius:14,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",shadowColor:"#7054E8",shadowOpacity:.20,shadowRadius:10,shadowOffset:{width:0,height:5},elevation:4},
  logoText:{color:"#FFFFFF",fontSize:22,fontWeight:"900"},
  titleRow:{flexDirection:"row",alignItems:"center"},
  title:{color:"#1D1924",fontSize:23,fontWeight:"900",letterSpacing:-.5},
  premiumDot:{width:7,height:7,borderRadius:4,backgroundColor:"#E8B95A",marginLeft:7},
  subtitle:{color:"#817A89",fontSize:12,fontWeight:"600",marginTop:1},
  actions:{flexDirection:"row",gap:8},
  icon:{width:44,height:44,borderRadius:15,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",shadowColor:"#31263F",shadowOpacity:.05,shadowRadius:8,shadowOffset:{width:0,height:4},elevation:2},
  iconText:{color:"#403947",fontSize:20,fontWeight:"800"},
  bell:{color:"#403947",fontSize:19,fontWeight:"800"},
  dot:{position:"absolute",right:8,top:7,width:8,height:8,borderRadius:4,backgroundColor:"#F05B91",borderWidth:2,borderColor:"#FFFFFF"},
});
