import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export function LiveEffectsScreen(){
  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light"/>
      <View style={styles.skyA}/><View style={styles.skyB}/><View style={styles.glow}/>
      <Text style={[styles.spark,styles.s1]}>✦</Text><Text style={[styles.spark,styles.s2]}>✦</Text><Text style={[styles.spark,styles.s3]}>♡</Text><Text style={[styles.spark,styles.s4]}>♡</Text>
      <Pressable onPress={()=>router.back()} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>
      <View style={styles.center}>
        <View style={styles.car}><Text style={styles.carText}>🏎️</Text></View>
        <Text style={styles.title}>Ravi sent</Text>
        <Text style={styles.gift}>Luxury Car</Text>
        <Text style={styles.combo}>× 1 • FULL ROOM EFFECT</Text>
      </View>
      <View style={styles.chat}><Text style={styles.chatText}>♡  Amazing entrance!</Text><Text style={styles.chatMeta}>Room effect preview</Text></View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#090A18",overflow:"hidden"},
  skyA:{position:"absolute",width:500,height:500,borderRadius:250,left:-180,top:-150,backgroundColor:"rgba(93,46,255,.35)"},
  skyB:{position:"absolute",width:470,height:470,borderRadius:235,right:-190,bottom:-160,backgroundColor:"rgba(232,60,185,.34)"},
  glow:{position:"absolute",width:280,height:280,borderRadius:140,alignSelf:"center",top:"28%",backgroundColor:"rgba(255,122,202,.18)"},
  close:{position:"absolute",right:18,top:18,width:38,height:38,borderRadius:19,backgroundColor:"rgba(0,0,0,.3)",alignItems:"center",justifyContent:"center",zIndex:4},
  closeText:{color:"#FFFFFF",fontSize:24},
  center:{flex:1,alignItems:"center",justifyContent:"center"},
  car:{width:210,height:210,borderRadius:105,backgroundColor:"rgba(255,255,255,.06)",borderWidth:1,borderColor:"rgba(255,255,255,.15)",alignItems:"center",justifyContent:"center",shadowColor:"#FF5CC9",shadowOpacity:.65,shadowRadius:30},
  carText:{fontSize:100},
  title:{color:"#FFFFFF",fontSize:14,fontWeight:"900",marginTop:28},
  gift:{color:"#FFB3E5",fontSize:27,fontWeight:"900",marginTop:5},
  combo:{color:"#B6B9C7",fontSize:8,fontWeight:"800",letterSpacing:1,marginTop:7},
  spark:{position:"absolute",color:"#FFFFFF",fontSize:30},
  s1:{left:36,top:150},s2:{right:42,top:210,color:"#FFD56A"},s3:{left:54,bottom:180,color:"#FF7DCE"},s4:{right:48,bottom:240,color:"#FF7DCE"},
  chat:{position:"absolute",left:18,right:18,bottom:24,minHeight:58,borderRadius:20,backgroundColor:"rgba(10,11,23,.72)",borderWidth:1,borderColor:"rgba(255,255,255,.10)",padding:13},
  chatText:{color:"#FFFFFF",fontSize:9,fontWeight:"800"},
  chatMeta:{color:"#7A8093",fontSize:7,marginTop:4},
});
