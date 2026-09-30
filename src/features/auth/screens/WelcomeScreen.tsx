import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useSession } from "@/core/session/SessionProvider";

export function WelcomeScreen(){
  const {enterPreviewMode}=useSession();
  const enter=async()=>{await enterPreviewMode();router.replace("/home");};

  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark"/>
      <View style={styles.glowA}/><View style={styles.glowB}/>

      <View style={styles.content}>
        <View style={styles.brand}>
          <View style={styles.logo}><Text style={styles.logoText}>U</Text></View>
          <View><Text style={styles.brandName}>Ugo</Text><Text style={styles.brandTag}>Live. Social. Together.</Text></View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroOrb}/><View style={styles.goldLine}/>
          <View style={styles.heroIcon}><Text style={styles.heroEmoji}>🎙</Text></View>
          <Text style={styles.heroEyebrow}>YOUR SPACE TO CONNECT</Text>
          <Text style={styles.title}>Talk. Play. Belong.</Text>
          <Text style={styles.sub}>Premium voice rooms, live video and social games — made simple.</Text>

          <View style={styles.people}>
            {[
              ["N","#CF5A8C"],
              ["A","#4F7BC7"],
              ["P","#765ACD"],
              ["R","#B96836"]
            ].map(([letter,tone],index)=>(
              <View key={letter} style={[styles.avatar,{backgroundColor:tone,marginLeft:index?-9:0}]}><Text style={styles.avatarText}>{letter}</Text></View>
            ))}
            <Text style={styles.peopleText}>10K+ live members</Text>
          </View>
        </View>

        <View style={styles.features}>
          {[
            ["🎙","Voice rooms"],
            ["🎥","Video parties"],
            ["🎮","Social games"]
          ].map(([icon,label])=>(
            <View key={label} style={styles.feature}>
              <View style={styles.featureIcon}><Text style={styles.featureEmoji}>{icon}</Text></View>
              <Text style={styles.featureText}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable onPress={enter} style={styles.primary}><Text style={styles.primaryText}>Enter Ugo</Text><Text style={styles.arrow}>→</Text></Pressable>
          <Pressable onPress={()=>router.push("/login")}><Text style={styles.signIn}>Already have an account? <Text style={styles.signInStrong}>Sign in</Text></Text></Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#F8F7FC",overflow:"hidden"},
  glowA:{position:"absolute",width:270,height:270,borderRadius:135,backgroundColor:"rgba(112,84,232,.06)",right:-120,top:-80},
  glowB:{position:"absolute",width:220,height:220,borderRadius:110,backgroundColor:"rgba(232,185,90,.055)",left:-110,bottom:110},
  content:{flex:1,paddingHorizontal:20,paddingTop:18,paddingBottom:24,width:"100%",maxWidth:520,alignSelf:"center"},
  brand:{flexDirection:"row",alignItems:"center"},
  logo:{width:44,height:44,borderRadius:15,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  logoText:{color:"#FFFFFF",fontSize:23,fontWeight:"900"},
  brandName:{color:"#1D1924",fontSize:21,fontWeight:"900",marginLeft:9},
  brandTag:{color:"#8A8390",fontSize:10,marginLeft:9,marginTop:1},
  heroCard:{minHeight:352,borderRadius:28,backgroundColor:"#1B1623",marginTop:28,padding:22,justifyContent:"center",overflow:"hidden",borderWidth:1,borderColor:"#34283F",shadowColor:"#22182F",shadowOpacity:.16,shadowRadius:20,shadowOffset:{width:0,height:10},elevation:6},
  heroOrb:{position:"absolute",width:250,height:250,borderRadius:125,backgroundColor:"rgba(112,84,232,.24)",right:-100,top:-90},
  goldLine:{position:"absolute",left:0,top:0,bottom:0,width:3,backgroundColor:"#E8B95A"},
  heroIcon:{width:68,height:68,borderRadius:22,backgroundColor:"rgba(255,255,255,.07)",borderWidth:1,borderColor:"rgba(232,185,90,.20)",alignItems:"center",justifyContent:"center"},
  heroEmoji:{fontSize:32},
  heroEyebrow:{color:"#E8B95A",fontSize:9,fontWeight:"900",letterSpacing:1.1,marginTop:18},
  title:{color:"#FFFFFF",fontSize:33,lineHeight:38,fontWeight:"900",letterSpacing:-.8,marginTop:5},
  sub:{color:"rgba(255,255,255,.62)",fontSize:13,lineHeight:20,marginTop:9,maxWidth:320},
  people:{flexDirection:"row",alignItems:"center",marginTop:24},
  avatar:{width:40,height:40,borderRadius:20,borderWidth:2,borderColor:"#1B1623",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  peopleText:{color:"rgba(255,255,255,.55)",fontSize:10,fontWeight:"700",marginLeft:10},
  features:{flexDirection:"row",gap:9,marginTop:16},
  feature:{flex:1,minHeight:86,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  featureIcon:{width:42,height:42,borderRadius:14,backgroundColor:"#F2EFF9",alignItems:"center",justifyContent:"center"},
  featureEmoji:{fontSize:20},
  featureText:{color:"#554F5C",fontSize:11,fontWeight:"800",marginTop:6},
  actions:{marginTop:"auto",gap:15},
  primary:{minHeight:58,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  arrow:{position:"absolute",right:18,color:"#E8B95A",fontSize:20},
  signIn:{color:"#817A87",fontSize:13,textAlign:"center"},
  signInStrong:{color:"#7054E8",fontWeight:"900"},
});
