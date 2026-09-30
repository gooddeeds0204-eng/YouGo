import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

const roomTools=[
  ["⚔️","PK","#FF6B86"],["🎵","Music","#6E9BFF"],["🎡","Spin","#9B69FF"],
  ["🎲","Dice","#50CDB0"],["🎯","Tasks","#FFAA52"],["•••","More","#7F7896"]
];

export function RoomToolsPreview(){
  return(
    <View style={styles.wrap}>
      <View style={styles.head}><Text style={styles.title}>Party tools</Text><Text style={styles.hint}>Host & fun</Text></View>
      <View style={styles.row}>
        {roomTools.map(([icon,label,tone])=>(
          <Pressable key={label} onPress={label==="Spin"?()=>router.push("/games"):undefined} style={styles.tool}>
            <View style={[styles.iconWrap,{backgroundColor:tone}]}><Text style={styles.icon}>{icon}</Text></View>
            <Text style={styles.label}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:13},
  head:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  title:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  hint:{color:"rgba(255,255,255,.42)",fontSize:7},
  row:{flexDirection:"row",justifyContent:"space-between",marginTop:9},
  tool:{width:"15.5%",alignItems:"center"},
  iconWrap:{width:44,height:44,borderRadius:16,alignItems:"center",justifyContent:"center",shadowColor:"#000000",shadowOpacity:.12,shadowRadius:6,elevation:2},
  icon:{fontSize:18},
  label:{color:"rgba(255,255,255,.72)",fontSize:6.5,fontWeight:"800",textAlign:"center",marginTop:4},
});
