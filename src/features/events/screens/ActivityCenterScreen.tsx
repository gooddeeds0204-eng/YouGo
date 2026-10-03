import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import {
  claimDailyCheckin,
  getCharmRanking,
  getFamilyRanking,
  getGiftRanking,
  listActiveEvents,
  listMyMissions,
  type EventItem,
  type MissionItem,
  type RankingItem,
} from "@/platform/supabase/activities";

const demoEvent:EventItem={
  id:"demo-event",
  name:"Ugo October Carnival",
  startsAt:new Date().toISOString(),
  endsAt:new Date(Date.now()+14*86400000).toISOString(),
  metadata:{theme:"monthly"},
};
const demoMissions:MissionItem[]=[
  {id:"m1",title:"Join 3 rooms",target:3,rewardType:"coins",rewardAmount:100,progress:1},
  {id:"m2",title:"Send 5 gifts",target:5,rewardType:"event_tokens",rewardAmount:50,progress:2},
  {id:"m3",title:"Spend 20 minutes in rooms",target:20,rewardType:"coins",rewardAmount:120,progress:8},
];
const demoRank:RankingItem[]=[
  {id:"1",name:"Priya",avatarUrl:null,value:128400,label:"Gifts"},
  {id:"2",name:"Arjun",avatarUrl:null,value:116200,label:"Gifts"},
  {id:"3",name:"Neha",avatarUrl:null,value:98400,label:"Gifts"},
  {id:"4",name:"Ravi",avatarUrl:null,value:87600,label:"Gifts"},
  {id:"5",name:"Sneha",avatarUrl:null,value:74300,label:"Gifts"},
];

export function ActivityCenterScreen(){
  const [events,setEvents]=useState<EventItem[]>([]);
  const [missions,setMissions]=useState<MissionItem[]>([]);
  const [ranking,setRanking]=useState<RankingItem[]>([]);
  const [tab,setTab]=useState<"gifts"|"charm"|"family">("gifts");
  const [checking,setChecking]=useState(false);
  const [checkin,setCheckin]=useState<{streak:number;reward:number}|null>(null);

  useEffect(()=>{
    void listActiveEvents().then(setEvents).catch(()=>undefined);
    void listMyMissions().then(setMissions).catch(()=>undefined);
  },[]);

  useEffect(()=>{
    const task=tab==="gifts"?getGiftRanking(5):tab==="charm"?getCharmRanking(5):getFamilyRanking(5);
    void task.then(setRanking).catch(()=>setRanking([]));
  },[tab]);

  const claim=async()=>{
    if(checking)return;
    setChecking(true);
    try{
      const result=await claimDailyCheckin();
      if(result){
        setCheckin({streak:result.streak,reward:result.reward_amount});
        Alert.alert(result.already_claimed?"Already claimed":"Reward claimed",`Day ${result.streak} • +${result.reward_amount} coins`);
      }else{
        setCheckin({streak:1,reward:50});
        Alert.alert("Preview reward","+50 coins previewed.");
      }
    }catch(error:any){
      Alert.alert("Check-in failed",error?.message||"Try again.");
    }finally{
      setChecking(false);
    }
  };

  const event=events[0]||demoEvent;
  const shownMissions=missions.length?missions:demoMissions;
  const shownRanking=ranking.length?ranking:demoRank;

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.eyebrow}>UGO LIVE</Text><Text style={styles.title}>Events & Rankings</Text></View>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroGlow}/>
        <Text style={styles.heroKicker}>MONTHLY EVENT</Text>
        <Text style={styles.heroTitle}>🎉 {event.name}</Text>
        <Text style={styles.heroSub}>Complete missions, collect event rewards and climb the monthly boards.</Text>
        <View style={styles.eventPill}><Text style={styles.eventPillText}>Ends {new Date(event.endsAt).toLocaleDateString()}</Text></View>
      </View>

      <Pressable onPress={claim} style={styles.checkin}>
        <View style={styles.checkIcon}><Text style={styles.checkEmoji}>🔥</Text></View>
        <View style={styles.checkCopy}>
          <Text style={styles.checkTitle}>Daily check-in</Text>
          <Text style={styles.checkSub}>{checkin?`Streak ${checkin.streak} • +${checkin.reward} coins`:"Build your streak and collect coins."}</Text>
        </View>
        <View style={styles.claim}><Text style={styles.claimText}>{checking?"...":"Claim"}</Text></View>
      </Pressable>

      <Text style={styles.sectionTitle}>Missions</Text>
      <View style={styles.list}>
        {shownMissions.map(m=>{
          const ratio=Math.min(1,m.progress/m.target);
          return(
            <View key={m.id} style={styles.mission}>
              <View style={styles.missionTop}><Text style={styles.missionTitle}>{m.title}</Text><Text style={styles.reward}>+{m.rewardAmount} {m.rewardType.replace("_"," ")}</Text></View>
              <View style={styles.track}><View style={[styles.fill,{width:(Math.round(ratio*100)+"%") as `${number}%`}]}/></View>
              <Text style={styles.progressText}>{m.progress} / {m.target}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Top 5</Text><Text style={styles.sectionHint}>Monthly</Text></View>
      <View style={styles.tabs}>
        {([["gifts","Gifts"],["charm","Charm"],["family","Family"]] as const).map(([id,label])=>(
          <Pressable key={id} onPress={()=>setTab(id)} style={[styles.tab,tab===id&&styles.tabActive]}>
            <Text style={[styles.tabText,tab===id&&styles.tabTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.rankList}>
        {shownRanking.map((item,index)=>(
          <View key={item.id} style={styles.rankRow}>
            <Text style={[styles.rankNo,index<3&&styles.rankTop]}>#{index+1}</Text>
            <View style={styles.avatar}><Text style={styles.avatarText}>{item.name[0]}</Text></View>
            <View style={styles.rankCopy}><Text style={styles.rankName}>{item.name}</Text><Text style={styles.rankLabel}>{item.label}</Text></View>
            <Text style={styles.rankValue}>{item.value.toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:30,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",marginRight:10},
  backText:{color:"#4B4551",fontSize:30,marginTop:-3},
  eyebrow:{color:"#A1874F",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#1D1924",fontSize:21,fontWeight:"900"},
  spacer:{marginLeft:"auto",width:42},
  hero:{minHeight:190,borderRadius:25,backgroundColor:"#1B1623",padding:18,overflow:"hidden",borderWidth:1,borderColor:"#34283F"},
  heroGlow:{position:"absolute",width:230,height:230,borderRadius:115,backgroundColor:"rgba(112,84,232,.25)",right:-80,top:-80},
  heroKicker:{color:"#E8B95A",fontSize:9,fontWeight:"900",letterSpacing:1.2},
  heroTitle:{color:"#FFFFFF",fontSize:24,fontWeight:"900",marginTop:10},
  heroSub:{color:"rgba(255,255,255,.64)",fontSize:12,lineHeight:18,maxWidth:310,marginTop:7},
  eventPill:{alignSelf:"flex-start",paddingHorizontal:11,paddingVertical:7,borderRadius:12,backgroundColor:"rgba(232,185,90,.11)",marginTop:16},
  eventPillText:{color:"#E8B95A",fontSize:10,fontWeight:"900"},
  checkin:{minHeight:82,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:12,flexDirection:"row",alignItems:"center"},
  checkIcon:{width:50,height:50,borderRadius:16,backgroundColor:"#FFF3E8",alignItems:"center",justifyContent:"center"},
  checkEmoji:{fontSize:24},
  checkCopy:{flex:1,marginLeft:11},
  checkTitle:{color:"#332E3A",fontSize:14,fontWeight:"900"},
  checkSub:{color:"#817A88",fontSize:11,marginTop:3},
  claim:{paddingHorizontal:14,paddingVertical:9,borderRadius:13,backgroundColor:"#7054E8"},
  claimText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  sectionTitle:{color:"#1D1924",fontSize:18,fontWeight:"900"},
  list:{gap:8},
  mission:{borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:13},
  missionTop:{flexDirection:"row",justifyContent:"space-between",gap:10},
  missionTitle:{color:"#403A46",fontSize:13,fontWeight:"900",flex:1},
  reward:{color:"#7054E8",fontSize:10,fontWeight:"900"},
  track:{height:7,borderRadius:4,backgroundColor:"#EFECF4",marginTop:10,overflow:"hidden"},
  fill:{height:"100%",backgroundColor:"#7054E8"},
  progressText:{color:"#8A8390",fontSize:10,marginTop:5},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionHint:{color:"#9A94A0",fontSize:11},
  tabs:{flexDirection:"row",backgroundColor:"#F0EDF6",borderRadius:17,padding:4},
  tab:{flex:1,minHeight:42,borderRadius:14,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#FFFFFF"},
  tabText:{color:"#817A88",fontSize:11,fontWeight:"800"},
  tabTextActive:{color:"#5F47CF"},
  rankList:{gap:8},
  rankRow:{minHeight:66,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:10,flexDirection:"row",alignItems:"center"},
  rankNo:{width:34,color:"#8F8895",fontSize:12,fontWeight:"900"},
  rankTop:{color:"#A67E27"},
  avatar:{width:42,height:42,borderRadius:21,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  rankCopy:{flex:1,marginLeft:10},
  rankName:{color:"#3B3541",fontSize:13,fontWeight:"900"},
  rankLabel:{color:"#918A97",fontSize:10,marginTop:2},
  rankValue:{color:"#7054E8",fontSize:12,fontWeight:"900"},
});
