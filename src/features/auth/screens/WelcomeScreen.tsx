import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { UgoMark } from "@/shared/ui/UgoMark";

export function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.orbPink} />
      <View style={styles.orbBlue} />
      <View style={styles.orbViolet} />

      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.logoHalo}>
            <UgoMark size={94} light />
          </View>
          <Text style={styles.brand}>Ugo</Text>
          <Text style={styles.tagline}>LIVE • SOCIAL • TOGETHER</Text>
          <Text style={styles.title}>Your next room could change your night.</Text>
          <Text style={styles.body}>
            Meet new people, jump into live rooms, play together and build your own community.
          </Text>
        </View>

        <View style={styles.previewRow}>
          {[
            ["🎙", "Voice rooms", "#32184B"],
            ["🎥", "Video hangouts", "#183250"],
            ["🎮", "Games & fun", "#243C31"],
            ["🎁", "Gifts & effects", "#4A1B3C"],
          ].map(([icon,label,tone]) => (
            <View key={label} style={[styles.previewCard,{backgroundColor:tone}]}>
              <Text style={styles.previewIcon}>{icon}</Text>
              <Text style={styles.previewText}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable onPress={() => router.push("/login")} style={styles.primary}>
            <Text style={styles.primaryText}>GET STARTED</Text>
            <Text style={styles.arrow}>→</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.signIn}>Already have an account? <Text style={styles.signInStrong}>Sign in</Text></Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#090913"},
  orbPink:{position:"absolute",width:280,height:280,borderRadius:140,right:-120,top:-80,backgroundColor:"rgba(236,57,185,0.22)"},
  orbBlue:{position:"absolute",width:300,height:300,borderRadius:150,left:-165,top:260,backgroundColor:"rgba(41,182,255,0.16)"},
  orbViolet:{position:"absolute",width:240,height:240,borderRadius:120,right:-110,bottom:-70,backgroundColor:"rgba(116,67,255,0.18)"},
  content:{flex:1,paddingHorizontal:22,paddingTop:42,paddingBottom:24,justifyContent:"space-between"},
  hero:{alignItems:"center"},
  logoHalo:{width:170,height:170,borderRadius:52,borderWidth:1,borderColor:"rgba(190,108,255,0.38)",backgroundColor:"rgba(29,20,52,0.78)",alignItems:"center",justifyContent:"center",shadowColor:"#A443FF",shadowOpacity:.55,shadowRadius:30,shadowOffset:{width:0,height:12},elevation:12},
  brand:{color:"#FFFFFF",fontSize:43,fontWeight:"900",letterSpacing:-1.6,marginTop:24},
  tagline:{color:"#EF4AB9",fontSize:10,fontWeight:"900",letterSpacing:2.1,marginTop:4},
  title:{color:"#FFFFFF",fontSize:27,lineHeight:33,fontWeight:"900",textAlign:"center",marginTop:26,maxWidth:330},
  body:{color:"#979BAE",fontSize:12,lineHeight:19,textAlign:"center",marginTop:10,maxWidth:326},
  previewRow:{flexDirection:"row",flexWrap:"wrap",gap:9},
  previewCard:{width:"48.6%",minHeight:66,borderRadius:18,borderWidth:1,borderColor:"rgba(255,255,255,0.08)",paddingHorizontal:12,flexDirection:"row",alignItems:"center",gap:10},
  previewIcon:{fontSize:21},
  previewText:{color:"#FFFFFF",fontSize:9,fontWeight:"800"},
  actions:{gap:12},
  primary:{minHeight:58,borderRadius:20,backgroundColor:"#EB37B8",alignItems:"center",justifyContent:"center",shadowColor:"#EB37B8",shadowOpacity:.5,shadowRadius:20,shadowOffset:{width:0,height:9},elevation:9},
  primaryText:{color:"#FFFFFF",fontSize:12,fontWeight:"900",letterSpacing:1.2},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:20},
  signIn:{color:"#777C90",fontSize:9,textAlign:"center"},
  signInStrong:{color:"#D89BFF",fontWeight:"900"},
});
