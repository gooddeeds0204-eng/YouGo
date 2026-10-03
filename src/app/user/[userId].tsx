import { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { getProfile } from "@/platform/supabase/profiles";
import {
  followUser,
  getFollowCounts,
  isFollowing,
  recordProfileVisit,
  unfollowUser,
} from "@/platform/supabase/social";
import { getOrCreateConversation } from "@/platform/supabase/messages";
import { blockUser, reportTarget } from "@/platform/supabase/moderation";
import type { UserProfile } from "@/contracts/user";

const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function UserProfileRoute(){
  const {userId=""}=useLocalSearchParams<{userId:string}>();
  const [profile,setProfile]=useState<UserProfile|null>(null);
  const [following,setFollowing]=useState(false);
  const [counts,setCounts]=useState({followers:0,following:0});
  const [busy,setBusy]=useState(false);

  useEffect(()=>{
    if(!UUID_RE.test(userId))return;
    void getProfile(userId).then(setProfile).catch(()=>undefined);
    void isFollowing(userId).then(setFollowing).catch(()=>undefined);
    void getFollowCounts(userId).then(setCounts).catch(()=>undefined);
    void recordProfileVisit(userId).catch(()=>undefined);
  },[userId]);

  const name=profile?.displayName||(
    userId==="priya"?"Priya":
    userId==="arjun"?"Arjun":
    userId==="sneha"?"Sneha":"Ugo member"
  );
  const username=profile?.username||userId||"ugo";
  const level=profile?.level||18;
  const vip=profile?.vipLevel||2;
  const charm=profile?.charm||24500;

  const toggleFollow=async()=>{
    if(busy)return;
    setBusy(true);
    try{
      const ok=following?await unfollowUser(userId):await followUser(userId);
      if(ok){
        setFollowing(!following);
        setCounts(c=>({...c,followers:Math.max(0,c.followers+(following?-1:1))}));
      }else{
        setFollowing(!following);
      }
    }finally{setBusy(false);}
  };

  const message=async()=>{
    const id=await getOrCreateConversation(userId).catch(()=>null);
    router.push({pathname:"/chat/[conversationId]",params:{conversationId:id||userId||"priya"}});
  };

  const report=async()=>{
    const id=await reportTarget({userId:UUID_RE.test(userId)?userId:null,reason:"profile-report",details:"Reported from profile"}).catch(()=>null);
    Alert.alert("Report sent",id?"Our moderation queue received the report.":"Preview report recorded.");
  };

  const block=async()=>{
    const ok=await blockUser(userId).catch(()=>false);
    Alert.alert(ok?"User blocked":"Preview","This user will no longer be able to interact with you in the current safety flow.");
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>Profile</Text>
        <Pressable onPress={report} style={styles.more}><Text style={styles.moreText}>•••</Text></Pressable>
      </View>

      <View style={styles.hero}>
        <View style={styles.glow}/>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            {profile?.avatarUrl?<Image source={{uri:profile.avatarUrl}} style={styles.avatarImage}/>:<Text style={styles.avatarText}>{name[0]}</Text>}
          </View>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.user}>@{username}</Text>
        <View style={styles.badges}><Text style={styles.level}>LV.{level}</Text><Text style={styles.vip}>♛ VIP {vip}</Text></View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}><Text style={styles.statValue}>{counts.followers||"—"}</Text><Text style={styles.statLabel}>Followers</Text></View>
        <View style={styles.stat}><Text style={styles.statValue}>{counts.following||"—"}</Text><Text style={styles.statLabel}>Following</Text></View>
        <View style={styles.stat}><Text style={styles.statValue}>{charm.toLocaleString()}</Text><Text style={styles.statLabel}>Charm</Text></View>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={toggleFollow} style={[styles.follow,following&&styles.following]}><Text style={[styles.followText,following&&styles.followingText]}>{busy?"...":following?"Following":"Follow"}</Text></Pressable>
        <Pressable onPress={message} style={styles.message}><Text style={styles.messageText}>Message</Text></Pressable>
      </View>

      <Text style={styles.sectionTitle}>Social identity</Text>
      <View style={styles.menu}>
        {[
          ["🎁","Gifts received","Gift collection and charm"],
          ["🏆","Achievements","Badges and titles"],
          ["🫶","Family","Community membership"],
          ["💞","Couple","Bond status"],
        ].map(([icon,label,sub],index)=>(
          <View key={label} style={[styles.row,index>0&&styles.border]}>
            <View style={styles.iconWrap}><Text style={styles.icon}>{icon}</Text></View>
            <View style={styles.copy}><Text style={styles.rowTitle}>{label}</Text><Text style={styles.rowSub}>{sub}</Text></View>
            <Text style={styles.arrow}>›</Text>
          </View>
        ))}
      </View>

      <View style={styles.safetyRow}>
        <Pressable onPress={block} style={styles.safetyButton}><Text style={styles.safetyText}>🚫 Block</Text></Pressable>
        <Pressable onPress={report} style={styles.safetyButton}><Text style={styles.safetyText}>⚑ Report</Text></Pressable>
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:30,gap:16},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  backText:{color:"#4B4551",fontSize:30,marginTop:-3},
  title:{color:"#1D1924",fontSize:21,fontWeight:"900"},
  more:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  moreText:{color:"#6A6370",fontSize:13,fontWeight:"900"},
  hero:{minHeight:265,borderRadius:26,backgroundColor:"#1B1623",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  glow:{position:"absolute",width:260,height:260,borderRadius:130,backgroundColor:"rgba(112,84,232,.25)",right:-90,top:-100},
  avatarRing:{width:108,height:108,borderRadius:54,borderWidth:2,borderColor:"#E8B95A",alignItems:"center",justifyContent:"center"},
  avatar:{width:94,height:94,borderRadius:47,backgroundColor:"#CF5A8C",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  avatarImage:{width:"100%",height:"100%"},
  avatarText:{color:"#FFFFFF",fontSize:34,fontWeight:"900"},
  name:{color:"#FFFFFF",fontSize:24,fontWeight:"900",marginTop:12},
  user:{color:"rgba(255,255,255,.50)",fontSize:11,marginTop:3},
  badges:{flexDirection:"row",gap:7,marginTop:10},
  level:{color:"#C4B8FF",fontSize:10,fontWeight:"900",paddingHorizontal:9,paddingVertical:6,borderRadius:10,backgroundColor:"rgba(112,84,232,.14)"},
  vip:{color:"#E8B95A",fontSize:10,fontWeight:"900",paddingHorizontal:9,paddingVertical:6,borderRadius:10,backgroundColor:"rgba(232,185,90,.10)"},
  stats:{flexDirection:"row",borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",paddingVertical:15},
  stat:{flex:1,alignItems:"center"},
  statValue:{color:"#2E2935",fontSize:16,fontWeight:"900"},
  statLabel:{color:"#817A87",fontSize:10,marginTop:3},
  actions:{flexDirection:"row",gap:9},
  follow:{flex:1,minHeight:52,borderRadius:17,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  following:{backgroundColor:"#EEE9FF"},
  followText:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  followingText:{color:"#6549D5"},
  message:{flex:1,minHeight:52,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  messageText:{color:"#433D49",fontSize:13,fontWeight:"900"},
  sectionTitle:{color:"#1D1924",fontSize:18,fontWeight:"900"},
  menu:{borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",overflow:"hidden"},
  row:{minHeight:68,paddingHorizontal:12,flexDirection:"row",alignItems:"center"},
  border:{borderTopWidth:1,borderTopColor:"#F0EDF3"},
  iconWrap:{width:42,height:42,borderRadius:14,backgroundColor:"#F3F0F8",alignItems:"center",justifyContent:"center"},
  icon:{fontSize:19},
  copy:{flex:1,marginLeft:10},
  rowTitle:{color:"#413B47",fontSize:12,fontWeight:"900"},
  rowSub:{color:"#8A8390",fontSize:10,marginTop:2},
  arrow:{color:"#9B94A0",fontSize:22},
  safetyRow:{flexDirection:"row",gap:9},
  safetyButton:{flex:1,minHeight:48,borderRadius:16,backgroundColor:"#FFF3F6",borderWidth:1,borderColor:"#FFDCE4",alignItems:"center",justifyContent:"center"},
  safetyText:{color:"#B45167",fontSize:11,fontWeight:"900"},
});
