import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  AudioSession,
  LiveKitRoom,
  VideoTrack,
  isTrackReference,
  registerGlobals,
  useRoomContext,
  useTracks,
} from "@livekit/react-native";
import { Track } from "livekit-client";
import type { RoomMode } from "@/contracts/room";
import { getLiveKitCredentials, type LiveKitCredentials } from "@/platform/livekit/token";

registerGlobals();

type Props={roomId:string;mode:RoomMode};

export function LiveRoomMedia({roomId,mode}:Props){
  const [credentials,setCredentials]=useState<LiveKitCredentials|null>(null);
  const [error,setError]=useState<string|null>(null);

  useEffect(()=>{
    if(mode==="game")return;
    let active=true;
    setCredentials(null);
    setError(null);

    void getLiveKitCredentials(roomId,mode)
      .then(value=>{if(active)setCredentials(value);})
      .catch(reason=>{if(active)setError(reason instanceof Error?reason.message:"Live media unavailable.");});

    return()=>{active=false;};
  },[roomId,mode]);

  useEffect(()=>{
    if(mode==="game")return;
    void AudioSession.startAudioSession();
    return()=>{void AudioSession.stopAudioSession();};
  },[mode]);

  if(mode==="game")return null;

  if(!credentials){
    return(
      <View style={styles.status}>
        <View style={[styles.statusDot,error&&styles.statusDotError]}/>
        <View style={styles.statusCopy}>
          <Text style={styles.statusTitle}>{error?"Live media waiting":"Connecting live media..."}</Text>
          <Text style={styles.statusSub}>{error?"Verified login + LiveKit Cloud setup are required.":"Creating secure room session..."}</Text>
        </View>
      </View>
    );
  }

  return(
    <LiveKitRoom
      serverUrl={credentials.url}
      token={credentials.token}
      connect={true}
      audio={false}
      video={false}
      options={{adaptiveStream:{pixelDensity:"screen"}}}
    >
      <MediaControls mode={mode}/>
    </LiveKitRoom>
  );
}

function MediaControls({mode}:{mode:RoomMode}){
  const room=useRoomContext();
  const [mic,setMic]=useState(false);
  const [camera,setCamera]=useState(false);
  const tracks=useTracks([Track.Source.Camera]);

  const videoTracks=useMemo(
    ()=>tracks.filter(isTrackReference).slice(0,4),
    [tracks],
  );

  const toggleMic=async()=>{
    const next=!mic;
    await room.localParticipant.setMicrophoneEnabled(next);
    setMic(next);
  };

  const toggleCamera=async()=>{
    const next=!camera;
    await room.localParticipant.setCameraEnabled(next);
    setCamera(next);
  };

  return(
    <View style={styles.connected}>
      <View style={styles.connectedTop}>
        <View>
          <Text style={styles.liveLabel}>● LIVEKIT CONNECTED</Text>
          <Text style={styles.connectedTitle}>{mode==="video"?"Live camera session":"Live voice session"}</Text>
        </View>
        <View style={styles.controls}>
          <Pressable onPress={toggleMic} style={[styles.control,mic&&styles.controlActive]}><Text style={styles.controlText}>{mic?"🎤":"🔇"}</Text></Pressable>
          {mode==="video"?<Pressable onPress={toggleCamera} style={[styles.control,camera&&styles.controlActive]}><Text style={styles.controlText}>{camera?"🎥":"📷"}</Text></Pressable>:null}
        </View>
      </View>

      {mode==="video"&&videoTracks.length?(
        <View style={styles.videoGrid}>
          {videoTracks.map((trackRef:any)=>(
            <VideoTrack key={trackRef.publication?.trackSid||trackRef.participant?.identity} trackRef={trackRef} style={styles.video}/>
          ))}
        </View>
      ):null}
    </View>
  );
}

const styles=StyleSheet.create({
  status:{minHeight:60,borderRadius:17,backgroundColor:"rgba(255,255,255,.045)",borderWidth:1,borderColor:"rgba(255,255,255,.07)",paddingHorizontal:13,flexDirection:"row",alignItems:"center",marginTop:12},
  statusDot:{width:9,height:9,borderRadius:5,backgroundColor:"#E8B95A",marginRight:10},
  statusDotError:{backgroundColor:"#E25F78"},
  statusCopy:{flex:1},
  statusTitle:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  statusSub:{color:"rgba(255,255,255,.42)",fontSize:9,lineHeight:13,marginTop:2},
  connected:{borderRadius:18,backgroundColor:"rgba(76,205,164,.055)",borderWidth:1,borderColor:"rgba(76,205,164,.12)",padding:12,marginTop:12},
  connectedTop:{flexDirection:"row",alignItems:"center"},
  liveLabel:{color:"#72DECF",fontSize:8,fontWeight:"900",letterSpacing:.8},
  connectedTitle:{color:"#FFFFFF",fontSize:12,fontWeight:"900",marginTop:3},
  controls:{marginLeft:"auto",flexDirection:"row",gap:7},
  control:{width:42,height:42,borderRadius:14,backgroundColor:"rgba(255,255,255,.07)",alignItems:"center",justifyContent:"center"},
  controlActive:{backgroundColor:"#7054E8"},
  controlText:{fontSize:17},
  videoGrid:{flexDirection:"row",flexWrap:"wrap",gap:8,marginTop:12},
  video:{width:"48.5%",height:145,borderRadius:16,overflow:"hidden"},
});
