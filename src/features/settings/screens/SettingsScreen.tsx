import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { useSession } from "@/core/session/SessionProvider";

const rows=[
  ["👤","Account & profile","/profile"],
  ["🔐","Privacy","/safety"],
  ["🔔","Notifications","/notifications"],
  ["🛡","Safety center","/safety"],
  ["🚫","Blocked users","/safety"],
  ["🌐","Language","/language"],
  ["❓","Help & support","/safety"],
];

export function SettingsScreen(){
  const {user,signOut}=useSession();

  const logout=async()=>{
    await signOut();
    router.replace("/login");
  };

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

      <View style={styles.menu}>
        {rows.map(([icon,label,path],index)=>(
          <Pressable key={label} onPress={()=>router.push(path as never)} style={[styles.row,index>0&&styles.border]}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.safety}><Text style={styles.safetyIcon}>🛡</Text><Text style={styles.safetyText}>Control who can contact you and report unwanted behavior from the Safety Center.</Text></View>

      <Pressable onPress={logout} style={styles.logout}><Text style={styles.logoutText}>Log out</Text></Pressable>
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
  account:{minHeight:82,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:12,flexDirection:"row",alignItems:"center"},
  avatar:{width:54,height:54,borderRadius:27,backgroundColor:"#F768A7",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:17,fontWeight:"900"},
  accountCopy:{flex:1,marginLeft:11},
  name:{color:"#332E3A",fontSize:15,fontWeight:"900"},
  id:{color:"#817A8B",fontSize:11,marginTop:3},
  arrow:{color:"#9A94A0",fontSize:22},
  menu:{borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",overflow:"hidden"},
  row:{minHeight:60,flexDirection:"row",alignItems:"center",paddingHorizontal:14},
  border:{borderTopWidth:1,borderTopColor:"#F0EEF3"},
  icon:{fontSize:20},
  label:{flex:1,color:"#433E49",fontSize:13,fontWeight:"800",marginLeft:11},
  safety:{borderRadius:18,backgroundColor:"#EAF8F4",padding:13,flexDirection:"row",alignItems:"center"},
  safetyIcon:{fontSize:20,marginRight:9},
  safetyText:{flex:1,color:"#64857B",fontSize:11,lineHeight:16},
  logout:{minHeight:54,borderRadius:18,borderWidth:1,borderColor:"#FFD5DD",backgroundColor:"#FFF3F6",alignItems:"center",justifyContent:"center"},
  logoutText:{color:"#E75B72",fontSize:14,fontWeight:"900"},
});
