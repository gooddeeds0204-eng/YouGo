import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { createRoom } from "@/platform/supabase/rooms";

type Mode="voice"|"video"|"game";

export function CreateRoomScreen(){
  const [mode,setMode]=useState<Mode>("voice");
  const [privacy,setPrivacy]=useState<"public"|"private">("public");
  const [name,setName]=useState("Chill Vibes");
  const [busy,setBusy]=useState(false);

  const create=async()=>{
    if(!name.trim()||busy)return;
    setBusy(true);
    try{
      const room=await createRoom({name,mode,privacy});
      router.push(room?("/room/"+room.id):"/room/new-room");
    }finally{setBusy(false);}
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>
        <View><Text style={styles.kicker}>HOST YOUR SPACE</Text><Text style={styles.title}>Create a party</Text></View>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.cover}>
        <View style={styles.coverOrbA}/><View style={styles.coverOrbB}/>
        <View style={styles.coverIcon}><Text style={styles.coverEmoji}>🎉</Text></View>
        <Text style={styles.coverTitle}>Your room cover</Text>
        <Text style={styles.coverSub}>Add a photo later • Ugo theme is ready</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>ROOM NAME</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Room name" placeholderTextColor="#AAA3B4"/>

        <Text style={styles.label}>PARTY TYPE</Text>
        <View style={styles.modeRow}>
          {[["voice","🎙","Voice"],["video","🎥","Video"],["game","🎮","Game"]].map(([id,icon,label])=>{
            const active=mode===id;
            return <Pressable key={id} onPress={()=>setMode(id as Mode)} style={[styles.mode,active&&styles.modeActive]}><Text style={styles.modeIcon}>{icon}</Text><Text style={[styles.modeText,active&&styles.modeTextActive]}>{label}</Text></Pressable>;
          })}
        </View>

        <Text style={styles.label}>WHO CAN JOIN?</Text>
        <View style={styles.segment}>
          {(["public","private"] as const).map(item=><Pressable key={item} onPress={()=>setPrivacy(item)} style={[styles.segmentItem,privacy===item&&styles.segmentActive]}><Text style={[styles.segmentText,privacy===item&&styles.segmentTextActive]}>{item==="public"?"🌍 Public":"🔒 Private"}</Text></Pressable>)}
        </View>
      </View>

      <View style={styles.tip}><Text style={styles.tipIcon}>✨</Text><View><Text style={styles.tipTitle}>One room, three modes</Text><Text style={styles.tipText}>Switch Voice, Video and Game later without losing chat, audience or room identity.</Text></View></View>

      <Pressable disabled={busy||!name.trim()} onPress={create} style={[styles.primary,(busy||!name.trim())&&styles.disabled]}><Text style={styles.primaryText}>{busy?"Creating...":"Create party"}</Text><Text style={styles.arrow}>→</Text></Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:102,gap:14},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  close:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  closeText:{color:"#574F66",fontSize:25},
  kicker:{color:"#8B5CFF",fontSize:8,fontWeight:"900",letterSpacing:1.1,textAlign:"center"},
  title:{color:"#2B243D",fontSize:23,fontWeight:"900",marginTop:2,textAlign:"center"},
  spacer:{width:40},
  cover:{minHeight:165,borderRadius:28,backgroundColor:"#8B5CFF",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  coverOrbA:{position:"absolute",width:180,height:180,borderRadius:90,backgroundColor:"rgba(255,255,255,.12)",right:-50,top:-60},
  coverOrbB:{position:"absolute",width:150,height:150,borderRadius:75,backgroundColor:"rgba(255,95,162,.25)",left:-55,bottom:-65},
  coverIcon:{width:70,height:70,borderRadius:24,backgroundColor:"rgba(255,255,255,.16)",alignItems:"center",justifyContent:"center"},
  coverEmoji:{fontSize:34},
  coverTitle:{color:"#FFFFFF",fontSize:13,fontWeight:"900",marginTop:9},
  coverSub:{color:"rgba(255,255,255,.70)",fontSize:7.5,marginTop:3},
  card:{borderRadius:26,backgroundColor:"#FFFFFF",padding:16,borderWidth:1,borderColor:"#EEEAF4"},
  label:{color:"#928A9F",fontSize:8.5,fontWeight:"900",letterSpacing:1,marginTop:8,marginBottom:7},
  input:{minHeight:54,borderRadius:18,backgroundColor:"#F8F7FB",borderWidth:1.5,borderColor:"#EEEAF4",color:"#2F283E",paddingHorizontal:14,fontSize:12},
  modeRow:{flexDirection:"row",gap:8},
  mode:{flex:1,minHeight:76,borderRadius:18,backgroundColor:"#F8F7FB",borderWidth:1.5,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  modeActive:{backgroundColor:"#EEE9FF",borderColor:"#7A5CFF"},
  modeIcon:{fontSize:24},
  modeText:{color:"#8B8398",fontSize:8.5,fontWeight:"800",marginTop:4},
  modeTextActive:{color:"#6D4DF1"},
  segment:{flexDirection:"row",backgroundColor:"#F8F7FB",borderRadius:17,padding:4},
  segmentItem:{flex:1,minHeight:42,borderRadius:14,alignItems:"center",justifyContent:"center"},
  segmentActive:{backgroundColor:"#7A5CFF"},
  segmentText:{color:"#8B8398",fontSize:8.5,fontWeight:"800"},
  segmentTextActive:{color:"#FFFFFF"},
  tip:{borderRadius:20,backgroundColor:"#FFF0F7",padding:13,flexDirection:"row",gap:9,alignItems:"flex-start"},
  tipIcon:{fontSize:19},
  tipTitle:{color:"#5A3E4E",fontSize:9,fontWeight:"900"},
  tipText:{color:"#88717D",fontSize:7.5,lineHeight:11,marginTop:3,maxWidth:290},
  primary:{minHeight:58,borderRadius:21,backgroundColor:"#FF5FA2",alignItems:"center",justifyContent:"center"},
  disabled:{opacity:.4},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:20},
});
