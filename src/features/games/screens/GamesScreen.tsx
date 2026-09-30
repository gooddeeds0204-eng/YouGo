import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { enabledGames } from "@/registries/gameRegistry";

export function GamesScreen(){
  const registered=enabledGames();
  const games=[
    ...registered.map(g=>[g.icon,g.name,g.supportsGamePk?"PK ready":"Room game","#7A5CFF"]),
    ["🎲","Lucky Dice","Quick room fun","#49BFEA"],
    ["🍽","Eat Ball","Arcade challenge","#48CBA4"],
    ["💰","Greedy","Risk & reward","#F39A4B"],
    ["🃏","Cards","Party classic","#FF669F"],
    ["🎯","Truth & Dare","Social game","#8B6CF5"],
  ];

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.kicker}>PLAY TOGETHER</Text><Text style={styles.title}>Games</Text></View>
        <View style={styles.coin}><Text style={styles.coinText}>🪙 18.2K</Text></View>
      </View>

      <View style={styles.hero}>
        <View style={styles.orbA}/><View style={styles.orbB}/>
        <View style={styles.heroIcon}><Text style={styles.heroEmoji}>💎</Text></View>
        <View style={styles.heroCopy}><Text style={styles.heroKicker}>FEATURED</Text><Text style={styles.heroTitle}>Diamond Hunt</Text><Text style={styles.heroSub}>Collect virtual rewards while your room chat stays live.</Text><Pressable style={styles.play}><Text style={styles.playText}>Play now</Text></Pressable></View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {["Featured","Party","Arcade","PK","Rewards"].map((item,index)=><Pressable key={item} style={[styles.chip,index===0&&styles.chipActive]}><Text style={[styles.chipText,index===0&&styles.chipTextActive]}>{item}</Text></Pressable>)}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>All games</Text><Text style={styles.see}>See all</Text></View>
      <View style={styles.grid}>
        {games.map(([icon,name,meta,tone])=><Pressable key={name} style={styles.card}><View style={[styles.gameArt,{backgroundColor:tone}]}><Text style={styles.icon}>{icon}</Text></View><Text style={styles.name}>{name}</Text><Text style={styles.meta}>{meta}</Text><View style={styles.launch}><Text style={styles.launchText}>PLAY</Text></View></Pressable>)}
      </View>

      <View style={styles.safety}><Text style={styles.safetyIcon}>✨</Text><View><Text style={styles.safetyTitle}>Fun rewards, not cash-out</Text><Text style={styles.safetyText}>Rewards are in-app points, tokens, cosmetics or free spins.</Text></View></View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:15},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  backText:{color:"#554D65",fontSize:29,marginTop:-3},
  kicker:{color:"#8B5CFF",fontSize:7.5,fontWeight:"900",letterSpacing:1.1,marginLeft:10},
  title:{color:"#2B243D",fontSize:21,fontWeight:"900",marginLeft:10},
  coin:{marginLeft:"auto",paddingHorizontal:10,paddingVertical:8,borderRadius:14,backgroundColor:"#FFF4D9"},
  coinText:{color:"#A87616",fontSize:8.5,fontWeight:"900"},
  hero:{minHeight:182,borderRadius:28,backgroundColor:"#7A5CFF",overflow:"hidden",padding:18,flexDirection:"row",alignItems:"center"},
  orbA:{position:"absolute",width:210,height:210,borderRadius:105,right:-70,top:-70,backgroundColor:"rgba(255,255,255,.10)"},
  orbB:{position:"absolute",width:140,height:140,borderRadius:70,left:-50,bottom:-60,backgroundColor:"rgba(255,95,162,.25)"},
  heroIcon:{width:86,height:86,borderRadius:28,backgroundColor:"rgba(255,255,255,.16)",alignItems:"center",justifyContent:"center"},
  heroEmoji:{fontSize:46},
  heroCopy:{flex:1,marginLeft:15},
  heroKicker:{color:"#D9D0FF",fontSize:7,fontWeight:"900",letterSpacing:1},
  heroTitle:{color:"#FFFFFF",fontSize:21,fontWeight:"900",marginTop:4},
  heroSub:{color:"rgba(255,255,255,.72)",fontSize:8,lineHeight:12,marginTop:4},
  play:{alignSelf:"flex-start",paddingHorizontal:13,paddingVertical:8,borderRadius:13,backgroundColor:"#FFFFFF",marginTop:11},
  playText:{color:"#6748E8",fontSize:8,fontWeight:"900"},
  chips:{gap:7,paddingRight:8},
  chip:{paddingHorizontal:13,paddingVertical:9,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4"},
  chipActive:{backgroundColor:"#FF5FA2",borderColor:"#FF5FA2"},
  chipText:{color:"#8C8498",fontSize:8,fontWeight:"800"},
  chipTextActive:{color:"#FFFFFF"},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#2D263D",fontSize:16,fontWeight:"900"},
  see:{color:"#7A5CFF",fontSize:8.5,fontWeight:"800"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  card:{width:"48.5%",minHeight:156,borderRadius:22,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",padding:11},
  gameArt:{height:74,borderRadius:18,alignItems:"center",justifyContent:"center"},
  icon:{fontSize:34},
  name:{color:"#3B344A",fontSize:10,fontWeight:"900",marginTop:8},
  meta:{color:"#948C9E",fontSize:6.5,marginTop:2},
  launch:{alignSelf:"flex-start",marginTop:"auto",paddingHorizontal:9,paddingVertical:6,borderRadius:10,backgroundColor:"#EEE9FF"},
  launchText:{color:"#6D4DF1",fontSize:6.5,fontWeight:"900"},
  safety:{borderRadius:18,backgroundColor:"#EAF8F4",padding:13,flexDirection:"row",gap:9},
  safetyIcon:{fontSize:18},
  safetyTitle:{color:"#416A5D",fontSize:9,fontWeight:"900"},
  safetyText:{color:"#6E8F85",fontSize:7,lineHeight:10,marginTop:3,maxWidth:300},
});
