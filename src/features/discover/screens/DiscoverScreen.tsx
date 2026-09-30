import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const rooms=[
  ["Music Adda","Singing • Requests","1.8K","#7657F6"],
  ["Telugu Talks","Telugu • Fun","1.5K","#F6549C"],
  ["Random Vibes","Friends • Chat","1.2K","#43B9DB"],
  ["Game Night","Ludo • Cards","980","#49BE98"],
];

export function DiscoverScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Pressable style={styles.filter}><Text style={styles.filterText}>☷</Text></Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput placeholder="Search rooms or people" placeholderTextColor="#9C95A3" style={styles.search}/>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {["All","Voice","Video","Games"].map((item,index)=>(
          <Pressable key={item} style={[styles.tab,index===0&&styles.tabActive]}>
            <Text style={[styles.tabText,index===0&&styles.tabTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Trending rooms</Text><Text style={styles.see}>See all</Text></View>

      <View style={styles.roomList}>
        {rooms.map(([name,meta,count,tone])=>(
          <Pressable key={name} onPress={()=>router.push("/room/discover")} style={styles.room}>
            <View style={[styles.cover,{backgroundColor:tone}]}><Text style={styles.coverIcon}>🎙</Text></View>
            <View style={styles.copy}>
              <Text style={styles.roomName}>{name}</Text>
              <Text style={styles.roomMeta}>{meta}</Text>
              <Text style={styles.online}>👥 {count} online</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Browse</Text>
      <View style={styles.grid}>
        {[
          ["🎵","Music"],["🎮","Games"],["💬","Talk"],["💞","Meet people"],
          ["🫶","Family"],["🏆","Ranking"]
        ].map(([icon,label])=>(
          <Pressable key={label} style={styles.category}>
            <Text style={styles.categoryIcon}>{icon}</Text>
            <Text style={styles.categoryText}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:104,gap:18},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  title:{color:"#211D2C",fontSize:26,fontWeight:"900"},
  filter:{width:44,height:44,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  filterText:{color:"#5C5662",fontSize:18},
  searchWrap:{minHeight:54,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",flexDirection:"row",alignItems:"center",paddingHorizontal:14},
  searchIcon:{color:"#817A8B",fontSize:20,marginRight:8},
  search:{flex:1,color:"#2B2631",fontSize:14},
  tabs:{gap:9,paddingRight:8},
  tab:{minHeight:42,paddingHorizontal:18,borderRadius:21,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#7657F6",borderColor:"#7657F6"},
  tabText:{color:"#817A8B",fontSize:13,fontWeight:"800"},
  tabTextActive:{color:"#FFFFFF"},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#211D2C",fontSize:18,fontWeight:"900"},
  see:{color:"#7657F6",fontSize:12,fontWeight:"800"},
  roomList:{gap:10},
  room:{minHeight:92,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:10,flexDirection:"row",alignItems:"center"},
  cover:{width:68,height:68,borderRadius:18,alignItems:"center",justifyContent:"center"},
  coverIcon:{fontSize:28},
  copy:{flex:1,marginLeft:12},
  roomName:{color:"#2C2732",fontSize:15,fontWeight:"900"},
  roomMeta:{color:"#817A8B",fontSize:12,marginTop:4},
  online:{color:"#6F6878",fontSize:11,fontWeight:"700",marginTop:5},
  arrow:{color:"#9A94A0",fontSize:26},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  category:{width:"31.5%",minHeight:92,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  categoryIcon:{fontSize:27},
  categoryText:{color:"#554F5D",fontSize:12,fontWeight:"800",marginTop:7},
});
