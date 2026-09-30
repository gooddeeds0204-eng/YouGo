import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { listRoomMessages, type RoomMessage } from "@/platform/supabase/rooms";
import { subscribeToRoomMessages } from "@/platform/supabase/realtime";

type Props = {
  roomId: string;
  optimisticMessage?: RoomMessage | null;
};

const demoFeed=[
  {kind:"entry",text:"✨ VIP 6 Neha entered with Royal Aurora"},
  {kind:"chat",name:"Arjun",badge:"LV.38",text:"Tonight's room is packed 🔥"},
  {kind:"gift",name:"Priya",text:"sent 💗 Heart ×99"},
  {kind:"chat",name:"Ravi",badge:"VIP 3",text:"Music next please 🎵"},
] as const;

export function RoomChatFeed({roomId,optimisticMessage}:Props){
  const [messages,setMessages]=useState<RoomMessage[]>([]);

  useEffect(()=>{
    let mounted=true;
    void listRoomMessages(roomId).then((rows)=>{if(mounted)setMessages(rows);}).catch(()=>undefined);

    const unsubscribe=subscribeToRoomMessages(roomId,(event)=>{
      const row=event.payload as any;
      if(!row?.id)return;
      setMessages((current)=>{
        if(current.some((item)=>item.id===row.id))return current;
        return [...current,{
          id:row.id,roomId:row.room_id,senderId:row.sender_id,type:row.type,body:row.body,createdAt:row.created_at,
        }].slice(-40);
      });
    });

    return()=>{mounted=false;unsubscribe();};
  },[roomId]);

  useEffect(()=>{
    if(!optimisticMessage)return;
    setMessages((current)=>current.some((item)=>item.id===optimisticMessage.id)?current:[...current,optimisticMessage].slice(-40));
  },[optimisticMessage]);

  const realRows=useMemo(()=>messages.filter((item)=>item.body),[messages]);

  return(
    <View style={styles.wrap}>
      <Text style={styles.title}>Live chat</Text>
      <View style={styles.feed}>
        {realRows.length===0 ? demoFeed.map((item,index)=>{
          if(item.kind==="entry")return <View key={index} style={styles.entry}><Text style={styles.entryText}>{item.text}</Text></View>;
          if(item.kind==="gift")return <View key={index} style={styles.gift}><Text style={styles.giftText}><Text style={styles.strong}>{item.name}</Text> {item.text}</Text></View>;
          return <View key={index} style={styles.line}>
            <View style={styles.miniAvatar}><Text style={styles.miniAvatarText}>{item.name[0]}</Text></View>
            <View style={styles.copy}>
              <View style={styles.meta}><Text style={styles.name}>{item.name}</Text><Text style={styles.badge}>{item.badge}</Text></View>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>;
        }) : realRows.slice(-5).map((item)=>(
          <View key={item.id} style={styles.line}>
            <View style={styles.miniAvatar}><Text style={styles.miniAvatarText}>U</Text></View>
            <View style={styles.copy}>
              <View style={styles.meta}><Text style={styles.name}>Ugo member</Text><Text style={styles.badge}>{item.type.toUpperCase()}</Text></View>
              <Text style={styles.text}>{item.body}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:13},
  title:{color:"#FFFFFF",fontSize:11,fontWeight:"900",marginBottom:7},
  feed:{gap:6},
  entry:{alignSelf:"flex-start",borderRadius:14,backgroundColor:"rgba(139,92,255,.20)",paddingHorizontal:10,paddingVertical:7},
  entryText:{color:"#D9CDFF",fontSize:8,fontWeight:"800"},
  line:{flexDirection:"row",alignItems:"flex-start",gap:7},
  miniAvatar:{width:28,height:28,borderRadius:14,backgroundColor:"#7A5CFF",alignItems:"center",justifyContent:"center"},
  miniAvatarText:{color:"#FFFFFF",fontSize:8,fontWeight:"900"},
  copy:{maxWidth:"82%",borderRadius:14,borderTopLeftRadius:5,backgroundColor:"rgba(255,255,255,.09)",paddingHorizontal:9,paddingVertical:7},
  meta:{flexDirection:"row",alignItems:"center",gap:5},
  name:{color:"#FFFFFF",fontSize:8.5,fontWeight:"900"},
  badge:{color:"#FFB8DD",fontSize:6,fontWeight:"900"},
  text:{color:"rgba(255,255,255,.78)",fontSize:8.5,lineHeight:12,marginTop:2},
  gift:{alignSelf:"flex-start",borderRadius:14,backgroundColor:"rgba(255,95,162,.18)",paddingHorizontal:10,paddingVertical:7},
  giftText:{color:"#FFD0E5",fontSize:8},
  strong:{fontWeight:"900",color:"#FFFFFF"},
});
