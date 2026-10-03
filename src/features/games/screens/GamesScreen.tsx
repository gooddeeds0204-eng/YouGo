import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { enabledGames } from "@/registries/gameRegistry";

export function GamesScreen(){
  const games=enabledGames();

  const open=(gameId:string)=>{
    router.push({
      pathname:"/game/[sessionId]",
      params:{sessionId:"preview-session",gameKey:gameId},
    });
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>Games</Text>
        <Pressable onPress={()=>router.push("/activity")} style={styles.coin}><Text style={styles.coinText}>🏆 Events</Text></Pressable>
      </View>

      <Pressable onPress={()=>open("diamond-hunt")} style={styles.featured}>
        <View style={styles.featureGlow}/>
        <View>
          <Text style={styles.kicker}>FEATURED GAME</Text>
          <Text style={styles.featuredTitle}>Diamond Hunt</Text>
          <Text style={styles.featuredSub}>Play with room friends and collect in-app points.</Text>
          <View style={styles.playButton}><Text style={styles.playButtonText}>Play now</Text></View>
        </View>
        <Text style={styles.featuredIcon}>💎</Text>
      </Pressable>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Party games</Text><Text style={styles.count}>{games.length} games</Text></View>
      <View style={styles.grid}>
        {games.map(game=>(
          <Pressable key={game.id} onPress={()=>open(game.id)} style={styles.card}>
            <View style={styles.gameIcon}><Text style={styles.icon}>{game.icon}</Text></View>
            <Text style={styles.name}>{game.name}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.play}>Play</Text>
              {game.supportsGamePk?<Text style={styles.pk}>PK</Text>:null}
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={()=>router.push("/create-room")} style={styles.roomCta}>
        <View><Text style={styles.roomTitle}>Play inside a room</Text><Text style={styles.roomSub}>Create a room to keep chat, audience and game state together.</Text></View>
        <Text style={styles.roomArrow}>→</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:24,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center"},
  backText:{color:"#4D4657",fontSize:30,marginTop:-3},
  title:{color:"#211D2C",fontSize:22,fontWeight:"900",marginLeft:10},
  coin:{marginLeft:"auto",paddingHorizontal:10,paddingVertical:8,borderRadius:14,backgroundColor:"#FFF4D9"},
  coinText:{color:"#9B711A",fontSize:11,fontWeight:"900"},
  featured:{minHeight:170,borderRadius:24,backgroundColor:"#1B1623",padding:18,flexDirection:"row",alignItems:"center",justifyContent:"space-between",overflow:"hidden"},
  featureGlow:{position:"absolute",width:190,height:190,borderRadius:95,backgroundColor:"rgba(112,84,232,.26)",right:-65,top:-60},
  kicker:{color:"#E8B95A",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  featuredTitle:{color:"#FFFFFF",fontSize:22,fontWeight:"900",marginTop:4},
  featuredSub:{color:"rgba(255,255,255,.62)",fontSize:12,lineHeight:17,maxWidth:235,marginTop:5},
  playButton:{alignSelf:"flex-start",marginTop:13,paddingHorizontal:14,paddingVertical:9,borderRadius:14,backgroundColor:"#FFFFFF"},
  playButtonText:{color:"#6749DB",fontSize:12,fontWeight:"900"},
  featuredIcon:{fontSize:50},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  sectionTitle:{color:"#211D2C",fontSize:18,fontWeight:"900"},
  count:{color:"#918A97",fontSize:10},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  card:{width:"48.5%",minHeight:136,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:12},
  gameIcon:{width:54,height:54,borderRadius:17,backgroundColor:"#F2EFF9",alignItems:"center",justifyContent:"center"},
  icon:{fontSize:28},
  name:{color:"#3B3542",fontSize:14,fontWeight:"900",marginTop:10},
  metaRow:{flexDirection:"row",alignItems:"center",marginTop:6},
  play:{color:"#7054E8",fontSize:11,fontWeight:"800"},
  pk:{marginLeft:"auto",paddingHorizontal:7,paddingVertical:3,borderRadius:8,backgroundColor:"#FFF4D9",color:"#9B711A",fontSize:8,fontWeight:"900"},
  roomCta:{minHeight:88,borderRadius:20,backgroundColor:"#EEE9FF",padding:14,flexDirection:"row",alignItems:"center"},
  roomTitle:{color:"#44365A",fontSize:14,fontWeight:"900"},
  roomSub:{color:"#786D89",fontSize:10.5,lineHeight:15,maxWidth:290,marginTop:3},
  roomArrow:{marginLeft:"auto",color:"#7054E8",fontSize:22,fontWeight:"900"},
});
