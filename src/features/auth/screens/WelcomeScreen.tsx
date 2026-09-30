import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const people=[["N","#FF6AA9"],["A","#5E9BFF"],["P","#986BFF"],["R","#FF9A52"],["S","#4CCFB0"]];

export function WelcomeScreen(){
  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark"/>
      <View style={styles.topOrb}/><View style={styles.sideOrb}/>
      <View style={styles.content}>
        <View style={styles.brandRow}>
          <View style={styles.logo}><Text style={styles.logoText}>U</Text></View>
          <Text style={styles.brand}>Ugo</Text>
          <View style={styles.livePill}><Text style={styles.liveText}>● LIVE</Text></View>
        </View>

        <View style={styles.partyCard}>
          <View style={styles.cardBubbleA}/><View style={styles.cardBubbleB}/>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.heroTitle}>Join the party.{"\n"}Meet your people.</Text>
          <Text style={styles.heroSub}>Voice rooms, games, music and new friends — all in one place.</Text>
          <View style={styles.people}>
            {people.map(([n,tone],i)=><View key={n} style={[styles.avatar,{backgroundColor:tone,marginLeft:i?-10:0}]}><Text style={styles.avatarText}>{n}</Text></View>)}
            <View style={styles.count}><Text style={styles.countText}>+10K</Text></View>
          </View>
        </View>

        <View style={styles.features}>
          {[["🎙","Voice rooms"],["🎮","Play together"],["🎁","Gifts & effects"],["🏆","Events & ranking"]].map(([icon,label])=>(
            <View key={label} style={styles.feature}>
              <View style={styles.featureIcon}><Text style={styles.featureEmoji}>{icon}</Text></View>
              <Text style={styles.featureText}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable onPress={()=>router.push("/login")} style={styles.primary}>
            <Text style={styles.primaryText}>Start partying</Text><Text style={styles.arrow}>→</Text>
          </Pressable>
          <Pressable onPress={()=>router.push("/login")}>
            <Text style={styles.signIn}>Already have an account? <Text style={styles.signInStrong}>Sign in</Text></Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#F9F7FF",overflow:"hidden"},
  topOrb:{position:"absolute",width:270,height:270,borderRadius:135,backgroundColor:"rgba(139,92,255,.12)",right:-120,top:-80},
  sideOrb:{position:"absolute",width:210,height:210,borderRadius:105,backgroundColor:"rgba(255,95,162,.09)",left:-100,top:290},
  content:{flex:1,paddingHorizontal:20,paddingTop:20,paddingBottom:22},
  brandRow:{flexDirection:"row",alignItems:"center"},
  logo:{width:38,height:38,borderRadius:13,backgroundColor:"#8B5CFF",alignItems:"center",justifyContent:"center"},
  logoText:{color:"#FFFFFF",fontSize:21,fontWeight:"900"},
  brand:{color:"#251F39",fontSize:22,fontWeight:"900",marginLeft:8},
  livePill:{marginLeft:"auto",paddingHorizontal:10,paddingVertical:7,borderRadius:14,backgroundColor:"#FFF0F7"},
  liveText:{color:"#FF5FA2",fontSize:8,fontWeight:"900"},
  partyCard:{minHeight:330,borderRadius:34,backgroundColor:"#7B5CFF",marginTop:26,padding:24,overflow:"hidden",justifyContent:"center"},
  cardBubbleA:{position:"absolute",width:230,height:230,borderRadius:115,backgroundColor:"rgba(255,255,255,.10)",right:-90,top:-70},
  cardBubbleB:{position:"absolute",width:170,height:170,borderRadius:85,backgroundColor:"rgba(255,95,162,.30)",left:-70,bottom:-60},
  emoji:{fontSize:54},
  heroTitle:{color:"#FFFFFF",fontSize:34,lineHeight:38,fontWeight:"900",letterSpacing:-1.1,marginTop:14},
  heroSub:{color:"rgba(255,255,255,.80)",fontSize:13,lineHeight:20,marginTop:10,maxWidth:300},
  people:{flexDirection:"row",alignItems:"center",marginTop:26},
  avatar:{width:46,height:46,borderRadius:23,borderWidth:3,borderColor:"#7B5CFF",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  count:{height:42,minWidth:58,borderRadius:21,backgroundColor:"rgba(0,0,0,.18)",alignItems:"center",justifyContent:"center",marginLeft:8,paddingHorizontal:8},
  countText:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  features:{flexDirection:"row",flexWrap:"wrap",gap:10,marginTop:18},
  feature:{width:"48.5%",minHeight:70,borderRadius:20,backgroundColor:"#FFFFFF",paddingHorizontal:12,flexDirection:"row",alignItems:"center",shadowColor:"#76699A",shadowOpacity:.08,shadowRadius:8,elevation:2},
  featureIcon:{width:38,height:38,borderRadius:13,backgroundColor:"#F1EDFF",alignItems:"center",justifyContent:"center"},
  featureEmoji:{fontSize:19},
  featureText:{color:"#3C3450",fontSize:11,fontWeight:"800",marginLeft:9},
  actions:{marginTop:"auto",gap:13},
  primary:{minHeight:60,borderRadius:22,backgroundColor:"#FF5FA2",alignItems:"center",justifyContent:"center",shadowColor:"#FF5FA2",shadowOpacity:.22,shadowRadius:14,shadowOffset:{width:0,height:8},elevation:6},
  primaryText:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:21},
  signIn:{color:"#8B849B",fontSize:11,textAlign:"center"},
  signInStrong:{color:"#7A5CFF",fontWeight:"900"},
});
