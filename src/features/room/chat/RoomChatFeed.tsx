import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { listRoomMessages, type RoomMessage } from "@/platform/supabase/rooms";
import { subscribeToRoomMessages } from "@/platform/supabase/realtime";

type Props={
  roomId:string;
  optimisticMessage?:RoomMessage|null;
};

const demo=[
  {name:"System",text:"Be kind. Consent and respect are required.",tone:"#4FD3CB"},
  {name:"Arjun",text:"Music next please 🎵",tone:"#8B65E8"},
];

export function RoomChatFeed({roomId,optimisticMessage}:Props){
  const [messages,setMessages]=useState<RoomMessage[]>([]);

  useEffect(()=>{
    let mounted=true;
    void listRoomMessages(roomId).then(rows=>{if(mounted)setMessages(rows);}).catch(()=>undefined);

    const unsubscribe=subscribeToRoomMessages(roomId,event=>{
      const row=event.payload as any;
      if(!row?.id)return;
      setMessages(current=>{
        if(current.some(item=>item.id===row.id))return current;
        return [...current,{
          id:row.id,
          roomId:row.room_id,
          senderId:row.sender_id,
          type:row.type,
          body:row.body,
          createdAt:row.created_at,
        }].slice(-20);
      });
    });

    return()=>{mounted=false;unsubscribe();};
  },[roomId]);

  useEffect(()=>{
    if(!optimisticMessage)return;
    setMessages(current=>current.some(item=>item.id===optimisticMessage.id)?current:[...current,optimisticMessage].slice(-20));
  },[optimisticMessage]);

  const recent=useMemo(()=>messages.filter(item=>item.body).slice(-2),[messages]);

  return(
    <View style={styles.wrap}>
      <Text style={styles.title}>Chat</Text>
      <View style={styles.feed}>
        {recent.length?recent.map(item=>(
          <View key={item.id} style={styles.message}>
            <View style={styles.avatar}><Text style={styles.avatarText}>U</Text></View>
            <View style={styles.bubble}>
              <Text style={styles.name}>Ugo member</Text>
              <Text style={styles.text}>{item.body}</Text>
            </View>
          </View>
        )):demo.map(item=>(
          <View key={item.name} style={styles.message}>
            <View style={[styles.avatar,{backgroundColor:item.tone}]}><Text style={styles.avatarText}>{item.name[0]}</Text></View>
            <View style={styles.bubble}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:16},
  title:{color:"#FFFFFF",fontSize:15,fontWeight:"900",marginBottom:9},
  feed:{gap:8},
  message:{flexDirection:"row",alignItems:"flex-start",gap:8},
  avatar:{width:34,height:34,borderRadius:17,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  bubble:{flex:1,borderRadius:14,backgroundColor:"rgba(255,255,255,.08)",paddingHorizontal:11,paddingVertical:9},
  name:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  text:{color:"rgba(255,255,255,.74)",fontSize:12,lineHeight:17,marginTop:2},
});
