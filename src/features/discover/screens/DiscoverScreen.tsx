import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { listPublicRooms, type PublicRoom } from "@/platform/supabase/roomRuntime";
import { searchProfiles, type SocialProfile } from "@/platform/supabase/social";

const demoRooms:PublicRoom[]=[
  {id:"music",name:"Music Adda",mode:"voice",level:5,audienceCount:1800,ownerId:"priya",announcement:"Singing • Requests"},
  {id:"telugu",name:"Telugu Talks",mode:"voice",level:4,audienceCount:1500,ownerId:"ravi",announcement:"Telugu • Fun"},
  {id:"random",name:"Random Vibes",mode:"video",level:3,audienceCount:1200,ownerId:"sneha",announcement:"Friends • Chat"},
  {id:"game",name:"Game Night",mode:"game",level:6,audienceCount:980,ownerId:"arjun",announcement:"Ludo • Cards"},
];

const demoPeople:SocialProfile[]=[
  {id:"priya",displayName:"Priya",username:"priya",avatarUrl:null,level:28,vipLevel:2,charm:128000,wealth:84000},
  {id:"arjun",displayName:"Arjun",username:"arjun",avatarUrl:null,level:31,vipLevel:4,charm:76000,wealth:116000},
  {id:"sneha",displayName:"Sneha",username:"sneha",avatarUrl:null,level:22,vipLevel:2,charm:69000,wealth:49000},
];

const tones=["#7054E8","#C45182","#3E8EB0","#3A9A7D"];
const modeIcon=(mode:string)=>mode==="video"?"🎥":mode==="game"?"🎮":"🎙";

export function DiscoverScreen(){
  const [rooms,setRooms]=useState<PublicRoom[]>([]);
  const [people,setPeople]=useState<SocialProfile[]>([]);
  const [query,setQuery]=useState("");
  const [tab,setTab]=useState<"all"|"voice"|"video"|"game">("all");

  useEffect(()=>{
    void listPublicRooms(40).then(setRooms).catch(()=>undefined);
    void searchProfiles("",12).then(setPeople).catch(()=>undefined);
  },[]);

  useEffect(()=>{
    const clean=query.trim();
    if(clean.length<2)return;
    const timer=setTimeout(()=>{void searchProfiles(clean,12).then(setPeople).catch(()=>undefined);},250);
    return()=>clearTimeout(timer);
  },[query]);

  const shownRooms=rooms.length?rooms:demoRooms;
  const shownPeople=people.length?people:demoPeople;

  const filteredRooms=useMemo(()=>{
    const clean=query.trim().toLowerCase();
    return shownRooms.filter(room=>{
      const tabOk=tab==="all"||room.mode===tab;
      const queryOk=!clean||room.name.toLowerCase().includes(clean)||(room.announcement||"").toLowerCase().includes(clean);
      return tabOk&&queryOk;
    });
  },[shownRooms,query,tab]);

  const filteredPeople=useMemo(()=>{
    const clean=query.trim().toLowerCase();
    return shownPeople.filter(person=>!clean||person.displayName.toLowerCase().includes(clean)||(person.username||"").toLowerCase().includes(clean));
  },[shownPeople,query]);

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Pressable onPress={()=>router.push("/activity")} style={styles.filter}><Text style={styles.filterText}>🏆</Text></Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Search rooms or people" placeholderTextColor="#9C95A3" style={styles.search}/>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {([["all","All"],["voice","Voice"],["video","Video"],["game","Games"]] as const).map(([id,label])=>(
          <Pressable key={id} onPress={()=>setTab(id)} style={[styles.tab,tab===id&&styles.tabActive]}>
            <Text style={[styles.tabText,tab===id&&styles.tabTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Trending rooms</Text><Text style={styles.see}>{filteredRooms.length} live</Text></View>
      <View style={styles.roomList}>
        {filteredRooms.slice(0,12).map((room,index)=>(
          <Pressable key={room.id} onPress={()=>router.push({pathname:"/room/[roomId]",params:{roomId:room.id}})} style={styles.room}>
            <View style={[styles.cover,{backgroundColor:tones[index%tones.length]}]}><Text style={styles.coverIcon}>{modeIcon(room.mode)}</Text></View>
            <View style={styles.copy}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomMeta}>{room.announcement||room.mode+" room"} • LV.{room.level}</Text>
              <Text style={styles.online}>👥 {room.audienceCount.toLocaleString()} online</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>People</Text><Text style={styles.see}>Profiles</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.peopleRow}>
        {filteredPeople.map((person,index)=>(
          <Pressable key={person.id} onPress={()=>router.push({pathname:"/user/[userId]",params:{userId:person.id}})} style={styles.person}>
            <View style={[styles.personAvatar,{backgroundColor:tones[index%tones.length]}]}>
              {person.avatarUrl?<Image source={{uri:person.avatarUrl}} style={styles.personImage}/>:<Text style={styles.personLetter}>{person.displayName[0]}</Text>}
            </View>
            <Text numberOfLines={1} style={styles.personName}>{person.displayName}</Text>
            <Text style={styles.personMeta}>LV.{person.level} • {person.vipLevel?"VIP "+person.vipLevel:"Member"}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Browse</Text>
      <View style={styles.grid}>
        {[
          ["🎵","Music","/discover"],
          ["🎮","Games","/games"],
          ["💬","Moments","/moments"],
          ["💞","Community","/family-couple"],
          ["🛍","Store","/store"],
          ["🏆","Ranking","/activity"]
        ].map(([icon,label,path])=>(
          <Pressable key={label} onPress={()=>router.push(path as never)} style={styles.category}>
            <Text style={styles.categoryIcon}>{icon}</Text>
            <Text style={styles.categoryText}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:104,gap:18},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  title:{color:"#211D2C",fontSize:26,fontWeight:"900"},
  filter:{width:44,height:44,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  filterText:{fontSize:18},
  searchWrap:{minHeight:54,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",flexDirection:"row",alignItems:"center",paddingHorizontal:14},
  searchIcon:{color:"#817A8B",fontSize:20,marginRight:8},
  search:{flex:1,color:"#2B2631",fontSize:14},
  tabs:{gap:9,paddingRight:8},
  tab:{minHeight:42,paddingHorizontal:18,borderRadius:21,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#7054E8",borderColor:"#7054E8"},
  tabText:{color:"#817A8B",fontSize:13,fontWeight:"800"},
  tabTextActive:{color:"#FFFFFF"},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#211D2C",fontSize:18,fontWeight:"900"},
  see:{color:"#7054E8",fontSize:11,fontWeight:"800"},
  roomList:{gap:10},
  room:{minHeight:92,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:10,flexDirection:"row",alignItems:"center"},
  cover:{width:68,height:68,borderRadius:18,alignItems:"center",justifyContent:"center"},
  coverIcon:{fontSize:28},
  copy:{flex:1,marginLeft:12},
  roomName:{color:"#2C2732",fontSize:15,fontWeight:"900"},
  roomMeta:{color:"#817A8B",fontSize:11,marginTop:4},
  online:{color:"#6F6878",fontSize:11,fontWeight:"700",marginTop:5},
  arrow:{color:"#9A94A0",fontSize:26},
  peopleRow:{gap:10,paddingRight:8},
  person:{width:104,minHeight:128,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",padding:10},
  personAvatar:{width:58,height:58,borderRadius:29,alignItems:"center",justifyContent:"center",overflow:"hidden"},
  personImage:{width:"100%",height:"100%"},
  personLetter:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  personName:{color:"#3B3541",fontSize:12,fontWeight:"900",marginTop:8,maxWidth:86},
  personMeta:{color:"#918A97",fontSize:9,marginTop:3,textAlign:"center"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  category:{width:"31.5%",minHeight:92,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  categoryIcon:{fontSize:27},
  categoryText:{color:"#554F5D",fontSize:12,fontWeight:"800",marginTop:7},
});
