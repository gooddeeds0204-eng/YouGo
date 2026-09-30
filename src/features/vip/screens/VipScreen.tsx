import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const perks=[
  ["👑","Royal frame"],["🚘","Entry vehicle"],["✨","Entrance effect"],
  ["💬","VIP bubble"],["🎁","Gift perks"],["🏆","VIP badge"]
];

export function VipScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.kicker}>PREMIUM STATUS</Text><Text style={styles.title}>VIP Center</Text></View>
        <Pressable style={styles.help}><Text style={styles.helpText}>?</Text></Pressable>
      </View>

      <View style={styles.hero}>
        <View style={styles.orbA}/><View style={styles.orbB}/>
        <View style={styles.crownWrap}><Text style={styles.crown}>👑</Text></View>
        <Text style={styles.vip}>VIP 3</Text>
        <Text style={styles.heroTitle}>Stand out in every room</Text>
        <Text style={styles.heroSub}>Unlock premium identity, entry effects, frames and room perks.</Text>
        <View style={styles.progressTrack}><View style={styles.progress}/></View>
        <View style={styles.progressRow}><Text style={styles.progressText}>12,450 pts</Text><Text style={styles.progressText}>17,000 to VIP 4</Text></View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.planRow}>
        {[
          ["VIP 1","₹199","Starter","#7A5CFF"],
          ["VIP 3","₹699","Popular","#FF5FA2"],
          ["SVIP","₹1,499","Ultimate","#2C253F"]
        ].map(([name,price,tag,tone],index)=>(
          <View key={name} style={[styles.plan,{backgroundColor:tone}]}>
            <Text style={styles.planTag}>{tag}</Text>
            <Text style={styles.planName}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.month}>/ month</Text>
            <Pressable style={styles.planButton}><Text style={styles.planButtonText}>{index===1?"CURRENT":"VIEW"}</Text></Pressable>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Your VIP privileges</Text></View>
      <View style={styles.grid}>
        {perks.map(([icon,label])=><View key={label} style={styles.perk}><View style={styles.perkIcon}><Text style={styles.perkEmoji}>{icon}</Text></View><Text style={styles.perkText}>{label}</Text></View>)}
      </View>

      <View style={styles.rule}><Text style={styles.ruleIcon}>✨</Text><View style={styles.ruleCopy}><Text style={styles.ruleTitle}>Progress with your Ugo activity</Text><Text style={styles.ruleText}>VIP visuals and benefits follow configured account rules and membership state.</Text></View></View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:15},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  backText:{color:"#554D65",fontSize:29,marginTop:-3},
  kicker:{color:"#8B5CFF",fontSize:7.5,fontWeight:"900",letterSpacing:1.1,marginLeft:10},
  title:{color:"#2B243D",fontSize:21,fontWeight:"900",marginLeft:10},
  help:{marginLeft:"auto",width:38,height:38,borderRadius:14,backgroundColor:"#FFF3D9",alignItems:"center",justifyContent:"center"},
  helpText:{color:"#B17C17",fontSize:14,fontWeight:"900"},
  hero:{minHeight:250,borderRadius:30,backgroundColor:"#7A5CFF",padding:20,alignItems:"center",overflow:"hidden"},
  orbA:{position:"absolute",width:220,height:220,borderRadius:110,backgroundColor:"rgba(255,255,255,.10)",right:-70,top:-90},
  orbB:{position:"absolute",width:170,height:170,borderRadius:85,backgroundColor:"rgba(255,95,162,.28)",left:-60,bottom:-70},
  crownWrap:{width:80,height:80,borderRadius:27,backgroundColor:"rgba(255,255,255,.15)",alignItems:"center",justifyContent:"center"},
  crown:{fontSize:42},
  vip:{color:"#FFD65E",fontSize:11,fontWeight:"900",letterSpacing:1.8,marginTop:9},
  heroTitle:{color:"#FFFFFF",fontSize:23,fontWeight:"900",marginTop:8,textAlign:"center"},
  heroSub:{color:"rgba(255,255,255,.72)",fontSize:9,lineHeight:14,textAlign:"center",marginTop:6,maxWidth:300},
  progressTrack:{width:"100%",height:6,borderRadius:3,backgroundColor:"rgba(255,255,255,.18)",marginTop:18,overflow:"hidden"},
  progress:{width:"72%",height:"100%",backgroundColor:"#FFD65E"},
  progressRow:{width:"100%",flexDirection:"row",justifyContent:"space-between",marginTop:6},
  progressText:{color:"rgba(255,255,255,.66)",fontSize:6.5},
  planRow:{gap:10,paddingRight:8},
  plan:{width:154,minHeight:182,borderRadius:24,padding:15,overflow:"hidden"},
  planTag:{color:"rgba(255,255,255,.72)",fontSize:6.5,fontWeight:"900",letterSpacing:.8},
  planName:{color:"#FFFFFF",fontSize:20,fontWeight:"900",marginTop:10},
  price:{color:"#FFFFFF",fontSize:24,fontWeight:"900",marginTop:12},
  month:{color:"rgba(255,255,255,.65)",fontSize:6.5},
  planButton:{marginTop:"auto",minHeight:36,borderRadius:14,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  planButtonText:{color:"#5C47C7",fontSize:7,fontWeight:"900"},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#2D263D",fontSize:16,fontWeight:"900"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:9},
  perk:{width:"31.8%",minHeight:96,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center",padding:9},
  perkIcon:{width:42,height:42,borderRadius:14,backgroundColor:"#F2EDFF",alignItems:"center",justifyContent:"center"},
  perkEmoji:{fontSize:21},
  perkText:{color:"#554D64",fontSize:7.5,textAlign:"center",fontWeight:"800",marginTop:7},
  rule:{borderRadius:20,backgroundColor:"#FFF0F7",padding:14,flexDirection:"row",gap:10},
  ruleIcon:{fontSize:20},
  ruleCopy:{flex:1},
  ruleTitle:{color:"#5A3F4C",fontSize:9,fontWeight:"900"},
  ruleText:{color:"#8E7580",fontSize:7,lineHeight:11,marginTop:3},
});
