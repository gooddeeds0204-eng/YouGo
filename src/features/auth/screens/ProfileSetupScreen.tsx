import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

export function ProfileSetupScreen(){
  return(
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.top}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.stepText}>1 of 3</Text>
      </View>

      <View style={styles.progress}><View style={styles.progressFill}/></View>

      <View style={styles.header}>
        <Text style={styles.title}>Add your photo</Text>
        <Text style={styles.sub}>Choose a clear profile photo. You can change it later.</Text>
      </View>

      <View style={styles.photoArea}>
        <View style={styles.avatar}><Text style={styles.avatarText}>U</Text></View>
        <Pressable style={styles.addButton}><Text style={styles.addText}>＋</Text></Pressable>
      </View>

      <Pressable style={styles.choose}><Text style={styles.chooseText}>Choose photo</Text></Pressable>
      <Text style={styles.hint}>Optional for preview testing</Text>

      <Pressable onPress={()=>router.push("/profile-details")} style={styles.primary}>
        <Text style={styles.primaryText}>Continue</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:20},
  top:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{width:44,height:44,justifyContent:"center"},
  backText:{color:"#4E4858",fontSize:38,lineHeight:38},
  stepText:{color:"#8E8795",fontSize:12,fontWeight:"800"},
  progress:{height:5,borderRadius:3,backgroundColor:"#E7E4EB",marginTop:5,overflow:"hidden"},
  progressFill:{width:"33%",height:"100%",backgroundColor:"#7657F6"},
  header:{marginTop:34},
  title:{color:"#211D2C",fontSize:28,fontWeight:"900"},
  sub:{color:"#7F7889",fontSize:14,lineHeight:20,marginTop:7},
  photoArea:{alignSelf:"center",marginTop:42,position:"relative"},
  avatar:{width:150,height:150,borderRadius:75,backgroundColor:"#EEE9FF",borderWidth:3,borderColor:"#7657F6",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#6749DB",fontSize:48,fontWeight:"900"},
  addButton:{position:"absolute",right:4,bottom:6,width:38,height:38,borderRadius:19,backgroundColor:"#F6549C",borderWidth:4,borderColor:"#F7F7FB",alignItems:"center",justifyContent:"center"},
  addText:{color:"#FFFFFF",fontSize:20,fontWeight:"900",marginTop:-2},
  choose:{alignSelf:"center",minHeight:46,paddingHorizontal:22,borderRadius:23,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center",marginTop:18},
  chooseText:{color:"#6749DB",fontSize:13,fontWeight:"900"},
  hint:{color:"#9B95A1",fontSize:11,textAlign:"center",marginTop:9},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center",marginTop:"auto"},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
});
