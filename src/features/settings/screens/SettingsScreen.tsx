import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const sections=[
  ["ACCOUNT",[["👤","Account & profile"],["🔐","Privacy"],["🔔","Notifications"]]],
  ["SAFETY",[["🛡","Safety center"],["🚫","Blocked users"],["⚑","Reports & moderation"]]],
  ["APP",[["🌐","Language"],["🎨","Appearance"],["❓","Help & support"]]],
];

export function SettingsScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}><Pressable onPress={()=>router.back()}><Text style={styles.back}>‹</Text></Pressable><Text style={styles.title}>Settings</Text><View style={styles.spacer}/></View>

      <View style={styles.account}><View style={styles.avatar}><Text style={styles.avatarText}>N</Text></View><View style={styles.accountCopy}><Text style={styles.name}>Neha</Text><Text style={styles.id}>ID 2345678</Text></View><Text style={styles.arrow}>›</Text></View>

      {sections.map(([heading,items])=><View key={heading as string} style={styles.section}><Text style={styles.heading}>{heading}</Text><View style={styles.card}>{(items as string[][]).map(([icon,label],index)=><Pressable key={label} style={[styles.row,index>0&&styles.border]}><Text style={styles.icon}>{icon}</Text><Text style={styles.label}>{label}</Text><Text style={styles.arrow}>›</Text></Pressable>)}</View></View>)}

      <View style={styles.safetyNote}><Text style={styles.safetyIcon}>🛡</Text><View><Text style={styles.safetyTitle}>Your safety matters</Text><Text style={styles.safetyText}>Control who can contact you, report behavior and manage blocks from one place.</Text></View></View>

      <Pressable style={styles.logout}><Text style={styles.logoutText}>Log out</Text></Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:14},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{color:"#FFFFFF",fontSize:30},
  title:{color:"#FFFFFF",fontSize:20,fontWeight:"900"},
  spacer:{width:24},
  account:{minHeight:78,borderRadius:20,backgroundColor:"#11131E",padding:12,flexDirection:"row",alignItems:"center"},
  avatar:{width:50,height:50,borderRadius:25,backgroundColor:"#C54788",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
  accountCopy:{flex:1,marginLeft:11},
  name:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  id:{color:"#6F7589",fontSize:7,marginTop:3},
  arrow:{color:"#6B7185",fontSize:20},
  section:{gap:7},
  heading:{color:"#666C80",fontSize:6.5,fontWeight:"900",letterSpacing:1.2,marginLeft:2},
  card:{borderRadius:20,backgroundColor:"#11131E",overflow:"hidden"},
  row:{minHeight:56,flexDirection:"row",alignItems:"center",paddingHorizontal:12},
  border:{borderTopWidth:1,borderTopColor:"rgba(255,255,255,.05)"},
  icon:{fontSize:18},
  label:{flex:1,color:"#FFFFFF",fontSize:9,fontWeight:"800",marginLeft:10},
  safetyNote:{borderRadius:20,backgroundColor:"#151A24",padding:13,flexDirection:"row",gap:10},
  safetyIcon:{fontSize:20},
  safetyTitle:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  safetyText:{color:"#72788B",fontSize:6.5,lineHeight:10,marginTop:3,maxWidth:290},
  logout:{minHeight:52,borderRadius:18,borderWidth:1,borderColor:"rgba(255,84,112,.22)",backgroundColor:"rgba(255,84,112,.06)",alignItems:"center",justifyContent:"center"},
  logoutText:{color:"#FF7890",fontSize:10,fontWeight:"900"},
});
