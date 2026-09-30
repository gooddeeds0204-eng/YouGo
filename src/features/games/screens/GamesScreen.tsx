import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { enabledGames } from "@/registries/gameRegistry";

export function GamesScreen(){
  const registered=enabledGames();
  const games=[
    ...registered.map(game=>[game.icon,game.name]),
    ["🎲","Lucky Dice"],
    ["🍽","Eat Ball"],
    ["💰","Greedy"],
    ["🃏","Cards"],
  ];

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>Games</Text>
        <View style={styles.coin}><Text style={styles.coinText}>🪙 18.2K</Text></View>
      </View>

      <View style={styles.featured}>
        <View>
          <Text style={styles.featuredTitle}>Diamond Hunt</Text>
          <Text style={styles.featuredSub}>Play with room friends and earn in-app rewards.</Text>
          <Pressable style={styles.playButton}><Text style={styles.playButtonText}>Play now</Text></Pressable>
        </View>
        <Text style={styles.featuredIcon}>💎</Text>
      </View>

      <Text style={styles.sectionTitle}>All games</Text>
      <View style={styles.grid}>
        {games.map(([icon,name])=>(
          <Pressable key={name} style={styles.card}>
            <View style={styles.gameIcon}><Text style={styles.icon}>{icon}</Text></View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.play}>Play</Text>
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:24,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  backText:{color:"#4D4657",fontSize:30,marginTop:-3},
  title:{color:"#211D2C",fontSize:22,fontWeight:"900",marginLeft:10},
  coin:{marginLeft:"auto",paddingHorizontal:10,paddingVertical:8,borderRadius:14,backgroundColor:"#FFF4D9"},
  coinText:{color:"#9B711A",fontSize:11,fontWeight:"900"},
  featured:{minHeight:160,borderRadius:24,backgroundColor:"#7657F6",padding:18,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  featuredTitle:{color:"#FFFFFF",fontSize:21,fontWeight:"900"},
  featuredSub:{color:"rgba(255,255,255,.72)",fontSize:12,lineHeight:17,maxWidth:235,marginTop:5},
  playButton:{alignSelf:"flex-start",marginTop:13,paddingHorizontal:14,paddingVertical:9,borderRadius:14,backgroundColor:"#FFFFFF"},
  playButtonText:{color:"#6749DB",fontSize:12,fontWeight:"900"},
  featuredIcon:{fontSize:48},
  sectionTitle:{color:"#211D2C",fontSize:18,fontWeight:"900"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  card:{width:"48.5%",minHeight:128,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:12},
  gameIcon:{width:52,height:52,borderRadius:17,backgroundColor:"#F2EFF9",alignItems:"center",justifyContent:"center"},
  icon:{fontSize:27},
  name:{color:"#3B3542",fontSize:14,fontWeight:"900",marginTop:10},
  play:{color:"#7657F6",fontSize:11,fontWeight:"800",marginTop:5},
});
