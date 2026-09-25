import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

const roomTools=[
  ["⚔️","Room PK"],["🎵","Music"],["🎡","Spin"],["🎲","Dice"],["🎯","Missions"],["•••","More"]
];

export function RoomToolsPreview(){
  return(
    <View style={styles.wrap}>
      <View style={styles.head}><Text style={styles.title}>ROOM TOOLS</Text><Text style={styles.hint}>Host controls & entertainment</Text></View>
      <View style={styles.row}>
        {roomTools.map(([icon,label])=>(
          <Pressable key={label} onPress={label==="Spin"?()=>router.push("/games"):undefined} style={styles.tool}>
            <View style={styles.iconWrap}><Text style={styles.icon}>{icon}</Text></View>
            <Text style={styles.label}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:12},
  head:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  title:{color:"#686E82",fontSize:6,fontWeight:"900",letterSpacing:1.1},
  hint:{color:"#565C70",fontSize:5.5},
  row:{flexDirection:"row",justifyContent:"space-between",marginTop:8},
  tool:{width:"15.5%",alignItems:"center"},
  iconWrap:{width:38,height:38,borderRadius:14,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)",alignItems:"center",justifyContent:"center"},
  icon:{fontSize:16},
  label:{color:"#747A8E",fontSize:5.5,fontWeight:"700",textAlign:"center",marginTop:3},
});
