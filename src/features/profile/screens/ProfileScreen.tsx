import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

export function ProfileScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Profile</Text>
        <Pressable onPress={()=>router.push("/settings")} style={styles.settings}><Text style={styles.settingsText}>⚙</Text></Pressable>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>N</Text></View>
        <View style={styles.profileCopy}>
          <Text style={styles.name}>Neha</Text>
          <Text style={styles.id}>@neha_ugo • ID 2345678</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.level}>LV.24</Text>
            <Text style={styles.vip}>👑 VIP 3</Text>
          </View>
        </View>
        <Pressable style={styles.edit}><Text style={styles.editText}>Edit</Text></Pressable>
      </View>

      <View style={styles.stats}>
        {[["12.5K","Followers"],["3.4K","Following"],["98K","Charm"],["246","Visitors"]].map(([value,label])=>(
          <View key={label} style={styles.stat}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <Pressable onPress={()=>router.push("/wallet")} style={styles.wallet}>
        <View>
          <Text style={styles.walletTitle}>Wallet</Text>
          <Text style={styles.walletSub}>Diamonds, coins and purchases</Text>
        </View>
        <Text style={styles.walletBalance}>💎 3,480</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Shortcuts</Text>
      <View style={styles.shortcutGrid}>
        {[
          ["👑","VIP","/vip"],
          ["🎮","Games","/games"],
          ["🎁","Gifts","/gifts"],
          ["🫶","Family","/family-couple"],
          ["💞","Couple","/family-couple"],
          ["🔔","Notifications","/notifications"]
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
          ["👀","Profile visitors"],
          ["🎯","Missions"],
          ["🛍","Store"],
          ["⚙","Settings"]
        ].map(([icon,label],index)=>(
          <Pressable key={label} onPress={label==="Settings"?()=>router.push("/settings"):undefined} style={[styles.menuRow,index>0&&styles.menuBorder]}>
            <Text style={styles.menuIcon}>{icon}</Text>
            <Text style={styles.menuText}>{label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:104,gap:16},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  pageTitle:{color:"#211D2C",fontSize:26,fontWeight:"900"},
  settings:{width:44,height:44,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  settingsText:{fontSize:19},
  profileCard:{minHeight:112,borderRadius:22,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:14,flexDirection:"row",alignItems:"center"},
  avatar:{width:76,height:76,borderRadius:38,backgroundColor:"#F768A7",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:27,fontWeight:"900"},
  profileCopy:{flex:1,marginLeft:12},
  name:{color:"#2B2632",fontSize:20,fontWeight:"900"},
  id:{color:"#817A8B",fontSize:11,marginTop:3},
  badgeRow:{flexDirection:"row",gap:6,marginTop:8},
  level:{color:"#6749DB",fontSize:10,fontWeight:"900",paddingHorizontal:8,paddingVertical:5,borderRadius:9,backgroundColor:"#EEE9FF"},
  vip:{color:"#8A6716",fontSize:10,fontWeight:"900",paddingHorizontal:8,paddingVertical:5,borderRadius:9,backgroundColor:"#FFF4D9"},
  edit:{paddingHorizontal:13,paddingVertical:9,borderRadius:13,backgroundColor:"#7657F6"},
  editText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  stats:{flexDirection:"row",backgroundColor:"#FFFFFF",borderRadius:20,borderWidth:1,borderColor:"#ECEAF2",paddingVertical:14},
  stat:{flex:1,alignItems:"center"},
  statValue:{color:"#2E2935",fontSize:15,fontWeight:"900"},
  statLabel:{color:"#817A8B",fontSize:10,marginTop:3},
  wallet:{minHeight:82,borderRadius:20,backgroundColor:"#292332",paddingHorizontal:15,flexDirection:"row",alignItems:"center"},
  walletTitle:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  walletSub:{color:"rgba(255,255,255,.60)",fontSize:10,marginTop:3},
  walletBalance:{color:"#FFFFFF",fontSize:13,fontWeight:"900",marginLeft:"auto"},
  arrow:{color:"#FFFFFF",fontSize:24,marginLeft:8},
  sectionTitle:{color:"#211D2C",fontSize:18,fontWeight:"900"},
  shortcutGrid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  shortcut:{width:"31.5%",minHeight:92,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  shortcutIcon:{width:44,height:44,borderRadius:14,backgroundColor:"#F2EFF9",alignItems:"center",justifyContent:"center"},
  shortcutEmoji:{fontSize:22},
  shortcutLabel:{color:"#554F5D",fontSize:11,fontWeight:"800",marginTop:7},
  menu:{borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",overflow:"hidden"},
  menuRow:{minHeight:58,paddingHorizontal:14,flexDirection:"row",alignItems:"center"},
  menuBorder:{borderTopWidth:1,borderTopColor:"#F0EEF3"},
  menuIcon:{fontSize:19},
  menuText:{flex:1,color:"#433E49",fontSize:13,fontWeight:"800",marginLeft:10},
  menuArrow:{color:"#9A94A0",fontSize:22},
});
