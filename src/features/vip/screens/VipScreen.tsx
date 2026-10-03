import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { getMyVipState, type VipState } from "@/platform/supabase/vip";

const perks=[
  ["👑","Royal frame"],
  ["🚘","Entry vehicle"],
  ["✨","Entry effect"],
  ["💬","VIP bubble"],
  ["🎁","Gift perks"],
  ["🏆","VIP badge"],
];

const thresholds=[0,1000,5000,15000,35000,70000,120000];

export function VipScreen(){
  const [state,setState]=useState<VipState|null>(null);

  useEffect(()=>{void getMyVipState().then(setState).catch(()=>undefined);},[]);

  const current=state||{vipLevel:0,vipPoints:0,svipLevel:0,expiresAt:null};
  const level=current.vipLevel;
  const nextIndex=Math.min(thresholds.length-1,Math.max(1,level+1));
  const start=thresholds[Math.min(level,thresholds.length-1)]||0;
  const next=thresholds[nextIndex]||thresholds[thresholds.length-1];
  const ratio=useMemo(()=>next<=start?1:Math.min(1,Math.max(0,(current.vipPoints-start)/(next-start))),[current.vipPoints,start,next]);

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>VIP</Text>
        <Pressable onPress={()=>router.push("/store")} style={styles.store}><Text style={styles.storeText}>Store</Text></Pressable>
      </View>

      <View style={styles.hero}>
        <View style={styles.glow}/>
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.level}>{current.svipLevel>0?`SVIP ${current.svipLevel}`:`VIP ${level}`}</Text>
        <Text style={styles.heroTitle}>Premium room identity</Text>
        <Text style={styles.heroSub}>Your VIP points grow from supported in-app activity such as gifts and premium progression.</Text>
        <View style={styles.progress}><View style={[styles.progressFill,{width:(Math.round(ratio*100)+"%") as `${number}%`}]}/></View>
        <Text style={styles.progressText}>{current.vipPoints.toLocaleString()} / {next.toLocaleString()} points</Text>
        {current.expiresAt?<Text style={styles.expiry}>Active until {new Date(current.expiresAt).toLocaleDateString()}</Text>:null}
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>VIP path</Text><Text style={styles.hint}>Current: VIP {level}</Text></View>
      <View style={styles.plans}>
        {[
          ["VIP 1","Starter","1K pts"],
          ["VIP 3","Popular","15K pts"],
          ["SVIP","Elite","Special status"]
        ].map(([name,label,meta],index)=>(
          <Pressable key={name} onPress={()=>router.push("/store")} style={[styles.plan,index===1&&styles.planActive]}>
            <Text style={styles.planLabel}>{label}</Text>
            <Text style={styles.planName}>{name}</Text>
            <Text style={styles.price}>{meta}</Text>
            <Text style={styles.month}>View premium assets</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Benefits</Text>
      <View style={styles.grid}>
        {perks.map(([icon,label])=>(
          <Pressable key={label} onPress={()=>router.push("/store")} style={styles.perk}>
            <Text style={styles.perkIcon}>{icon}</Text>
            <Text style={styles.perkText}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.note}><Text style={styles.noteIcon}>✦</Text><Text style={styles.noteText}>VIP state is stored on the server. Paid membership checkout will use the Recharge/Payment provider once a production gateway is connected.</Text></View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:24,gap:16},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  backText:{color:"#4B4551",fontSize:30,marginTop:-3},
  title:{color:"#1D1924",fontSize:22,fontWeight:"900"},
  store:{paddingHorizontal:12,paddingVertical:9,borderRadius:13,backgroundColor:"#EEE9FF"},
  storeText:{color:"#6549D5",fontSize:11,fontWeight:"900"},
  hero:{minHeight:235,borderRadius:24,backgroundColor:"#1B1623",padding:18,alignItems:"center",overflow:"hidden"},
  glow:{position:"absolute",width:260,height:260,borderRadius:130,backgroundColor:"rgba(112,84,232,.26)",right:-90,top:-100},
  crown:{fontSize:44},
  level:{color:"#E8B95A",fontSize:13,fontWeight:"900",marginTop:6},
  heroTitle:{color:"#FFFFFF",fontSize:22,fontWeight:"900",marginTop:7},
  heroSub:{color:"rgba(255,255,255,.62)",fontSize:12,lineHeight:17,textAlign:"center",marginTop:6,maxWidth:310},
  progress:{width:"100%",height:7,borderRadius:4,backgroundColor:"rgba(255,255,255,.14)",marginTop:20,overflow:"hidden"},
  progressFill:{height:"100%",backgroundColor:"#E8B95A"},
  progressText:{color:"rgba(255,255,255,.64)",fontSize:11,marginTop:7},
  expiry:{color:"#9FDCC7",fontSize:10,marginTop:4},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#1D1924",fontSize:18,fontWeight:"900"},
  hint:{color:"#918A97",fontSize:10},
  plans:{flexDirection:"row",gap:8},
  plan:{flex:1,minHeight:132,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:11},
  planActive:{borderColor:"#B8A6FF",backgroundColor:"#F8F5FF"},
  planLabel:{color:"#A1874F",fontSize:8,fontWeight:"900",textTransform:"uppercase"},
  planName:{color:"#393440",fontSize:14,fontWeight:"900",marginTop:6},
  price:{color:"#211D2C",fontSize:14,fontWeight:"900",marginTop:12},
  month:{color:"#817A8B",fontSize:9,lineHeight:13,marginTop:4},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  perk:{width:"31.5%",minHeight:92,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",padding:8},
  perkIcon:{fontSize:24},
  perkText:{color:"#554F5D",fontSize:11,fontWeight:"800",marginTop:7,textAlign:"center"},
  note:{borderRadius:17,backgroundColor:"#F3F0F8",padding:13,flexDirection:"row",alignItems:"center"},
  noteIcon:{color:"#A1874F",fontSize:18,marginRight:9},
  noteText:{flex:1,color:"#756E7B",fontSize:10.5,lineHeight:16},
});
