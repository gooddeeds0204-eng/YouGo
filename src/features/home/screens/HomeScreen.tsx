import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { DarkTopBar } from "@/shared/ui/DarkTopBar";

const livePeople=[
  ["Neha","#F768A7"],["Arjun","#5C8EF2"],["Priya","#8B65E8"],["Ravi","#E98C4A"],["Sneha","#4EBF9E"]
];

const rooms=[
  {id:"chill",title:"Chill Vibes",host:"Neha",count:"2.3K",tag:"Music • Friends",tone:"#7657F6"},
  {id:"music",title:"Music Adda",host:"Priya",count:"1.8K",tag:"Songs • Requests",tone:"#F6549C"},
  {id:"telugu",title:"Telugu Talks",host:"Ravi",count:"1.5K",tag:"Telugu • Fun",tone:"#43B9DB"},
  {id:"game",title:"Game Room",host:"Arjun",count:"932",tag:"Ludo • Cards",tone:"#49BE98"},
];

export function HomeScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <DarkTopBar
        title="Ugo"
        subtitle="Find your room"
        onSearch={()=>router.push("/discover")}
        onBell={()=>router.push("/notifications")}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {["For you","Voice","Video","Games"].map((item,index)=>(
          <Pressable key={item} style={[styles.tab,index===0&&styles.tabActive]}>
            <Text style={[styles.tabText,index===0&&styles.tabTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Live now</Text>
        <Text style={styles.see}>See all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.peopleRow}>
        {livePeople.map(([name,tone])=>(
          <Pressable key={name} onPress={()=>router.push("/room/chill")} style={styles.person}>
            <View style={[styles.personRing,{borderColor:tone}]}>
              <View style={[styles.personAvatar,{backgroundColor:tone}]}><Text style={styles.personText}>{name[0]}</Text></View>
              <View style={styles.liveDot}/>
            </View>
            <Text style={styles.personName}>{name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable onPress={()=>router.push("/room/chill")} style={styles.featured}>
        <View style={styles.featureGlow}/>
        <View style={styles.featureTop}>
          <View style={styles.livePill}><Text style={styles.livePillText}>● LIVE</Text></View>
          <Text style={styles.viewer}>👥 2.3K</Text>
        </View>

        <View style={styles.featureMain}>
          <View style={styles.featureAvatar}><Text style={styles.featureAvatarText}>N</Text></View>
          <View style={styles.featureCopy}>
            <Text style={styles.featureTitle}>Chill Vibes</Text>
            <Text style={styles.featureMeta}>Neha • Music • Friends</Text>
            <Text style={styles.featureDesc}>Join the conversation and meet new people.</Text>
          </View>
        </View>

        <View style={styles.joinButton}><Text style={styles.joinText}>Join room</Text><Text style={styles.joinArrow}>→</Text></View>
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
        <Text style={styles.sectionTitle}>Popular rooms</Text>
        <Text style={styles.see}>More</Text>
      </View>

      <View style={styles.roomList}>
        {rooms.map(room=>(
          <Pressable key={room.id} onPress={()=>router.push({pathname:"/room/[roomId]",params:{roomId:room.id}})} style={styles.roomCard}>
            <View style={[styles.roomCover,{backgroundColor:room.tone}]}>
              <Text style={styles.roomCoverIcon}>🎙</Text>
            </View>
            <View style={styles.roomCopy}>
              <Text style={styles.roomTitle}>{room.title}</Text>
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
  screen:{paddingTop:10,paddingBottom:104,gap:18},
  tabs:{gap:9,paddingRight:10},
  tab:{minHeight:42,paddingHorizontal:18,borderRadius:21,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#7657F6",borderColor:"#7657F6"},
  tabText:{color:"#817A8B",fontSize:13,fontWeight:"800"},
  tabTextActive:{color:"#FFFFFF"},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#211D2C",fontSize:19,fontWeight:"900"},
  see:{color:"#7657F6",fontSize:13,fontWeight:"800"},
  peopleRow:{gap:14,paddingRight:8},
  person:{alignItems:"center",width:66},
  personRing:{width:62,height:62,borderRadius:31,borderWidth:3,alignItems:"center",justifyContent:"center",backgroundColor:"#FFFFFF"},
  personAvatar:{width:52,height:52,borderRadius:26,alignItems:"center",justifyContent:"center"},
  personText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  liveDot:{position:"absolute",right:0,bottom:1,width:14,height:14,borderRadius:7,backgroundColor:"#39C995",borderWidth:3,borderColor:"#FFFFFF"},
  personName:{color:"#5B5564",fontSize:11,fontWeight:"700",marginTop:7},
  featured:{minHeight:220,borderRadius:26,backgroundColor:"#7657F6",padding:18,overflow:"hidden"},
  featureGlow:{position:"absolute",width:220,height:220,borderRadius:110,backgroundColor:"rgba(255,255,255,.10)",right:-90,top:-70},
  featureTop:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  livePill:{paddingHorizontal:10,paddingVertical:6,borderRadius:12,backgroundColor:"rgba(255,255,255,.16)"},
  livePillText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  viewer:{color:"#FFFFFF",fontSize:12,fontWeight:"800"},
  featureMain:{flexDirection:"row",alignItems:"center",marginTop:22},
  featureAvatar:{width:82,height:82,borderRadius:41,backgroundColor:"#F768A7",borderWidth:3,borderColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  featureAvatarText:{color:"#FFFFFF",fontSize:28,fontWeight:"900"},
  featureCopy:{flex:1,marginLeft:14},
  featureTitle:{color:"#FFFFFF",fontSize:25,fontWeight:"900"},
  featureMeta:{color:"rgba(255,255,255,.82)",fontSize:13,fontWeight:"700",marginTop:4},
  featureDesc:{color:"rgba(255,255,255,.70)",fontSize:12,lineHeight:17,marginTop:7,maxWidth:240},
  joinButton:{position:"absolute",right:16,bottom:16,minHeight:42,paddingHorizontal:16,borderRadius:21,backgroundColor:"#FFFFFF",flexDirection:"row",alignItems:"center"},
  joinText:{color:"#6848E7",fontSize:13,fontWeight:"900"},
  joinArrow:{color:"#6848E7",fontSize:18,marginLeft:8},
  quickRow:{flexDirection:"row",justifyContent:"space-between"},
  quick:{width:"23%",alignItems:"center"},
  quickIcon:{width:58,height:58,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  quickEmoji:{fontSize:26},
  quickLabel:{color:"#5F5968",fontSize:11,fontWeight:"800",marginTop:6},
  roomList:{gap:10},
  roomCard:{minHeight:92,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:10,flexDirection:"row",alignItems:"center"},
  roomCover:{width:68,height:68,borderRadius:18,alignItems:"center",justifyContent:"center"},
  roomCoverIcon:{fontSize:28},
  roomCopy:{flex:1,marginLeft:12},
  roomTitle:{color:"#2A2532",fontSize:15,fontWeight:"900"},
  roomMeta:{color:"#817A8B",fontSize:12,marginTop:4},
  roomCount:{color:"#6E6777",fontSize:11,fontWeight:"700",marginTop:6},
  roomArrow:{width:36,height:36,borderRadius:18,backgroundColor:"#F2EFF9",alignItems:"center",justifyContent:"center"},
  roomArrowText:{color:"#7657F6",fontSize:24,marginTop:-3},
});
