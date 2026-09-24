import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { Avatar } from "@/shared/ui/Avatar";
import { colors } from "@/shared/theme";

export function ProfileScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.top}><Text style={styles.menu}>☰</Text><View style={styles.topActions}><Text style={styles.icon}>⌕</Text><Pressable onPress={()=>router.push("/settings")}><Text style={styles.icon}>⚙</Text></Pressable></View></View>

      <View style={styles.hero}>
        <View style={styles.avatarHalo}><Avatar name="Neha" size={104} tone="#C24787" ring="#E83CB9" badge="VIP"/></View>
        <Text style={styles.name}>Neha</Text>
        <Text style={styles.id}>ID: 2345678 • @neha_ugo</Text>
        <View style={styles.badges}><Text style={styles.badge}>LV.24</Text><Text style={styles.badgeVip}>VIP 3</Text><Text style={styles.badge}>♀</Text></View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}><Text style={styles.statValue}>12.5K</Text><Text style={styles.statLabel}>Followers</Text></View>
        <View style={styles.divider}/>
        <View style={styles.stat}><Text style={styles.statValue}>3.4K</Text><Text style={styles.statLabel}>Following</Text></View>
        <View style={styles.divider}/>
        <View style={styles.stat}><Text style={styles.statValue}>98K</Text><Text style={styles.statLabel}>Charm</Text></View>
      </View>

      <Pressable style={styles.edit}><Text style={styles.editText}>Edit Profile</Text></Pressable>

      <View style={styles.quick}>
        {[
          ["💰","Wallet","/wallet"],["👑","VIP","/vip"],["🎒","Bag","/wallet"],["🏆","Ranking","/vip"]
        ].map(([icon,label,path])=><Pressable key={label} onPress={()=>router.push(path as never)} style={styles.quickItem}><View style={styles.quickIcon}><Text>{icon}</Text></View><Text style={styles.quickText}>{label}</Text></Pressable>)}
      </View>

      <View style={styles.segment}><Text style={styles.segmentActive}>Moments</Text><Text style={styles.segmentText}>Likes</Text><Text style={styles.segmentText}>Visitors</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moments}>
        {[
          ["Night vibes","#35214E"],["Galaxy event","#17324A"],["Game win","#223D34"],["Friends","#4A2136"]
        ].map(([title,tone])=><View key={title} style={[styles.moment,{backgroundColor:tone}]}><Text style={styles.momentIcon}>✦</Text><Text style={styles.momentTitle}>{title}</Text></View>)}
      </ScrollView>

      <View style={styles.menuList}>
        {[
          ["💞","Couple Space","/family-couple"],["🫶","My Family","/family-couple"],["🎮","Games Center","/games"],["🎁","Gift Collection","/gifts"],["⚙","Settings","/settings"]
        ].map(([icon,label,path])=><Pressable key={label} onPress={()=>router.push(path as never)} style={styles.menuRow}><Text style={styles.menuIcon}>{icon}</Text><Text style={styles.menuLabel}>{label}</Text><Text style={styles.arrow}>›</Text></Pressable>)}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:104},
  top:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  menu:{color:"#FFFFFF",fontSize:20},
  topActions:{flexDirection:"row",gap:9},
  icon:{width:36,height:36,borderRadius:12,backgroundColor:"#11131E",color:"#FFFFFF",textAlign:"center",paddingTop:9},
  hero:{alignItems:"center",marginTop:10},
  avatarHalo:{width:126,height:126,borderRadius:63,backgroundColor:"rgba(232,60,185,.07)",alignItems:"center",justifyContent:"center"},
  name:{color:"#FFFFFF",fontSize:25,fontWeight:"900",marginTop:10},
  id:{color:"#777D91",fontSize:8,marginTop:4},
  badges:{flexDirection:"row",gap:6,marginTop:9},
  badge:{paddingHorizontal:8,paddingVertical:5,borderRadius:9,backgroundColor:"#151724",color:"#B9BDCB",fontSize:7,fontWeight:"900"},
  badgeVip:{paddingHorizontal:8,paddingVertical:5,borderRadius:9,backgroundColor:"#4B2516",color:"#FFD470",fontSize:7,fontWeight:"900"},
  stats:{flexDirection:"row",alignItems:"center",marginTop:20,paddingVertical:15,borderTopWidth:1,borderBottomWidth:1,borderColor:"rgba(255,255,255,.06)"},
  stat:{flex:1,alignItems:"center"},
  statValue:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  statLabel:{color:"#707689",fontSize:7,marginTop:3},
  divider:{width:1,height:26,backgroundColor:"rgba(255,255,255,.06)"},
  edit:{alignSelf:"center",paddingHorizontal:24,paddingVertical:10,borderRadius:18,backgroundColor:"#151724",marginTop:15},
  editText:{color:"#FFFFFF",fontSize:8,fontWeight:"800"},
  quick:{flexDirection:"row",gap:8,marginTop:18},
  quickItem:{flex:1,minHeight:72,borderRadius:17,backgroundColor:"#11131E",alignItems:"center",justifyContent:"center"},
  quickIcon:{width:34,height:34,borderRadius:12,backgroundColor:"#1B1830",alignItems:"center",justifyContent:"center"},
  quickText:{color:"#FFFFFF",fontSize:7,fontWeight:"800",marginTop:5},
  segment:{flexDirection:"row",gap:22,marginTop:22,borderBottomWidth:1,borderBottomColor:"rgba(255,255,255,.06)"},
  segmentActive:{color:"#FFFFFF",fontSize:9,fontWeight:"900",paddingBottom:8,borderBottomWidth:2,borderBottomColor:colors.primary},
  segmentText:{color:"#696F83",fontSize:9,fontWeight:"800"},
  moments:{gap:9,paddingTop:12,paddingRight:8},
  moment:{width:120,height:90,borderRadius:18,padding:12,justifyContent:"space-between"},
  momentIcon:{color:"#E83CB9",fontSize:22},
  momentTitle:{color:"#FFFFFF",fontSize:8,fontWeight:"900"},
  menuList:{gap:7,marginTop:18},
  menuRow:{minHeight:54,borderRadius:16,backgroundColor:"#10121B",flexDirection:"row",alignItems:"center",paddingHorizontal:12},
  menuIcon:{fontSize:18},
  menuLabel:{flex:1,color:"#FFFFFF",fontSize:9,fontWeight:"800",marginLeft:10},
  arrow:{color:"#6D7286",fontSize:20},
});
