import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
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

    void listPrivateMessages(conversationId).then((rows)=>{if(mounted)setMessages(rows);}).catch(()=>undefined);

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
    }finally{setSending(false);}
  };

  const hasRealMessages=messages.length>0;

  return(
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.avatar}><Text style={styles.avatarText}>{name[0]}</Text><View style={styles.onlineDot}/></View>
        <View style={styles.headerCopy}><Text style={styles.name}>{name}</Text><Text style={styles.online}>● Online now</Text></View>
        <Pressable style={styles.headerIcon}><Text>📞</Text></Pressable>
        <Pressable style={styles.headerIcon}><Text>🎥</Text></Pressable>
      </View>

      <View style={styles.thread}>
        <View style={styles.day}><Text style={styles.dayText}>Today</Text></View>

        {!hasRealMessages ? (
          <>
            <View style={styles.them}><Text style={styles.bubbleTextThem}>Hi! 👋</Text><Text style={styles.time}>9:21 PM</Text></View>
            <View style={styles.me}><Text style={styles.bubbleText}>Hey! are you there?</Text><Text style={styles.timeLight}>9:22 PM</Text></View>
            <View style={styles.them}><Text style={styles.bubbleTextThem}>Yes, joining the room now ❤️</Text><Text style={styles.time}>9:23 PM</Text></View>
            <View style={styles.voice}><Text style={styles.voiceIcon}>🎤</Text><Text style={styles.wave}>▂▅▇▃▆▂▅</Text><Text style={styles.voiceTime}>00:12</Text></View>
            <View style={styles.invite}><View style={styles.inviteIcon}><Text>🎙</Text></View><View style={styles.inviteCopy}><Text style={styles.inviteTitle}>Chill Vibes</Text><Text style={styles.inviteSub}>Voice room invite</Text></View><Pressable onPress={()=>router.push("/room/chill")} style={styles.join}><Text style={styles.joinText}>Join</Text></Pressable></View>
          </>
        ) : messages.map((message)=>{
          const mine=message.senderId==="demo-user";
          return(
            <View key={message.id} style={mine?styles.me:styles.them}>
              <Text style={mine?styles.bubbleText:styles.bubbleTextThem}>{message.body}</Text>
              <Text style={mine?styles.timeLight:styles.time}>{new Date(message.createdAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.quickTools}>
        {["📷","🎁","🎤","🎮"].map(icon=><Pressable key={icon} style={styles.quick}><Text style={styles.quickIcon}>{icon}</Text></Pressable>)}
      </View>

      <View style={styles.composer}>
        <Pressable style={styles.attach}><Text style={styles.attachText}>＋</Text></Pressable>
        <TextInput value={text} onChangeText={setText} placeholder="Type a message..." placeholderTextColor="#9B93A5" style={styles.input} onSubmitEditing={send} returnKeyType="send" maxLength={2000}/>
        <Pressable onPress={text.trim()?send:undefined} style={styles.send}><Text style={styles.sendText}>{sending?"…":text.trim()?"➤":"🎤"}</Text></Pressable>
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:6,paddingBottom:12},
  header:{flexDirection:"row",alignItems:"center",gap:8,paddingBottom:10,borderBottomWidth:1,borderBottomColor:"#EEEAF4"},
  back:{width:36,height:36,alignItems:"center",justifyContent:"center"},
  backText:{color:"#554D65",fontSize:29},
  avatar:{width:44,height:44,borderRadius:22,backgroundColor:"#FF6AA9",alignItems:"center",justifyContent:"center",position:"relative"},
  avatarText:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  onlineDot:{position:"absolute",right:0,bottom:0,width:12,height:12,borderRadius:6,backgroundColor:"#42D29D",borderWidth:3,borderColor:"#F8F7FF"},
  headerCopy:{flex:1},
  name:{color:"#312A40",fontSize:12,fontWeight:"900"},
  online:{color:"#42B98C",fontSize:7,marginTop:2},
  headerIcon:{width:36,height:36,borderRadius:13,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  thread:{flex:1,paddingVertical:14,gap:10},
  day:{alignSelf:"center",paddingHorizontal:10,paddingVertical:5,borderRadius:10,backgroundColor:"#EEE9FF"},
  dayText:{color:"#7A5CFF",fontSize:7,fontWeight:"800"},
  them:{alignSelf:"flex-start",maxWidth:"76%",borderRadius:18,borderBottomLeftRadius:5,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",padding:11},
  me:{alignSelf:"flex-end",maxWidth:"76%",borderRadius:18,borderBottomRightRadius:5,backgroundColor:"#7A5CFF",padding:11},
  bubbleText:{color:"#FFFFFF",fontSize:10,lineHeight:15},
  bubbleTextThem:{color:"#433B52",fontSize:10,lineHeight:15},
  time:{color:"#A49DAC",fontSize:6,marginTop:5},
  timeLight:{color:"rgba(255,255,255,.70)",fontSize:6,marginTop:5,textAlign:"right"},
  voice:{alignSelf:"flex-end",minWidth:180,minHeight:50,borderRadius:18,borderBottomRightRadius:5,backgroundColor:"#FF5FA2",flexDirection:"row",alignItems:"center",paddingHorizontal:11,gap:8},
  voiceIcon:{fontSize:15},
  wave:{color:"#FFFFFF",fontSize:9,letterSpacing:1},
  voiceTime:{color:"#FFFFFF",fontSize:7},
  invite:{alignSelf:"flex-start",minWidth:240,minHeight:66,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",padding:10,flexDirection:"row",alignItems:"center"},
  inviteIcon:{width:42,height:42,borderRadius:14,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center"},
  inviteCopy:{flex:1,marginLeft:9},
  inviteTitle:{color:"#3B344A",fontSize:9,fontWeight:"900"},
  inviteSub:{color:"#968EA1",fontSize:7,marginTop:2},
  join:{paddingHorizontal:11,paddingVertical:7,borderRadius:12,backgroundColor:"#7A5CFF"},
  joinText:{color:"#FFFFFF",fontSize:7,fontWeight:"900"},
  quickTools:{flexDirection:"row",gap:8,marginBottom:8},
  quick:{width:38,height:38,borderRadius:13,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  quickIcon:{fontSize:17},
  composer:{minHeight:56,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",flexDirection:"row",alignItems:"center",paddingHorizontal:7,gap:6},
  attach:{width:38,height:38,borderRadius:14,backgroundColor:"#F2EDFF",alignItems:"center",justifyContent:"center"},
  attachText:{color:"#7A5CFF",fontSize:18},
  input:{flex:1,color:"#393144",fontSize:10,paddingHorizontal:4},
  send:{width:42,height:42,borderRadius:15,backgroundColor:"#FF5FA2",alignItems:"center",justifyContent:"center"},
  sendText:{color:"#FFFFFF",fontSize:15},
});
