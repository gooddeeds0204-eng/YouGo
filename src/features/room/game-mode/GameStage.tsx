import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { enabledGames } from "@/registries/gameRegistry";

export function GameStage(){
  const games=enabledGames();
  return(
    <View style={styles.wrap}>
      <View style={styles.hero}>
        <View style={styles.glow}/>
        <View><Text style={styles.eyebrow}>GAME MODE</Text><Text style={styles.title}>Room Game Arena</Text><Text style={styles.sub}>Play together without leaving the room.</Text></View>
        <Text style={styles.heroIcon}>🎮</Text>
      </View>
      <View style={styles.players}>
        {["Neha","Arjun","Priya","Ravi"].map((name,index)=><View key={name} style={styles.player}><View style={[styles.avatar,{backgroundColor:["#C54788","#3976C8","#7648D7","#D0783D"][index]}]}><Text style={styles.avatarText}>{name[0]}</Text></View><Text style={styles.playerName}>{name}</Text></View>)}
      </View>
      <View style={styles.grid}>
        {games.map(game=><Pressable key={game.id} onPress={()=>router.push("/games")} style={styles.card}><Text style={styles.icon}>{game.icon}</Text><Text style={styles.name}>{game.name}</Text><Text style={styles.meta}>{game.supportsGamePk?"PK ready":"Room game"}</Text></Pressable>)}
        <Pressable onPress={()=>router.push("/games")} style={styles.card}><Text style={styles.icon}>🎲</Text><Text style={styles.name}>Lucky Dice</Text><Text style={styles.meta}>Quick play</Text></Pressable>
        <Pressable onPress={()=>router.push("/games")} style={styles.card}><Text style={styles.icon}>⚔️</Text><Text style={styles.name}>Game PK</Text><Text style={styles.meta}>Team battle</Text></Pressable>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:10},
  hero:{minHeight:104,borderRadius:22,backgroundColor:"#16263A",borderWidth:1,borderColor:"rgba(43,203,255,.16)",padding:14,justifyContent:"center",overflow:"hidden"},
  glow:{position:"absolute",width:150,height:150,borderRadius:75,right:-40,top:-40,backgroundColor:"rgba(43,203,255,.12)"},
  eyebrow:{color:"#77D8FF",fontSize:6.5,fontWeight:"900",letterSpacing:1.2},
  title:{color:"#FFFFFF",fontSize:17,fontWeight:"900",marginTop:4},
  sub:{color:"#8DA3B9",fontSize:7,marginTop:3},
  heroIcon:{position:"absolute",right:18,fontSize:42},
  players:{flexDirection:"row",justifyContent:"space-around",marginTop:10},
  player:{alignItems:"center"},
  avatar:{width:38,height:38,borderRadius:19,alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  playerName:{color:"#969BAD",fontSize:6,marginTop:3},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:8,marginTop:10},
  card:{width:"48.8%",minHeight:82,borderRadius:18,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)",padding:11},
  icon:{fontSize:23},
  name:{color:"#FFFFFF",fontSize:8.5,fontWeight:"900",marginTop:6},
  meta:{color:"#747A8E",fontSize:6,marginTop:2},
});
