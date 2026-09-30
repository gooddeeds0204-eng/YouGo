import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const rooms=[
  ["🎵","Music Adda","1.8K","#8B5CFF"],
  ["🔥","Telugu Talks","1.5K","#FF6A9F"],
  ["🎙","Random Vibes","1.2K","#49BFEA"],
  ["🎮","Game Night","980","#48CBA4"],
];

export function DiscoverScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <View><Text style={styles.kicker}>EXPLORE UGO</Text><Text style={styles.title}>Discover</Text></View>
        <Pressable style={styles.iconBtn}><Text style={styles.iconText}>⚙</Text></Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput placeholder="Search rooms, people, games..." placeholderTextColor="#A39BAF" style={styles.search}/>
        <View style={styles.filter}><Text style={styles.filterText}>☷</Text></View>
      </View>

      <Pressable style={styles.banner} onPress={()=>router.push("/room/chill")}>
        <View style={styles.bannerOrbA}/><View style={styles.bannerOrbB}/>
        <Text style={styles.bannerEmoji}>🎉</Text>
        <View style={styles.bannerCopy}>
          <Text style={styles.bannerKicker}>PARTY PICK</Text>
          <Text style={styles.bannerTitle}>Meet people who match your vibe</Text>
          <Text style={styles.bannerSub}>Live rooms picked from your interests.</Text>
        </View>
        <Text style={styles.bannerArrow}>›</Text>
      </Pressable>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {["All","Voice","Video","Games","Music","Telugu","Nearby"].map((item,index)=>(
          <Pressable key={item} style={[styles.chip,index===0&&styles.chipActive]}><Text style={[styles.chipText,index===0&&styles.chipTextActive]}>{item}</Text></Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Trending rooms</Text><Text style={styles.see}>See all</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trending}>
        {rooms.map(([icon,name,count,tone])=>(
          <Pressable key={name} onPress={()=>router.push("/room/discover")} style={[styles.trendingCard,{backgroundColor:tone}]}>
            <View style={styles.trendingOrb}/>
            <Text style={styles.trendingIcon}>{icon}</Text>
            <View><Text style={styles.trendingName}>{name}</Text><Text style={styles.trendingMeta}>👥 {count} live</Text></View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Explore by mood</Text></View>
      <View style={styles.grid}>
        {[
          ["🎙","Talk now","#EEE9FF"],["🎥","Video party","#E8F7FF"],["🎮","Games","#E9FFF6"],
          ["🎵","Music","#FFF0F6"],["💞","Meet people","#FFF3EB"],["🫶","Families","#F4F1FF"],
          ["🏆","Rankings","#FFF7DF"],["🌙","Late night","#ECEBFF"]
        ].map(([icon,label,tone])=>(
          <Pressable key={label} style={[styles.category,{backgroundColor:tone}]}>
            <View style={styles.categoryIcon}><Text style={styles.categoryEmoji}>{icon}</Text></View>
            <Text style={styles.categoryLabel}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>People you may like</Text><Text style={styles.see}>More</Text></View>
      <View style={styles.people}>
        {[
          ["Neha","Music • Telugu","#FF6AA9"],
          ["Arjun","Gaming • Friends","#5E9BFF"],
          ["Priya","Karaoke • Movies","#986BFF"],
        ].map(([name,meta,tone])=>(
          <View key={name} style={styles.personCard}>
            <View style={[styles.avatar,{backgroundColor:tone}]}><Text style={styles.avatarText}>{name[0]}</Text></View>
            <View style={styles.personCopy}><Text style={styles.personName}>{name}</Text><Text style={styles.personMeta}>{meta}</Text></View>
            <Pressable style={styles.follow}><Text style={styles.followText}>＋ Follow</Text></Pressable>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:102,gap:15},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  kicker:{color:"#8B5CFF",fontSize:8,fontWeight:"900",letterSpacing:1.2},
  title:{color:"#2A233B",fontSize:28,fontWeight:"900",marginTop:2},
  iconBtn:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  iconText:{fontSize:16},
  searchWrap:{minHeight:52,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",flexDirection:"row",alignItems:"center",paddingHorizontal:13},
  searchIcon:{color:"#81798F",fontSize:20,marginRight:8},
  search:{flex:1,color:"#2C263A",fontSize:11},
  filter:{width:34,height:34,borderRadius:12,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center"},
  filterText:{color:"#6F50EE",fontSize:15,fontWeight:"900"},
  banner:{minHeight:126,borderRadius:26,backgroundColor:"#FF66A2",padding:17,overflow:"hidden",flexDirection:"row",alignItems:"center"},
  bannerOrbA:{position:"absolute",width:150,height:150,borderRadius:75,backgroundColor:"rgba(255,255,255,.14)",right:-35,top:-55},
  bannerOrbB:{position:"absolute",width:100,height:100,borderRadius:50,backgroundColor:"rgba(122,92,255,.25)",left:-30,bottom:-40},
  bannerEmoji:{fontSize:42},
  bannerCopy:{flex:1,marginLeft:12},
  bannerKicker:{color:"rgba(255,255,255,.76)",fontSize:7,fontWeight:"900",letterSpacing:1},
  bannerTitle:{color:"#FFFFFF",fontSize:17,lineHeight:21,fontWeight:"900",marginTop:4,maxWidth:250},
  bannerSub:{color:"rgba(255,255,255,.78)",fontSize:8,marginTop:4},
  bannerArrow:{color:"#FFFFFF",fontSize:26},
  chips:{gap:7,paddingRight:8},
  chip:{paddingHorizontal:13,paddingVertical:9,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4"},
  chipActive:{backgroundColor:"#7A5CFF",borderColor:"#7A5CFF"},
  chipText:{color:"#888093",fontSize:8.5,fontWeight:"800"},
  chipTextActive:{color:"#FFFFFF"},
  sectionHead:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  sectionTitle:{color:"#2D263D",fontSize:16,fontWeight:"900"},
  see:{color:"#7A5CFF",fontSize:9,fontWeight:"800"},
  trending:{gap:10,paddingRight:8},
  trendingCard:{width:138,minHeight:122,borderRadius:22,padding:13,justifyContent:"space-between",overflow:"hidden"},
  trendingOrb:{position:"absolute",width:100,height:100,borderRadius:50,backgroundColor:"rgba(255,255,255,.12)",right:-25,top:-30},
  trendingIcon:{fontSize:30},
  trendingName:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  trendingMeta:{color:"rgba(255,255,255,.74)",fontSize:7,marginTop:3},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:9},
  category:{width:"23.3%",minHeight:86,borderRadius:19,alignItems:"center",justifyContent:"center"},
  categoryIcon:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  categoryEmoji:{fontSize:20},
  categoryLabel:{color:"#5D556B",fontSize:7,fontWeight:"800",marginTop:6,textAlign:"center"},
  people:{gap:8},
  personCard:{minHeight:68,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",padding:10,flexDirection:"row",alignItems:"center"},
  avatar:{width:46,height:46,borderRadius:23,alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  personCopy:{flex:1,marginLeft:10},
  personName:{color:"#342D43",fontSize:11,fontWeight:"900"},
  personMeta:{color:"#948C9F",fontSize:7.5,marginTop:3},
  follow:{paddingHorizontal:11,paddingVertical:8,borderRadius:13,backgroundColor:"#EEE9FF"},
  followText:{color:"#6D4DF2",fontSize:7.5,fontWeight:"900"},
});
