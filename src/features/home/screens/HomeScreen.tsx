import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { DarkTopBar } from "@/shared/ui/DarkTopBar";

const livePeople=[
  ["Neha","#D95C91","HOST"],
  ["Arjun","#557FD0","VIP"],
  ["Priya","#7E62D9","LIVE"],
  ["Ravi","#C8793D","NEW"],
  ["Sneha","#3FA987","LIVE"],
];

const rooms=[
  {id:"chill",title:"Chill Vibes",host:"Neha",count:"2.3K",tag:"Music • Friends",tone:"#6E55D8",icon:"🎙"},
  {id:"music",title:"Music Adda",host:"Priya",count:"1.8K",tag:"Songs • Requests",tone:"#C45182",icon:"🎵"},
  {id:"telugu",title:"Telugu Talks",host:"Ravi",count:"1.5K",tag:"Telugu • Fun",tone:"#3E8EB0",icon:"💬"},
  {id:"game",title:"Game Room",host:"Arjun",count:"932",tag:"Ludo • Cards",tone:"#3A9A7D",icon:"🎮"},
];

export function HomeScreen(){
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
          <Pressable key={item} style={[styles.tab,index===0&&styles.tabActive]}>
            <Text style={[styles.tabText,index===0&&styles.tabTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHead}>
        <View>
          <Text style={styles.eyebrow}>LIVE NOW</Text>
          <Text style={styles.sectionTitle}>People on Ugo</Text>
        </View>
        <Text style={styles.see}>See all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.peopleRow}>
        {livePeople.map(([name,tone,badge])=>(
          <Pressable key={name} onPress={()=>router.push("/room/chill")} style={styles.person}>
            <View style={styles.personHalo}>
              <View style={[styles.personRing,{borderColor:tone}]}>
                <View style={[styles.personAvatar,{backgroundColor:tone}]}><Text style={styles.personText}>{name[0]}</Text></View>
              </View>
              <View style={styles.personBadge}><Text style={styles.personBadgeText}>{badge}</Text></View>
            </View>
            <Text style={styles.personName}>{name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable onPress={()=>router.push("/room/chill")} style={styles.featured}>
        <View style={styles.featureOrbA}/><View style={styles.featureOrbB}/>
        <View style={styles.featureLine}/>
        <View style={styles.featureTop}>
          <View style={styles.livePill}><Text style={styles.livePillText}>● LIVE ROOM</Text></View>
          <Text style={styles.viewer}>2.3K listening</Text>
        </View>

        <View style={styles.featureMain}>
          <View style={styles.hostHalo}>
            <View style={styles.hostRing}>
              <View style={styles.hostAvatar}><Text style={styles.hostAvatarText}>N</Text></View>
            </View>
          </View>
          <View style={styles.featureCopy}>
            <Text style={styles.featureTitle}>Chill Vibes</Text>
            <Text style={styles.featureHost}>Hosted by Neha</Text>
            <Text style={styles.featureMeta}>Music • Friends • Telugu + English</Text>
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
          ["🎁","Gifts","/gifts"],
          ["👑","VIP","/vip"],
          ["💎","Wallet","/wallet"]
        ].map(([icon,label,path])=>(
          <Pressable key={label} onPress={()=>router.push(path as never)} style={styles.quick}>
            <View style={styles.quickIcon}><Text style={styles.quickEmoji}>{icon}</Text></View>
            <Text style={styles.quickLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHead}>
        <View>
          <Text style={styles.eyebrow}>DISCOVER</Text>
          <Text style={styles.sectionTitle}>Popular rooms</Text>
        </View>
        <Text style={styles.see}>More</Text>
      </View>

      <View style={styles.roomList}>
        {rooms.map((room,index)=>(
          <Pressable key={room.id} onPress={()=>router.push({pathname:"/room/[roomId]",params:{roomId:room.id}})} style={styles.roomCard}>
            <View style={[styles.roomCover,{backgroundColor:room.tone}]}>
              <View style={styles.roomCoverGlow}/>
              <Text style={styles.roomIcon}>{room.icon}</Text>
            </View>
            <View style={styles.roomCopy}>
              <View style={styles.roomTitleRow}>
                <Text style={styles.roomTitle}>{room.title}</Text>
                {index===0?<View style={styles.goldDot}/>:null}
              </View>
              <Text style={styles.roomMeta}>{room.host} • {room.tag}</Text>
              <Text style={styles.roomCount}>👥 {room.count} online</Text>
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
  personAvatar:{width:56,height:56,borderRadius:28,alignItems:"center",justifyContent:"center"},
  personText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  personBadge:{position:"absolute",bottom:-5,alignSelf:"center",paddingHorizontal:7,paddingVertical:3,borderRadius:8,backgroundColor:"#17131F",borderWidth:1,borderColor:"rgba(232,185,90,.45)"},
  personBadgeText:{color:"#E8B95A",fontSize:7,fontWeight:"900"},
  personName:{color:"#5E5865",fontSize:11,fontWeight:"700",marginTop:9},
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
