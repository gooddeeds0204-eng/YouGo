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
import { RoomToolsPreview } from "@/features/room/tools/RoomToolsPreview";
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
    void getRoom(roomId).then((room)=>{
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
    }finally{setSending(false);}
  };

  return(
    <AppScreen dark scroll contentStyle={styles.screen}>
      <View style={styles.bgTop}/><View style={styles.bgPink}/><View style={styles.bgBlue}/>

      <View style={styles.header}>
        <Pressable style={styles.back} onPress={()=>router.back()}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.roomAvatar}><Text style={styles.roomAvatarText}>{roomName.slice(0,2).toUpperCase()}</Text></View>
        <View style={styles.headerCopy}>
          <Text style={styles.roomName}>{roomName} ✨</Text>
          <Text style={styles.meta}>Room {roomId.slice(0,6)} • LV.{roomLevel}</Text>
        </View>
        <View style={styles.online}><Text style={styles.onlineText}>👥 {audienceCount.toLocaleString()}</Text></View>
        <Pressable style={styles.follow}><Text style={styles.followText}>＋</Text></Pressable>
        <Pressable style={styles.more}><Text style={styles.moreText}>•••</Text></Pressable>
      </View>

      <View style={styles.notice}>
        <Text style={styles.noticeIcon}>📢</Text>
        <Text style={styles.noticeText}>Welcome to the party! Be kind, have fun, gifts & games are live.</Text>
        <Text style={styles.noticeArrow}>›</Text>
      </View>

      <RoomModeTabs mode={mode} onChange={changeMode}/>

      {mode==="voice"?<VoiceStage seatCount={seatCount}/>:null}
      {mode==="video"?<VideoStage/>:null}
      {mode==="game"?<GameStage/>:null}

      <RoomAudienceBar/>
      <RoomChatFeed roomId={roomId} optimisticMessage={optimisticMessage}/>
      <RoomToolsPreview/>

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
  screen:{paddingTop:7,paddingBottom:14,overflow:"hidden"},
  bgTop:{position:"absolute",width:520,height:520,borderRadius:260,backgroundColor:"#3A225F",left:-220,top:-180,opacity:.75},
  bgPink:{position:"absolute",width:330,height:330,borderRadius:165,backgroundColor:"rgba(255,80,165,.16)",right:-170,top:250},
  bgBlue:{position:"absolute",width:300,height:300,borderRadius:150,backgroundColor:"rgba(62,191,242,.10)",left:-180,bottom:80},
  header:{flexDirection:"row",alignItems:"center",gap:7},
  back:{width:38,height:38,borderRadius:14,backgroundColor:"rgba(255,255,255,.10)",alignItems:"center",justifyContent:"center"},
  backText:{color:"#FFFFFF",fontSize:29,marginTop:-3},
  roomAvatar:{width:42,height:42,borderRadius:14,backgroundColor:"#8B5CFF",borderWidth:2,borderColor:"rgba(255,255,255,.20)",alignItems:"center",justifyContent:"center"},
  roomAvatarText:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  headerCopy:{flex:1},
  roomName:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  meta:{color:"rgba(255,255,255,.50)",fontSize:7,marginTop:2},
  online:{paddingHorizontal:8,paddingVertical:6,borderRadius:11,backgroundColor:"rgba(255,255,255,.08)"},
  onlineText:{color:"#FFFFFF",fontSize:7,fontWeight:"800"},
  follow:{width:34,height:34,borderRadius:12,backgroundColor:"#FF5FA2",alignItems:"center",justifyContent:"center"},
  followText:{color:"#FFFFFF",fontSize:17,fontWeight:"900"},
  more:{width:34,height:34,borderRadius:12,backgroundColor:"rgba(255,255,255,.09)",alignItems:"center",justifyContent:"center"},
  moreText:{color:"#FFFFFF",fontSize:10},
  notice:{minHeight:38,borderRadius:14,backgroundColor:"rgba(255,255,255,.08)",borderWidth:1,borderColor:"rgba(255,255,255,.06)",flexDirection:"row",alignItems:"center",paddingHorizontal:10,marginTop:10},
  noticeIcon:{fontSize:12,marginRight:7},
  noticeText:{color:"rgba(255,255,255,.68)",fontSize:7.5,flex:1},
  noticeArrow:{color:"rgba(255,255,255,.55)",fontSize:17},
  bottomSpace:{height:12},
});
