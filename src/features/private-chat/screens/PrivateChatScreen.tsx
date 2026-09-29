import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { Avatar } from "@/shared/ui/Avatar";
import {
  listPrivateMessages,
  sendPrivateMessage,
  type PrivateMessage,
} from "@/platform/supabase/messages";
import { subscribeToPrivateMessages } from "@/platform/supabase/realtime";

export function PrivateChatScreen(){
  const {conversationId}=useLocalSearchParams<{conversationId:string}>();
  const [text,setText]=useState("");
  const [messages,setMessages]=useState<PrivateMessage[]>([]);
  const [sending,setSending]=useState(false);
  const name=conversationId==="arjun"?"Arjun":conversationId==="official"?"Ugo Official":"Priya";

  useEffect(()=>{
    let mounted=true;

    void listPrivateMessages(conversationId).then((rows)=>{
      if(mounted) setMessages(rows);
    }).catch(()=>undefined);

    const unsubscribe=subscribeToPrivateMessages(conversationId,(event)=>{
      const row=event.payload as any;
      if(!row?.id)return;
      setMessages((current)=>{
        if(current.some((item)=>item.id===row.id))return current;
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

    return()=>{
      mounted=false;
      unsubscribe();
    };
  },[conversationId]);

  const send=async()=>{
    const clean=text.trim();
    if(!clean||sending)return;
    setSending(true);

    try{
      const saved=await sendPrivateMessage(conversationId,clean);
      setText("");

      if(saved){
        setMessages((current)=>current.some((item)=>item.id===saved.id)?current:[...current,saved]);
      }else{
        setMessages((current)=>[
          ...current,
          {
            id:"demo-"+Date.now(),
            conversationId,
            senderId:"demo-user",
            type:"text",
            body:clean,
            createdAt:new Date().toISOString(),
          },
        ]);
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
        <Avatar name={name} size={40} tone="#C24787"/>
        <View style={styles.headerCopy}><Text style={styles.name}>{name}</Text><Text style={styles.online}>● Online</Text></View>
        <Text style={styles.headerIcon}>⌕</Text><Text style={styles.headerIcon}>⚙</Text>
      </View>

      <View style={styles.thread}>
        {!hasRealMessages ? (
          <>
            <View style={styles.them}><Text style={styles.bubbleText}>Hi! 👋</Text><Text style={styles.time}>9:21 PM</Text></View>
            <View style={styles.me}><Text style={styles.bubbleText}>Hey! are you there?</Text><Text style={styles.timeLight}>9:22 PM</Text></View>
            <View style={styles.them}><Text style={styles.bubbleText}>Yes, joining the room now ❤️</Text><Text style={styles.time}>9:23 PM</Text></View>
            <View style={styles.voice}><Text style={styles.voiceIcon}>🎤</Text><Text style={styles.wave}>▂▅▇▃▆▂▅</Text><Text style={styles.voiceTime}>00:12</Text></View>
          </>
        ) : messages.map((message)=>{
          const mine=message.senderId==="demo-user";
          return(
            <View key={message.id} style={mine?styles.me:styles.them}>
              <Text style={styles.bubbleText}>{message.body}</Text>
              <Text style={mine?styles.timeLight:styles.time}>{new Date(message.createdAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.composer}>
        <Pressable style={styles.attach}><Text>＋</Text></Pressable>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor="#696F83"
          style={styles.input}
          onSubmitEditing={send}
          returnKeyType="send"
          maxLength={2000}
        />
        <Pressable onPress={text.trim()?send:undefined} style={styles.send}><Text style={styles.sendText}>{sending?"…":text.trim()?"➤":"🎤"}</Text></Pressable>
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:6,paddingBottom:12},
  header:{flexDirection:"row",alignItems:"center",gap:8,paddingBottom:10,borderBottomWidth:1,borderBottomColor:"rgba(255,255,255,.06)"},
  back:{width:34,height:34,alignItems:"center",justifyContent:"center"},
  backText:{color:"#FFFFFF",fontSize:28},
  headerCopy:{flex:1},
  name:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  online:{color:"#48D99B",fontSize:6.5,marginTop:2},
  headerIcon:{width:32,height:32,borderRadius:11,backgroundColor:"#11131E",color:"#FFFFFF",textAlign:"center",paddingTop:8,fontSize:13},
  thread:{flex:1,paddingVertical:18,gap:10},
  them:{alignSelf:"flex-start",maxWidth:"76%",borderRadius:18,borderBottomLeftRadius:5,backgroundColor:"#171923",padding:11},
  me:{alignSelf:"flex-end",maxWidth:"76%",borderRadius:18,borderBottomRightRadius:5,backgroundColor:"#E83CB9",padding:11},
  bubbleText:{color:"#FFFFFF",fontSize:10,lineHeight:15},
  time:{color:"#777D91",fontSize:6,marginTop:5},
  timeLight:{color:"rgba(255,255,255,.7)",fontSize:6,marginTop:5,textAlign:"right"},
  voice:{alignSelf:"flex-end",minWidth:170,minHeight:48,borderRadius:18,borderBottomRightRadius:5,backgroundColor:"#E83CB9",flexDirection:"row",alignItems:"center",paddingHorizontal:11,gap:8},
  voiceIcon:{fontSize:15},
  wave:{color:"#FFFFFF",fontSize:9,letterSpacing:1},
  voiceTime:{color:"#FFFFFF",fontSize:7},
  composer:{minHeight:54,borderRadius:20,backgroundColor:"#11131E",flexDirection:"row",alignItems:"center",paddingHorizontal:7,gap:6},
  attach:{width:38,height:38,borderRadius:14,backgroundColor:"#1A1C28",alignItems:"center",justifyContent:"center"},
  input:{flex:1,color:"#FFFFFF",fontSize:10,paddingHorizontal:4},
  send:{width:40,height:40,borderRadius:15,backgroundColor:"#E83CB9",alignItems:"center",justifyContent:"center"},
  sendText:{color:"#FFFFFF",fontSize:15},
});
