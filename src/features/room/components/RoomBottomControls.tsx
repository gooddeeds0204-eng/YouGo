import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

export function RoomBottomControls(){
  return(
    <View style={styles.wrap}>
      <Pressable style={styles.chat}><Text style={styles.chatIcon}>☺</Text><Text style={styles.chatHint}>Say something...</Text></Pressable>
      <Pressable style={styles.icon}><Text style={styles.iconText}>🎤</Text></Pressable>
      <Pressable onPress={()=>router.push("/gifts")} style={[styles.icon,styles.gift]}><Text style={styles.iconText}>🎁</Text></Pressable>
      <Pressable style={styles.icon}><Text style={styles.iconText}>•••</Text></Pressable>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{flexDirection:"row",alignItems:"center",gap:7,paddingTop:8,borderTopWidth:1,borderTopColor:"rgba(255,255,255,.06)"},
  chat:{flex:1,minHeight:42,borderRadius:16,backgroundColor:"rgba(17,19,30,.92)",borderWidth:1,borderColor:"rgba(255,255,255,.06)",flexDirection:"row",alignItems:"center",paddingHorizontal:10},
  chatIcon:{color:"#8B90A3",fontSize:16,marginRight:7},
  chatHint:{color:"#686E82",fontSize:7.5},
  icon:{width:42,height:42,borderRadius:16,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)",alignItems:"center",justifyContent:"center"},
  gift:{backgroundColor:"#E83CB9",borderColor:"#E83CB9",shadowColor:"#E83CB9",shadowOpacity:.35,shadowRadius:12,elevation:6},
  iconText:{fontSize:17},
});
