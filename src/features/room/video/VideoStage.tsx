import { StyleSheet, Text, View } from "react-native";

const tiles=[
  {name:"Neha",tone:"#C74485",badge:"HOST",mic:"🎤"},
  {name:"Arjun",tone:"#427CC9",badge:"VIP 4",mic:"🎤"},
  {name:"Priya",tone:"#7449D6",badge:"LV.33",mic:"🔇"},
  {name:"Ravi",tone:"#D77C38",badge:"LV.28",mic:"🎤"},
];

export function VideoStage(){
  return(
    <View style={styles.wrap}>
      <View style={styles.top}>
        <Text style={styles.title}>Live video</Text>
        <Text style={styles.count}>4 / 8 cameras</Text>
      </View>

      <View style={styles.grid}>
        {tiles.map(tile=>(
          <View key={tile.name} style={[styles.tile,{backgroundColor:tile.tone}]}>
            <Text style={styles.avatar}>{tile.name[0]}</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>{tile.badge}</Text></View>
            <View style={styles.bottom}>
              <Text style={styles.name}>{tile.name}</Text>
              <Text style={styles.mic}>{tile.mic}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.openRow}>
        <View style={styles.open}><Text style={styles.plus}>＋</Text><Text style={styles.openText}>Join camera</Text></View>
        <View style={styles.open}><Text style={styles.plus}>＋</Text><Text style={styles.openText}>Join camera</Text></View>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:16},
  top:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:10},
  title:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
  count:{color:"rgba(255,255,255,.58)",fontSize:11,fontWeight:"700"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  tile:{width:"48.5%",height:168,borderRadius:20,overflow:"hidden",alignItems:"center",justifyContent:"center"},
  avatar:{color:"#FFFFFF",fontSize:48,fontWeight:"800"},
  badge:{position:"absolute",left:10,top:10,paddingHorizontal:8,paddingVertical:5,borderRadius:10,backgroundColor:"rgba(0,0,0,.22)"},
  badgeText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  bottom:{position:"absolute",left:10,right:10,bottom:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  name:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  mic:{fontSize:15},
  openRow:{flexDirection:"row",gap:10,marginTop:10},
  open:{flex:1,minHeight:64,borderRadius:18,borderWidth:1,borderStyle:"dashed",borderColor:"rgba(255,255,255,.22)",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255,255,255,.04)"},
  plus:{color:"#FFFFFF",fontSize:20},
  openText:{color:"rgba(255,255,255,.58)",fontSize:11,marginTop:2},
});
