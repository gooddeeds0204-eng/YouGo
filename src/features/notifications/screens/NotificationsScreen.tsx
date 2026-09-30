import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { listNotifications, markAllNotificationsRead, type AppNotification } from "@/platform/supabase/notifications";

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
  useEffect(()=>{void listNotifications().then(setItems).catch(()=>undefined);},[]);
  const real=items.length>0;
  const unread=useMemo(()=>items.filter((item)=>!item.readAt).length,[items]);

  const markRead=async()=>{
    await markAllNotificationsRead().catch(()=>undefined);
    setItems((current)=>current.map((item)=>({...item,readAt:item.readAt??new Date().toISOString()})));
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.kicker}>WHAT'S HAPPENING</Text><Text style={styles.title}>Notifications</Text></View>
        <Pressable onPress={markRead}><Text style={styles.mark}>Mark read</Text></Pressable>
      </View>

      {real?<View style={styles.unreadPill}><Text style={styles.unreadPillText}>{unread} unread</Text></View>:null}

      <View style={styles.list}>
        {real ? items.map((item)=>(
          <View key={item.id} style={[styles.row,!item.readAt&&styles.newRow]}>
            <View style={[styles.icon,!item.readAt&&styles.newIcon]}><Text style={styles.iconEmoji}>{iconFor(item.type)}</Text></View>
            <View style={styles.copy}>
              <Text style={styles.text}>{item.title}</Text>
              {item.body?<Text style={styles.body}>{item.body}</Text>:null}
              <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
            {!item.readAt?<View style={styles.dot}/>:null}
          </View>
        )) : demo.map((item,index)=>(
          <View key={item.text} style={[styles.row,index<3&&styles.newRow]}>
            <View style={[styles.icon,index<3&&styles.newIcon]}><Text style={styles.iconEmoji}>{item.icon}</Text></View>
            <View style={styles.copy}><Text style={styles.text}>{item.text}</Text><Text style={styles.time}>{item.time} ago</Text></View>
            {index<3?<View style={styles.dot}/>:null}
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:14},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  backText:{color:"#554D65",fontSize:29,marginTop:-3},
  kicker:{color:"#8B5CFF",fontSize:7.5,fontWeight:"900",letterSpacing:1.1,marginLeft:10},
  title:{color:"#2B243D",fontSize:21,fontWeight:"900",marginLeft:10},
  mark:{marginLeft:"auto",color:"#7A5CFF",fontSize:8.5,fontWeight:"900"},
  unreadPill:{alignSelf:"flex-start",paddingHorizontal:10,paddingVertical:6,borderRadius:12,backgroundColor:"#EEE9FF"},
  unreadPillText:{color:"#6D4DF1",fontSize:7.5,fontWeight:"900"},
  list:{gap:8},
  row:{minHeight:72,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",padding:11,flexDirection:"row",alignItems:"center"},
  newRow:{backgroundColor:"#FCFAFF",borderColor:"#DED4FF"},
  icon:{width:46,height:46,borderRadius:15,backgroundColor:"#F6F2FA",alignItems:"center",justifyContent:"center"},
  newIcon:{backgroundColor:"#EEE9FF"},
  iconEmoji:{fontSize:20},
  copy:{flex:1,marginLeft:10},
  text:{color:"#3A3348",fontSize:9.5,fontWeight:"900"},
  body:{color:"#898193",fontSize:7.5,marginTop:3},
  time:{color:"#A39CAD",fontSize:6.5,marginTop:4},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:"#FF5FA2"},
});
