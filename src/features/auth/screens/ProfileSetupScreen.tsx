import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const samples=[["N","#FF6AA9"],["A","#5E9BFF"],["R","#FF9A52"],["S","#4CCFB0"]];

export function ProfileSetupScreen(){
  return(
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.top}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.steps}><View style={[styles.step,styles.active]}/><View style={styles.step}/><View style={styles.step}/></View>
        <Text style={styles.stepText}>1 of 3</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>MAKE IT YOURS</Text>
        <Text style={styles.title}>Pick a profile photo</Text>
        <Text style={styles.sub}>Your avatar is what people notice first when you enter a room.</Text>
      </View>

      <View style={styles.photoCard}>
        <View style={styles.ringOuter}>
          <View style={styles.ringMid}>
            <View style={styles.avatar}><Text style={styles.avatarText}>U</Text></View>
          </View>
          <View style={styles.plus}><Text style={styles.plusText}>＋</Text></View>
        </View>
        <Pressable style={styles.choose}><Text style={styles.chooseText}>Choose photo</Text></Pressable>
        <Text style={styles.helper}>JPG / PNG • square photo works best</Text>
      </View>

      <View style={styles.previewBlock}>
        <Text style={styles.previewTitle}>HOW IT LOOKS IN A ROOM</Text>
        <View style={styles.roomPreview}>
          {samples.map(([n,tone],index)=><View key={n} style={styles.person}><View style={[styles.miniRing,index===0&&styles.hostRing]}><View style={[styles.miniAvatar,{backgroundColor:tone}]}><Text style={styles.miniText}>{n}</Text></View></View><Text style={styles.miniName}>{["You","Arjun","Ravi","Sneha"][index]}</Text></View>)}
        </View>
      </View>

      <Pressable onPress={()=>router.push("/profile-details")} style={styles.primary}><Text style={styles.primaryText}>Continue</Text><Text style={styles.arrow}>→</Text></Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:18},
  top:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,justifyContent:"center"},
  backText:{color:"#554D68",fontSize:38,lineHeight:38},
  steps:{flex:1,flexDirection:"row",gap:6,justifyContent:"center"},
  step:{width:34,height:5,borderRadius:3,backgroundColor:"#E4DEED"},
  active:{backgroundColor:"#7A5CFF"},
  stepText:{color:"#9A92AA",fontSize:9,fontWeight:"800",width:42,textAlign:"right"},
  hero:{marginTop:18},
  eyebrow:{color:"#8B5CFF",fontSize:9,fontWeight:"900",letterSpacing:1.4},
  title:{color:"#251F39",fontSize:30,fontWeight:"900",marginTop:5},
  sub:{color:"#8C849D",fontSize:12,lineHeight:19,marginTop:7,maxWidth:330},
  photoCard:{marginTop:24,borderRadius:30,backgroundColor:"#FFFFFF",alignItems:"center",paddingVertical:24,shadowColor:"#756A93",shadowOpacity:.09,shadowRadius:14,elevation:3},
  ringOuter:{width:162,height:162,borderRadius:81,backgroundColor:"#F1ECFF",alignItems:"center",justifyContent:"center"},
  ringMid:{width:142,height:142,borderRadius:71,borderWidth:4,borderColor:"#8B5CFF",alignItems:"center",justifyContent:"center"},
  avatar:{width:124,height:124,borderRadius:62,backgroundColor:"#DCCFFF",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#6546D4",fontSize:46,fontWeight:"900"},
  plus:{position:"absolute",right:10,bottom:8,width:34,height:34,borderRadius:17,backgroundColor:"#FF5FA2",borderWidth:4,borderColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  plusText:{color:"#FFFFFF",fontSize:19,fontWeight:"900",marginTop:-2},
  choose:{marginTop:16,paddingHorizontal:18,paddingVertical:10,borderRadius:16,backgroundColor:"#EEE9FF"},
  chooseText:{color:"#6C4CF4",fontSize:11,fontWeight:"900"},
  helper:{color:"#AAA3B5",fontSize:8,marginTop:8},
  previewBlock:{marginTop:18},
  previewTitle:{color:"#9A92AA",fontSize:8,fontWeight:"900",letterSpacing:1},
  roomPreview:{minHeight:92,borderRadius:22,backgroundColor:"#ECE7FF",marginTop:8,paddingHorizontal:14,flexDirection:"row",alignItems:"center",justifyContent:"space-around"},
  person:{alignItems:"center"},
  miniRing:{width:48,height:48,borderRadius:24,borderWidth:2,borderColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  hostRing:{borderColor:"#FFC85A"},
  miniAvatar:{width:40,height:40,borderRadius:20,alignItems:"center",justifyContent:"center"},
  miniText:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
  miniName:{color:"#675E7A",fontSize:7,marginTop:4,fontWeight:"700"},
  primary:{minHeight:58,borderRadius:21,backgroundColor:"#7A5CFF",alignItems:"center",justifyContent:"center",marginTop:"auto"},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:20},
});
