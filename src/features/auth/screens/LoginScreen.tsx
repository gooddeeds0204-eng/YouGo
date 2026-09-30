import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

function preview(name:string){Alert.alert("Preview mode",name+" sign-in will be connected later.");}

export function LoginScreen(){
  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark"/>
      <View style={styles.purple}/><View style={styles.pink}/><View style={styles.blue}/>

      <View style={styles.content}>
        <View style={styles.brand}>
          <View style={styles.logo}><Text style={styles.logoText}>U</Text></View>
          <Text style={styles.name}>Ugo</Text>
          <Text style={styles.tag}>Voice • Party • Games</Text>
        </View>

        <View style={styles.avatarCloud}>
          <View style={[styles.avatar,styles.a1,{backgroundColor:"#FF6AA9"}]}><Text style={styles.avatarText}>N</Text></View>
          <View style={[styles.avatar,styles.a2,{backgroundColor:"#5E9BFF"}]}><Text style={styles.avatarText}>A</Text></View>
          <View style={[styles.avatar,styles.a3,{backgroundColor:"#986BFF"}]}><Text style={styles.avatarText}>P</Text></View>
          <View style={[styles.avatar,styles.a4,{backgroundColor:"#FF9A52"}]}><Text style={styles.avatarText}>R</Text></View>
          <View style={[styles.avatar,styles.a5,{backgroundColor:"#4CCFB0"}]}><Text style={styles.avatarText}>S</Text></View>
          <Text style={styles.cloudTitle}>Find your vibe tonight</Text>
        </View>

        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Welcome to Ugo</Text>
          <Text style={styles.sheetSub}>Choose how you want to continue</Text>

          <Pressable onPress={()=>router.push("/phone")} style={styles.phoneBtn}>
            <Text style={styles.phoneIcon}>☎</Text><Text style={styles.phoneText}>Continue with phone</Text>
          </Pressable>

          <View style={styles.or}><View style={styles.line}/><Text style={styles.orText}>or</Text><View style={styles.line}/></View>

          <View style={styles.socialRow}>
            <Pressable onPress={()=>preview("Google")} style={styles.social}><Text style={styles.google}>G</Text><Text style={styles.socialText}>Google</Text></Pressable>
            <Pressable onPress={()=>preview("Facebook")} style={styles.social}><Text style={styles.fb}>f</Text><Text style={styles.socialText}>Facebook</Text></Pressable>
          </View>

          <Pressable onPress={()=>router.push("/language")} style={styles.language}><Text style={styles.languageText}>🌐 English</Text><Text style={styles.chev}>›</Text></Pressable>
          <Text style={styles.legal}>By continuing, you agree to Ugo Terms, Privacy Policy and Community Guidelines.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#EEE9FF",overflow:"hidden"},
  purple:{position:"absolute",width:410,height:410,borderRadius:205,backgroundColor:"#8B5CFF",top:-180,left:-80,opacity:.92},
  pink:{position:"absolute",width:300,height:300,borderRadius:150,backgroundColor:"#FF67A9",top:150,right:-130,opacity:.5},
  blue:{position:"absolute",width:260,height:260,borderRadius:130,backgroundColor:"#4BC8F4",top:290,left:-120,opacity:.3},
  content:{flex:1,paddingHorizontal:18,paddingTop:18},
  brand:{flexDirection:"row",alignItems:"center"},
  logo:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  logoText:{color:"#7A5CFF",fontSize:22,fontWeight:"900"},
  name:{color:"#FFFFFF",fontSize:22,fontWeight:"900",marginLeft:8},
  tag:{color:"rgba(255,255,255,.78)",fontSize:9,fontWeight:"700",marginLeft:8},
  avatarCloud:{height:280,position:"relative",alignItems:"center",justifyContent:"flex-end",paddingBottom:18},
  avatar:{position:"absolute",width:62,height:62,borderRadius:31,alignItems:"center",justifyContent:"center",borderWidth:4,borderColor:"#EEE9FF"},
  a1:{left:18,top:64},a2:{left:112,top:24},a3:{right:24,top:62},a4:{left:70,top:142},a5:{right:86,top:145},
  avatarText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  cloudTitle:{color:"#3A3155",fontSize:25,fontWeight:"900",letterSpacing:-.7},
  sheet:{flex:1,backgroundColor:"#FFFFFF",borderTopLeftRadius:34,borderTopRightRadius:34,marginHorizontal:-18,paddingHorizontal:22,paddingTop:24,paddingBottom:18},
  sheetTitle:{color:"#251F39",fontSize:23,fontWeight:"900",textAlign:"center"},
  sheetSub:{color:"#948DA6",fontSize:11,textAlign:"center",marginTop:5},
  phoneBtn:{minHeight:58,borderRadius:20,backgroundColor:"#7A5CFF",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:22,shadowColor:"#7A5CFF",shadowOpacity:.2,shadowRadius:12,elevation:5},
  phoneIcon:{fontSize:18,marginRight:9},
  phoneText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  or:{flexDirection:"row",alignItems:"center",gap:10,marginVertical:16},
  line:{flex:1,height:1,backgroundColor:"#EEEAF5"},
  orText:{color:"#AAA3B8",fontSize:10},
  socialRow:{flexDirection:"row",gap:10},
  social:{flex:1,minHeight:52,borderRadius:18,backgroundColor:"#F8F7FB",borderWidth:1,borderColor:"#EEEAF5",flexDirection:"row",alignItems:"center",justifyContent:"center"},
  google:{color:"#4285F4",fontSize:18,fontWeight:"900",marginRight:7},
  fb:{color:"#4777E8",fontSize:21,fontWeight:"900",marginRight:7},
  socialText:{color:"#443C55",fontSize:11,fontWeight:"800"},
  language:{minHeight:48,borderRadius:16,backgroundColor:"#FAF9FC",flexDirection:"row",alignItems:"center",paddingHorizontal:14,marginTop:14},
  languageText:{flex:1,color:"#5D556E",fontSize:11,fontWeight:"700"},
  chev:{color:"#9B95A8",fontSize:20},
  legal:{color:"#AAA3B7",fontSize:8,lineHeight:12,textAlign:"center",marginTop:12},
});
