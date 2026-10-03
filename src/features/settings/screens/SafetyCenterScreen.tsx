import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { listBlockedUsers, unblockUser } from "@/platform/supabase/moderation";

export function SafetyCenterScreen(){
  const [blocked,setBlocked]=useState<any[]>([]);
  useEffect(()=>{void listBlockedUsers().then(setBlocked).catch(()=>undefined);},[]);

  const unblock=async(id:string)=>{
    const ok=await unblockUser(id).catch(()=>false);
    if(ok)setBlocked(current=>current.filter(item=>item.id!==id));
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.eyebrow}>TRUST & SAFETY</Text><Text style={styles.title}>Safety Center</Text></View>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroIcon}>🛡</Text>
        <View><Text style={styles.heroTitle}>You control your space</Text><Text style={styles.heroSub}>Block, report and manage who can interact with you.</Text></View>
      </View>

      <Text style={styles.sectionTitle}>Quick controls</Text>
      <View style={styles.menu}>
        {[
          ["🔐","Privacy controls","Choose who can message or follow you"],
          ["🚫","Blocked users","Manage people you blocked"],
          ["⚑","Report history","Reports are reviewed by moderation"],
          ["👶","Age & safety","18+ room and content settings"],
        ].map(([icon,title,sub],index)=>(
          <View key={title} style={[styles.row,index>0&&styles.border]}>
            <View style={styles.iconWrap}><Text style={styles.icon}>{icon}</Text></View>
            <View style={styles.copy}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.rowSub}>{sub}</Text></View>
            <Text style={styles.arrow}>›</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Blocked users</Text>
      {blocked.length?(
        <View style={styles.blockedList}>
          {blocked.map(item=>(
            <View key={item.id} style={styles.blockedRow}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{item.display_name?.[0]||"U"}</Text></View>
              <View style={styles.copy}><Text style={styles.blockName}>{item.display_name||"Ugo member"}</Text><Text style={styles.blockUser}>@{item.username||"ugo"}</Text></View>
              <Pressable onPress={()=>unblock(item.id)} style={styles.unblock}><Text style={styles.unblockText}>Unblock</Text></Pressable>
            </View>
          ))}
        </View>
      ):(
        <View style={styles.empty}><Text style={styles.emptyText}>No blocked users.</Text></View>
      )}

      <View style={styles.note}><Text style={styles.noteText}>For urgent safety concerns, leave the room immediately and use Report from the member/profile menu.</Text></View>
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
  hero:{minHeight:110,borderRadius:21,backgroundColor:"#1B1623",padding:16,flexDirection:"row",alignItems:"center"},
  heroIcon:{fontSize:35,marginRight:13},
  heroTitle:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
  heroSub:{color:"rgba(255,255,255,.58)",fontSize:11,lineHeight:16,marginTop:4,maxWidth:280},
  sectionTitle:{color:"#1D1924",fontSize:18,fontWeight:"900"},
  menu:{borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",overflow:"hidden"},
  row:{minHeight:72,paddingHorizontal:12,flexDirection:"row",alignItems:"center"},
  border:{borderTopWidth:1,borderTopColor:"#F0EDF3"},
  iconWrap:{width:44,height:44,borderRadius:14,backgroundColor:"#F3F0F8",alignItems:"center",justifyContent:"center"},
  icon:{fontSize:19},
  copy:{flex:1,marginLeft:10},
  rowTitle:{color:"#413B47",fontSize:13,fontWeight:"900"},
  rowSub:{color:"#8A8390",fontSize:10,marginTop:3},
  arrow:{color:"#9B94A0",fontSize:22},
  blockedList:{gap:8},
  blockedRow:{minHeight:68,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:10,flexDirection:"row",alignItems:"center"},
  avatar:{width:44,height:44,borderRadius:22,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  blockName:{color:"#3B3541",fontSize:12,fontWeight:"900"},
  blockUser:{color:"#918A97",fontSize:10,marginTop:2},
  unblock:{paddingHorizontal:11,paddingVertical:8,borderRadius:12,backgroundColor:"#F0EDF8"},
  unblockText:{color:"#7054E8",fontSize:10,fontWeight:"900"},
  empty:{borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:22,alignItems:"center"},
  emptyText:{color:"#8A8390",fontSize:11},
  note:{borderRadius:17,backgroundColor:"#FFF2F5",padding:13},
  noteText:{color:"#8D6670",fontSize:11,lineHeight:17},
});
