import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { useSession } from "@/core/session/SessionProvider";
import { listPublicRooms, type PublicRoom } from "@/platform/supabase/roomRuntime";
import { listMyMissions, type MissionItem } from "@/platform/supabase/activities";

export function HostCenterScreen(){
  const {user}=useSession();
  const [rooms,setRooms]=useState<PublicRoom[]>([]);
  const [missions,setMissions]=useState<MissionItem[]>([]);

  useEffect(()=>{
    void listPublicRooms().then(setRooms).catch(()=>undefined);
    void listMyMissions().then(setMissions).catch(()=>undefined);
  },[]);

  const myRooms=useMemo(()=>rooms.filter(room=>room.ownerId===user?.id),[rooms,user?.id]);
  const room=myRooms[0];

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.eyebrow}>CREATOR TOOLS</Text><Text style={styles.title}>Host Center</Text></View>
      </View>

      <View style={styles.hero}>
        <View><Text style={styles.heroKicker}>HOST LEVEL</Text><Text style={styles.heroValue}>LV.1</Text><Text style={styles.heroSub}>Build healthy rooms, welcome members and grow your community.</Text></View>
        <Text style={styles.heroIcon}>🎙</Text>
      </View>

      <View style={styles.stats}>
        {[["0","Weekly visitors"],["0","New followers"],["0","Gift charm"],["100%","Room health"]].map(([v,l])=>(
          <View key={l} style={styles.stat}><Text style={styles.statValue}>{v}</Text><Text style={styles.statLabel}>{l}</Text></View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Room management</Text>
      <View style={styles.menu}>
        {[
          ["🎙","My room",room?"/room/"+room.id:"/create-room"],
          ["👥","Members",room?"/room-tools?roomId="+room.id:"/create-room"],
          ["🛡","Moderation","/safety"],
          ["🎯","Host missions","/activity"],
        ].map(([icon,label,path],index)=>(
          <Pressable key={label} onPress={()=>router.push(path as never)} style={[styles.row,index>0&&styles.border]}>
            <View style={styles.iconWrap}><Text style={styles.icon}>{icon}</Text></View>
            <Text style={styles.rowText}>{label}</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Current missions</Text>
      <View style={styles.missions}>
        {(missions.length?missions.slice(0,3):[
          {id:"a",title:"Host your first room",target:1,progress:0,rewardAmount:100,rewardType:"coins"},
          {id:"b",title:"Welcome 10 members",target:10,progress:0,rewardAmount:150,rewardType:"coins"},
        ]).map((mission:any)=>(
          <View key={mission.id} style={styles.mission}>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <Text style={styles.missionReward}>+{mission.rewardAmount} {mission.rewardType}</Text>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:30,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",marginRight:10},
  backText:{color:"#4B4551",fontSize:30,marginTop:-3},
  eyebrow:{color:"#A1874F",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#1D1924",fontSize:21,fontWeight:"900"},
  hero:{minHeight:150,borderRadius:24,backgroundColor:"#1B1623",padding:18,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  heroKicker:{color:"#E8B95A",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  heroValue:{color:"#FFFFFF",fontSize:30,fontWeight:"900",marginTop:4},
  heroSub:{color:"rgba(255,255,255,.56)",fontSize:11,lineHeight:16,maxWidth:250,marginTop:6},
  heroIcon:{fontSize:46},
  stats:{flexDirection:"row",flexWrap:"wrap",gap:8},
  stat:{width:"48.8%",minHeight:86,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:13},
  statValue:{color:"#2E2935",fontSize:19,fontWeight:"900"},
  statLabel:{color:"#817A87",fontSize:10,marginTop:4},
  sectionTitle:{color:"#1D1924",fontSize:18,fontWeight:"900"},
  menu:{borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",overflow:"hidden"},
  row:{minHeight:62,paddingHorizontal:12,flexDirection:"row",alignItems:"center"},
  border:{borderTopWidth:1,borderTopColor:"#F0EDF3"},
  iconWrap:{width:40,height:40,borderRadius:13,backgroundColor:"#F3F0F8",alignItems:"center",justifyContent:"center"},
  icon:{fontSize:18},
  rowText:{flex:1,color:"#433E49",fontSize:13,fontWeight:"800",marginLeft:10},
  arrow:{color:"#9B94A0",fontSize:22},
  missions:{gap:8},
  mission:{minHeight:64,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:12,flexDirection:"row",alignItems:"center"},
  missionTitle:{flex:1,color:"#403A46",fontSize:12,fontWeight:"900"},
  missionReward:{color:"#7054E8",fontSize:10,fontWeight:"900"},
});
