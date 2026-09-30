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
        <Text style={styles.title}>Community</Text>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.tabs}>
        <Pressable onPress={()=>setTab("family")} style={[styles.tab,tab==="family"&&styles.tabActive]}><Text style={[styles.tabText,tab==="family"&&styles.tabTextActive]}>Family</Text></Pressable>
        <Pressable onPress={()=>setTab("couple")} style={[styles.tab,tab==="couple"&&styles.tabActive]}><Text style={[styles.tabText,tab==="couple"&&styles.tabTextActive]}>Couple</Text></Pressable>
      </View>

      {tab==="family"?(
        <>
          <View style={styles.hero}>
            <Text style={styles.heroEmoji}>🫶</Text>
            <Text style={styles.heroTitle}>Neon Tribe</Text>
            <Text style={styles.heroSub}>Family LV.18 • 248 members</Text>
          </View>

          <View style={styles.stats}>
            {[["248","Members"],["1.8M","Charm"],["34","Missions"]].map(([v,l])=><View key={l} style={styles.stat}><Text style={styles.statValue}>{v}</Text><Text style={styles.statLabel}>{l}</Text></View>)}
          </View>

          <Text style={styles.sectionTitle}>Family missions</Text>
          {[
            ["🎁","Send 500 gifts","78%"],
            ["🎙","Host 20 room hours","61%"],
            ["🏆","Reach Top 10 ranking","84%"]
          ].map(([icon,title,p])=><View key={title} style={styles.mission}><Text style={styles.missionIcon}>{icon}</Text><View style={styles.missionCopy}><Text style={styles.missionTitle}>{title}</Text><View style={styles.track}><View style={[styles.fill,{width:p as any}]}/></View></View><Text style={styles.percent}>{p}</Text></View>)}
        </>
      ):(
        <>
          <View style={[styles.hero,styles.coupleHero]}>
            <Text style={styles.heroEmoji}>💞</Text>
            <Text style={styles.heroTitle}>Neha × Arjun</Text>
            <Text style={styles.heroSub}>Together for 128 days • Bond LV.12</Text>
          </View>

          <View style={styles.coupleGrid}>
            {[["🎁","Gifts","248"],["📸","Memories","64"],["🔥","Streak","128 days"],["💗","Bond","18.4K"]].map(([icon,label,value])=><View key={label} style={styles.coupleCard}><Text style={styles.coupleIcon}>{icon}</Text><Text style={styles.coupleValue}>{value}</Text><Text style={styles.coupleLabel}>{label}</Text></View>)}
          </View>
        </>
      )}
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:24,gap:16},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  backText:{color:"#4D4657",fontSize:30,marginTop:-3},
  title:{color:"#211D2C",fontSize:22,fontWeight:"900"},
  spacer:{width:42},
  tabs:{flexDirection:"row",backgroundColor:"#FFFFFF",borderRadius:17,padding:4,borderWidth:1,borderColor:"#ECEAF2"},
  tab:{flex:1,minHeight:44,borderRadius:14,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#7657F6"},
  tabText:{color:"#817A8B",fontSize:12,fontWeight:"800"},
  tabTextActive:{color:"#FFFFFF"},
  hero:{minHeight:190,borderRadius:24,backgroundColor:"#49BE98",alignItems:"center",justifyContent:"center"},
  coupleHero:{backgroundColor:"#F6549C"},
  heroEmoji:{fontSize:44},
  heroTitle:{color:"#FFFFFF",fontSize:23,fontWeight:"900",marginTop:8},
  heroSub:{color:"rgba(255,255,255,.76)",fontSize:12,marginTop:5},
  stats:{flexDirection:"row",borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",paddingVertical:14},
  stat:{flex:1,alignItems:"center"},
  statValue:{color:"#332E3A",fontSize:15,fontWeight:"900"},
  statLabel:{color:"#817A8B",fontSize:10,marginTop:3},
  sectionTitle:{color:"#211D2C",fontSize:18,fontWeight:"900"},
  mission:{minHeight:68,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:11,flexDirection:"row",alignItems:"center",gap:10},
  missionIcon:{fontSize:23},
  missionCopy:{flex:1},
  missionTitle:{color:"#403A46",fontSize:13,fontWeight:"800"},
  track:{height:6,borderRadius:3,backgroundColor:"#EEEAF2",marginTop:7,overflow:"hidden"},
  fill:{height:"100%",backgroundColor:"#49BE98"},
  percent:{color:"#3DA783",fontSize:11,fontWeight:"900"},
  coupleGrid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  coupleCard:{width:"48.5%",minHeight:110,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:13},
  coupleIcon:{fontSize:25},
  coupleValue:{color:"#332E3A",fontSize:15,fontWeight:"900",marginTop:9},
  coupleLabel:{color:"#817A8B",fontSize:11,marginTop:3},
});
