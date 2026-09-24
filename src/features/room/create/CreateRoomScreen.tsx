import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors } from "@/shared/theme";

type Mode="voice"|"video"|"game";

export function CreateRoomScreen(){
  const [mode,setMode]=useState<Mode>("voice");
  const [privacy,setPrivacy]=useState<"public"|"private">("public");
  const [name,setName]=useState("Chill Vibes");

  const create=()=>router.push("/room/new-room");

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <View><Text style={styles.kicker}>START SOMETHING</Text><Text style={styles.title}>Create a room</Text></View>
        <Pressable onPress={()=>router.back()} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>
      </View>

      <View style={styles.cover}>
        <View style={styles.coverGlowA}/><View style={styles.coverGlowB}/>
        <Text style={styles.coverIcon}>📷</Text>
        <Text style={styles.coverTitle}>Add room cover</Text>
        <Text style={styles.coverSub}>Optional • change anytime</Text>
      </View>

      <Text style={styles.label}>ROOM NAME</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Room name" placeholderTextColor="#61677A"/>

      <Text style={styles.label}>ROOM TYPE</Text>
      <View style={styles.modeRow}>
        {[
          ["voice","🎙","Voice"],["video","🎥","Video"],["game","🎮","Game"]
        ].map(([id,icon,label])=>{
          const active=mode===id;
          return <Pressable key={id} onPress={()=>setMode(id as Mode)} style={[styles.mode,active&&styles.modeActive]}>
            <Text style={styles.modeIcon}>{icon}</Text><Text style={[styles.modeText,active&&styles.modeTextActive]}>{label}</Text>
          </Pressable>;
        })}
      </View>

      <Text style={styles.label}>PRIVACY</Text>
      <View style={styles.segment}>
        {(["public","private"] as const).map(item=><Pressable key={item} onPress={()=>setPrivacy(item)} style={[styles.segmentItem,privacy===item&&styles.segmentActive]}><Text style={[styles.segmentText,privacy===item&&styles.segmentTextActive]}>{item==="public"?"Public":"Private"}</Text></Pressable>)}
      </View>

      <View style={styles.info}>
        <Text style={styles.infoIcon}>✦</Text>
        <View><Text style={styles.infoTitle}>Persistent room</Text><Text style={styles.infoText}>Switch Voice, Video and Game modes later without losing room identity, chat, roles or gifts.</Text></View>
      </View>

      <Pressable onPress={create} style={styles.primary}><Text style={styles.primaryText}>CREATE ROOM</Text><Text style={styles.arrow}>→</Text></Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:12,paddingBottom:104,gap:10},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  kicker:{color:"#754DB9",fontSize:7,fontWeight:"900",letterSpacing:1.2},
  title:{color:"#FFFFFF",fontSize:28,fontWeight:"900",marginTop:2},
  close:{width:38,height:38,borderRadius:13,backgroundColor:"#11131E",alignItems:"center",justifyContent:"center"},
  closeText:{color:"#FFFFFF",fontSize:25,lineHeight:27},
  cover:{minHeight:154,borderRadius:25,backgroundColor:"#1D1833",borderWidth:1,borderColor:"rgba(255,255,255,.07)",alignItems:"center",justifyContent:"center",overflow:"hidden",marginTop:8},
  coverGlowA:{position:"absolute",width:180,height:180,borderRadius:90,right:-40,top:-60,backgroundColor:"rgba(232,60,185,.20)"},
  coverGlowB:{position:"absolute",width:160,height:160,borderRadius:80,left:-50,bottom:-70,backgroundColor:"rgba(43,203,255,.13)"},
  coverIcon:{fontSize:32},
  coverTitle:{color:"#FFFFFF",fontSize:11,fontWeight:"900",marginTop:8},
  coverSub:{color:"#777D91",fontSize:7,marginTop:3},
  label:{color:"#747A8E",fontSize:7,fontWeight:"900",letterSpacing:1.2,marginTop:12},
  input:{minHeight:52,borderRadius:16,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)",color:"#FFFFFF",paddingHorizontal:13,fontSize:12},
  modeRow:{flexDirection:"row",gap:8},
  mode:{flex:1,minHeight:76,borderRadius:18,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)",alignItems:"center",justifyContent:"center"},
  modeActive:{backgroundColor:"#2A163B",borderColor:"rgba(232,60,185,.45)"},
  modeIcon:{fontSize:23},
  modeText:{color:"#777D91",fontSize:8,fontWeight:"800",marginTop:5},
  modeTextActive:{color:"#FFFFFF"},
  segment:{flexDirection:"row",backgroundColor:"#11131E",borderRadius:17,padding:4},
  segmentItem:{flex:1,minHeight:42,borderRadius:14,alignItems:"center",justifyContent:"center"},
  segmentActive:{backgroundColor:"#E83CB9"},
  segmentText:{color:"#777D91",fontSize:8,fontWeight:"800"},
  segmentTextActive:{color:"#FFFFFF"},
  info:{borderRadius:18,backgroundColor:"#11131E",padding:13,flexDirection:"row",gap:10,alignItems:"flex-start",marginTop:8},
  infoIcon:{color:"#BE84FF",fontSize:18},
  infoTitle:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  infoText:{color:"#777D91",fontSize:7,lineHeight:11,marginTop:3,maxWidth:290},
  primary:{minHeight:58,borderRadius:20,backgroundColor:"#E83CB9",alignItems:"center",justifyContent:"center",marginTop:14},
  primaryText:{color:"#FFFFFF",fontSize:12,fontWeight:"900",letterSpacing:1.1},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:20},
});
