import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors } from "@/shared/theme";

const rooms=[
  ["Music Adda","1.8K","🎵","#312047"],["Telugu Talks","1.5K","🔥","#4A2234"],["Random Vibes","1.2K","🎙","#17324A"],["Game Night","980","🎮","#1E3C33"]
];

export function DiscoverScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <View><Text style={styles.kicker}>EXPLORE UGO</Text><Text style={styles.title}>Discover</Text></View>
        <Pressable style={styles.more}><Text style={styles.moreText}>•••</Text></Pressable>
      </View>

      <View style={styles.searchWrap}><Text style={styles.searchIcon}>⌕</Text><TextInput placeholder="Search rooms, people, families..." placeholderTextColor="#62677A" style={styles.search}/></View>

      <Pressable style={styles.banner}>
        <View style={styles.bannerGlow}/>
        <View>
          <Text style={styles.bannerKicker}>FIND YOUR PEOPLE</Text>
          <Text style={styles.bannerTitle}>Explore rooms, games and more</Text>
          <Text style={styles.bannerSub}>Fresh communities picked for your vibe.</Text>
        </View>
        <Text style={styles.bannerIcon}>✦</Text>
      </Pressable>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {["All","Voice","Video","Games","Music","Telugu","Nearby"].map((item,index)=>(
          <View key={item} style={[styles.filter,index===0&&styles.filterActive]}><Text style={[styles.filterText,index===0&&styles.filterTextActive]}>{item}</Text></View>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Trending now</Text><Text style={styles.see}>See all</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trending}>
        {rooms.map(([name,count,icon,tone])=>(
          <Pressable key={name} onPress={()=>router.push("/room/discover")} style={[styles.trendingCard,{backgroundColor:tone}]}>
            <Text style={styles.trendingIcon}>{icon}</Text>
            <View><Text style={styles.trendingName}>{name}</Text><Text style={styles.trendingMeta}>👥 {count}</Text></View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Categories</Text></View>
      <View style={styles.grid}>
        {[
          ["🎙","Voice rooms","#261A3D"],["🎥","Video","#16334A"],["🎮","Games","#1F3A35"],
          ["🎵","Music","#3D2036"],["🫶","Families","#332A1E"],["💞","Meet people","#351D3A"],
          ["🌐","Global","#17283A"],["📍","Nearby","#2B2338"]
        ].map(([icon,label,tone])=>(
          <Pressable key={label} style={[styles.category,{backgroundColor:tone}]}>
            <Text style={styles.categoryIcon}>{icon}</Text><Text style={styles.categoryLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>People to meet</Text><Text style={styles.see}>More</Text></View>
      <View style={styles.people}>
        {["Neha","Arjun","Priya"].map((name,index)=>(
          <View key={name} style={styles.personCard}>
            <View style={[styles.avatar,{backgroundColor:["#C94788","#3674C7","#7647D7"][index]}]}><Text style={styles.avatarText}>{name[0]}</Text></View>
            <View style={styles.personCopy}><Text style={styles.personName}>{name}</Text><Text style={styles.personMeta}>{index===0?"Music • Telugu":"Gaming • Friends"}</Text></View>
            <Pressable style={styles.follow}><Text style={styles.followText}>Follow</Text></Pressable>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:104,gap:15},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  kicker:{color:"#754EBA",fontSize:7,fontWeight:"900",letterSpacing:1.2},
  title:{color:"#FFFFFF",fontSize:29,fontWeight:"900",marginTop:2},
  more:{width:38,height:38,borderRadius:13,backgroundColor:"#11131E",alignItems:"center",justifyContent:"center"},
  moreText:{color:"#FFFFFF"},
  searchWrap:{minHeight:50,borderRadius:18,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)",flexDirection:"row",alignItems:"center",paddingHorizontal:13},
  searchIcon:{color:"#7C8296",fontSize:19,marginRight:8},
  search:{flex:1,color:"#FFFFFF",fontSize:11},
  banner:{minHeight:114,borderRadius:22,backgroundColor:"#2A1742",padding:16,overflow:"hidden",borderWidth:1,borderColor:"rgba(255,255,255,.07)",justifyContent:"center"},
  bannerGlow:{position:"absolute",width:170,height:170,borderRadius:85,right:-50,top:-50,backgroundColor:"rgba(232,60,185,.18)"},
  bannerKicker:{color:"#E67DCE",fontSize:7,fontWeight:"900",letterSpacing:1},
  bannerTitle:{color:"#FFFFFF",fontSize:17,fontWeight:"900",marginTop:5},
  bannerSub:{color:"#A9A6B9",fontSize:8,marginTop:4},
  bannerIcon:{position:"absolute",right:20,color:"#7A5CF3",fontSize:42},
  filters:{gap:7,paddingRight:8},
  filter:{paddingHorizontal:12,paddingVertical:8,borderRadius:18,backgroundColor:"#11131E"},
  filterActive:{backgroundColor:"#E83CB9"},
  filterText:{color:"#777D91",fontSize:8,fontWeight:"800"},
  filterTextActive:{color:"#FFFFFF"},
  sectionHead:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:2},
  sectionTitle:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  see:{color:"#B17BFF",fontSize:8,fontWeight:"800"},
  trending:{gap:9,paddingRight:8},
  trendingCard:{width:130,minHeight:112,borderRadius:19,padding:12,justifyContent:"space-between",borderWidth:1,borderColor:"rgba(255,255,255,.06)"},
  trendingIcon:{fontSize:30},
  trendingName:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  trendingMeta:{color:"#AFB3C3",fontSize:7,marginTop:3},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:8},
  category:{width:"23.4%",minHeight:78,borderRadius:17,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"rgba(255,255,255,.06)"},
  categoryIcon:{fontSize:22},
  categoryLabel:{color:"#FFFFFF",fontSize:7,fontWeight:"800",marginTop:5,textAlign:"center"},
  people:{gap:8},
  personCard:{minHeight:64,borderRadius:18,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)",padding:10,flexDirection:"row",alignItems:"center"},
  avatar:{width:43,height:43,borderRadius:22,alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontWeight:"900"},
  personCopy:{flex:1,marginLeft:10},
  personName:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  personMeta:{color:"#73798D",fontSize:7,marginTop:3},
  follow:{paddingHorizontal:11,paddingVertical:7,borderRadius:13,backgroundColor:"#241533"},
  followText:{color:"#E29AFF",fontSize:7,fontWeight:"900"},
});
