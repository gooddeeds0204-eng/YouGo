import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import type { RoomMode } from "@/contracts/room";
import { seatsForRoomLevel } from "@/config/roomLevels";
import { RoomModeTabs } from "@/features/room/components/RoomModeTabs";
import { VoiceStage } from "@/features/room/voice/VoiceStage";
import { VideoStage } from "@/features/room/video/VideoStage";
import { GameStage } from "@/features/room/game-mode/GameStage";
import { RoomAudienceBar } from "@/features/room/audience/RoomAudienceBar";
import { RoomChatFeed } from "@/features/room/chat/RoomChatFeed";
import { RoomBottomControls } from "@/features/room/components/RoomBottomControls";
import { AppScreen } from "@/shared/ui/AppScreen";
import {
  getRoom,
  joinRoom,
  sendRoomMessage,
  setRoomMode,
  type RoomMessage,
} from "@/platform/supabase/rooms";

type Props={roomId:string};

export function RoomShell({roomId}:Props){
  const [mode,setMode]=useState<RoomMode>("voice");
  const [roomName,setRoomName]=useState("Chill Vibes");
  const [roomLevel,setRoomLevel]=useState(1);
  const [audienceCount,setAudienceCount]=useState(1842);
  const [message,setMessage]=useState("");
  const [sending,setSending]=useState(false);
  const [optimisticMessage,setOptimisticMessage]=useState<RoomMessage|null>(null);
  const seatCount=seatsForRoomLevel(roomLevel);

  useEffect(()=>{
    let mounted=true;
    void getRoom(roomId).then(room=>{
      if(!mounted||!room)return;
      setRoomName(room.name);
      setRoomLevel(room.level);
      setMode(room.mode);
      setAudienceCount(room.audienceCount);
    }).catch(()=>undefined);
    void joinRoom(roomId).catch(()=>undefined);
    return()=>{mounted=false;};
  },[roomId]);

  const changeMode=(next:RoomMode)=>{
    setMode(next);
    void setRoomMode(roomId,next).catch(()=>undefined);
  };

  const send=async()=>{
    const clean=message.trim();
    if(!clean||sending)return;
    setSending(true);
    try{
      const saved=await sendRoomMessage(roomId,clean);
      setMessage("");
      if(saved){
        setOptimisticMessage(saved);
      }else{
        setOptimisticMessage({
          id:"demo-"+Date.now(),
          roomId,
          senderId:"demo-user",
          type:"text",
          body:clean,
          createdAt:new Date().toISOString(),
        });
      }
    }finally{
      setSending(false);
    }
  };

  return(
    <AppScreen dark scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={()=>router.back()}><Text style={styles.backText}>‹</Text></Pressable>

        <View style={styles.roomAvatar}><Text style={styles.roomAvatarText}>{roomName.slice(0,2).toUpperCase()}</Text></View>

        <View style={styles.headerCopy}>
          <Text numberOfLines={1} style={styles.roomName}>{roomName}</Text>
          <Text style={styles.meta}>ID {roomId.slice(0,8)} • {audienceCount.toLocaleString()} joined</Text>
        </View>

        <Pressable style={styles.iconButton}><Text style={styles.iconText}>↗</Text></Pressable>
        <Pressable style={styles.iconButton}><Text style={styles.closeText}>×</Text></Pressable>
      </View>

      <View style={styles.roomTag}>
        <Text style={styles.roomTagText}>{mode==="voice"?"Live Voice":mode==="video"?"Live Video":"Game Room"} • Telugu + English</Text>
      </View>

      <RoomModeTabs mode={mode} onChange={changeMode}/>

      {mode==="voice"?<VoiceStage seatCount={seatCount}/>:null}
      {mode==="video"?<VideoStage/>:null}
      {mode==="game"?<GameStage/>:null}

      <RoomAudienceBar/>

      <View style={styles.safety}>
        <Text style={styles.safetyIcon}>🛡</Text>
        <Text style={styles.safetyText}>18+ verified room • Be kind and respectful.</Text>
      </View>

      <RoomChatFeed roomId={roomId} optimisticMessage={optimisticMessage}/>

      <View style={styles.bottomSpace}/>
      <RoomBottomControls
        roomId={roomId}
        message={message}
        onChangeMessage={setMessage}
        onSend={send}
        sending={sending}
      />
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:16},
  header:{flexDirection:"row",alignItems:"center",gap:9},
  back:{width:42,height:42,borderRadius:15,backgroundColor:"rgba(255,255,255,.09)",alignItems:"center",justifyContent:"center"},
  backText:{color:"#FFFFFF",fontSize:30,marginTop:-3},
  roomAvatar:{width:46,height:46,borderRadius:16,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center"},
  roomAvatarText:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
  headerCopy:{flex:1,minWidth:0},
  roomName:{color:"#FFFFFF",fontSize:17,fontWeight:"900"},
  meta:{color:"rgba(255,255,255,.56)",fontSize:11,marginTop:3},
  iconButton:{width:42,height:42,borderRadius:15,backgroundColor:"rgba(255,255,255,.09)",alignItems:"center",justifyContent:"center"},
  iconText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  closeText:{color:"#FFFFFF",fontSize:24,fontWeight:"400"},
  roomTag:{alignSelf:"center",marginTop:14,paddingHorizontal:14,paddingVertical:8,borderRadius:16,backgroundColor:"rgba(255,255,255,.08)"},
  roomTagText:{color:"#58D9C9",fontSize:12,fontWeight:"900"},
  safety:{minHeight:48,borderRadius:15,backgroundColor:"rgba(79,211,203,.10)",marginTop:14,paddingHorizontal:12,flexDirection:"row",alignItems:"center"},
  safetyIcon:{fontSize:18,marginRight:8},
  safetyText:{color:"#72DECF",fontSize:12,fontWeight:"700",flex:1},
  bottomSpace:{height:14},
});
