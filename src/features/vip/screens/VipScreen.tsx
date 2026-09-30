import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const perks=[
  ["👑","Royal frame"],
  ["🚘","Entry vehicle"],
  ["✨","Entry effect"],
  ["💬","VIP bubble"],
  ["🎁","Gift perks"],
  ["🏆","VIP badge"],
];

export function VipScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>VIP</Text>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.hero}>
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.level}>VIP 3</Text>
        <Text style={styles.heroTitle}>Premium room identity</Text>
        <Text style={styles.heroSub}>Frames, entry effects, badges and VIP room benefits.</Text>
        <View style={styles.progress}><View style={styles.progressFill}/></View>
        <Text style={styles.progressText}>12,450 / 17,000 points</Text>
      </View>

      <Text style={styles.sectionTitle}>Plans</Text>
      <View style={styles.plans}>
        {[
          ["VIP 1","₹199"],
          ["VIP 3","₹699"],
          ["SVIP","₹1,499"]
        ].map(([name,price],index)=>(
          <View key={name} style={[styles.plan,index===1&&styles.planActive]}>
            <Text style={styles.planName}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.month}>per month</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Benefits</Text>
      <View style={styles.grid}>
        {perks.map(([icon,label])=>(
          <View key={label} style={styles.perk}>
            <Text style={styles.perkIcon}>{icon}</Text>
            <Text style={styles.perkText}>{label}</Text>
          </View>
        ))}
      </View>
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
  hero:{minHeight:220,borderRadius:24,backgroundColor:"#7657F6",padding:18,alignItems:"center"},
  crown:{fontSize:44},
  level:{color:"#F8C957",fontSize:13,fontWeight:"900",marginTop:6},
  heroTitle:{color:"#FFFFFF",fontSize:22,fontWeight:"900",marginTop:7},
  heroSub:{color:"rgba(255,255,255,.72)",fontSize:12,lineHeight:17,textAlign:"center",marginTop:6,maxWidth:300},
  progress:{width:"100%",height:7,borderRadius:4,backgroundColor:"rgba(255,255,255,.18)",marginTop:20,overflow:"hidden"},
  progressFill:{width:"72%",height:"100%",backgroundColor:"#F8C957"},
  progressText:{color:"rgba(255,255,255,.68)",fontSize:11,marginTop:7},
  sectionTitle:{color:"#211D2C",fontSize:18,fontWeight:"900"},
  plans:{flexDirection:"row",gap:8},
  plan:{flex:1,minHeight:112,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:12},
  planActive:{borderColor:"#7657F6",backgroundColor:"#F4F1FF"},
  planName:{color:"#393440",fontSize:14,fontWeight:"900"},
  price:{color:"#211D2C",fontSize:18,fontWeight:"900",marginTop:12},
  month:{color:"#817A8B",fontSize:10,marginTop:3},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  perk:{width:"31.5%",minHeight:92,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center",padding:8},
  perkIcon:{fontSize:24},
  perkText:{color:"#554F5D",fontSize:11,fontWeight:"800",marginTop:7,textAlign:"center"},
});
