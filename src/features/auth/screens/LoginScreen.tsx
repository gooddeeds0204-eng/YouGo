import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { UgoMark } from "@/shared/ui/UgoMark";

function preview(name:string){
  Alert.alert("Preview mode", name+" sign-in will be connected in the backend phase.");
}

export function LoginScreen(){
  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.green} />
      <View style={styles.mint} />
      <View style={styles.teal} />
      <View style={styles.circleA} />
      <View style={styles.circleB} />
      <Text style={[styles.decor,styles.noteA]}>♪</Text>
      <Text style={[styles.decor,styles.noteB]}>♫</Text>
      <Text style={[styles.decor,styles.pad]}>🎮</Text>
      <Text style={[styles.decor,styles.mic]}>🎤</Text>

      <View style={styles.content}>
        <View style={styles.brand}>
          <UgoMark size={92} />
          <Text style={styles.brandName}>Ugo</Text>
          <Text style={styles.tag}>Talk • Play • Connect</Text>
          <Text style={styles.lead}>Meet people who match your vibe.</Text>
        </View>

        <View style={styles.auth}>
          <Pressable onPress={()=>preview("Facebook")} style={styles.provider}>
            <View style={[styles.providerIcon,styles.fb]}><Text style={styles.fbText}>f</Text></View>
            <Text style={styles.providerText}>Continue with Facebook</Text>
          </Pressable>
          <Pressable onPress={()=>preview("Google")} style={styles.provider}>
            <View style={styles.providerIcon}><Text style={styles.google}>G</Text></View>
            <Text style={styles.providerText}>Continue with Google</Text>
          </Pressable>

          <View style={styles.quickRow}>
            <Pressable onPress={()=>router.push("/phone")} style={styles.quick}><Text style={styles.quickMint}>▣</Text></Pressable>
            <Pressable onPress={()=>router.push("/phone")} style={styles.quick}><Text style={styles.quickBlue}>☎</Text></Pressable>
            <Pressable onPress={()=>preview("Email")} style={styles.quick}><Text style={styles.quickGray}>✉</Text></Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={()=>router.push("/language")} style={styles.language}>
            <Text style={styles.globe}>◎</Text><Text style={styles.languageText}>English</Text><Text style={styles.languageArrow}>›</Text>
          </Pressable>
          <Text style={styles.legal}>By continuing, you agree to Ugo Terms, Privacy Policy and Community Guidelines.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#42E548"},
  green:{position:"absolute",left:0,right:0,top:0,height:"56%",backgroundColor:"#43E748"},
  mint:{position:"absolute",left:-120,right:-120,top:"37%",height:"42%",borderTopLeftRadius:300,borderTopRightRadius:300,backgroundColor:"#31DB8D",transform:[{rotate:"-4deg"}]},
  teal:{position:"absolute",left:-110,right:-110,bottom:-80,height:"47%",borderTopLeftRadius:280,borderTopRightRadius:280,backgroundColor:"#1FC8C0",transform:[{rotate:"3deg"}]},
  circleA:{position:"absolute",width:145,height:145,borderRadius:73,right:-36,top:210,backgroundColor:"rgba(255,239,71,.22)"},
  circleB:{position:"absolute",width:110,height:110,borderRadius:55,left:-40,top:420,backgroundColor:"rgba(63,189,255,.15)"},
  decor:{position:"absolute",opacity:.18},
  noteA:{left:36,top:130,fontSize:43,transform:[{rotate:"-10deg"}]},
  noteB:{left:14,top:320,fontSize:32},
  pad:{right:18,top:330,fontSize:58,transform:[{rotate:"-8deg"}]},
  mic:{left:78,top:225,fontSize:52,transform:[{rotate:"15deg"}]},
  content:{flex:1,paddingHorizontal:26,paddingTop:48,paddingBottom:20,justifyContent:"space-between"},
  brand:{alignItems:"center"},
  brandName:{color:"#FFFFFF",fontSize:25,fontWeight:"900",marginTop:3},
  tag:{color:"rgba(255,255,255,.95)",fontSize:12,fontWeight:"800",marginTop:4},
  lead:{color:"#FFFFFF",fontSize:15,fontWeight:"900",textAlign:"center",marginTop:18},
  auth:{gap:13,paddingHorizontal:2},
  provider:{minHeight:60,borderRadius:30,backgroundColor:"#FFFFFF",flexDirection:"row",alignItems:"center",paddingHorizontal:14,shadowColor:"#128A6E",shadowOpacity:.16,shadowRadius:16,shadowOffset:{width:0,height:7},elevation:4},
  providerIcon:{width:42,height:42,borderRadius:21,backgroundColor:"#F5F6F8",alignItems:"center",justifyContent:"center"},
  fb:{backgroundColor:"#5D8BE8"},
  fbText:{color:"#FFFFFF",fontSize:30,fontWeight:"900",marginTop:5},
  google:{color:"#4285F4",fontSize:23,fontWeight:"900"},
  providerText:{color:"#2C2E32",fontSize:14,fontWeight:"800",marginLeft:14},
  quickRow:{flexDirection:"row",justifyContent:"center",gap:25,marginTop:12},
  quick:{width:58,height:58,borderRadius:29,backgroundColor:"rgba(255,255,255,.97)",alignItems:"center",justifyContent:"center",shadowColor:"#168B76",shadowOpacity:.12,shadowRadius:10,shadowOffset:{width:0,height:5},elevation:3},
  quickMint:{color:"#2BCBA7",fontSize:24,fontWeight:"900"},
  quickBlue:{color:"#3E9DFB",fontSize:24,fontWeight:"900"},
  quickGray:{color:"#737B91",fontSize:22,fontWeight:"900"},
  footer:{alignItems:"center",gap:14},
  language:{minHeight:44,borderRadius:22,paddingHorizontal:18,backgroundColor:"rgba(255,255,255,.24)",flexDirection:"row",alignItems:"center",gap:8},
  globe:{color:"#FFFFFF",fontSize:17},
  languageText:{color:"#FFFFFF",fontSize:13,fontWeight:"800"},
  languageArrow:{color:"#FFFFFF",fontSize:18},
  legal:{color:"rgba(255,255,255,.86)",fontSize:8.5,lineHeight:14,textAlign:"center",maxWidth:330},
});
