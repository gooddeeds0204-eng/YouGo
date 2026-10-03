import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import {
  addMusicToRoom,
  createRoomPk,
  listRoomMembers,
  listRoomMusic,
  listRoomSeats,
  muteAllRoomSeats,
  removeRoomMember,
  setRoomAnnouncement,
  setRoomMemberMuted,
  setRoomMemberRole,
  setRoomSeatLocked,
  type RoomSeat,
} from "@/platform/supabase/roomRuntime";

const demoMembers=[
  {user_id:"demo-neha",role:"owner",is_muted:false,profile:{display_name:"Neha",level:24,vip_level:3}},
  {user_id:"demo-arjun",role:"admin",is_muted:false,profile:{display_name:"Arjun",level:31,vip_level:4}},
  {user_id:"demo-priya",role:"member",is_muted:false,profile:{display_name:"Priya",level:18,vip_level:2}},
];

export function RoomToolsScreen(){
  const {roomId=""}=useLocalSearchParams<{roomId?:string}>();
  const [members,setMembers]=useState<any[]>([]);
  const [music,setMusic]=useState<any[]>([]);
  const [seats,setSeats]=useState<RoomSeat[]>([]);
  const [song,setSong]=useState("");
  const [announcement,setAnnouncement]=useState("");
  const [busy,setBusy]=useState(false);

  const load=()=>{
    void listRoomMembers(roomId).then(setMembers).catch(()=>setMembers([]));
    void listRoomMusic(roomId).then(setMusic).catch(()=>setMusic([]));
    void listRoomSeats(roomId).then(setSeats).catch(()=>setSeats([]));
  };
  useEffect(load,[roomId]);

  const startPk=async()=>{
    setBusy(true);
    try{
      const result=await createRoomPk(roomId);
      Alert.alert("Room PK",result?"PK request is waiting for another room.":"Preview PK is ready.");
    }catch(error:any){Alert.alert("PK failed",error?.message||"Try again.");}
    finally{setBusy(false);}
  };

  const addSong=async()=>{
    const clean=song.trim();
    if(!clean)return;
    setBusy(true);
    try{
      const id=await addMusicToRoom(roomId,clean);
      if(id)await listRoomMusic(roomId).then(setMusic);
      else setMusic(current=>[...current,{id:"demo-"+Date.now(),title:clean,artist:null,status:"queued"}]);
      setSong("");
    }catch(error:any){Alert.alert("Music queue",error?.message||"Could not add song.");}
    finally{setBusy(false);}
  };

  const broadcast=async()=>{
    const clean=announcement.trim();
    if(!clean)return;
    setBusy(true);
    try{
      const ok=await setRoomAnnouncement(roomId,clean);
      Alert.alert("Announcement",ok?"Broadcast updated.":"Preview announcement updated.");
      setAnnouncement("");
    }catch(error:any){Alert.alert("Announcement",error?.message||"Could not update announcement.");}
    finally{setBusy(false);}
  };

  const toggleSeatLock=async(seat:RoomSeat)=>{
    const ok=await setRoomSeatLocked(roomId,seat.seatNo,!seat.isLocked).catch(()=>false);
    if(ok)await listRoomSeats(roomId).then(setSeats);
  };

  const muteAll=async(muted:boolean)=>{
    const ok=await muteAllRoomSeats(roomId,muted).catch(()=>false);
    if(ok){
      load();
      Alert.alert("Room audio",muted?"All non-owner seats muted.":"Room seats unmuted.");
    }else Alert.alert("Preview",muted?"Mute-all previewed.":"Unmute-all previewed.");
  };

  const shownMembers=members.length?members:demoMembers;
  const shownSeats=seats.length?seats:Array.from({length:8},(_,i)=>({seatNo:i+1,userId:i<3?"demo-"+i:null,displayName:i<3?["Neha","Arjun","Priya"][i]:null,avatarUrl:null,level:null,vipLevel:null,isLocked:false,isMuted:false}));

  return(
    <AppScreen scroll dark contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.eyebrow}>ROOM CONTROL</Text><Text style={styles.title}>Party tools</Text></View>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.grid}>
        {[
          ["⚔️","Room PK","Battle another room",startPk],
          ["🎮","Game PK","Start a social game",()=>router.push("/games")],
          ["🎯","Missions","Room & event tasks",()=>router.push("/activity")],
          ["🎁","Gifts","Open gift panel",()=>router.push({pathname:"/gifts",params:{roomId}})],
          ["🎲","Dice & random","Quick party tools",()=>router.push("/games")],
          ["✨","Entry effects","Frames & vehicles",()=>router.push("/store")],
        ].map(([icon,title,sub,action]:any)=>(
          <Pressable key={title} onPress={action} style={styles.tool}>
            <View style={styles.toolIcon}><Text style={styles.toolEmoji}>{icon}</Text></View>
            <Text style={styles.toolTitle}>{title}</Text>
            <Text style={styles.toolSub}>{sub}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Broadcast</Text>
      <View style={styles.musicComposer}>
        <TextInput value={announcement} onChangeText={setAnnouncement} placeholder="Room announcement" placeholderTextColor="rgba(255,255,255,.38)" maxLength={500} style={styles.input}/>
        <Pressable disabled={!announcement.trim()||busy} onPress={broadcast} style={styles.add}><Text style={styles.addText}>Send</Text></Pressable>
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Seat settings</Text><View style={styles.audioActions}><Pressable onPress={()=>muteAll(true)} style={styles.micro}><Text style={styles.microText}>Mute all</Text></Pressable><Pressable onPress={()=>muteAll(false)} style={styles.micro}><Text style={styles.microText}>Unmute</Text></Pressable></View></View>
      <View style={styles.seatGrid}>
        {shownSeats.slice(0,8).map(seat=>(
          <Pressable key={seat.seatNo} onPress={()=>toggleSeatLock(seat)} style={[styles.seat,seat.isLocked&&styles.seatLocked]}>
            <Text style={styles.seatIcon}>{seat.isLocked?"🔒":seat.userId?"🎤":"○"}</Text>
            <Text style={styles.seatText}>Seat {seat.seatNo}</Text>
            <Text style={styles.seatMeta}>{seat.isLocked?"Locked":seat.userId?"Occupied":"Open"}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Music queue</Text>
      <View style={styles.musicComposer}>
        <TextInput value={song} onChangeText={setSong} placeholder="Song or playlist name" placeholderTextColor="rgba(255,255,255,.38)" style={styles.input}/>
        <Pressable disabled={!song.trim()||busy} onPress={addSong} style={styles.add}><Text style={styles.addText}>Add</Text></Pressable>
      </View>
      <View style={styles.queue}>
        {(music.length?music:[{id:"demo-song",title:"Room playlist",artist:"Preview",status:"playing"}]).map((item:any,index:number)=>(
          <View key={item.id} style={styles.song}>
            <View style={styles.songNo}><Text style={styles.songNoText}>{index+1}</Text></View>
            <View style={styles.songCopy}><Text style={styles.songTitle}>{item.title}</Text><Text style={styles.songMeta}>{item.artist||"Ugo queue"} • {item.status}</Text></View>
            <Text style={styles.songIcon}>♫</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Members</Text><Text style={styles.hint}>Host/admin controls</Text></View>
      <View style={styles.members}>
        {shownMembers.map((member:any)=>(
          <View key={member.user_id} style={styles.member}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{member.profile?.display_name?.[0]||"U"}</Text></View>
            <View style={styles.memberCopy}>
              <Text style={styles.memberName}>{member.profile?.display_name||"Ugo member"}</Text>
              <Text style={styles.memberMeta}>{String(member.role).toUpperCase()} • LV.{member.profile?.level||1}</Text>
            </View>
            {member.role!=="owner"?(
              <View style={styles.memberActions}>
                <Pressable onPress={async()=>{const ok=await setRoomMemberMuted(roomId,member.user_id,!member.is_muted).catch(()=>false);if(ok)load();}} style={styles.small}><Text style={styles.smallText}>{member.is_muted?"Unmute":"Mute"}</Text></Pressable>
                <Pressable onPress={async()=>{const next=member.role==="admin"?"member":"admin";const ok=await setRoomMemberRole(roomId,member.user_id,next).catch(()=>false);if(ok)load();}} style={styles.small}><Text style={styles.smallText}>{member.role==="admin"?"Member":"Admin"}</Text></Pressable>
                <Pressable onPress={async()=>{const ok=await removeRoomMember(roomId,member.user_id).catch(()=>false);if(ok)load();}} style={[styles.small,styles.remove]}><Text style={styles.removeText}>Remove</Text></Pressable>
              </View>
            ):<View style={styles.owner}><Text style={styles.ownerText}>OWNER</Text></View>}
          </View>
        ))}
      </View>

      <View style={styles.note}><Text style={styles.noteText}>Owner, admin and moderator permissions are enforced by the server for broadcasts, seat locks, mute controls and member management.</Text></View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:30,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"rgba(255,255,255,.06)",borderWidth:1,borderColor:"rgba(255,255,255,.08)",alignItems:"center",justifyContent:"center",marginRight:10},
  backText:{color:"#FFFFFF",fontSize:30,marginTop:-3},
  eyebrow:{color:"#E8B95A",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#FFFFFF",fontSize:21,fontWeight:"900"},
  spacer:{marginLeft:"auto",width:42},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  tool:{width:"48.5%",minHeight:126,borderRadius:19,backgroundColor:"rgba(255,255,255,.055)",borderWidth:1,borderColor:"rgba(255,255,255,.075)",padding:13},
  toolIcon:{width:46,height:46,borderRadius:15,backgroundColor:"rgba(112,84,232,.18)",alignItems:"center",justifyContent:"center"},
  toolEmoji:{fontSize:22},
  toolTitle:{color:"#FFFFFF",fontSize:13,fontWeight:"900",marginTop:10},
  toolSub:{color:"rgba(255,255,255,.45)",fontSize:10,lineHeight:14,marginTop:3},
  sectionTitle:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
  musicComposer:{minHeight:56,borderRadius:17,backgroundColor:"rgba(255,255,255,.055)",borderWidth:1,borderColor:"rgba(255,255,255,.075)",paddingHorizontal:12,flexDirection:"row",alignItems:"center"},
  input:{flex:1,color:"#FFFFFF",fontSize:12},
  add:{paddingHorizontal:13,paddingVertical:9,borderRadius:12,backgroundColor:"#7054E8"},
  addText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  sectionHead:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  audioActions:{flexDirection:"row",gap:6},
  micro:{paddingHorizontal:9,paddingVertical:7,borderRadius:10,backgroundColor:"rgba(255,255,255,.07)"},
  microText:{color:"#D2C8FF",fontSize:8,fontWeight:"900"},
  seatGrid:{flexDirection:"row",flexWrap:"wrap",gap:8},
  seat:{width:"23.3%",minHeight:78,borderRadius:15,backgroundColor:"rgba(255,255,255,.045)",borderWidth:1,borderColor:"rgba(255,255,255,.07)",alignItems:"center",justifyContent:"center"},
  seatLocked:{backgroundColor:"rgba(226,95,120,.08)",borderColor:"rgba(226,95,120,.18)"},
  seatIcon:{fontSize:18},
  seatText:{color:"#FFFFFF",fontSize:10,fontWeight:"900",marginTop:5},
  seatMeta:{color:"rgba(255,255,255,.38)",fontSize:8,marginTop:2},
  queue:{gap:7},
  song:{minHeight:58,borderRadius:16,backgroundColor:"rgba(255,255,255,.045)",padding:9,flexDirection:"row",alignItems:"center"},
  songNo:{width:34,height:34,borderRadius:12,backgroundColor:"rgba(232,185,90,.10)",alignItems:"center",justifyContent:"center"},
  songNoText:{color:"#E8B95A",fontSize:11,fontWeight:"900"},
  songCopy:{flex:1,marginLeft:10},
  songTitle:{color:"#FFFFFF",fontSize:12,fontWeight:"800"},
  songMeta:{color:"rgba(255,255,255,.40)",fontSize:9,marginTop:2,textTransform:"capitalize"},
  songIcon:{color:"#C7B9FF",fontSize:17},
  hint:{color:"rgba(255,255,255,.38)",fontSize:9},
  members:{gap:7},
  member:{minHeight:76,borderRadius:17,backgroundColor:"rgba(255,255,255,.045)",padding:10,flexDirection:"row",alignItems:"center"},
  avatar:{width:44,height:44,borderRadius:22,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  memberCopy:{flex:1,marginLeft:10},
  memberName:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
  memberMeta:{color:"rgba(255,255,255,.42)",fontSize:9,marginTop:3},
  memberActions:{flexDirection:"row",gap:4,flexWrap:"wrap",justifyContent:"flex-end",maxWidth:132},
  small:{paddingHorizontal:7,paddingVertical:6,borderRadius:9,backgroundColor:"rgba(255,255,255,.08)"},
  smallText:{color:"#D2C8FF",fontSize:7.5,fontWeight:"900"},
  remove:{backgroundColor:"rgba(226,95,120,.10)"},
  removeText:{color:"#F28A9D",fontSize:7.5,fontWeight:"900"},
  owner:{paddingHorizontal:8,paddingVertical:6,borderRadius:10,backgroundColor:"rgba(232,185,90,.10)"},
  ownerText:{color:"#E8B95A",fontSize:8,fontWeight:"900"},
  note:{borderRadius:16,backgroundColor:"rgba(76,205,164,.07)",padding:12},
  noteText:{color:"rgba(127,225,193,.78)",fontSize:10,lineHeight:15},
});
