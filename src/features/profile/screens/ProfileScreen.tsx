import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

export function ProfileScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Me</Text>
        <View style={styles.actions}>
          <Pressable style={styles.action}><Text style={styles.actionText}>⌕</Text></Pressable>
          <Pressable onPress={()=>router.push("/settings")} style={styles.action}><Text style={styles.actionText}>⚙</Text></Pressable>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroOrbA}/><View style={styles.heroOrbB}/>
        <View style={styles.avatarRing}><View style={styles.avatar}><Text style={styles.avatarText}>N</Text></View><View style={styles.vipBadge}><Text style={styles.vipText}>VIP 3</Text></View></View>
        <View style={styles.heroCopy}>
          <Text style={styles.name}>Neha</Text>
          <Text style={styles.id}>@neha_ugo • ID 2345678</Text>
          <View style={styles.badges}><Text style={styles.badge}>LV.24</Text><Text style={styles.badgeGold}>👑 VIP</Text><Text style={styles.badge}>♀</Text></View>
        </View>
        <Pressable style={styles.edit}><Text style={styles.editText}>Edit</Text></Pressable>
      </View>

      <View style={styles.stats}>
        {[["12.5K","Followers"],["3.4K","Following"],["98K","Charm"],["246","Visitors"]].map(([v,l])=>(
          <View key={l} style={styles.stat}><Text style={styles.statValue}>{v}</Text><Text style={styles.statLabel}>{l}</Text></View>
        ))}
      </View>

      <View style={styles.walletCard}>
        <View><Text style={styles.walletKicker}>MY ASSETS</Text><Text style={styles.walletTitle}>Wallet & VIP</Text></View>
        <View style={styles.walletValues}><Text style={styles.walletValue}>💎 3,480</Text><Text style={styles.walletValue}>🪙 18.2K</Text></View>
        <Pressable onPress={()=>router.push("/wallet")} style={styles.walletGo}><Text style={styles.walletGoText}>›</Text></Pressable>
      </View>

      <View style={styles.quickRow}>
        {[
          ["🎒","Bag","/wallet"],["👑","VIP","/vip"],["🎮","Games","/games"],["🎁","Gifts","/gifts"],["🏆","Rank","/vip"]
        ].map(([icon,label,path])=><Pressable key={label} onPress={()=>router.push(path as never)} style={styles.quick}><View style={styles.quickIcon}><Text style={styles.quickEmoji}>{icon}</Text></View><Text style={styles.quickText}>{label}</Text></Pressable>)}
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Moments</Text><Text style={styles.see}>See all</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moments}>
        {[
          ["✨","Galaxy night","#8B5CFF"],["🎮","Game win","#4ACAA5"],["🎤","Karaoke","#FF669F"],["💞","Friends","#5E9BFF"]
        ].map(([icon,title,tone])=><View key={title} style={[styles.moment,{backgroundColor:tone}]}><Text style={styles.momentIcon}>{icon}</Text><Text style={styles.momentTitle}>{title}</Text></View>)}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>More</Text></View>
      <View style={styles.menuGrid}>
        {[
          ["💞","Couple Space","/family-couple"],["🫶","My Family","/family-couple"],["👀","Visitors","/notifications"],
          ["🎯","Missions","/games"],["🛍","Store","/wallet"],["⚙","Settings","/settings"]
        ].map(([icon,label,path])=><Pressable key={label} onPress={()=>router.push(path as never)} style={styles.menuItem}><View style={styles.menuIcon}><Text style={styles.menuEmoji}>{icon}</Text></View><Text style={styles.menuLabel}>{label}</Text><Text style={styles.arrow}>›</Text></Pressable>)}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:104,gap:15},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  pageTitle:{color:"#2B243D",fontSize:26,fontWeight:"900"},
  actions:{flexDirection:"row",gap:8},
  action:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#EEEAF4"},
  actionText:{color:"#554D65",fontSize:17},
  hero:{minHeight:150,borderRadius:28,backgroundColor:"#7A5CFF",padding:16,flexDirection:"row",alignItems:"center",overflow:"hidden"},
  heroOrbA:{position:"absolute",width:180,height:180,borderRadius:90,backgroundColor:"rgba(255,255,255,.10)",right:-70,top:-60},
  heroOrbB:{position:"absolute",width:140,height:140,borderRadius:70,backgroundColor:"rgba(255,95,162,.28)",left:-60,bottom:-70},
  avatarRing:{width:92,height:92,borderRadius:46,borderWidth:3,borderColor:"#FFD65E",alignItems:"center",justifyContent:"center"},
  avatar:{width:80,height:80,borderRadius:40,backgroundColor:"#FF6AA9",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:28,fontWeight:"900"},
  vipBadge:{position:"absolute",bottom:-6,paddingHorizontal:8,paddingVertical:4,borderRadius:9,backgroundColor:"#FFD65E",borderWidth:2,borderColor:"#7A5CFF"},
  vipText:{color:"#5A4315",fontSize:6,fontWeight:"900"},
  heroCopy:{flex:1,marginLeft:14},
  name:{color:"#FFFFFF",fontSize:24,fontWeight:"900"},
  id:{color:"rgba(255,255,255,.70)",fontSize:8,marginTop:3},
  badges:{flexDirection:"row",gap:5,marginTop:9},
  badge:{color:"#FFFFFF",fontSize:7,fontWeight:"900",paddingHorizontal:7,paddingVertical:5,borderRadius:9,backgroundColor:"rgba(255,255,255,.14)"},
  badgeGold:{color:"#5E4315",fontSize:7,fontWeight:"900",paddingHorizontal:7,paddingVertical:5,borderRadius:9,backgroundColor:"#FFD65E"},
  edit:{paddingHorizontal:13,paddingVertical:8,borderRadius:13,backgroundColor:"#FFFFFF"},
  editText:{color:"#6A4CEB",fontSize:8,fontWeight:"900"},
  stats:{flexDirection:"row",backgroundColor:"#FFFFFF",borderRadius:22,paddingVertical:14,borderWidth:1,borderColor:"#EEEAF4"},
  stat:{flex:1,alignItems:"center"},
  statValue:{color:"#2E273E",fontSize:14,fontWeight:"900"},
  statLabel:{color:"#958EA0",fontSize:6.5,marginTop:3},
  walletCard:{minHeight:86,borderRadius:22,backgroundColor:"#2C253F",padding:14,flexDirection:"row",alignItems:"center"},
  walletKicker:{color:"#BFB4DD",fontSize:6.5,fontWeight:"900",letterSpacing:1},
  walletTitle:{color:"#FFFFFF",fontSize:14,fontWeight:"900",marginTop:3},
  walletValues:{marginLeft:"auto",gap:4},
  walletValue:{color:"#FFFFFF",fontSize:8,fontWeight:"800"},
  walletGo:{width:34,height:34,borderRadius:12,backgroundColor:"#FF5FA2",alignItems:"center",justifyContent:"center",marginLeft:10},
  walletGoText:{color:"#FFFFFF",fontSize:22,marginTop:-2},
  quickRow:{flexDirection:"row",justifyContent:"space-between"},
  quick:{width:"18.2%",alignItems:"center"},
  quickIcon:{width:50,height:50,borderRadius:17,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#EEEAF4"},
  quickEmoji:{fontSize:22},
  quickText:{color:"#625A70",fontSize:7.5,fontWeight:"800",marginTop:5},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#2D263D",fontSize:16,fontWeight:"900"},
  see:{color:"#7A5CFF",fontSize:9,fontWeight:"800"},
  moments:{gap:9,paddingRight:8},
  moment:{width:128,height:96,borderRadius:20,padding:13,justifyContent:"space-between"},
  momentIcon:{fontSize:25},
  momentTitle:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  menuGrid:{gap:8},
  menuItem:{minHeight:58,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",paddingHorizontal:12,flexDirection:"row",alignItems:"center"},
  menuIcon:{width:38,height:38,borderRadius:13,backgroundColor:"#F4F0FF",alignItems:"center",justifyContent:"center"},
  menuEmoji:{fontSize:18},
  menuLabel:{flex:1,color:"#433B52",fontSize:10,fontWeight:"800",marginLeft:10},
  arrow:{color:"#AAA3B7",fontSize:20},
});
