import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

export function FamilyCoupleScreen(){
  const [tab,setTab]=useState<"family"|"couple">("family");

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.kicker}>YOUR PEOPLE</Text><Text style={styles.title}>Community</Text></View>
        <Pressable style={styles.more}><Text style={styles.moreText}>•••</Text></Pressable>
      </View>

      <View style={styles.tabs}>
        <Pressable onPress={()=>setTab("family")} style={[styles.tab,tab==="family"&&styles.tabActive]}><Text style={[styles.tabText,tab==="family"&&styles.tabTextActive]}>🫶 Family</Text></Pressable>
        <Pressable onPress={()=>setTab("couple")} style={[styles.tab,tab==="couple"&&styles.tabActive]}><Text style={[styles.tabText,tab==="couple"&&styles.tabTextActive]}>💞 Couple</Text></Pressable>
      </View>

      {tab==="family"?(
        <>
          <View style={styles.familyHero}>
            <View style={styles.orbA}/><View style={styles.orbB}/>
            <View style={styles.familyIcon}><Text style={styles.familyEmoji}>🫶</Text></View>
            <Text style={styles.familyName}>Neon Tribe</Text>
            <Text style={styles.familyMeta}>Family LV.18 • 248 members</Text>
            <View style={styles.familyRank}><Text style={styles.familyRankText}>#12 INDIA</Text></View>
          </View>

          <View style={styles.stats}>{[["248","Members"],["1.8M","Charm"],["34","Missions"]].map(([v,l])=><View key={l} style={styles.stat}><Text style={styles.statValue}>{v}</Text><Text style={styles.statLabel}>{l}</Text></View>)}</View>

          <Text style={styles.section}>Family missions</Text>
          {[
            ["🎁","Send 500 gifts","78%"],
            ["🎙","Host 20 room hours","61%"],
            ["🏆","Reach Top 10 ranking","84%"]
          ].map(([icon,title,p])=><View key={title} style={styles.mission}><View style={styles.missionIcon}><Text>{icon}</Text></View><View style={styles.missionCopy}><Text style={styles.missionTitle}>{title}</Text><View style={styles.track}><View style={[styles.fill,{width:p as any}]}/></View></View><Text style={styles.percent}>{p}</Text></View>)}
        </>
      ):(
        <>
          <View style={styles.coupleHero}>
            <View style={styles.coupleOrbA}/><View style={styles.coupleOrbB}/>
            <Text style={styles.heart}>💞</Text>
            <Text style={styles.coupleTitle}>Neha × Arjun</Text>
            <Text style={styles.coupleSub}>Together for 128 days</Text>
            <View style={styles.bond}><Text style={styles.bondText}>BOND LV.12</Text></View>
          </View>

          <View style={styles.memoryGrid}>
            {[
              ["🎁","Couple Gifts","248","#FFF0F6"],
              ["📸","Memories","64","#EEE9FF"],
              ["🔥","Streak","128 days","#FFF2E7"],
              ["💗","Bond points","18.4K","#E9FFF7"]
            ].map(([icon,label,value,tone])=><View key={label} style={[styles.memory,{backgroundColor:tone}]}><Text style={styles.memoryIcon}>{icon}</Text><Text style={styles.memoryValue}>{value}</Text><Text style={styles.memoryLabel}>{label}</Text></View>)}
          </View>

          <Text style={styles.section}>Recent memory</Text>
          <View style={styles.memoryCard}><View style={styles.memoryArt}><Text style={styles.memoryArtText}>✨</Text></View><View><Text style={styles.memoryTitle}>Galaxy Night</Text><Text style={styles.memorySub}>Shared a Castle gift in Chill Vibes</Text></View></View>
        </>
      )}
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:14},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  backText:{color:"#554D65",fontSize:29,marginTop:-3},
  kicker:{color:"#8B5CFF",fontSize:7.5,fontWeight:"900",letterSpacing:1.1,marginLeft:10},
  title:{color:"#2B243D",fontSize:21,fontWeight:"900",marginLeft:10},
  more:{marginLeft:"auto",width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  moreText:{color:"#554D65"},
  tabs:{flexDirection:"row",backgroundColor:"#FFFFFF",borderRadius:18,padding:4,borderWidth:1,borderColor:"#EEEAF4"},
  tab:{flex:1,minHeight:42,borderRadius:14,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#7A5CFF"},
  tabText:{color:"#8C8497",fontSize:9,fontWeight:"800"},
  tabTextActive:{color:"#FFFFFF"},
  familyHero:{minHeight:220,borderRadius:28,backgroundColor:"#43C8A2",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  orbA:{position:"absolute",width:220,height:220,borderRadius:110,backgroundColor:"rgba(255,255,255,.12)",right:-60,top:-80},
  orbB:{position:"absolute",width:150,height:150,borderRadius:75,backgroundColor:"rgba(122,92,255,.20)",left:-60,bottom:-60},
  familyIcon:{width:72,height:72,borderRadius:25,backgroundColor:"rgba(255,255,255,.18)",alignItems:"center",justifyContent:"center"},
  familyEmoji:{fontSize:37},
  familyName:{color:"#FFFFFF",fontSize:24,fontWeight:"900",marginTop:9},
  familyMeta:{color:"rgba(255,255,255,.74)",fontSize:8.5,marginTop:4},
  familyRank:{paddingHorizontal:11,paddingVertical:6,borderRadius:12,backgroundColor:"rgba(0,0,0,.13)",marginTop:12},
  familyRankText:{color:"#FFFFFF",fontSize:6.5,fontWeight:"900"},
  stats:{flexDirection:"row",borderRadius:20,backgroundColor:"#FFFFFF",paddingVertical:14,borderWidth:1,borderColor:"#EEEAF4"},
  stat:{flex:1,alignItems:"center"},
  statValue:{color:"#373042",fontSize:14,fontWeight:"900"},
  statLabel:{color:"#91899B",fontSize:6.5,marginTop:3},
  section:{color:"#2D263D",fontSize:15,fontWeight:"900"},
  mission:{minHeight:66,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",padding:11,flexDirection:"row",alignItems:"center",gap:9},
  missionIcon:{width:40,height:40,borderRadius:13,backgroundColor:"#F2EDFF",alignItems:"center",justifyContent:"center"},
  missionCopy:{flex:1},
  missionTitle:{color:"#403849",fontSize:8.5,fontWeight:"900"},
  track:{height:5,borderRadius:3,backgroundColor:"#EEEAF4",marginTop:7,overflow:"hidden"},
  fill:{height:"100%",backgroundColor:"#43C8A2"},
  percent:{color:"#48B596",fontSize:7,fontWeight:"900"},
  coupleHero:{minHeight:230,borderRadius:28,backgroundColor:"#FF669F",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  coupleOrbA:{position:"absolute",width:220,height:220,borderRadius:110,backgroundColor:"rgba(255,255,255,.12)",right:-70,top:-80},
  coupleOrbB:{position:"absolute",width:160,height:160,borderRadius:80,backgroundColor:"rgba(122,92,255,.22)",left:-60,bottom:-70},
  heart:{fontSize:52},
  coupleTitle:{color:"#FFFFFF",fontSize:23,fontWeight:"900",marginTop:9},
  coupleSub:{color:"rgba(255,255,255,.75)",fontSize:8.5,marginTop:4},
  bond:{paddingHorizontal:11,paddingVertical:6,borderRadius:12,backgroundColor:"rgba(255,255,255,.16)",marginTop:12},
  bondText:{color:"#FFFFFF",fontSize:6.5,fontWeight:"900"},
  memoryGrid:{flexDirection:"row",flexWrap:"wrap",gap:8},
  memory:{width:"48.8%",minHeight:98,borderRadius:19,padding:12},
  memoryIcon:{fontSize:23},
  memoryValue:{color:"#3C354A",fontSize:13,fontWeight:"900",marginTop:7},
  memoryLabel:{color:"#81798D",fontSize:6.5,marginTop:2},
  memoryCard:{minHeight:84,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",padding:12,flexDirection:"row",alignItems:"center",gap:12},
  memoryArt:{width:48,height:48,borderRadius:16,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center"},
  memoryArtText:{fontSize:24},
  memoryTitle:{color:"#423A50",fontSize:9,fontWeight:"900"},
  memorySub:{color:"#90889B",fontSize:6.5,marginTop:3},
});
