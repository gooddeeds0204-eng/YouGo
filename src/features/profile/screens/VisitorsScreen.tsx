import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { listProfileVisitors } from "@/platform/supabase/social";

const demo=[
  {profile:{id:"a",displayName:"Priya",username:"priya"},visitedAt:new Date().toISOString()},
  {profile:{id:"b",displayName:"Arjun",username:"arjun"},visitedAt:new Date(Date.now()-3600000).toISOString()},
  {profile:{id:"c",displayName:"Sneha",username:"sneha"},visitedAt:new Date(Date.now()-7200000).toISOString()},
];

export function VisitorsScreen(){
  const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{void listProfileVisitors().then(setItems).catch(()=>undefined);},[]);
  const shown=items.length?items:demo;

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.eyebrow}>PROFILE ACTIVITY</Text><Text style={styles.title}>Visitors</Text></View>
      </View>

      <View style={styles.hero}><Text style={styles.heroValue}>{shown.length}</Text><Text style={styles.heroLabel}>Recent profile visitors</Text></View>

      <View style={styles.list}>
        {shown.map((item:any)=>(
          <Pressable key={item.profile.id+"-"+item.visitedAt} onPress={()=>router.push({pathname:"/user/[userId]",params:{userId:item.profile.id}})} style={styles.row}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{item.profile.displayName[0]}</Text></View>
            <View style={styles.copy}><Text style={styles.name}>{item.profile.displayName}</Text><Text style={styles.user}>@{item.profile.username||"ugo"}</Text></View>
            <Text style={styles.time}>{new Date(item.visitedAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</Text>
          </Pressable>
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
  hero:{minHeight:110,borderRadius:21,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  heroValue:{color:"#FFFFFF",fontSize:32,fontWeight:"900"},
  heroLabel:{color:"rgba(255,255,255,.72)",fontSize:11,marginTop:3},
  list:{gap:8},
  row:{minHeight:70,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:10,flexDirection:"row",alignItems:"center"},
  avatar:{width:46,height:46,borderRadius:23,backgroundColor:"#CF5A8C",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  copy:{flex:1,marginLeft:10},
  name:{color:"#3B3541",fontSize:13,fontWeight:"900"},
  user:{color:"#918A97",fontSize:10,marginTop:2},
  time:{color:"#918A97",fontSize:10},
});
