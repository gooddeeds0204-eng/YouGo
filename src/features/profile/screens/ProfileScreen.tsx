import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { useSession } from "@/core/session/SessionProvider";
import { getProfile } from "@/platform/supabase/profiles";
import { getFollowCounts, listProfileVisitors } from "@/platform/supabase/social";
import type { UserProfile } from "@/contracts/user";

export function ProfileScreen(){
  const {user}=useSession();
  const [profile,setProfile]=useState<UserProfile|null>(null);
  const [social,setSocial]=useState({followers:0,following:0,visitors:0});

  useEffect(()=>{
    if(!user?.id)return;
    void getProfile(user.id).then(setProfile).catch(()=>undefined);
    void getFollowCounts(user.id).then(counts=>setSocial(current=>({...current,...counts}))).catch(()=>undefined);
    void listProfileVisitors(50).then(items=>setSocial(current=>({...current,visitors:items.length}))).catch(()=>undefined);
  },[user?.id]);

  const displayName=profile?.displayName||user?.displayName||"Ugo User";
  const avatarUrl=profile?.avatarUrl||user?.avatarUrl||null;
  const username=profile?.username||"ugo_user";
  const level=profile?.level||1;
  const vipLevel=profile?.vipLevel||0;
  const charm=profile?.charm||0;

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <View><Text style={styles.eyebrow}>YOUR UGO</Text><Text style={styles.pageTitle}>Profile</Text></View>
        <Pressable onPress={()=>router.push("/settings")} style={styles.settings}><Text style={styles.settingsText}>⚙</Text></Pressable>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileGlow}/><View style={styles.goldLine}/>
        <View style={styles.avatarHalo}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              {avatarUrl
                ? <Image source={{uri:avatarUrl}} style={styles.avatarImage}/>
                : <Text style={styles.avatarText}>{displayName[0]?.toUpperCase()||"U"}</Text>}
            </View>
          </View>
        </View>

        <View style={styles.profileCopy}>
          <View style={styles.nameRow}><Text numberOfLines={1} style={styles.name}>{displayName}</Text><View style={styles.verified}><Text style={styles.verifiedText}>✓</Text></View></View>
          <Text numberOfLines={1} style={styles.id}>@{username} • ID {user?.id.slice(0,8)||"--------"}</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.level}>LV.{level}</Text>
            <Text style={styles.vip}>♛ VIP {vipLevel}</Text>
          </View>
        </View>

        <Pressable style={styles.edit}><Text style={styles.editText}>Edit</Text></Pressable>
      </View>

      <View style={styles.stats}>
        {[[social.followers.toLocaleString(),"Followers"],[social.following.toLocaleString(),"Following"],[charm.toLocaleString(),"Charm"],[social.visitors.toLocaleString(),"Visitors"]].map(([value,label],index)=>(
          <View key={label} style={[styles.stat,index>0&&styles.statBorder]}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <Pressable onPress={()=>router.push("/store")} style={styles.wallet}>
        <View style={styles.walletIcon}><Text style={styles.walletEmoji}>💎</Text></View>
        <View>
          <Text style={styles.walletLabel}>MY ASSETS</Text>
          <Text style={styles.walletTitle}>Store & Bag</Text>
          <Text style={styles.walletSub}>Frames, vehicles, bubbles and effects</Text>
        </View>
        <View style={styles.walletRight}><Text style={styles.walletBalance}>Open</Text><Text style={styles.walletArrow}>›</Text></View>
      </Pressable>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Shortcuts</Text><View style={styles.goldDot}/></View>
      <View style={styles.shortcutGrid}>
        {[
          ["👑","VIP","/vip"],
          ["🎮","Games","/games"],
          ["🎁","Gifts","/gifts"],
          ["🎉","Events","/activity"],
          ["💬","Moments","/moments"],
          ["🫶","Community","/family-couple"]
        ].map(([icon,label,path])=>(
          <Pressable key={label} onPress={()=>router.push(path as never)} style={styles.shortcut}>
            <View style={styles.shortcutIcon}><Text style={styles.shortcutEmoji}>{icon}</Text></View>
            <Text style={styles.shortcutLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.menu}>
        {[
          ["👀","Profile visitors","/visitors"],
          ["🎙","Host Center","/host-center"],
          ["🛍","Store & Bag","/store"],
          ["🛡","Safety Center","/safety"],
          ["⚙","Settings","/settings"]
        ].map(([icon,label,path],index)=>(
          <Pressable key={label} onPress={()=>router.push(path as never)} style={[styles.menuRow,index>0&&styles.menuBorder]}>
            <View style={styles.menuIconWrap}><Text style={styles.menuIcon}>{icon}</Text></View>
            <Text style={styles.menuText}>{label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:108,gap:16},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  eyebrow:{color:"#A1874F",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  pageTitle:{color:"#1D1924",fontSize:26,fontWeight:"900",marginTop:1},
  settings:{width:44,height:44,borderRadius:15,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  settingsText:{fontSize:18},
  profileCard:{minHeight:132,borderRadius:24,backgroundColor:"#1B1623",borderWidth:1,borderColor:"#34283F",padding:15,flexDirection:"row",alignItems:"center",overflow:"hidden"},
  profileGlow:{position:"absolute",width:180,height:180,borderRadius:90,backgroundColor:"rgba(112,84,232,.22)",right:-75,top:-65},
  goldLine:{position:"absolute",left:0,top:0,bottom:0,width:3,backgroundColor:"#E8B95A"},
  avatarHalo:{width:86,height:86,borderRadius:43,backgroundColor:"rgba(232,185,90,.10)",alignItems:"center",justifyContent:"center"},
  avatarRing:{width:78,height:78,borderRadius:39,borderWidth:2,borderColor:"#E8B95A",alignItems:"center",justifyContent:"center"},
  avatar:{width:68,height:68,borderRadius:34,backgroundColor:"#CF5A8C",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  avatarImage:{width:"100%",height:"100%"},
  avatarText:{color:"#FFFFFF",fontSize:25,fontWeight:"900"},
  profileCopy:{flex:1,marginLeft:13,minWidth:0},
  nameRow:{flexDirection:"row",alignItems:"center"},
  name:{color:"#FFFFFF",fontSize:21,fontWeight:"900",maxWidth:"82%"},
  verified:{width:18,height:18,borderRadius:9,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",marginLeft:6},
  verifiedText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  id:{color:"rgba(255,255,255,.48)",fontSize:10.5,marginTop:3},
  badgeRow:{flexDirection:"row",gap:6,marginTop:8},
  level:{color:"#C4B8FF",fontSize:9.5,fontWeight:"900",paddingHorizontal:8,paddingVertical:5,borderRadius:9,backgroundColor:"rgba(112,84,232,.14)"},
  vip:{color:"#E8B95A",fontSize:9.5,fontWeight:"900",paddingHorizontal:8,paddingVertical:5,borderRadius:9,backgroundColor:"rgba(232,185,90,.10)"},
  edit:{paddingHorizontal:13,paddingVertical:9,borderRadius:13,backgroundColor:"#FFFFFF"},
  editText:{color:"#2A2430",fontSize:11,fontWeight:"900"},
  stats:{flexDirection:"row",backgroundColor:"#FFFFFF",borderRadius:20,borderWidth:1,borderColor:"#EAE7F1",paddingVertical:14},
  stat:{flex:1,alignItems:"center"},
  statBorder:{borderLeftWidth:1,borderLeftColor:"#F0EDF3"},
  statValue:{color:"#2E2935",fontSize:15,fontWeight:"900"},
  statLabel:{color:"#817A87",fontSize:10,marginTop:3},
  wallet:{minHeight:94,borderRadius:21,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:13,flexDirection:"row",alignItems:"center"},
  walletIcon:{width:52,height:52,borderRadius:17,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center"},
  walletEmoji:{fontSize:25},
  walletLabel:{color:"#A1874F",fontSize:8,fontWeight:"900",letterSpacing:1,marginLeft:11},
  walletTitle:{color:"#2C2732",fontSize:14,fontWeight:"900",marginLeft:11,marginTop:2},
  walletSub:{color:"#817A87",fontSize:10,marginLeft:11,marginTop:2},
  walletRight:{marginLeft:"auto",alignItems:"flex-end"},
  walletBalance:{color:"#7054E8",fontSize:12,fontWeight:"900"},
  walletArrow:{color:"#A29BA8",fontSize:22},
  sectionHead:{flexDirection:"row",alignItems:"center"},
  sectionTitle:{color:"#1D1924",fontSize:18,fontWeight:"900"},
  goldDot:{width:7,height:7,borderRadius:4,backgroundColor:"#E8B95A",marginLeft:7},
  shortcutGrid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  shortcut:{width:"31.5%",minHeight:96,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  shortcutIcon:{width:46,height:46,borderRadius:15,backgroundColor:"#F3F0F8",alignItems:"center",justifyContent:"center"},
  shortcutEmoji:{fontSize:22},
  shortcutLabel:{color:"#554F5C",fontSize:11,fontWeight:"800",marginTop:7},
  menu:{borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",overflow:"hidden"},
  menuRow:{minHeight:62,paddingHorizontal:13,flexDirection:"row",alignItems:"center"},
  menuBorder:{borderTopWidth:1,borderTopColor:"#F0EDF3"},
  menuIconWrap:{width:40,height:40,borderRadius:13,backgroundColor:"#F3F0F8",alignItems:"center",justifyContent:"center"},
  menuIcon:{fontSize:18},
  menuText:{flex:1,color:"#433E49",fontSize:13,fontWeight:"800",marginLeft:10},
  menuArrow:{color:"#9B94A0",fontSize:22},
});
