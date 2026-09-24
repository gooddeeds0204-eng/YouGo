import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { DarkTopBar } from "@/shared/ui/DarkTopBar";
import { Avatar } from "@/shared/ui/Avatar";
import { colors } from "@/shared/theme";

const people=[
  ["Neha","#D44B91"],["Arjun","#3C76C9"],["Priya","#7C43D6"],["Ravi","#D2763D"],["Sneha","#2F9E8D"]
];
const rooms=[
  {id:"chill",title:"Chill Vibes",meta:"2.3K online",tag:"Talk • Music • Friends",tone:"#391A48",icon:"🎙"},
  {id:"music",title:"Music Adda",meta:"1.8K online",tag:"Live singing tonight",tone:"#172A46",icon:"🎵"},
  {id:"telugu",title:"Telugu Talks",meta:"1.5K online",tag:"Telugu • Fun • Friends",tone:"#4B2234",icon:"🔥"},
  {id:"game",title:"Game Arena",meta:"932 online",tag:"Ludo • Cards • PK",tone:"#1F3A34",icon:"🎮"},
];

export function HomeScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <DarkTopBar
        title="Ugo"
        subtitle="Live. Social. Together."
        onSearch={()=>router.push("/discover")}
        onBell={()=>router.push("/notifications")}
      />

      <View style={styles.tabs}>
        {["For You","Voice","Video","Games"].map((item,index)=>(
          <View key={item} style={[styles.filter,index===0&&styles.filterActive]}>
            <Text style={[styles.filterText,index===0&&styles.filterTextActive]}>{item}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.peopleRow}>
        {people.map(([name,tone],index)=>(
          <View key={name} style={styles.person}>
            <View style={styles.avatarRing}><Avatar name={name} size={48} tone={tone} ring={index<3?"#E83CB9":"#2BCBFF"}/></View>
            <Text style={styles.personName}>{name}</Text>
          </View>
        ))}
        <View style={styles.person}>
          <View style={styles.addPerson}><Text style={styles.addText}>＋</Text></View>
          <Text style={styles.personName}>Invite</Text>
        </View>
      </ScrollView>

      <Pressable onPress={()=>router.push("/room/chill")} style={styles.hero}>
        <View style={styles.heroGlowA}/>
        <View style={styles.heroGlowB}/>
        <View style={styles.heroTop}>
          <View style={styles.livePill}><Text style={styles.livePillText}>● LIVE</Text></View>
          <Text style={styles.heroCount}>👥 2.3K</Text>
        </View>
        <View style={styles.heroCenter}>
          <Avatar name="Neha" size={82} tone="#C34185" ring="#FF73D5" badge="HOST"/>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>Chill Vibes</Text>
            <Text style={styles.heroSub}>Talk • Music • Friends</Text>
            <View style={styles.heroAvatars}>
              <Avatar name="A" size={26} tone="#3A74C9"/><Avatar name="P" size={26} tone="#7242D2"/><Avatar name="R" size={26} tone="#D2763D"/>
            </View>
          </View>
        </View>
        <View style={styles.join}><Text style={styles.joinText}>JOIN ROOM</Text><Text style={styles.joinArrow}>→</Text></View>
      </Pressable>

      <View style={styles.sectionHead}>
        <View><Text style={styles.kicker}>TRENDING NOW</Text><Text style={styles.sectionTitle}>Rooms you may like</Text></View>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <View style={styles.roomGrid}>
        {rooms.slice(1).map(room=>(
          <Pressable key={room.id} onPress={()=>router.push({pathname:"/room/[roomId]",params:{roomId:room.id}})} style={[styles.roomCard,{backgroundColor:room.tone}]}>
            <View style={styles.roomCardTop}><Text style={styles.roomIcon}>{room.icon}</Text><Text style={styles.roomMeta}>{room.meta}</Text></View>
            <View>
              <Text style={styles.roomTitle}>{room.title}</Text>
              <Text style={styles.roomTag}>{room.tag}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHead}>
        <View><Text style={styles.kicker}>EXPLORE</Text><Text style={styles.sectionTitle}>Everything in one place</Text></View>
      </View>

      <View style={styles.shortcutGrid}>
        {[
          ["🎵","Music","/games"],["🎮","Games","/games"],["💞","Couple","/family-couple"],
          ["🫶","Family","/family-couple"],["🏆","Ranking","/vip"],["✨","VIP","/vip"]
        ].map(([icon,label,path])=>(
          <Pressable key={label} onPress={()=>router.push(path as never)} style={styles.shortcut}>
            <View style={styles.shortcutIcon}><Text style={styles.shortcutEmoji}>{icon}</Text></View>
            <Text style={styles.shortcutText}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.eventCard}>
        <View>
          <Text style={styles.eventKicker}>GALAXY CARNIVAL</Text>
          <Text style={styles.eventTitle}>Monthly event is live</Text>
          <Text style={styles.eventSub}>Complete missions • earn tokens • climb rankings</Text>
        </View>
        <Text style={styles.eventIcon}>✦</Text>
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:104,gap:16},
  tabs:{flexDirection:"row",gap:7},
  filter:{paddingHorizontal:13,paddingVertical:8,borderRadius:18,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)"},
  filterActive:{backgroundColor:"#E83CB9",borderColor:"#E83CB9"},
  filterText:{color:"#7C8296",fontSize:8,fontWeight:"800"},
  filterTextActive:{color:"#FFFFFF"},
  peopleRow:{gap:12,paddingRight:10},
  person:{alignItems:"center",gap:5},
  avatarRing:{borderRadius:30},
  personName:{color:"#8A8FA1",fontSize:7},
  addPerson:{width:48,height:48,borderRadius:24,borderWidth:1,borderStyle:"dashed",borderColor:"#44495A",alignItems:"center",justifyContent:"center"},
  addText:{color:"#8C91A4",fontSize:22},
  hero:{minHeight:218,borderRadius:28,backgroundColor:"#2D173A",overflow:"hidden",padding:18,borderWidth:1,borderColor:"rgba(255,255,255,.08)"},
  heroGlowA:{position:"absolute",width:220,height:220,borderRadius:110,right:-70,top:-90,backgroundColor:"rgba(116,67,255,.23)"},
  heroGlowB:{position:"absolute",width:180,height:180,borderRadius:90,left:-80,bottom:-90,backgroundColor:"rgba(43,203,255,.10)"},
  heroTop:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  livePill:{paddingHorizontal:9,paddingVertical:5,borderRadius:14,backgroundColor:"rgba(232,60,185,.18)",borderWidth:1,borderColor:"rgba(232,60,185,.4)"},
  livePillText:{color:"#FF8BD8",fontSize:7,fontWeight:"900"},
  heroCount:{color:"#C8CBD8",fontSize:8},
  heroCenter:{flexDirection:"row",alignItems:"center",gap:18,marginTop:22},
  heroCopy:{flex:1},
  heroTitle:{color:"#FFFFFF",fontSize:24,fontWeight:"900"},
  heroSub:{color:"#C3AFC8",fontSize:9,marginTop:4},
  heroAvatars:{flexDirection:"row",gap:5,marginTop:15},
  join:{position:"absolute",right:18,bottom:18,paddingHorizontal:14,paddingVertical:9,borderRadius:18,backgroundColor:"#E83CB9",flexDirection:"row",gap:8,alignItems:"center"},
  joinText:{color:"#FFFFFF",fontSize:8,fontWeight:"900"},
  joinArrow:{color:"#FFFFFF",fontSize:14},
  sectionHead:{flexDirection:"row",alignItems:"flex-end",justifyContent:"space-between",marginTop:2},
  kicker:{color:"#686E83",fontSize:7,fontWeight:"900",letterSpacing:1.2},
  sectionTitle:{color:"#FFFFFF",fontSize:16,fontWeight:"900",marginTop:3},
  seeAll:{color:"#B178FF",fontSize:8,fontWeight:"800"},
  roomGrid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  roomCard:{width:"48.5%",minHeight:126,borderRadius:20,padding:13,borderWidth:1,borderColor:"rgba(255,255,255,.07)",justifyContent:"space-between"},
  roomCardTop:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  roomIcon:{fontSize:24},
  roomMeta:{color:"#C9CBD5",fontSize:7},
  roomTitle:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
  roomTag:{color:"#AFB3C3",fontSize:6.5,marginTop:3},
  shortcutGrid:{flexDirection:"row",flexWrap:"wrap",gap:8},
  shortcut:{width:"31.8%",minHeight:84,borderRadius:18,backgroundColor:"#10121C",borderWidth:1,borderColor:"rgba(255,255,255,.06)",alignItems:"center",justifyContent:"center"},
  shortcutIcon:{width:38,height:38,borderRadius:13,backgroundColor:"#19172A",alignItems:"center",justifyContent:"center"},
  shortcutEmoji:{fontSize:19},
  shortcutText:{color:"#FFFFFF",fontSize:8,fontWeight:"800",marginTop:6},
  eventCard:{minHeight:98,borderRadius:22,padding:16,backgroundColor:"#171A2B",borderWidth:1,borderColor:"rgba(116,67,255,.2)",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  eventKicker:{color:"#BE8CFF",fontSize:7,fontWeight:"900",letterSpacing:1.1},
  eventTitle:{color:"#FFFFFF",fontSize:15,fontWeight:"900",marginTop:5},
  eventSub:{color:"#7C8295",fontSize:7,marginTop:4},
  eventIcon:{color:"#E83CB9",fontSize:38},
});
