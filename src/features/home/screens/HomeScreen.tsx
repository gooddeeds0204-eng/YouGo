import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { DarkTopBar } from "@/shared/ui/DarkTopBar";

const hosts=[
  ["Neha","#FF6AA9","LIVE"],["Arjun","#5E9BFF","PK"],["Priya","#986BFF","HOT"],["Ravi","#FF9A52","NEW"],["Sneha","#4CCFB0","LIVE"]
];

const rooms=[
  {id:"chill",title:"Chill Vibes",host:"Neha",count:"2.3K",tag:"Friends • Music",tone:"#8A5CFF",icon:"🎙"},
  {id:"music",title:"Music Adda",host:"Priya",count:"1.8K",tag:"Singing • Requests",tone:"#FF669F",icon:"🎵"},
  {id:"telugu",title:"Telugu Talks",host:"Ravi",count:"1.5K",tag:"Telugu • Fun",tone:"#39B7D8",icon:"🔥"},
  {id:"game",title:"Game Arena",host:"Arjun",count:"932",tag:"Ludo • Cards • PK",tone:"#47C99D",icon:"🎮"},
  {id:"night",title:"Late Night",host:"Sneha",count:"714",tag:"Talk • Chill",tone:"#6C66D9",icon:"🌙"},
  {id:"dating",title:"Meet & Match",host:"Aanya",count:"601",tag:"Dating • Friends",tone:"#F58A73",icon:"💞"},
];

export function HomeScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <DarkTopBar
        title="Ugo"
        subtitle="Party • Voice • Games"
        onSearch={()=>router.push("/discover")}
        onBell={()=>router.push("/notifications")}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {["For you","Voice","Video","Games","Nearby","New"].map((item,index)=>(
          <Pressable key={item} style={[styles.category,index===0&&styles.categoryActive]}>
            <Text style={[styles.categoryText,index===0&&styles.categoryTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.storyBlock}>
        <View style={styles.sectionLine}><Text style={styles.sectionTitle}>People live now</Text><Text style={styles.see}>See all</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hostRow}>
          {hosts.map(([name,tone,badge])=>(
            <Pressable key={name} onPress={()=>router.push("/room/chill")} style={styles.host}>
              <View style={[styles.hostRing,{borderColor:tone}]}>
                <View style={[styles.hostAvatar,{backgroundColor:tone}]}><Text style={styles.hostInitial}>{name[0]}</Text></View>
                <View style={styles.hostLive}><Text style={styles.hostLiveText}>{badge}</Text></View>
              </View>
              <Text style={styles.hostName}>{name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Pressable onPress={()=>router.push("/room/chill")} style={styles.featured}>
        <View style={styles.featureCircleA}/><View style={styles.featureCircleB}/>
        <View style={styles.featureTop}><View style={styles.livePill}><Text style={styles.liveText}>● LIVE PARTY</Text></View><Text style={styles.viewer}>👥 2.3K</Text></View>
        <View style={styles.featureBody}>
          <View style={styles.bigAvatar}><Text style={styles.bigAvatarText}>N</Text><View style={styles.hostBadge}><Text style={styles.hostBadgeText}>HOST</Text></View></View>
          <View style={styles.featureCopy}>
            <Text style={styles.featureTitle}>Chill Vibes ✨</Text>
            <Text style={styles.featureSub}>Talk • Music • Friends</Text>
            <View style={styles.tags}><Text style={styles.tag}>🎵 Music</Text><Text style={styles.tag}>💬 Chat</Text><Text style={styles.tag}>🎁 Gifts</Text></View>
          </View>
        </View>
        <View style={styles.join}><Text style={styles.joinText}>Join party</Text><Text style={styles.joinArrow}>→</Text></View>
      </Pressable>

      <View style={styles.quickRow}>
        {[["🎮","Games","/games"],["🎁","Gifts","/gifts"],["👑","VIP","/vip"],["🏆","Rank","/vip"],["💞","Couple","/family-couple"]].map(([icon,label,path])=>(
          <Pressable key={label} onPress={()=>router.push(path as never)} style={styles.quick}>
            <View style={styles.quickIcon}><Text style={styles.quickEmoji}>{icon}</Text></View>
            <Text style={styles.quickText}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionLine}><Text style={styles.sectionTitle}>Popular rooms</Text><Text style={styles.see}>More</Text></View>

      <View style={styles.roomGrid}>
        {rooms.map((room,index)=>(
          <Pressable key={room.id} onPress={()=>router.push({pathname:"/room/[roomId]",params:{roomId:room.id}})} style={styles.roomCard}>
            <View style={[styles.roomCover,{backgroundColor:room.tone}]}>
              <View style={styles.roomBubble}/>
              <Text style={styles.roomIcon}>{room.icon}</Text>
              <View style={styles.roomCount}><Text style={styles.roomCountText}>👥 {room.count}</Text></View>
              <View style={styles.roomAvatar}><Text style={styles.roomAvatarText}>{room.host[0]}</Text></View>
            </View>
            <Text style={styles.roomTitle}>{room.title}</Text>
            <Text style={styles.roomTag}>{room.tag}</Text>
            <View style={styles.roomFooter}><Text style={styles.roomHost}>by {room.host}</Text><Text style={styles.roomType}>{index%2===0?"VOICE":"PARTY"}</Text></View>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.event}>
        <View><Text style={styles.eventKicker}>GALAXY PARTY</Text><Text style={styles.eventTitle}>Tonight's event is live ✨</Text><Text style={styles.eventText}>Missions • rankings • special gifts</Text></View>
        <View style={styles.eventButton}><Text style={styles.eventButtonText}>GO</Text></View>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:102,gap:16},
  categoryRow:{gap:8,paddingRight:10},
  category:{paddingHorizontal:15,paddingVertical:10,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4"},
  categoryActive:{backgroundColor:"#7A5CFF",borderColor:"#7A5CFF"},
  categoryText:{color:"#8B839A",fontSize:10,fontWeight:"800"},
  categoryTextActive:{color:"#FFFFFF"},
  storyBlock:{gap:10},
  sectionLine:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#2A233B",fontSize:18,fontWeight:"900"},
  see:{color:"#7A5CFF",fontSize:10,fontWeight:"800"},
  hostRow:{gap:13,paddingRight:8},
  host:{alignItems:"center"},
  hostRing:{width:64,height:64,borderRadius:32,borderWidth:3,alignItems:"center",justifyContent:"center",backgroundColor:"#FFFFFF"},
  hostAvatar:{width:54,height:54,borderRadius:27,alignItems:"center",justifyContent:"center"},
  hostInitial:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
  hostLive:{position:"absolute",bottom:-4,paddingHorizontal:6,paddingVertical:3,borderRadius:8,backgroundColor:"#FF5FA2",borderWidth:2,borderColor:"#FFFFFF"},
  hostLiveText:{color:"#FFFFFF",fontSize:6,fontWeight:"900"},
  hostName:{color:"#665E74",fontSize:8,fontWeight:"700",marginTop:7},
  featured:{minHeight:224,borderRadius:30,backgroundColor:"#7A5CFF",overflow:"hidden",padding:18,shadowColor:"#6C4EDE",shadowOpacity:.22,shadowRadius:16,shadowOffset:{width:0,height:9},elevation:7},
  featureCircleA:{position:"absolute",width:220,height:220,borderRadius:110,backgroundColor:"rgba(255,255,255,.10)",right:-80,top:-70},
  featureCircleB:{position:"absolute",width:160,height:160,borderRadius:80,backgroundColor:"rgba(255,95,162,.28)",left:-70,bottom:-80},
  featureTop:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  livePill:{paddingHorizontal:9,paddingVertical:6,borderRadius:12,backgroundColor:"rgba(255,255,255,.18)"},
  liveText:{color:"#FFFFFF",fontSize:8,fontWeight:"900"},
  viewer:{color:"#FFFFFF",fontSize:9,fontWeight:"800"},
  featureBody:{flexDirection:"row",alignItems:"center",marginTop:20},
  bigAvatar:{width:92,height:92,borderRadius:46,backgroundColor:"#FF6AA9",borderWidth:4,borderColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  bigAvatarText:{color:"#FFFFFF",fontSize:31,fontWeight:"900"},
  hostBadge:{position:"absolute",bottom:-6,paddingHorizontal:8,paddingVertical:4,borderRadius:9,backgroundColor:"#FF5FA2",borderWidth:2,borderColor:"#FFFFFF"},
  hostBadgeText:{color:"#FFFFFF",fontSize:6,fontWeight:"900"},
  featureCopy:{flex:1,marginLeft:15},
  featureTitle:{color:"#FFFFFF",fontSize:24,fontWeight:"900"},
  featureSub:{color:"rgba(255,255,255,.78)",fontSize:10,marginTop:4},
  tags:{flexDirection:"row",gap:5,marginTop:13,flexWrap:"wrap"},
  tag:{color:"#FFFFFF",fontSize:7,fontWeight:"800",paddingHorizontal:7,paddingVertical:5,borderRadius:9,backgroundColor:"rgba(255,255,255,.13)"},
  join:{position:"absolute",right:16,bottom:16,minWidth:105,paddingHorizontal:14,paddingVertical:11,borderRadius:18,backgroundColor:"#FFFFFF",flexDirection:"row",alignItems:"center",justifyContent:"center"},
  joinText:{color:"#6B4CF1",fontSize:9,fontWeight:"900"},
  joinArrow:{color:"#6B4CF1",fontSize:15,marginLeft:8},
  quickRow:{flexDirection:"row",justifyContent:"space-between"},
  quick:{width:"18.2%",alignItems:"center"},
  quickIcon:{width:52,height:52,borderRadius:18,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center",shadowColor:"#776B95",shadowOpacity:.08,shadowRadius:8,elevation:2},
  quickEmoji:{fontSize:24},
  quickText:{color:"#61596F",fontSize:8,fontWeight:"800",marginTop:6},
  roomGrid:{flexDirection:"row",flexWrap:"wrap",gap:12},
  roomCard:{width:"48%",backgroundColor:"#FFFFFF",borderRadius:22,paddingBottom:11,overflow:"hidden",borderWidth:1,borderColor:"#EEEAF4"},
  roomCover:{height:128,position:"relative",overflow:"hidden",alignItems:"center",justifyContent:"center"},
  roomBubble:{position:"absolute",width:130,height:130,borderRadius:65,backgroundColor:"rgba(255,255,255,.12)",right:-35,top:-35},
  roomIcon:{fontSize:35},
  roomCount:{position:"absolute",right:8,top:8,paddingHorizontal:7,paddingVertical:4,borderRadius:9,backgroundColor:"rgba(0,0,0,.18)"},
  roomCountText:{color:"#FFFFFF",fontSize:6.5,fontWeight:"800"},
  roomAvatar:{position:"absolute",left:10,bottom:9,width:38,height:38,borderRadius:19,backgroundColor:"rgba(255,255,255,.28)",borderWidth:2,borderColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  roomAvatarText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  roomTitle:{color:"#332B45",fontSize:12,fontWeight:"900",paddingHorizontal:10,marginTop:10},
  roomTag:{color:"#91899E",fontSize:7.5,paddingHorizontal:10,marginTop:3},
  roomFooter:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:10,marginTop:8},
  roomHost:{color:"#AAA3B5",fontSize:7},
  roomType:{color:"#7A5CFF",fontSize:6.5,fontWeight:"900"},
  event:{minHeight:102,borderRadius:24,backgroundColor:"#2B2440",padding:16,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  eventKicker:{color:"#B7A8FF",fontSize:7,fontWeight:"900",letterSpacing:1},
  eventTitle:{color:"#FFFFFF",fontSize:16,fontWeight:"900",marginTop:4},
  eventText:{color:"#ACA5B9",fontSize:8,marginTop:4},
  eventButton:{width:46,height:46,borderRadius:16,backgroundColor:"#FF5FA2",alignItems:"center",justifyContent:"center"},
  eventButtonText:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
});
