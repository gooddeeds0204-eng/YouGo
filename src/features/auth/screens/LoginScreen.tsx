import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useSession } from "@/core/session/SessionProvider";

function preview(name:string){Alert.alert("Coming soon",name+" login will be enabled later.");}

export function LoginScreen(){
  const {enterPreviewMode}=useSession();

  const enter=async()=>{
    await enterPreviewMode();
    router.replace("/home");
  };

  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark"/>
      <View style={styles.glowA}/><View style={styles.glowB}/>
      <View style={styles.content}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>

        <View style={styles.brand}>
          <View style={styles.logoHalo}><View style={styles.logo}><Text style={styles.logoText}>U</Text></View></View>
          <Text style={styles.name}>Ugo</Text>
          <Text style={styles.brandLine}>VOICE • PARTY • PLAY</Text>
        </View>

        <View style={styles.sheet}>
          <Text style={styles.title}>Welcome to Ugo</Text>
          <Text style={styles.sub}>SMS login will be enabled later. For now, enter directly and test the app.</Text>

          <Pressable onPress={enter} style={styles.primary}>
            <Text style={styles.primaryText}>Enter Ugo</Text>
            <Text style={styles.primaryArrow}>→</Text>
          </Pressable>

          <View style={styles.previewNote}>
            <Text style={styles.previewNoteTitle}>TEST ACCESS</Text>
            <Text style={styles.previewNoteText}>No OTP is required in the current preview build.</Text>
          </View>

          <View style={styles.divider}><View style={styles.line}/><Text style={styles.or}>later</Text><View style={styles.line}/></View>

          <View style={styles.socialRow}>
            <Pressable onPress={()=>preview("Phone")} style={styles.social}><Text style={styles.socialIcon}>☎</Text><Text style={styles.socialText}>Phone</Text></Pressable>
            <Pressable onPress={()=>preview("Google")} style={styles.social}><Text style={styles.google}>G</Text><Text style={styles.socialText}>Google</Text></Pressable>
          </View>
        </View>

        <Text style={styles.legal}>Preview access is temporary. Production login will use verified authentication.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#F8F7FC",overflow:"hidden"},
  glowA:{position:"absolute",width:280,height:280,borderRadius:140,backgroundColor:"rgba(112,84,232,.07)",right:-120,top:-80},
  glowB:{position:"absolute",width:220,height:220,borderRadius:110,backgroundColor:"rgba(232,185,90,.07)",left:-110,bottom:50},
  content:{flex:1,paddingHorizontal:20,paddingTop:8,paddingBottom:22,width:"100%",maxWidth:520,alignSelf:"center"},
  back:{width:44,height:44,justifyContent:"center"},
  backText:{color:"#4B4551",fontSize:38,lineHeight:38},
  brand:{alignItems:"center",marginTop:26},
  logoHalo:{width:112,height:112,borderRadius:37,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center"},
  logo:{width:94,height:94,borderRadius:31,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",shadowColor:"#7054E8",shadowOpacity:.24,shadowRadius:18,shadowOffset:{width:0,height:9},elevation:7},
  logoText:{color:"#FFFFFF",fontSize:50,fontWeight:"900"},
  name:{color:"#1D1924",fontSize:27,fontWeight:"900",marginTop:14},
  brandLine:{color:"#9A8C67",fontSize:9,fontWeight:"900",letterSpacing:1.8,marginTop:4},
  sheet:{backgroundColor:"#FFFFFF",borderRadius:26,borderWidth:1,borderColor:"#EAE7F1",padding:18,marginTop:30,shadowColor:"#352A43",shadowOpacity:.07,shadowRadius:18,shadowOffset:{width:0,height:9},elevation:4},
  title:{color:"#1D1924",fontSize:24,fontWeight:"900",textAlign:"center"},
  sub:{color:"#7C7584",fontSize:13,lineHeight:19,textAlign:"center",marginTop:6},
  primary:{minHeight:58,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",marginTop:22},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  primaryArrow:{position:"absolute",right:18,color:"#E8B95A",fontSize:20},
  previewNote:{borderRadius:16,backgroundColor:"#F3F0FA",padding:12,marginTop:12},
  previewNoteTitle:{color:"#9A814B",fontSize:9,fontWeight:"900",letterSpacing:1,textAlign:"center"},
  previewNoteText:{color:"#6D6674",fontSize:11,textAlign:"center",marginTop:3},
  divider:{flexDirection:"row",alignItems:"center",gap:9,marginVertical:15},
  line:{flex:1,height:1,backgroundColor:"#ECE9F0"},
  or:{color:"#A19AA7",fontSize:11},
  socialRow:{flexDirection:"row",gap:10},
  social:{flex:1,minHeight:52,borderRadius:16,backgroundColor:"#FAF9FC",borderWidth:1,borderColor:"#ECE9F0",flexDirection:"row",alignItems:"center",justifyContent:"center"},
  socialIcon:{fontSize:17,marginRight:7},
  google:{color:"#486EDB",fontSize:18,fontWeight:"900",marginRight:7},
  socialText:{color:"#49424F",fontSize:13,fontWeight:"800"},
  legal:{color:"#9B94A0",fontSize:10,lineHeight:15,textAlign:"center",marginTop:"auto"},
});
