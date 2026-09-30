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
      <View style={styles.ambientPurple}/><View style={styles.ambientGold}/><View style={styles.ambientPink}/>

      <View style={styles.header}>
        <Pressable style={styles.back} onPress={()=>router.back()}><Text style={styles.backText}>‹</Text></Pressable>

        <View style={styles.roomAvatarOuter}>
          <View style={styles.roomAvatar}><Text style={styles.roomAvatarText}>{roomName.slice(0,2).toUpperCase()}</Text></View>
        </View>

        <View style={styles.headerCopy}>
          <View style={styles.nameRow}>
            <Text numberOfLines={1} style={styles.roomName}>{roomName}</Text>
            <View style={styles.goldDot}/>
          </View>
          <Text style={styles.meta}>ID {roomId.slice(0,8)} • {audienceCount.toLocaleString()} joined</Text>
        </View>

        <Pressable style={styles.iconButton}><Text style={styles.iconText}>↗</Text></Pressable>
        <Pressable style={styles.iconButton}><Text style={styles.closeText}>×</Text></Pressable>
      </View>

      <View style={styles.roomInfo}>
        <View>
          <Text style={styles.roomInfoLabel}>LIVE ROOM</Text>
          <Text style={styles.roomInfoText}>{mode==="voice"?"Voice party":mode==="video"?"Video party":"Game party"} • Telugu + English</Text>
        </View>
        <View style={styles.levelPill}><Text style={styles.levelText}>LV.{roomLevel}</Text></View>
      </View>

      <RoomModeTabs mode={mode} onChange={changeMode}/>

      {mode==="voice"?<VoiceStage seatCount={seatCount}/>:null}
      {mode==="video"?<VideoStage/>:null}
      {mode==="game"?<GameStage/>:null}

      <RoomAudienceBar/>

      <View style={styles.safety}>
        <View style={styles.safetyIcon}><Text style={styles.safetyEmoji}>🛡</Text></View>
        <View style={styles.safetyCopy}>
          <Text style={styles.safetyTitle}>Verified room</Text>
          <Text style={styles.safetyText}>18+ • Consent and respect are required.</Text>
        </View>
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
  screen:{paddingTop:8,paddingBottom:16,overflow:"hidden"},
  ambientPurple:{position:"absolute",width:380,height:380,borderRadius:190,backgroundColor:"rgba(112,84,232,.13)",right:-190,top:120},
  ambientGold:{position:"absolute",width:240,height:240,borderRadius:120,backgroundColor:"rgba(232,185,90,.055)",left:-130,top:360},
  ambientPink:{position:"absolute",width:300,height:300,borderRadius:150,backgroundColor:"rgba(240,91,145,.075)",right:-180,bottom:110},
  header:{flexDirection:"row",alignItems:"center",gap:9},
  back:{width:44,height:44,borderRadius:15,backgroundColor:"rgba(255,255,255,.055)",borderWidth:1,borderColor:"rgba(255,255,255,.075)",alignItems:"center",justifyContent:"center"},
  backText:{color:"#FFFFFF",fontSize:31,marginTop:-3},
  roomAvatarOuter:{width:50,height:50,borderRadius:17,backgroundColor:"rgba(232,185,90,.10)",alignItems:"center",justifyContent:"center"},
  roomAvatar:{width:44,height:44,borderRadius:15,backgroundColor:"#7054E8",borderWidth:1,borderColor:"rgba(232,185,90,.30)",alignItems:"center",justifyContent:"center"},
  roomAvatarText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  headerCopy:{flex:1,minWidth:0},
  nameRow:{flexDirection:"row",alignItems:"center"},
  roomName:{color:"#FFFFFF",fontSize:17,fontWeight:"900",maxWidth:"86%"},
  goldDot:{width:7,height:7,borderRadius:4,backgroundColor:"#E8B95A",marginLeft:7},
  meta:{color:"rgba(255,255,255,.45)",fontSize:10.5,marginTop:3},
  iconButton:{width:42,height:42,borderRadius:15,backgroundColor:"rgba(255,255,255,.055)",borderWidth:1,borderColor:"rgba(255,255,255,.075)",alignItems:"center",justifyContent:"center"},
  iconText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  closeText:{color:"#FFFFFF",fontSize:24},
  roomInfo:{minHeight:58,borderRadius:17,backgroundColor:"rgba(255,255,255,.04)",borderWidth:1,borderColor:"rgba(255,255,255,.065)",paddingHorizontal:14,marginTop:14,flexDirection:"row",alignItems:"center"},
  roomInfoLabel:{color:"#E8B95A",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  roomInfoText:{color:"#FFFFFF",fontSize:12,fontWeight:"800",marginTop:3},
  levelPill:{marginLeft:"auto",paddingHorizontal:10,paddingVertical:7,borderRadius:12,backgroundColor:"rgba(112,84,232,.16)",borderWidth:1,borderColor:"rgba(182,166,255,.16)"},
  levelText:{color:"#C5B9FF",fontSize:10,fontWeight:"900"},
  safety:{minHeight:62,borderRadius:17,backgroundColor:"rgba(76,205,164,.065)",borderWidth:1,borderColor:"rgba(76,205,164,.12)",marginTop:14,paddingHorizontal:12,flexDirection:"row",alignItems:"center"},
  safetyIcon:{width:38,height:38,borderRadius:13,backgroundColor:"rgba(76,205,164,.10)",alignItems:"center",justifyContent:"center"},
  safetyEmoji:{fontSize:18},
  safetyCopy:{marginLeft:10},
  safetyTitle:{color:"#7FE1C1",fontSize:12,fontWeight:"900"},
  safetyText:{color:"rgba(255,255,255,.52)",fontSize:10.5,marginTop:2},
  bottomSpace:{height:14},
});
