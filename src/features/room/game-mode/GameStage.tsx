import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { enabledGames } from "@/registries/gameRegistry";

export function GameStage(){
  const games=enabledGames();
  return(
    <View style={styles.wrap}>
      <View style={styles.hero}>
        <View style={styles.glowA}/><View style={styles.glowB}/>
        <View>
          <Text style={styles.eyebrow}>PLAY WHILE YOU CHAT</Text>
          <Text style={styles.title}>Party Game Arena</Text>
          <Text style={styles.sub}>Pick a game. Your room, chat and people stay together.</Text>
        </View>
        <Text style={styles.heroIcon}>🎮</Text>
      </View>

      <View style={styles.players}>
        {["Neha","Arjun","Priya","Ravi"].map((name,index)=><View key={name} style={styles.player}><View style={[styles.avatar,{backgroundColor:["#FF6AA9","#5E9BFF","#986BFF","#FF9A52"][index]}]}><Text style={styles.avatarText}>{name[0]}</Text></View><Text style={styles.playerName}>{name}</Text></View>)}
        <View style={styles.player}><View style={styles.add}><Text style={styles.addText}>＋</Text></View><Text style={styles.playerName}>Invite</Text></View>
      </View>

      <View style={styles.grid}>
        {games.map((game,index)=><Pressable key={game.id} onPress={()=>router.push("/games")} style={[styles.card,{backgroundColor:["#8B5CFF","#FF5FA2","#36BFEA"][index%3]}]}><Text style={styles.icon}>{game.icon}</Text><Text style={styles.name}>{game.name}</Text><Text style={styles.meta}>{game.supportsGamePk?"PK ready":"Play now"}</Text></Pressable>)}
        <Pressable onPress={()=>router.push("/games")} style={[styles.card,{backgroundColor:"#48CBA4"}]}><Text style={styles.icon}>🎲</Text><Text style={styles.name}>Lucky Dice</Text><Text style={styles.meta}>Quick play</Text></Pressable>
        <Pressable onPress={()=>router.push("/games")} style={[styles.card,{backgroundColor:"#F39547"}]}><Text style={styles.icon}>⚔️</Text><Text style={styles.name}>Game PK</Text><Text style={styles.meta}>Team battle</Text></Pressable>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:12},
  hero:{minHeight:120,borderRadius:24,backgroundColor:"#6F52DB",padding:16,justifyContent:"center",overflow:"hidden"},
  glowA:{position:"absolute",width:150,height:150,borderRadius:75,right:-35,top:-45,backgroundColor:"rgba(255,255,255,.10)"},
  glowB:{position:"absolute",width:110,height:110,borderRadius:55,left:-35,bottom:-45,backgroundColor:"rgba(255,95,162,.25)"},
  eyebrow:{color:"#D9D0FF",fontSize:7,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#FFFFFF",fontSize:19,fontWeight:"900",marginTop:4},
  sub:{color:"rgba(255,255,255,.72)",fontSize:8,lineHeight:12,marginTop:4,maxWidth:250},
  heroIcon:{position:"absolute",right:18,fontSize:48},
  players:{flexDirection:"row",justifyContent:"space-between",marginTop:11,paddingHorizontal:4},
  player:{alignItems:"center"},
  avatar:{width:44,height:44,borderRadius:22,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#FFFFFF"},
  add:{width:44,height:44,borderRadius:22,alignItems:"center",justifyContent:"center",borderWidth:1,borderStyle:"dashed",borderColor:"rgba(255,255,255,.35)"},
  addText:{color:"#FFFFFF",fontSize:19},
  avatarText:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
  playerName:{color:"rgba(255,255,255,.70)",fontSize:6.5,marginTop:4},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:8,marginTop:11},
  card:{width:"48.8%",minHeight:95,borderRadius:20,padding:12,overflow:"hidden"},
  icon:{fontSize:25},
  name:{color:"#FFFFFF",fontSize:10,fontWeight:"900",marginTop:7},
  meta:{color:"rgba(255,255,255,.70)",fontSize:6.5,marginTop:2},
});
