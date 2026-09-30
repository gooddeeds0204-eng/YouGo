import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { listPrivateMessages, sendPrivateMessage, type PrivateMessage } from "@/platform/supabase/messages";
import { subscribeToPrivateMessages } from "@/platform/supabase/realtime";

export function PrivateChatScreen(){
  const {conversationId}=useLocalSearchParams<{conversationId:string}>();
  const [text,setText]=useState("");
  const [messages,setMessages]=useState<PrivateMessage[]>([]);
  const [sending,setSending]=useState(false);
  const name=conversationId==="arjun"?"Arjun":conversationId==="official"?"Ugo Official":"Priya";

  useEffect(()=>{
    let mounted=true;
    void listPrivateMessages(conversationId).then(rows=>{if(mounted)setMessages(rows);}).catch(()=>undefined);

    const unsubscribe=subscribeToPrivateMessages(conversationId,event=>{
      const row=event.payload as any;
      if(!row?.id)return;
      setMessages(current=>{
        if(current.some(item=>item.id===row.id))return current;
        return [...current,{
          id:row.id,
          conversationId:row.conversation_id,
          senderId:row.sender_id,
          type:row.type,
          body:row.body,
          createdAt:row.created_at,
        }].slice(-80);
      });
    });

    return()=>{mounted=false;unsubscribe();};
  },[conversationId]);

  const send=async()=>{
    const clean=text.trim();
    if(!clean||sending)return;
    setSending(true);
    try{
      const saved=await sendPrivateMessage(conversationId,clean);
      setText("");
      if(saved){
        setMessages(current=>current.some(item=>item.id===saved.id)?current:[...current,saved]);
      }else{
        setMessages(current=>[...current,{
          id:"demo-"+Date.now(),
          conversationId,
          senderId:"demo-user",
          type:"text",
          body:clean,
          createdAt:new Date().toISOString(),
        }]);
      }
    }finally{
      setSending(false);
    }
  };

  const hasRealMessages=messages.length>0;

  return(
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.avatar}><Text style={styles.avatarText}>{name[0]}</Text><View style={styles.onlineDot}/></View>
        <View style={styles.headerCopy}><Text style={styles.name}>{name}</Text><Text style={styles.online}>Online</Text></View>
        <Pressable style={styles.call}><Text style={styles.callText}>📞</Text></Pressable>
        <Pressable style={styles.call}><Text style={styles.callText}>🎥</Text></Pressable>
      </View>

      <View style={styles.thread}>
        {!hasRealMessages?(
          <>
            <View style={styles.them}><Text style={styles.themText}>Hi! 👋</Text><Text style={styles.time}>9:21 PM</Text></View>
            <View style={styles.me}><Text style={styles.meText}>Hey! are you there?</Text><Text style={styles.timeMe}>9:22 PM</Text></View>
            <View style={styles.them}><Text style={styles.themText}>Yes, joining the room now ❤️</Text><Text style={styles.time}>9:23 PM</Text></View>
          </>
        ):messages.map(message=>{
          const mine=message.senderId==="demo-user";
          return(
            <View key={message.id} style={mine?styles.me:styles.them}>
              <Text style={mine?styles.meText:styles.themText}>{message.body}</Text>
              <Text style={mine?styles.timeMe:styles.time}>{new Date(message.createdAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.composer}>
        <Pressable style={styles.attach}><Text style={styles.attachText}>＋</Text></Pressable>
        <TextInput value={text} onChangeText={setText} placeholder="Type a message..." placeholderTextColor="#948D9B" style={styles.input} onSubmitEditing={send} returnKeyType="send" maxLength={2000}/>
        <Pressable onPress={text.trim()?send:undefined} style={styles.send}><Text style={styles.sendText}>{sending?"…":text.trim()?"➤":"🎤"}</Text></Pressable>
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:6,paddingBottom:12},
  header:{flexDirection:"row",alignItems:"center",gap:8,paddingBottom:10,borderBottomWidth:1,borderBottomColor:"#ECEAF2"},
  back:{width:38,height:38,alignItems:"center",justifyContent:"center"},
  backText:{color:"#4D4657",fontSize:30},
  avatar:{width:46,height:46,borderRadius:23,backgroundColor:"#F768A7",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  onlineDot:{position:"absolute",right:0,bottom:0,width:12,height:12,borderRadius:6,backgroundColor:"#3BC795",borderWidth:3,borderColor:"#F7F7FB"},
  headerCopy:{flex:1},
  name:{color:"#2E2935",fontSize:15,fontWeight:"900"},
  online:{color:"#3BB889",fontSize:11,marginTop:2},
  call:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  callText:{fontSize:17},
  thread:{flex:1,paddingVertical:16,gap:10},
  them:{alignSelf:"flex-start",maxWidth:"78%",borderRadius:18,borderBottomLeftRadius:5,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:12},
  me:{alignSelf:"flex-end",maxWidth:"78%",borderRadius:18,borderBottomRightRadius:5,backgroundColor:"#7657F6",padding:12},
  themText:{color:"#403A46",fontSize:13,lineHeight:19},
  meText:{color:"#FFFFFF",fontSize:13,lineHeight:19},
  time:{color:"#9A94A0",fontSize:10,marginTop:5},
  timeMe:{color:"rgba(255,255,255,.70)",fontSize:10,marginTop:5,textAlign:"right"},
  composer:{minHeight:58,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",flexDirection:"row",alignItems:"center",paddingHorizontal:7,gap:7},
  attach:{width:40,height:40,borderRadius:14,backgroundColor:"#F0EDF8",alignItems:"center",justifyContent:"center"},
  attachText:{color:"#7657F6",fontSize:20},
  input:{flex:1,color:"#393440",fontSize:13},
  send:{width:42,height:42,borderRadius:15,backgroundColor:"#F6549C",alignItems:"center",justifyContent:"center"},
  sendText:{color:"#FFFFFF",fontSize:16},
});
