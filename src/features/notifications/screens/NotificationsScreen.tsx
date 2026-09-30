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
  const unread=useMemo(()=>items.filter(item=>!item.readAt).length,[items]);

  const markRead=async()=>{
    await markAllNotificationsRead().catch(()=>undefined);
    setItems(current=>current.map(item=>({...item,readAt:item.readAt??new Date().toISOString()})));
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.title}>Notifications</Text><Text style={styles.sub}>{real?unread+" unread":"Recent activity"}</Text></View>
        <Pressable onPress={markRead}><Text style={styles.mark}>Mark read</Text></Pressable>
      </View>

      <View style={styles.list}>
        {real?items.map(item=>(
          <View key={item.id} style={[styles.row,!item.readAt&&styles.newRow]}>
            <View style={styles.icon}><Text style={styles.iconEmoji}>{iconFor(item.type)}</Text></View>
            <View style={styles.copy}>
              <Text style={styles.text}>{item.title}</Text>
              {item.body?<Text style={styles.body}>{item.body}</Text>:null}
              <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
            {!item.readAt?<View style={styles.dot}/>:null}
          </View>
        )):demo.map((item,index)=>(
          <View key={item.text} style={[styles.row,index<2&&styles.newRow]}>
            <View style={styles.icon}><Text style={styles.iconEmoji}>{item.icon}</Text></View>
            <View style={styles.copy}><Text style={styles.text}>{item.text}</Text><Text style={styles.time}>{item.time} ago</Text></View>
            {index<2?<View style={styles.dot}/>:null}
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:24,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center",marginRight:10},
  backText:{color:"#4D4657",fontSize:30,marginTop:-3},
  title:{color:"#211D2C",fontSize:21,fontWeight:"900"},
  sub:{color:"#817A8B",fontSize:11,marginTop:2},
  mark:{marginLeft:"auto",color:"#7657F6",fontSize:12,fontWeight:"900"},
  list:{gap:8},
  row:{minHeight:76,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:11,flexDirection:"row",alignItems:"center"},
  newRow:{backgroundColor:"#FAF8FF",borderColor:"#DCD3FF"},
  icon:{width:46,height:46,borderRadius:15,backgroundColor:"#F2EFF9",alignItems:"center",justifyContent:"center"},
  iconEmoji:{fontSize:21},
  copy:{flex:1,marginLeft:10},
  text:{color:"#393440",fontSize:13,fontWeight:"800"},
  body:{color:"#817A8B",fontSize:11,lineHeight:16,marginTop:3},
  time:{color:"#9A94A0",fontSize:10,marginTop:4},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:"#F6549C"},
});
