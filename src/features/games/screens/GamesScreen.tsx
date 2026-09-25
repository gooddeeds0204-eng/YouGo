import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { enabledGames } from "@/registries/gameRegistry";

export function GamesScreen(){
  const registered=enabledGames();
  const games=[
    ...registered.map(g=>[g.icon,g.name,g.supportsGamePk?"PK ready":"Room game","#251A3D"]),
    ["🎲","Lucky Dice","Quick room fun","#17324A"],
    ["🍽","Eat Ball","Arcade challenge","#1F3A34"],
    ["💰","Greedy","Risk & reward","#493022"],
    ["🃏","Cards","Party classic","#39203B"],
    ["🎯","Truth & Dare","Social game","#422135"],
  ];
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}><Pressable onPress={()=>router.back()}><Text style={styles.back}>‹</Text></Pressable><View><Text style={styles.kicker}>PLAY TOGETHER</Text><Text style={styles.title}>Games Center</Text></View><Text style={styles.coin}>🪙 18.2K</Text></View>

      <View style={styles.hero}>
        <View style={styles.glow}/>
        <Text style={styles.heroIcon}>🎮</Text>
        <View style={styles.heroCopy}><Text style={styles.heroKicker}>ROOM GAME</Text><Text style={styles.heroTitle}>Diamond Hunt</Text><Text style={styles.heroSub}>Collect virtual diamonds • daily limits apply</Text><Pressable style={styles.play}><Text style={styles.playText}>PLAY NOW</Text></Pressable></View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {["Featured","Party","Arcade","PK","Rewards"].map((item,index)=><View key={item} style={[styles.chip,index===0&&styles.chipActive]}><Text style={[styles.chipText,index===0&&styles.chipTextActive]}>{item}</Text></View>)}
      </ScrollView>

      <Text style={styles.sectionTitle}>All games</Text>
      <View style={styles.grid}>
        {games.map(([icon,name,meta,tone])=><Pressable key={name} style={[styles.card,{backgroundColor:tone}]}><Text style={styles.icon}>{icon}</Text><Text style={styles.name}>{name}</Text><Text style={styles.meta}>{meta}</Text><View style={styles.launch}><Text style={styles.launchText}>OPEN</Text></View></Pressable>)}
      </View>

      <View style={styles.safety}><Text style={styles.safetyIcon}>✦</Text><View><Text style={styles.safetyTitle}>In-app rewards only</Text><Text style={styles.safetyText}>Game rewards in this build are virtual items, points, event tokens or free spins. No cash-out.</Text></View></View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:15},
  header:{flexDirection:"row",alignItems:"center",gap:10},
  back:{color:"#FFFFFF",fontSize:30},
  kicker:{color:"#2BCBFF",fontSize:6.5,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#FFFFFF",fontSize:21,fontWeight:"900"},
  coin:{marginLeft:"auto",color:"#FFD56A",fontSize:8,fontWeight:"900",paddingHorizontal:10,paddingVertical:7,borderRadius:14,backgroundColor:"#1A1C2A"},
  hero:{minHeight:180,borderRadius:28,backgroundColor:"#18314A",overflow:"hidden",padding:18,flexDirection:"row",alignItems:"center"},
  glow:{position:"absolute",width:220,height:220,borderRadius:110,right:-70,top:-80,backgroundColor:"rgba(43,203,255,.16)"},
  heroIcon:{fontSize:70},
  heroCopy:{flex:1,marginLeft:18},
  heroKicker:{color:"#75D9FF",fontSize:6.5,fontWeight:"900",letterSpacing:1.1},
  heroTitle:{color:"#FFFFFF",fontSize:22,fontWeight:"900",marginTop:5},
  heroSub:{color:"#9CB4C5",fontSize:7,lineHeight:11,marginTop:4},
  play:{alignSelf:"flex-start",paddingHorizontal:12,paddingVertical:8,borderRadius:13,backgroundColor:"#2BCBFF",marginTop:12},
  playText:{color:"#06131E",fontSize:7,fontWeight:"900"},
  chips:{gap:7,paddingRight:8},
  chip:{paddingHorizontal:12,paddingVertical:8,borderRadius:16,backgroundColor:"#11131E"},
  chipActive:{backgroundColor:"#2A173B"},
  chipText:{color:"#70768A",fontSize:7.5,fontWeight:"800"},
  chipTextActive:{color:"#E9B8FF"},
  sectionTitle:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:9},
  card:{width:"48.6%",minHeight:135,borderRadius:21,padding:13,borderWidth:1,borderColor:"rgba(255,255,255,.06)"},
  icon:{fontSize:30},
  name:{color:"#FFFFFF",fontSize:10,fontWeight:"900",marginTop:8},
  meta:{color:"#A5A9B8",fontSize:6.5,marginTop:3},
  launch:{alignSelf:"flex-start",marginTop:"auto",paddingHorizontal:9,paddingVertical:6,borderRadius:11,backgroundColor:"rgba(0,0,0,.18)"},
  launchText:{color:"#FFFFFF",fontSize:6,fontWeight:"900"},
  safety:{borderRadius:18,backgroundColor:"#11131E",padding:13,flexDirection:"row",gap:9},
  safetyIcon:{color:"#2BCBFF",fontSize:18},
  safetyTitle:{color:"#FFFFFF",fontSize:8.5,fontWeight:"900"},
  safetyText:{color:"#707688",fontSize:6.5,lineHeight:10,marginTop:3,maxWidth:300},
});
