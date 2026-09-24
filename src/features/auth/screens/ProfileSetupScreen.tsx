import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors } from "@/shared/theme";
import { Avatar } from "@/shared/ui/Avatar";

export function ProfileSetupScreen(){
  return(
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.stepRow}><Text style={styles.step}>1 / 3</Text><View style={styles.track}><View style={styles.progress}/></View></View>
      <View style={styles.copy}>
        <Text style={styles.title}>Add your photo</Text>
        <Text style={styles.sub}>A clear photo helps people recognize you in rooms and chats.</Text>
      </View>
      <View style={styles.center}>
        <View style={styles.halo}><Avatar name="U" size={132} tone="#261838" ring="#E83CB9" badge="＋"/></View>
        <Text style={styles.helper}>Tap to choose a profile photo</Text>
        <View style={styles.miniRow}>
          <Avatar name="N" tone="#7B45D7"/><Avatar name="A" tone="#D94786"/><Avatar name="R" tone="#298FB9"/><Avatar name="S" tone="#C56C32"/>
        </View>
      </View>
      <Pressable onPress={()=>router.push("/profile-details")} style={styles.primary}><Text style={styles.primaryText}>NEXT</Text><Text style={styles.arrow}>→</Text></Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:14,paddingBottom:24},
  stepRow:{flexDirection:"row",alignItems:"center",gap:10},
  step:{color:"#BBA7D8",fontSize:8,fontWeight:"900"},
  track:{flex:1,height:4,borderRadius:2,backgroundColor:"#1B1D2A",overflow:"hidden"},
  progress:{width:"33%",height:"100%",backgroundColor:colors.primary},
  copy:{marginTop:32},
  title:{color:colors.text,fontSize:31,fontWeight:"900"},
  sub:{color:colors.textMuted,fontSize:12,lineHeight:19,marginTop:8,maxWidth:330},
  center:{flex:1,alignItems:"center",justifyContent:"center"},
  halo:{width:176,height:176,borderRadius:88,backgroundColor:"rgba(232,60,185,.07)",alignItems:"center",justifyContent:"center"},
  helper:{color:"#8A8FA1",fontSize:9,marginTop:18},
  miniRow:{flexDirection:"row",gap:10,marginTop:28},
  primary:{minHeight:58,borderRadius:20,backgroundColor:colors.primary,alignItems:"center",justifyContent:"center"},
  primaryText:{color:"#FFFFFF",fontSize:12,fontWeight:"900",letterSpacing:1.1},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:20},
});
