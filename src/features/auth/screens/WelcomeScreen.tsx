import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export function WelcomeScreen(){
  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark"/>
      <View style={styles.content}>
        <View style={styles.brand}>
          <View style={styles.logo}><Text style={styles.logoText}>U</Text></View>
          <Text style={styles.brandName}>Ugo</Text>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}><Text style={styles.heroEmoji}>🎙</Text></View>
          <Text style={styles.title}>Talk. Play. Connect.</Text>
          <Text style={styles.sub}>Join voice rooms, video parties and games with people you like.</Text>
        </View>

        <View style={styles.featureList}>
          {[
            ["🎙","Voice rooms","Talk live with friends and new people"],
            ["🎥","Video rooms","Join simple live video parties"],
            ["🎮","Games","Play without leaving your room"]
          ].map(([icon,title,text])=>(
            <View key={title} style={styles.feature}>
              <View style={styles.featureIcon}><Text style={styles.featureEmoji}>{icon}</Text></View>
              <View style={styles.featureCopy}><Text style={styles.featureTitle}>{title}</Text><Text style={styles.featureText}>{text}</Text></View>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable onPress={()=>router.push("/login")} style={styles.primary}><Text style={styles.primaryText}>Get started</Text></Pressable>
          <Pressable onPress={()=>router.push("/login")}><Text style={styles.signIn}>Already have an account? <Text style={styles.signInStrong}>Sign in</Text></Text></Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#F7F7FB"},
  content:{flex:1,paddingHorizontal:20,paddingTop:18,paddingBottom:24,width:"100%",maxWidth:520,alignSelf:"center"},
  brand:{flexDirection:"row",alignItems:"center"},
  logo:{width:42,height:42,borderRadius:14,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center"},
  logoText:{color:"#FFFFFF",fontSize:23,fontWeight:"900"},
  brandName:{color:"#211D2C",fontSize:22,fontWeight:"900",marginLeft:9},
  hero:{alignItems:"center",marginTop:54},
  heroIcon:{width:118,height:118,borderRadius:36,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center"},
  heroEmoji:{fontSize:52},
  title:{color:"#211D2C",fontSize:30,fontWeight:"900",textAlign:"center",marginTop:22},
  sub:{color:"#7C7588",fontSize:14,lineHeight:21,textAlign:"center",maxWidth:330,marginTop:8},
  featureList:{gap:10,marginTop:34},
  feature:{minHeight:72,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:12,flexDirection:"row",alignItems:"center"},
  featureIcon:{width:46,height:46,borderRadius:15,backgroundColor:"#F2EFF9",alignItems:"center",justifyContent:"center"},
  featureEmoji:{fontSize:22},
  featureCopy:{flex:1,marginLeft:11},
  featureTitle:{color:"#3C3742",fontSize:14,fontWeight:"900"},
  featureText:{color:"#817A8B",fontSize:11,lineHeight:16,marginTop:2},
  actions:{marginTop:"auto",gap:15},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center"},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  signIn:{color:"#817A8B",fontSize:13,textAlign:"center"},
  signInStrong:{color:"#7657F6",fontWeight:"900"},
});
