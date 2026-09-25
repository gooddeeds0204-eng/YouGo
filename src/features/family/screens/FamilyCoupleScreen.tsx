import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

export function FamilyCoupleScreen(){
  const [tab,setTab]=useState<"family"|"couple">("family");
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}><Pressable onPress={()=>router.back()}><Text style={styles.back}>‹</Text></Pressable><Text style={styles.title}>Community</Text><Text style={styles.more}>•••</Text></View>
      <View style={styles.tabs}>
        <Pressable onPress={()=>setTab("family")} style={[styles.tab,tab==="family"&&styles.tabActive]}><Text style={[styles.tabText,tab==="family"&&styles.tabTextActive]}>Family</Text></Pressable>
        <Pressable onPress={()=>setTab("couple")} style={[styles.tab,tab==="couple"&&styles.tabActive]}><Text style={[styles.tabText,tab==="couple"&&styles.tabTextActive]}>Couple</Text></Pressable>
      </View>

      {tab==="family"?(
        <>
          <View style={styles.familyHero}><View style={styles.familyGlow}/><Text style={styles.familyIcon}>🫶</Text><Text style={styles.familyName}>Neon Tribe</Text><Text style={styles.familyMeta}>Family LV.18 • 248 members</Text><View style={styles.familyRank}><Text style={styles.familyRankText}>#12 INDIA</Text></View></View>
          <View style={styles.stats}>{[["248","Members"],["1.8M","Charm"],["34","Missions"]].map(([v,l])=><View key={l} style={styles.stat}><Text style={styles.statValue}>{v}</Text><Text style={styles.statLabel}>{l}</Text></View>)}</View>
          <Text style={styles.section}>Family missions</Text>
          {[
            ["🎁","Send 500 gifts","78%"],["🎙","Host 20 room hours","61%"],["🏆","Reach Top 10 ranking","84%"]
          ].map(([icon,title,p])=><View key={title} style={styles.mission}><Text style={styles.missionIcon}>{icon}</Text><View style={styles.missionCopy}><Text style={styles.missionTitle}>{title}</Text><View style={styles.track}><View style={[styles.fill,{width:p as any}]}/></View></View><Text style={styles.percent}>{p}</Text></View>)}
        </>
      ):(
        <>
          <View style={styles.coupleHero}><View style={styles.coupleGlow}/><Text style={styles.heart}>💞</Text><Text style={styles.coupleTitle}>Neha × Arjun</Text><Text style={styles.coupleSub}>Together for 128 days</Text><View style={styles.bond}><Text style={styles.bondText}>BOND LV.12</Text></View></View>
          <View style={styles.memoryGrid}>
            {[
              ["🎁","Couple Gifts","248"],["📸","Memories","64"],["🔥","Streak","128 days"],["💗","Bond points","18.4K"]
            ].map(([icon,label,value])=><View key={label} style={styles.memory}><Text style={styles.memoryIcon}>{icon}</Text><Text style={styles.memoryValue}>{value}</Text><Text style={styles.memoryLabel}>{label}</Text></View>)}
          </View>
          <Text style={styles.section}>Recent memory</Text>
          <View style={styles.memoryCard}><Text style={styles.memoryArt}>✨</Text><View><Text style={styles.memoryTitle}>Galaxy Night</Text><Text style={styles.memorySub}>Shared a Castle gift in Chill Vibes</Text></View></View>
        </>
      )}
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:14},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{color:"#FFFFFF",fontSize:30},
  title:{color:"#FFFFFF",fontSize:20,fontWeight:"900"},
  more:{color:"#FFFFFF"},
  tabs:{flexDirection:"row",backgroundColor:"#11131E",borderRadius:16,padding:4},
  tab:{flex:1,minHeight:40,borderRadius:13,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#2A173B"},
  tabText:{color:"#70768A",fontSize:8,fontWeight:"800"},
  tabTextActive:{color:"#F4B6E4"},
  familyHero:{minHeight:220,borderRadius:28,backgroundColor:"#17312D",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  familyGlow:{position:"absolute",width:220,height:220,borderRadius:110,backgroundColor:"rgba(52,218,166,.13)"},
  familyIcon:{fontSize:44},
  familyName:{color:"#FFFFFF",fontSize:24,fontWeight:"900",marginTop:9},
  familyMeta:{color:"#8FB3AA",fontSize:8,marginTop:4},
  familyRank:{paddingHorizontal:11,paddingVertical:6,borderRadius:12,backgroundColor:"rgba(0,0,0,.18)",marginTop:12},
  familyRankText:{color:"#7BE6C3",fontSize:6.5,fontWeight:"900"},
  stats:{flexDirection:"row",borderRadius:18,backgroundColor:"#11131E",paddingVertical:14},
  stat:{flex:1,alignItems:"center"},
  statValue:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  statLabel:{color:"#6E7488",fontSize:6,marginTop:3},
  section:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  mission:{minHeight:64,borderRadius:17,backgroundColor:"#11131E",padding:11,flexDirection:"row",alignItems:"center",gap:9},
  missionIcon:{fontSize:20},
  missionCopy:{flex:1},
  missionTitle:{color:"#FFFFFF",fontSize:8,fontWeight:"800"},
  track:{height:4,borderRadius:2,backgroundColor:"#202331",marginTop:7,overflow:"hidden"},
  fill:{height:"100%",backgroundColor:"#39D98A"},
  percent:{color:"#8CE8C4",fontSize:7,fontWeight:"900"},
  coupleHero:{minHeight:230,borderRadius:28,backgroundColor:"#351C37",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  coupleGlow:{position:"absolute",width:230,height:230,borderRadius:115,backgroundColor:"rgba(232,60,185,.13)"},
  heart:{fontSize:50},
  coupleTitle:{color:"#FFFFFF",fontSize:22,fontWeight:"900",marginTop:9},
  coupleSub:{color:"#B895B1",fontSize:8,marginTop:4},
  bond:{paddingHorizontal:11,paddingVertical:6,borderRadius:12,backgroundColor:"rgba(232,60,185,.14)",marginTop:12},
  bondText:{color:"#FF9EDC",fontSize:6.5,fontWeight:"900"},
  memoryGrid:{flexDirection:"row",flexWrap:"wrap",gap:8},
  memory:{width:"48.8%",minHeight:92,borderRadius:18,backgroundColor:"#11131E",padding:12},
  memoryIcon:{fontSize:22},
  memoryValue:{color:"#FFFFFF",fontSize:13,fontWeight:"900",marginTop:7},
  memoryLabel:{color:"#71778B",fontSize:6.5,marginTop:2},
  memoryCard:{minHeight:80,borderRadius:18,backgroundColor:"#11131E",padding:12,flexDirection:"row",alignItems:"center",gap:12},
  memoryArt:{fontSize:28},
  memoryTitle:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  memorySub:{color:"#707688",fontSize:6.5,marginTop:3},
});
