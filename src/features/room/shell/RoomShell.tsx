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
    }finally{
      setSending(false);
    }
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.bgA}/><View style={styles.bgB}/><View style={styles.bgC}/>

      <View style={styles.header}>
        <Pressable style={styles.back} onPress={()=>router.back()}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.roomMark}><Text style={styles.roomMarkText}>{roomName.slice(0,2).toUpperCase()}</Text></View>
        <View style={styles.headerCopy}>
          <Text style={styles.roomName}>{roomName} ✨</Text>
          <Text style={styles.meta}>#{roomId.slice(0,8)} • LV.{roomLevel} • {audienceCount.toLocaleString()} online</Text>
        </View>
        <Pressable style={styles.follow}><Text style={styles.followText}>＋ Follow</Text></Pressable>
        <Pressable style={styles.more}><Text style={styles.moreText}>•••</Text></Pressable>
      </View>

      <View style={styles.announcement}><Text style={styles.announceIcon}>📢</Text><Text style={styles.announceText}>Welcome! Respect everyone • enjoy the vibe • event gifts are live.</Text></View>

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
  screen:{paddingTop:6,paddingBottom:14,overflow:"hidden"},
  bgA:{position:"absolute",width:360,height:360,borderRadius:180,right:-180,top:150,backgroundColor:"rgba(116,67,255,.08)"},
  bgB:{position:"absolute",width:280,height:280,borderRadius:140,left:-170,top:420,backgroundColor:"rgba(232,60,185,.055)"},
  bgC:{position:"absolute",width:260,height:260,borderRadius:130,right:-150,bottom:80,backgroundColor:"rgba(43,203,255,.04)"},
  header:{flexDirection:"row",alignItems:"center",gap:8},
  back:{width:34,height:34,borderRadius:12,backgroundColor:"#11131E",alignItems:"center",justifyContent:"center"},
  backText:{color:"#FFFFFF",fontSize:26,marginTop:-3},
  roomMark:{width:36,height:36,borderRadius:12,backgroundColor:"#351A45",borderWidth:1,borderColor:"rgba(232,60,185,.28)",alignItems:"center",justifyContent:"center"},
  roomMarkText:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  headerCopy:{flex:1},
  roomName:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
  meta:{color:"#747A8E",fontSize:6,marginTop:2},
  follow:{paddingHorizontal:8,paddingVertical:6,borderRadius:11,backgroundColor:"#E83CB9"},
  followText:{color:"#FFFFFF",fontSize:6,fontWeight:"900"},
  more:{width:32,height:32,borderRadius:11,backgroundColor:"#11131E",alignItems:"center",justifyContent:"center"},
  moreText:{color:"#FFFFFF",fontSize:10},
  announcement:{minHeight:34,borderRadius:12,backgroundColor:"rgba(255,255,255,.025)",borderWidth:1,borderColor:"rgba(255,255,255,.05)",flexDirection:"row",alignItems:"center",paddingHorizontal:9,marginTop:9},
  announceIcon:{fontSize:10,marginRight:6},
  announceText:{color:"#8A8FA1",fontSize:6.2,flex:1},
  bottomSpace:{height:10},
});
