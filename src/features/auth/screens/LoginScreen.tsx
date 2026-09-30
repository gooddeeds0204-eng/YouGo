import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

function preview(name:string){Alert.alert("Preview mode",name+" sign-in will be connected later.");}

export function LoginScreen(){
  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark"/>
      <View style={styles.content}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>

        <View style={styles.brand}>
          <View style={styles.logo}><Text style={styles.logoText}>U</Text></View>
          <Text style={styles.name}>Ugo</Text>
        </View>

        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.sub}>Choose how you want to continue.</Text>

        <Pressable onPress={()=>router.push("/phone")} style={styles.primary}>
          <Text style={styles.primaryIcon}>☎</Text>
          <Text style={styles.primaryText}>Continue with phone</Text>
        </Pressable>

        <View style={styles.socialRow}>
          <Pressable onPress={()=>preview("Google")} style={styles.social}><Text style={styles.socialIcon}>G</Text><Text style={styles.socialText}>Google</Text></Pressable>
          <Pressable onPress={()=>preview("Facebook")} style={styles.social}><Text style={styles.socialIcon}>f</Text><Text style={styles.socialText}>Facebook</Text></Pressable>
        </View>

        <Pressable onPress={()=>router.push("/language")} style={styles.language}>
          <Text style={styles.languageText}>🌐 English</Text><Text style={styles.chev}>›</Text>
        </Pressable>

        <Text style={styles.legal}>By continuing, you agree to Ugo Terms, Privacy Policy and Community Guidelines.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#F7F7FB"},
  content:{flex:1,paddingHorizontal:20,paddingTop:8,paddingBottom:24,width:"100%",maxWidth:520,alignSelf:"center"},
  back:{width:44,height:44,justifyContent:"center"},
  backText:{color:"#4E4858",fontSize:38,lineHeight:38},
  brand:{alignItems:"center",marginTop:42},
  logo:{width:94,height:94,borderRadius:30,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center"},
  logoText:{color:"#FFFFFF",fontSize:49,fontWeight:"900"},
  name:{color:"#211D2C",fontSize:24,fontWeight:"900",marginTop:12},
  title:{color:"#211D2C",fontSize:28,fontWeight:"900",textAlign:"center",marginTop:34},
  sub:{color:"#7C7588",fontSize:14,textAlign:"center",marginTop:7},
  primary:{minHeight:58,borderRadius:18,backgroundColor:"#7657F6",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:30},
  primaryIcon:{fontSize:18,marginRight:9},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  socialRow:{flexDirection:"row",gap:10,marginTop:12},
  social:{flex:1,minHeight:54,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",flexDirection:"row",alignItems:"center",justifyContent:"center"},
  socialIcon:{color:"#5F58C8",fontSize:18,fontWeight:"900",marginRight:8},
  socialText:{color:"#443E4B",fontSize:13,fontWeight:"800"},
  language:{minHeight:52,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",flexDirection:"row",alignItems:"center",paddingHorizontal:14,marginTop:12},
  languageText:{flex:1,color:"#5C5662",fontSize:13,fontWeight:"700"},
  chev:{color:"#9A94A0",fontSize:22},
  legal:{color:"#9A94A0",fontSize:10,lineHeight:15,textAlign:"center",marginTop:"auto"},
});
