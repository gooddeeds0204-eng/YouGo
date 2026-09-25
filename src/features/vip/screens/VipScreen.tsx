import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const perks=[
  ["👑","Royal avatar frame"],["🚘","Exclusive vehicle"],["✨","Premium entry effect"],
  ["💬","VIP chat bubble"],["🎁","Gift discounts"],["🏆","VIP badge & ranking"]
];

export function VipScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}><Pressable onPress={()=>router.back()}><Text style={styles.back}>‹</Text></Pressable><Text style={styles.title}>VIP Center</Text><Text style={styles.help}>?</Text></View>

      <View style={styles.hero}>
        <View style={styles.goldGlow}/><View style={styles.pinkGlow}/>
        <Text style={styles.crown}>♛</Text>
        <Text style={styles.vip}>VIP 3</Text>
        <Text style={styles.heroTitle}>Own the room before you speak.</Text>
        <Text style={styles.heroSub}>Premium identity, entrance effects, gifts and status across Ugo.</Text>
        <View style={styles.progressTrack}><View style={styles.progress}/></View>
        <View style={styles.progressRow}><Text style={styles.progressText}>12,450 VIP points</Text><Text style={styles.progressText}>17,000 to VIP 4</Text></View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.planRow}>
        {[
          ["VIP 1","₹199","Starter glow","#5E3A86"],
          ["VIP 3","₹699","Most popular","#B15A2A"],
          ["SVIP","₹1,499","Ultimate status","#7D184D"]
        ].map(([name,price,tag,tone],index)=>(
          <View key={name} style={[styles.plan,{backgroundColor:tone},index===1&&styles.planActive]}>
            <Text style={styles.planTag}>{tag}</Text><Text style={styles.planName}>{name}</Text><Text style={styles.price}>{price}</Text><Text style={styles.month}>/ month</Text>
            <Pressable style={styles.planButton}><Text style={styles.planButtonText}>{index===1?"CURRENT":"UPGRADE"}</Text></Pressable>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>VIP privileges</Text>
      <View style={styles.grid}>
        {perks.map(([icon,label])=><View key={label} style={styles.perk}><View style={styles.perkIcon}><Text style={styles.perkEmoji}>{icon}</Text></View><Text style={styles.perkText}>{label}</Text></View>)}
      </View>

      <View style={styles.rule}>
        <Text style={styles.ruleIcon}>✦</Text>
        <View style={styles.ruleCopy}><Text style={styles.ruleTitle}>VIP protection rule</Text><Text style={styles.ruleText}>Membership status follows configured progression rules. Eligibility changes are handled separately from visual design.</Text></View>
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:16},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{color:"#FFFFFF",fontSize:30},
  title:{color:"#FFFFFF",fontSize:20,fontWeight:"900"},
  help:{width:30,height:30,borderRadius:15,backgroundColor:"#17131E",color:"#FFD77A",textAlign:"center",paddingTop:6,fontWeight:"900"},
  hero:{minHeight:245,borderRadius:30,backgroundColor:"#21141D",borderWidth:1,borderColor:"rgba(255,204,98,.18)",padding:20,alignItems:"center",overflow:"hidden"},
  goldGlow:{position:"absolute",width:230,height:230,borderRadius:115,backgroundColor:"rgba(255,185,70,.15)",top:-90,right:-40},
  pinkGlow:{position:"absolute",width:210,height:210,borderRadius:105,backgroundColor:"rgba(232,60,185,.12)",left:-80,bottom:-90},
  crown:{color:"#FFD76A",fontSize:42},
  vip:{color:"#FFD76A",fontSize:11,fontWeight:"900",letterSpacing:2,marginTop:2},
  heroTitle:{color:"#FFFFFF",fontSize:23,lineHeight:28,fontWeight:"900",textAlign:"center",marginTop:13,maxWidth:300},
  heroSub:{color:"#B09DA5",fontSize:9,lineHeight:14,textAlign:"center",marginTop:7,maxWidth:300},
  progressTrack:{width:"100%",height:5,borderRadius:3,backgroundColor:"rgba(255,255,255,.08)",marginTop:20,overflow:"hidden"},
  progress:{width:"72%",height:"100%",backgroundColor:"#FFD56A"},
  progressRow:{width:"100%",flexDirection:"row",justifyContent:"space-between",marginTop:6},
  progressText:{color:"#8F7E84",fontSize:6.5},
  planRow:{gap:10,paddingRight:8},
  plan:{width:150,minHeight:180,borderRadius:24,padding:15,borderWidth:1,borderColor:"rgba(255,255,255,.08)"},
  planActive:{borderColor:"rgba(255,213,106,.55)"},
  planTag:{color:"rgba(255,255,255,.75)",fontSize:6.5,fontWeight:"900",letterSpacing:.8},
  planName:{color:"#FFFFFF",fontSize:20,fontWeight:"900",marginTop:10},
  price:{color:"#FFFFFF",fontSize:24,fontWeight:"900",marginTop:12},
  month:{color:"rgba(255,255,255,.65)",fontSize:6.5},
  planButton:{marginTop:"auto",minHeight:34,borderRadius:14,backgroundColor:"rgba(0,0,0,.22)",alignItems:"center",justifyContent:"center"},
  planButtonText:{color:"#FFFFFF",fontSize:7,fontWeight:"900"},
  sectionTitle:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:8},
  perk:{width:"31.8%",minHeight:92,borderRadius:18,backgroundColor:"#11131E",alignItems:"center",justifyContent:"center",padding:9},
  perkIcon:{width:40,height:40,borderRadius:14,backgroundColor:"#1D182A",alignItems:"center",justifyContent:"center"},
  perkEmoji:{fontSize:20},
  perkText:{color:"#D4D6DF",fontSize:7,textAlign:"center",fontWeight:"800",marginTop:7},
  rule:{borderRadius:20,backgroundColor:"#15131D",padding:14,flexDirection:"row",gap:10},
  ruleIcon:{color:"#FFD56A",fontSize:20},
  ruleCopy:{flex:1},
  ruleTitle:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  ruleText:{color:"#767B8F",fontSize:7,lineHeight:11,marginTop:3},
});
