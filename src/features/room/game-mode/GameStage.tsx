import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { enabledGames } from "@/registries/gameRegistry";

export function GameStage(){
  const registered=enabledGames().slice(0,3);
  const games=[
    ...registered.map(game=>[game.icon,game.name]),
    ["🎲","Lucky Dice"],
  ];

  return(
    <View style={styles.wrap}>
      <View style={styles.hero}>
        <View>
          <Text style={styles.title}>Play together</Text>
          <Text style={styles.sub}>Choose a game. Room chat stays open.</Text>
        </View>
        <Text style={styles.heroIcon}>🎮</Text>
      </View>

      <View style={styles.players}>
        {["N","A","P","R"].map((letter,index)=>(
          <View key={letter} style={[styles.player,{backgroundColor:["#F768A7","#5C8EF2","#8B65E8","#E98C4A"][index]}]}>
            <Text style={styles.playerText}>{letter}</Text>
          </View>
        ))}
        <View style={styles.invite}><Text style={styles.inviteText}>＋</Text></View>
      </View>

      <View style={styles.grid}>
        {games.map(([icon,name])=>(
          <Pressable key={name} onPress={()=>router.push("/games")} style={styles.card}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.play}>Play</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:16},
  hero:{minHeight:110,borderRadius:20,backgroundColor:"#7657F6",padding:16,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  title:{color:"#FFFFFF",fontSize:20,fontWeight:"900"},
  sub:{color:"rgba(255,255,255,.72)",fontSize:12,lineHeight:17,marginTop:4,maxWidth:240},
  heroIcon:{fontSize:42},
  players:{flexDirection:"row",gap:9,marginTop:14},
  player:{width:46,height:46,borderRadius:23,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#FFFFFF"},
  playerText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  invite:{width:46,height:46,borderRadius:23,alignItems:"center",justifyContent:"center",borderWidth:1,borderStyle:"dashed",borderColor:"rgba(255,255,255,.35)"},
  inviteText:{color:"#FFFFFF",fontSize:20},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10,marginTop:14},
  card:{width:"48.5%",minHeight:104,borderRadius:18,backgroundColor:"rgba(255,255,255,.08)",padding:13},
  icon:{fontSize:28},
  name:{color:"#FFFFFF",fontSize:14,fontWeight:"900",marginTop:7},
  play:{color:"#BEB2FF",fontSize:11,fontWeight:"800",marginTop:5},
});
