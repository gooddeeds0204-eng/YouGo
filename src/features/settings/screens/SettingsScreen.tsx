import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { useSession } from "@/core/session/SessionProvider";

const sections=[
  ["ACCOUNT",[["👤","Account & profile"],["🔐","Privacy"],["🔔","Notifications"]]],
  ["SAFETY",[["🛡","Safety center"],["🚫","Blocked users"],["⚑","Reports & moderation"]]],
  ["APP",[["🌐","Language"],["🎨","Appearance"],["❓","Help & support"]]],
];

export function SettingsScreen(){
  const {user,signOut}=useSession();
  const logout=async()=>{await signOut();router.replace("/login");};

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.account}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{(user?.displayName||"U")[0]}</Text></View>
        <View style={styles.accountCopy}><Text style={styles.name}>{user?.displayName||"Ugo User"}</Text><Text style={styles.id}>{user?.id?"ID "+user.id.slice(0,8):"Preview account"}</Text></View>
        <Text style={styles.arrow}>›</Text>
      </View>

      {sections.map(([heading,items])=><View key={heading as string} style={styles.section}>
        <Text style={styles.heading}>{heading}</Text>
        <View style={styles.card}>{(items as string[][]).map(([icon,label],index)=><Pressable key={label} style={[styles.row,index>0&&styles.border]}><View style={styles.iconWrap}><Text style={styles.icon}>{icon}</Text></View><Text style={styles.label}>{label}</Text><Text style={styles.arrow}>›</Text></Pressable>)}</View>
      </View>)}

      <View style={styles.safetyNote}><Text style={styles.safetyIcon}>🛡</Text><View><Text style={styles.safetyTitle}>Your safety matters</Text><Text style={styles.safetyText}>Control who can contact you, report behavior and manage blocks from one place.</Text></View></View>

      <Pressable onPress={logout} style={styles.logout}><Text style={styles.logoutText}>Log out</Text></Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:14},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  backText:{color:"#554D65",fontSize:29,marginTop:-3},
  title:{color:"#2B243D",fontSize:21,fontWeight:"900"},
  spacer:{width:40},
  account:{minHeight:82,borderRadius:21,backgroundColor:"#7A5CFF",padding:12,flexDirection:"row",alignItems:"center",overflow:"hidden"},
  avatar:{width:54,height:54,borderRadius:27,backgroundColor:"#FF6AA9",borderWidth:3,borderColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:17,fontWeight:"900"},
  accountCopy:{flex:1,marginLeft:11},
  name:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
  id:{color:"rgba(255,255,255,.68)",fontSize:7,marginTop:3},
  arrow:{color:"#A39BAD",fontSize:20},
  section:{gap:7},
  heading:{color:"#8D859A",fontSize:7,fontWeight:"900",letterSpacing:1.1,marginLeft:2},
  card:{borderRadius:20,backgroundColor:"#FFFFFF",overflow:"hidden",borderWidth:1,borderColor:"#EEEAF4"},
  row:{minHeight:60,flexDirection:"row",alignItems:"center",paddingHorizontal:12},
  border:{borderTopWidth:1,borderTopColor:"#F0EDF4"},
  iconWrap:{width:40,height:40,borderRadius:13,backgroundColor:"#F2EDFF",alignItems:"center",justifyContent:"center"},
  icon:{fontSize:18},
  label:{flex:1,color:"#433B52",fontSize:9.5,fontWeight:"800",marginLeft:10},
  safetyNote:{borderRadius:20,backgroundColor:"#EAF8F4",padding:13,flexDirection:"row",gap:10},
  safetyIcon:{fontSize:20},
  safetyTitle:{color:"#416A5D",fontSize:9,fontWeight:"900"},
  safetyText:{color:"#6D8A82",fontSize:6.8,lineHeight:10,marginTop:3,maxWidth:290},
  logout:{minHeight:54,borderRadius:18,borderWidth:1,borderColor:"#FFD7DF",backgroundColor:"#FFF3F6",alignItems:"center",justifyContent:"center"},
  logoutText:{color:"#FF657E",fontSize:10,fontWeight:"900"},
});
