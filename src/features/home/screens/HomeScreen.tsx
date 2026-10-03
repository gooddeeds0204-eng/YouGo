import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { DarkTopBar } from "@/shared/ui/DarkTopBar";
import { listPublicRooms, type PublicRoom } from "@/platform/supabase/roomRuntime";
import { searchProfiles, type SocialProfile } from "@/platform/supabase/social";

const demoPeople:SocialProfile[]=[
  {id:"neha",displayName:"Neha",username:"neha",avatarUrl:null,level:24,vipLevel:3,charm:98000,wealth:65000},
  {id:"arjun",displayName:"Arjun",username:"arjun",avatarUrl:null,level:31,vipLevel:4,charm:76000,wealth:116000},
  {id:"priya",displayName:"Priya",username:"priya",avatarUrl:null,level:28,vipLevel:2,charm:128000,wealth:84000},
  {id:"ravi",displayName:"Ravi",username:"ravi",avatarUrl:null,level:18,vipLevel:1,charm:42000,wealth:36000},
  {id:"sneha",displayName:"Sneha",username:"sneha",avatarUrl:null,level:22,vipLevel:2,charm:69000,wealth:49000},
];

const demoRooms:PublicRoom[]=[
  {id:"chill",name:"Chill Vibes",mode:"voice",level:8,audienceCount:2300,ownerId:"neha",announcement:"Music • Friends"},
  {id:"music",name:"Music Adda",mode:"voice",level:5,audienceCount:1800,ownerId:"priya",announcement:"Songs • Requests"},
  {id:"telugu",name:"Telugu Talks",mode:"voice",level:4,audienceCount:1500,ownerId:"ravi",announcement:"Telugu • Fun"},
  {id:"game",name:"Game Room",mode:"game",level:6,audienceCount:932,ownerId:"arjun",announcement:"Ludo • Cards"},
];

const tones=["#6E55D8","#C45182","#3E8EB0","#3A9A7D","#9A6E35"];
const modeIcon=(mode:string)=>mode==="video"?"🎥":mode==="game"?"🎮":"🎙";
const modeLabel=(mode:string)=>mode==="video"?"Video Party":mode==="game"?"Game Room":"Voice Room";

export function HomeScreen(){
  const [rooms,setRooms]=useState<PublicRoom[]>([]);
  const [people,setPeople]=useState<SocialProfile[]>([]);

  useEffect(()=>{
    void listPublicRooms(12).then(setRooms).catch(()=>undefined);
    void searchProfiles("",5).then(setPeople).catch(()=>undefined);
  },[]);

  const shownRooms=rooms.length?rooms:demoRooms;
  const shownPeople=people.length?people:demoPeople;
  const featured=shownRooms[0];

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <DarkTopBar
        title="Ugo"
        subtitle="Live rooms for you"
        onSearch={()=>router.push("/discover")}
        onBell={()=>router.push("/notifications")}
      />

      <View style={styles.tabs}>
        {["For you","Voice","Video","Games"].map((item,index)=>(
          <Pressable key={item} onPress={item==="Games"?()=>router.push("/games"):undefined} style={[styles.tab,index===0&&styles.tabActive]}>
            <Text style={[styles.tabText,index===0&&styles.tabTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHead}>
        <View><Text style={styles.eyebrow}>LIVE NOW</Text><Text style={styles.sectionTitle}>People on Ugo</Text></View>
        <Pressable onPress={()=>router.push("/discover")}><Text style={styles.see}>See all</Text></Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.peopleRow}>
        {shownPeople.map((person,index)=>(
          <Pressable key={person.id} onPress={()=>router.push({pathname:"/user/[userId]",params:{userId:person.id}})} style={styles.person}>
            <View style={styles.personHalo}>
              <View style={[styles.personRing,{borderColor:tones[index%tones.length]}]}>
                <View style={[styles.personAvatar,{backgroundColor:tones[index%tones.length]}]}>
                  {person.avatarUrl?<Image source={{uri:person.avatarUrl}} style={styles.personImage}/>:<Text style={styles.personText}>{person.displayName[0]}</Text>}
                </View>
              </View>
              <View style={styles.personBadge}><Text style={styles.personBadgeText}>{person.vipLevel>0?"VIP "+person.vipLevel:"LIVE"}</Text></View>
            </View>
            <Text numberOfLines={1} style={styles.personName}>{person.displayName}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable onPress={()=>router.push({pathname:"/room/[roomId]",params:{roomId:featured.id}})} style={styles.featured}>
        <View style={styles.featureOrbA}/><View style={styles.featureOrbB}/><View style={styles.featureLine}/>
        <View style={styles.featureTop}>
          <View style={styles.livePill}><Text style={styles.livePillText}>● LIVE ROOM</Text></View>
          <Text style={styles.viewer}>{featured.audienceCount.toLocaleString()} listening</Text>
        </View>

        <View style={styles.featureMain}>
          <View style={styles.hostHalo}><View style={styles.hostRing}><View style={styles.hostAvatar}><Text style={styles.hostAvatarText}>{featured.name[0]}</Text></View></View></View>
          <View style={styles.featureCopy}>
            <Text style={styles.featureTitle}>{featured.name}</Text>
            <Text style={styles.featureHost}>{modeLabel(featured.mode)} • LV.{featured.level}</Text>
            <Text style={styles.featureMeta}>{featured.announcement||"Talk • Play • Connect"}</Text>
          </View>
        </View>

        <View style={styles.featureBottom}>
          <View style={styles.featureTag}><Text style={styles.featureTagText}>Premium room</Text></View>
          <View style={styles.joinButton}><Text style={styles.joinText}>Enter room</Text><Text style={styles.joinArrow}>→</Text></View>
        </View>
      </Pressable>

      <View style={styles.quickRow}>
        {[
          ["🎮","Games","/games"],
          ["🎉","Events","/activity"],
          ["🎁","Gifts","/gifts"],
          ["💎","Wallet","/wallet"]
        ].map(([icon,label,path])=>(
          <Pressable key={label} onPress={()=>router.push(path as never)} style={styles.quick}>
            <View style={styles.quickIcon}><Text style={styles.quickEmoji}>{icon}</Text></View>
            <Text style={styles.quickLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHead}>
        <View><Text style={styles.eyebrow}>DISCOVER</Text><Text style={styles.sectionTitle}>Popular rooms</Text></View>
        <Pressable onPress={()=>router.push("/discover")}><Text style={styles.see}>More</Text></Pressable>
      </View>

      <View style={styles.roomList}>
        {shownRooms.slice(0,6).map((room,index)=>(
          <Pressable key={room.id} onPress={()=>router.push({pathname:"/room/[roomId]",params:{roomId:room.id}})} style={styles.roomCard}>
            <View style={[styles.roomCover,{backgroundColor:tones[index%tones.length]}]}>
              <View style={styles.roomCoverGlow}/><Text style={styles.roomIcon}>{modeIcon(room.mode)}</Text>
            </View>
            <View style={styles.roomCopy}>
              <View style={styles.roomTitleRow}><Text style={styles.roomTitle}>{room.name}</Text>{index===0?<View style={styles.goldDot}/>:null}</View>
              <Text style={styles.roomMeta}>{modeLabel(room.mode)} • LV.{room.level}</Text>
              <Text style={styles.roomCount}>👥 {room.audienceCount.toLocaleString()} online</Text>
            </View>
            <View style={styles.roomArrow}><Text style={styles.roomArrowText}>›</Text></View>
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:108,gap:20},
  tabs:{flexDirection:"row",backgroundColor:"#F0EDF6",borderRadius:18,padding:4},
  tab:{flex:1,minHeight:42,borderRadius:15,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#FFFFFF",shadowColor:"#342A43",shadowOpacity:.06,shadowRadius:8,shadowOffset:{width:0,height:4},elevation:2},
  tabText:{color:"#817A88",fontSize:12,fontWeight:"800"},
  tabTextActive:{color:"#5F47CF"},
  sectionHead:{flexDirection:"row",alignItems:"flex-end",justifyContent:"space-between"},
  eyebrow:{color:"#A1874F",fontSize:10,fontWeight:"900",letterSpacing:1.2},
  sectionTitle:{color:"#1D1924",fontSize:20,fontWeight:"900",marginTop:3},
  see:{color:"#7054E8",fontSize:12,fontWeight:"900"},
  peopleRow:{gap:14,paddingRight:8},
  person:{alignItems:"center",width:70},
  personHalo:{position:"relative"},
  personRing:{width:66,height:66,borderRadius:33,borderWidth:2.5,alignItems:"center",justifyContent:"center",backgroundColor:"#FFFFFF"},
  personAvatar:{width:56,height:56,borderRadius:28,alignItems:"center",justifyContent:"center",overflow:"hidden"},
  personImage:{width:"100%",height:"100%"},
  personText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  personBadge:{position:"absolute",bottom:-5,alignSelf:"center",paddingHorizontal:7,paddingVertical:3,borderRadius:8,backgroundColor:"#17131F",borderWidth:1,borderColor:"rgba(232,185,90,.45)"},
  personBadgeText:{color:"#E8B95A",fontSize:7,fontWeight:"900"},
  personName:{color:"#5E5865",fontSize:11,fontWeight:"700",marginTop:9,maxWidth:68},
  featured:{minHeight:244,borderRadius:28,backgroundColor:"#1B1623",padding:18,overflow:"hidden",borderWidth:1,borderColor:"#34283F",shadowColor:"#22182F",shadowOpacity:.18,shadowRadius:20,shadowOffset:{width:0,height:12},elevation:7},
  featureOrbA:{position:"absolute",width:210,height:210,borderRadius:105,backgroundColor:"rgba(112,84,232,.25)",right:-70,top:-65},
  featureOrbB:{position:"absolute",width:130,height:130,borderRadius:65,backgroundColor:"rgba(240,91,145,.14)",left:-50,bottom:-50},
  featureLine:{position:"absolute",left:0,top:0,bottom:0,width:3,backgroundColor:"#E8B95A"},
  featureTop:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  livePill:{paddingHorizontal:10,paddingVertical:6,borderRadius:12,backgroundColor:"rgba(255,255,255,.08)",borderWidth:1,borderColor:"rgba(255,255,255,.08)"},
  livePillText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  viewer:{color:"rgba(255,255,255,.65)",fontSize:11,fontWeight:"700"},
  featureMain:{flexDirection:"row",alignItems:"center",marginTop:24},
  hostHalo:{width:92,height:92,borderRadius:46,backgroundColor:"rgba(232,185,90,.12)",alignItems:"center",justifyContent:"center"},
  hostRing:{width:82,height:82,borderRadius:41,borderWidth:2.5,borderColor:"#E8B95A",alignItems:"center",justifyContent:"center"},
  hostAvatar:{width:70,height:70,borderRadius:35,backgroundColor:"#D95C91",alignItems:"center",justifyContent:"center"},
  hostAvatarText:{color:"#FFFFFF",fontSize:25,fontWeight:"900"},
  featureCopy:{flex:1,marginLeft:14},
  featureTitle:{color:"#FFFFFF",fontSize:25,fontWeight:"900",letterSpacing:-.5},
  featureHost:{color:"#E8B95A",fontSize:12,fontWeight:"800",marginTop:5},
  featureMeta:{color:"rgba(255,255,255,.64)",fontSize:12,lineHeight:17,marginTop:4},
  featureBottom:{marginTop:"auto",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  featureTag:{paddingHorizontal:10,paddingVertical:7,borderRadius:12,backgroundColor:"rgba(232,185,90,.10)",borderWidth:1,borderColor:"rgba(232,185,90,.22)"},
  featureTagText:{color:"#E8B95A",fontSize:10,fontWeight:"900"},
  joinButton:{minHeight:44,paddingHorizontal:16,borderRadius:16,backgroundColor:"#FFFFFF",flexDirection:"row",alignItems:"center"},
  joinText:{color:"#2A2233",fontSize:12,fontWeight:"900"},
  joinArrow:{color:"#7054E8",fontSize:18,marginLeft:9},
  quickRow:{flexDirection:"row",justifyContent:"space-between"},
  quick:{width:"23%",alignItems:"center"},
  quickIcon:{width:60,height:60,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",shadowColor:"#342A43",shadowOpacity:.05,shadowRadius:8,shadowOffset:{width:0,height:4},elevation:2},
  quickEmoji:{fontSize:26},
  quickLabel:{color:"#5E5865",fontSize:11,fontWeight:"800",marginTop:7},
  roomList:{gap:10},
  roomCard:{minHeight:96,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:10,flexDirection:"row",alignItems:"center",shadowColor:"#342A43",shadowOpacity:.035,shadowRadius:7,shadowOffset:{width:0,height:4},elevation:1},
  roomCover:{width:72,height:72,borderRadius:19,alignItems:"center",justifyContent:"center",overflow:"hidden"},
  roomCoverGlow:{position:"absolute",width:80,height:80,borderRadius:40,backgroundColor:"rgba(255,255,255,.12)",right:-25,top:-25},
  roomIcon:{fontSize:29},
  roomCopy:{flex:1,marginLeft:12},
  roomTitleRow:{flexDirection:"row",alignItems:"center"},
  roomTitle:{color:"#2A2530",fontSize:15,fontWeight:"900"},
  goldDot:{width:7,height:7,borderRadius:4,backgroundColor:"#E8B95A",marginLeft:7},
  roomMeta:{color:"#7C7583",fontSize:11,marginTop:4},
  roomCount:{color:"#655E6B",fontSize:11,fontWeight:"700",marginTop:6},
  roomArrow:{width:36,height:36,borderRadius:18,backgroundColor:"#F4F1F8",alignItems:"center",justifyContent:"center"},
  roomArrowText:{color:"#7054E8",fontSize:24,marginTop:-3},
});
