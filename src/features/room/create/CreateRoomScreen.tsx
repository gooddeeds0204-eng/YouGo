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
    }finally{
      setBusy(false);
    }
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>Create room</Text>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Room name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Room name" placeholderTextColor="#9C95A3"/>

        <Text style={styles.label}>Room type</Text>
        <View style={styles.modeRow}>
          {[["voice","🎙","Voice"],["video","🎥","Video"],["game","🎮","Game"]].map(([id,icon,label])=>{
            const active=mode===id;
            return(
              <Pressable key={id} onPress={()=>setMode(id as Mode)} style={[styles.mode,active&&styles.modeActive]}>
                <Text style={styles.modeIcon}>{icon}</Text>
                <Text style={[styles.modeText,active&&styles.modeTextActive]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Privacy</Text>
        <View style={styles.segment}>
          {(["public","private"] as const).map(item=>(
            <Pressable key={item} onPress={()=>setPrivacy(item)} style={[styles.segmentItem,privacy===item&&styles.segmentActive]}>
              <Text style={[styles.segmentText,privacy===item&&styles.segmentTextActive]}>{item==="public"?"Public":"Private"}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.note}><Text style={styles.noteText}>You can switch Voice, Video and Game later without recreating the room.</Text></View>

      <Pressable disabled={busy||!name.trim()} onPress={create} style={[styles.primary,(busy||!name.trim())&&styles.disabled]}>
        <Text style={styles.primaryText}>{busy?"Creating...":"Create room"}</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:104,gap:18},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  backText:{color:"#4D4657",fontSize:30,marginTop:-3},
  title:{color:"#211D2C",fontSize:22,fontWeight:"900"},
  spacer:{width:42},
  form:{borderRadius:22,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:16},
  label:{color:"#5D5764",fontSize:13,fontWeight:"800",marginBottom:8,marginTop:14},
  input:{minHeight:56,borderRadius:17,backgroundColor:"#F8F8FB",borderWidth:1,borderColor:"#ECEAF2",color:"#2B2631",paddingHorizontal:14,fontSize:14},
  modeRow:{flexDirection:"row",gap:8},
  mode:{flex:1,minHeight:78,borderRadius:17,backgroundColor:"#F8F8FB",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  modeActive:{backgroundColor:"#EEE9FF",borderColor:"#7657F6"},
  modeIcon:{fontSize:24},
  modeText:{color:"#817A8B",fontSize:12,fontWeight:"800",marginTop:5},
  modeTextActive:{color:"#6749DB"},
  segment:{flexDirection:"row",backgroundColor:"#F3F1F7",borderRadius:16,padding:4},
  segmentItem:{flex:1,minHeight:44,borderRadius:13,alignItems:"center",justifyContent:"center"},
  segmentActive:{backgroundColor:"#7657F6"},
  segmentText:{color:"#817A8B",fontSize:12,fontWeight:"800"},
  segmentTextActive:{color:"#FFFFFF"},
  note:{borderRadius:16,backgroundColor:"#F0EDF8",padding:13},
  noteText:{color:"#756F7E",fontSize:12,lineHeight:17},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center"},
  disabled:{opacity:.4},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
});
