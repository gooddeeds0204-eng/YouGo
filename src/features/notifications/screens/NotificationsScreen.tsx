import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import {
  listNotifications,
  markAllNotificationsRead,
  type AppNotification,
} from "@/platform/supabase/notifications";

const demo=[
  {icon:"🎁",text:"Priya sent you a Heart ×10",time:"2m"},
  {icon:"🎙",text:"Neha invited you to Chill Vibes",time:"8m"},
  {icon:"🏆",text:"You moved to #12 in Galaxy Carnival",time:"24m"},
  {icon:"🫶",text:"Neon Tribe completed a family mission",time:"1h"},
  {icon:"👀",text:"3 people viewed your profile",time:"2h"},
];

function iconFor(type:string){
  if(type.includes("gift"))return "🎁";
  if(type.includes("room"))return "🎙";
  if(type.includes("rank"))return "🏆";
  if(type.includes("family"))return "🫶";
  return "🔔";
}

export function NotificationsScreen(){
  const [items,setItems]=useState<AppNotification[]>([]);

  useEffect(()=>{
    void listNotifications().then(setItems).catch(()=>undefined);
  },[]);

  const real=items.length>0;
  const unread=useMemo(()=>items.filter((item)=>!item.readAt).length,[items]);

  const markRead=async()=>{
    await markAllNotificationsRead().catch(()=>undefined);
    setItems((current)=>current.map((item)=>({...item,readAt:item.readAt??new Date().toISOString()})));
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()}><Text style={styles.back}>‹</Text></Pressable>
        <View><Text style={styles.title}>Notifications</Text>{real?<Text style={styles.count}>{unread} unread</Text>:null}</View>
        <Pressable onPress={markRead}><Text style={styles.mark}>Mark read</Text></Pressable>
      </View>

      <View style={styles.list}>
        {real ? items.map((item)=>(
          <View key={item.id} style={[styles.row,!item.readAt&&styles.newRow]}>
            <View style={styles.icon}><Text>{iconFor(item.type)}</Text></View>
            <View style={styles.copy}>
              <Text style={styles.text}>{item.title}</Text>
              {item.body?<Text style={styles.body}>{item.body}</Text>:null}
              <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
            {!item.readAt?<View style={styles.dot}/>:null}
          </View>
        )) : demo.map((item,index)=>(
          <View key={item.text} style={[styles.row,index<3&&styles.newRow]}>
            <View style={styles.icon}><Text>{item.icon}</Text></View>
            <View style={styles.copy}><Text style={styles.text}>{item.text}</Text><Text style={styles.time}>{item.time} ago</Text></View>
            {index<3?<View style={styles.dot}/>:null}
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{color:"#FFFFFF",fontSize:30},
  title:{color:"#FFFFFF",fontSize:19,fontWeight:"900"},
  count:{color:"#6E7488",fontSize:6.5,marginTop:2,textAlign:"center"},
  mark:{color:"#B17BFF",fontSize:8,fontWeight:"800"},
  list:{gap:8,marginTop:18},
  row:{minHeight:68,borderRadius:18,backgroundColor:"#11131E",padding:11,flexDirection:"row",alignItems:"center"},
  newRow:{backgroundColor:"#171426"},
  icon:{width:42,height:42,borderRadius:14,backgroundColor:"#1D1B31",alignItems:"center",justifyContent:"center"},
  copy:{flex:1,marginLeft:10},
  text:{color:"#FFFFFF",fontSize:9,fontWeight:"800"},
  body:{color:"#8A8FA1",fontSize:7,marginTop:3},
  time:{color:"#6E7488",fontSize:7,marginTop:4},
  dot:{width:6,height:6,borderRadius:3,backgroundColor:"#E83CB9"},
});
