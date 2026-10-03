import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import {
  breakCouple,
  createCouple,
  createFamily,
  getMyCouple,
  getMyFamily,
  joinFamily,
  leaveFamily,
  listFamilies,
  type CoupleState,
  type FamilyState,
} from "@/platform/supabase/community";
import { searchProfiles, type SocialProfile } from "@/platform/supabase/social";

const demoFamily:FamilyState={
  id:"demo-family",
  name:"Neon Tribe",
  level:18,
  charm:1800000,
  role:"member",
  memberCount:248,
};
const demoCouple:CoupleState={
  id:"demo-couple",
  otherUserId:"arjun",
  otherName:"Arjun",
  otherAvatarUrl:null,
  bondLevel:12,
  bondPoints:18400,
  startedAt:new Date(Date.now()-128*86400000).toISOString(),
};

export function FamilyCoupleScreen(){
  const [tab,setTab]=useState<"family"|"couple">("family");
  const [family,setFamily]=useState<FamilyState|null>(null);
  const [families,setFamilies]=useState<any[]>([]);
  const [couple,setCouple]=useState<CoupleState|null>(null);
  const [familyName,setFamilyName]=useState("");
  const [people,setPeople]=useState<SocialProfile[]>([]);
  const [query,setQuery]=useState("");
  const [busy,setBusy]=useState(false);
  const [loaded,setLoaded]=useState(false);

  const load=async()=>{
    const [myFamily,myCouple,allFamilies]=await Promise.all([
      getMyFamily().catch(()=>null),
      getMyCouple().catch(()=>null),
      listFamilies(12).catch(()=>[]),
    ]);
    setFamily(myFamily);
    setCouple(myCouple);
    setFamilies(allFamilies);
    setLoaded(true);
  };

  useEffect(()=>{void load();},[]);

  useEffect(()=>{
    const clean=query.trim();
    if(clean.length<2){
      setPeople([]);
      return;
    }
    const timer=setTimeout(()=>{void searchProfiles(clean,8).then(setPeople).catch(()=>setPeople([]));},250);
    return()=>clearTimeout(timer);
  },[query]);

  const shownFamily=family||(loaded?null:demoFamily);
  const shownCouple=couple||(loaded?null:demoCouple);
  const days=shownCouple?Math.max(1,Math.floor((Date.now()-new Date(shownCouple.startedAt).getTime())/86400000)):0;

  const createNewFamily=async()=>{
    const clean=familyName.trim();
    if(clean.length<2||busy)return;
    setBusy(true);
    try{
      const id=await createFamily(clean);
      if(id){
        setFamilyName("");
        await load();
      }else{
        setFamily({...demoFamily,id:"preview-family",name:clean,level:1,charm:0,memberCount:1,role:"owner"});
        setFamilyName("");
      }
    }catch(error:any){
      Alert.alert("Family",error?.message||"Could not create family.");
    }finally{setBusy(false);}
  };

  const join=async(id:string,name:string)=>{
    setBusy(true);
    try{
      const ok=await joinFamily(id);
      if(ok)await load();
      else setFamily({...demoFamily,id,name,level:1,charm:0,memberCount:1,role:"member"});
    }catch(error:any){Alert.alert("Family",error?.message||"Could not join family.");}
    finally{setBusy(false);}
  };

  const leave=async()=>{
    if(!shownFamily)return;
    if(shownFamily.id.startsWith("demo")||shownFamily.id.startsWith("preview")){
      setFamily(null);
      setLoaded(true);
      return;
    }
    setBusy(true);
    try{
      const ok=await leaveFamily(shownFamily.id);
      if(ok)await load();
    }catch(error:any){Alert.alert("Family",error?.message||"Could not leave family.");}
    finally{setBusy(false);}
  };

  const connectCouple=async(person:SocialProfile)=>{
    setBusy(true);
    try{
      const id=await createCouple(person.id);
      if(id)await load();
      else setCouple({...demoCouple,id:"preview-couple",otherUserId:person.id,otherName:person.displayName,bondLevel:1,bondPoints:0,startedAt:new Date().toISOString()});
      setQuery("");
      setPeople([]);
    }catch(error:any){Alert.alert("Couple",error?.message||"Could not create Couple Space.");}
    finally{setBusy(false);}
  };

  const disconnectCouple=async()=>{
    if(!shownCouple)return;
    if(shownCouple.id.startsWith("demo")||shownCouple.id.startsWith("preview")){
      setCouple(null);setLoaded(true);return;
    }
    const ok=await breakCouple(shownCouple.id).catch(()=>false);
    if(ok)await load();
  };

  const familyMissions=useMemo(()=>[
    ["🎁","Send gifts together","78%"],
    ["🎙","Host room hours","61%"],
    ["🏆","Climb family ranking","84%"],
  ],[]);

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>Community</Text>
        <Pressable onPress={()=>router.push("/activity")} style={styles.rank}><Text style={styles.rankText}>🏆</Text></Pressable>
      </View>

      <View style={styles.tabs}>
        <Pressable onPress={()=>setTab("family")} style={[styles.tab,tab==="family"&&styles.tabActive]}><Text style={[styles.tabText,tab==="family"&&styles.tabTextActive]}>Family</Text></Pressable>
        <Pressable onPress={()=>setTab("couple")} style={[styles.tab,tab==="couple"&&styles.tabActive]}><Text style={[styles.tabText,tab==="couple"&&styles.tabTextActive]}>Couple</Text></Pressable>
      </View>

      {tab==="family"?(
        <>
          {shownFamily?(
            <>
              <View style={styles.hero}>
                <View style={styles.heroGlow}/>
                <Text style={styles.heroEmoji}>🫶</Text>
                <Text style={styles.heroTitle}>{shownFamily.name}</Text>
                <Text style={styles.heroSub}>Family LV.{shownFamily.level} • {shownFamily.memberCount} members</Text>
                <View style={styles.rolePill}><Text style={styles.roleText}>{shownFamily.role.toUpperCase()}</Text></View>
              </View>

              <View style={styles.stats}>
                {[[shownFamily.memberCount.toLocaleString(),"Members"],[shownFamily.charm.toLocaleString(),"Charm"],["3","Missions"]].map(([v,l])=><View key={l} style={styles.stat}><Text style={styles.statValue}>{v}</Text><Text style={styles.statLabel}>{l}</Text></View>)}
              </View>

              <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Family missions</Text><Pressable onPress={()=>router.push("/activity")}><Text style={styles.link}>View all</Text></Pressable></View>
              {familyMissions.map(([icon,title,p])=><View key={title} style={styles.mission}><Text style={styles.missionIcon}>{icon}</Text><View style={styles.missionCopy}><Text style={styles.missionTitle}>{title}</Text><View style={styles.track}><View style={[styles.fill,{width:p as any}]}/></View></View><Text style={styles.percent}>{p}</Text></View>)}

              <Pressable onPress={leave} style={styles.secondary}><Text style={styles.secondaryText}>{shownFamily.role==="owner"?"Owner controls":"Leave family"}</Text></Pressable>
            </>
          ):(
            <>
              <View style={styles.emptyHero}>
                <Text style={styles.emptyIcon}>🫶</Text>
                <Text style={styles.emptyTitle}>Find your Ugo family</Text>
                <Text style={styles.emptySub}>Create a club or join a community to complete missions and rank together.</Text>
              </View>

              <Text style={styles.sectionTitle}>Create family</Text>
              <View style={styles.composer}>
                <TextInput value={familyName} onChangeText={setFamilyName} placeholder="Family name" placeholderTextColor="#9A94A0" style={styles.input}/>
                <Pressable onPress={createNewFamily} disabled={familyName.trim().length<2||busy} style={[styles.create,(familyName.trim().length<2||busy)&&styles.disabled]}><Text style={styles.createText}>Create</Text></Pressable>
              </View>

              <Text style={styles.sectionTitle}>Popular families</Text>
              <View style={styles.familyList}>
                {(families.length?families:[
                  {id:"f1",name:"Neon Tribe",level:18,charm:1800000,memberCount:248},
                  {id:"f2",name:"Telugu Stars",level:12,charm:920000,memberCount:164},
                  {id:"f3",name:"Music Souls",level:9,charm:540000,memberCount:98},
                ]).map((item:any)=>(
                  <View key={item.id} style={styles.familyRow}>
                    <View style={styles.familyAvatar}><Text style={styles.familyAvatarText}>{item.name[0]}</Text></View>
                    <View style={styles.familyCopy}><Text style={styles.familyName}>{item.name}</Text><Text style={styles.familyMeta}>LV.{item.level} • {item.memberCount} members • {Number(item.charm).toLocaleString()} charm</Text></View>
                    <Pressable onPress={()=>join(item.id,item.name)} style={styles.join}><Text style={styles.joinText}>Join</Text></Pressable>
                  </View>
                ))}
              </View>
            </>
          )}
        </>
      ):(
        <>
          {shownCouple?(
            <>
              <View style={[styles.hero,styles.coupleHero]}>
                <View style={styles.coupleGlow}/>
                <Text style={styles.heroEmoji}>💞</Text>
                <Text style={styles.heroTitle}>You × {shownCouple.otherName}</Text>
                <Text style={styles.heroSub}>Together for {days} days • Bond LV.{shownCouple.bondLevel}</Text>
              </View>

              <View style={styles.coupleGrid}>
                {[["🎁","Couple gifts","Open"],["📸","Memories",days+" days"],["🔥","Streak",days+" days"],["💗","Bond",shownCouple.bondPoints.toLocaleString()]].map(([icon,label,value])=><View key={label} style={styles.coupleCard}><Text style={styles.coupleIcon}>{icon}</Text><Text style={styles.coupleValue}>{value}</Text><Text style={styles.coupleLabel}>{label}</Text></View>)}
              </View>

              <Pressable onPress={()=>router.push({pathname:"/user/[userId]",params:{userId:shownCouple.otherUserId}})} style={styles.primary}><Text style={styles.primaryText}>Open partner profile</Text></Pressable>
              <Pressable onPress={disconnectCouple} style={styles.secondary}><Text style={styles.secondaryText}>End Couple Space</Text></Pressable>
            </>
          ):(
            <>
              <View style={[styles.emptyHero,styles.coupleEmpty]}>
                <Text style={styles.emptyIcon}>💞</Text>
                <Text style={styles.emptyTitle}>Create a Couple Space</Text>
                <Text style={styles.emptySub}>Search a Ugo member, connect your profiles and grow your bond with gifts and shared activity.</Text>
              </View>

              <View style={styles.search}>
                <Text style={styles.searchIcon}>⌕</Text>
                <TextInput value={query} onChangeText={setQuery} placeholder="Search a member" placeholderTextColor="#9A94A0" style={styles.searchInput}/>
              </View>

              <View style={styles.peopleList}>
                {people.map(person=>(
                  <View key={person.id} style={styles.personRow}>
                    <View style={styles.personAvatar}><Text style={styles.personAvatarText}>{person.displayName[0]}</Text></View>
                    <View style={styles.familyCopy}><Text style={styles.familyName}>{person.displayName}</Text><Text style={styles.familyMeta}>@{person.username||"ugo"} • LV.{person.level}</Text></View>
                    <Pressable onPress={()=>connectCouple(person)} style={styles.join}><Text style={styles.joinText}>Connect</Text></Pressable>
                  </View>
                ))}
              </View>
            </>
          )}
        </>
      )}
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:30,gap:16},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  backText:{color:"#4B4551",fontSize:30,marginTop:-3},
  title:{color:"#1D1924",fontSize:22,fontWeight:"900"},
  rank:{width:42,height:42,borderRadius:14,backgroundColor:"#FFF5DF",alignItems:"center",justifyContent:"center"},
  rankText:{fontSize:18},
  tabs:{flexDirection:"row",backgroundColor:"#F0EDF6",borderRadius:17,padding:4},
  tab:{flex:1,minHeight:44,borderRadius:14,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#7054E8"},
  tabText:{color:"#817A8B",fontSize:12,fontWeight:"800"},
  tabTextActive:{color:"#FFFFFF"},
  hero:{minHeight:205,borderRadius:24,backgroundColor:"#318D74",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  heroGlow:{position:"absolute",width:210,height:210,borderRadius:105,backgroundColor:"rgba(255,255,255,.10)",right:-70,top:-70},
  coupleHero:{backgroundColor:"#B34670"},
  coupleGlow:{position:"absolute",width:240,height:240,borderRadius:120,backgroundColor:"rgba(112,84,232,.22)",right:-90,top:-90},
  heroEmoji:{fontSize:44},
  heroTitle:{color:"#FFFFFF",fontSize:23,fontWeight:"900",marginTop:8},
  heroSub:{color:"rgba(255,255,255,.76)",fontSize:12,marginTop:5},
  rolePill:{paddingHorizontal:10,paddingVertical:6,borderRadius:11,backgroundColor:"rgba(255,255,255,.13)",marginTop:11},
  roleText:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  stats:{flexDirection:"row",borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",paddingVertical:14},
  stat:{flex:1,alignItems:"center"},
  statValue:{color:"#332E3A",fontSize:15,fontWeight:"900"},
  statLabel:{color:"#817A8B",fontSize:10,marginTop:3},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#1D1924",fontSize:18,fontWeight:"900"},
  link:{color:"#7054E8",fontSize:11,fontWeight:"900"},
  mission:{minHeight:68,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:11,flexDirection:"row",alignItems:"center",gap:10},
  missionIcon:{fontSize:23},
  missionCopy:{flex:1},
  missionTitle:{color:"#403A46",fontSize:13,fontWeight:"800"},
  track:{height:6,borderRadius:3,backgroundColor:"#EEEAF2",marginTop:7,overflow:"hidden"},
  fill:{height:"100%",backgroundColor:"#49BE98"},
  percent:{color:"#3DA783",fontSize:11,fontWeight:"900"},
  emptyHero:{minHeight:185,borderRadius:23,backgroundColor:"#E9F7F2",alignItems:"center",justifyContent:"center",padding:22},
  coupleEmpty:{backgroundColor:"#FFF0F5"},
  emptyIcon:{fontSize:42},
  emptyTitle:{color:"#302B36",fontSize:19,fontWeight:"900",marginTop:9},
  emptySub:{color:"#817A87",fontSize:12,lineHeight:18,textAlign:"center",maxWidth:310,marginTop:5},
  composer:{minHeight:58,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",paddingHorizontal:12,flexDirection:"row",alignItems:"center"},
  input:{flex:1,color:"#39333F",fontSize:13},
  create:{paddingHorizontal:14,paddingVertical:9,borderRadius:12,backgroundColor:"#7054E8"},
  createText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  disabled:{opacity:.35},
  familyList:{gap:8},
  familyRow:{minHeight:74,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:10,flexDirection:"row",alignItems:"center"},
  familyAvatar:{width:46,height:46,borderRadius:16,backgroundColor:"#318D74",alignItems:"center",justifyContent:"center"},
  familyAvatarText:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
  familyCopy:{flex:1,marginLeft:10},
  familyName:{color:"#3B3541",fontSize:13,fontWeight:"900"},
  familyMeta:{color:"#918A97",fontSize:10,marginTop:3},
  join:{paddingHorizontal:12,paddingVertical:8,borderRadius:12,backgroundColor:"#EEE9FF"},
  joinText:{color:"#6549D5",fontSize:10,fontWeight:"900"},
  coupleGrid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  coupleCard:{width:"48.5%",minHeight:110,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:13},
  coupleIcon:{fontSize:25},
  coupleValue:{color:"#332E3A",fontSize:15,fontWeight:"900",marginTop:9},
  coupleLabel:{color:"#817A8B",fontSize:11,marginTop:3},
  primary:{minHeight:54,borderRadius:17,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  primaryText:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  secondary:{minHeight:50,borderRadius:16,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  secondaryText:{color:"#6E6675",fontSize:12,fontWeight:"900"},
  search:{minHeight:54,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",paddingHorizontal:13,flexDirection:"row",alignItems:"center"},
  searchIcon:{color:"#817A8B",fontSize:19,marginRight:8},
  searchInput:{flex:1,color:"#39333F",fontSize:13},
  peopleList:{gap:8},
  personRow:{minHeight:70,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:10,flexDirection:"row",alignItems:"center"},
  personAvatar:{width:46,height:46,borderRadius:23,backgroundColor:"#B34670",alignItems:"center",justifyContent:"center"},
  personAvatarText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
});
