import { StyleSheet, Text, View } from "react-native";

const tiles=[
  {name:"Neha",tone:"#C54788",badge:"HOST",mic:"🎤"},
  {name:"Arjun",tone:"#3976C8",badge:"VIP 4",mic:"🎤"},
  {name:"Priya",tone:"#7648D7",badge:"LV.33",mic:"🔇"},
  {name:"Ravi",tone:"#D0783D",badge:"LV.28",mic:"🎤"},
];

export function VideoStage(){
  return(
    <View style={styles.wrap}>
      <View style={styles.top}><Text style={styles.label}>LIVE VIDEO</Text><Text style={styles.count}>4 / 8 cameras</Text></View>
      <View style={styles.grid}>
        {tiles.map((tile,index)=>(
          <View key={tile.name} style={[styles.tile,{backgroundColor:tile.tone}]}>
            <View style={styles.gradient}/>
            <Text style={styles.avatar}>{tile.name[0]}</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>{tile.badge}</Text></View>
            <View style={styles.tileBottom}><View><Text style={styles.name}>{tile.name}</Text><Text style={styles.meta}>#{index+1} • live</Text></View><Text style={styles.mic}>{tile.mic}</Text></View>
          </View>
        ))}
      </View>
      <View style={styles.openRow}>
        {Array.from({length:4}).map((_,i)=><View key={i} style={styles.open}><Text style={styles.plus}>＋</Text><Text style={styles.openText}>Join</Text></View>)}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:10},
  top:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8},
  label:{color:"#7FCFFF",fontSize:6.5,fontWeight:"900",letterSpacing:1.2},
  count:{color:"#7A8093",fontSize:6.5},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:8},
  tile:{width:"48.8%",height:145,borderRadius:20,overflow:"hidden",alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"rgba(255,255,255,.08)"},
  gradient:{position:"absolute",left:0,right:0,bottom:0,height:58,backgroundColor:"rgba(0,0,0,.28)"},
  avatar:{color:"rgba(255,255,255,.86)",fontSize:42,fontWeight:"900"},
  badge:{position:"absolute",left:8,top:8,paddingHorizontal:7,paddingVertical:4,borderRadius:9,backgroundColor:"rgba(0,0,0,.28)"},
  badgeText:{color:"#FFFFFF",fontSize:5.5,fontWeight:"900"},
  tileBottom:{position:"absolute",left:9,right:9,bottom:8,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  name:{color:"#FFFFFF",fontSize:8,fontWeight:"900"},
  meta:{color:"rgba(255,255,255,.72)",fontSize:5.5,marginTop:2},
  mic:{fontSize:13},
  openRow:{flexDirection:"row",gap:8,marginTop:9},
  open:{flex:1,minHeight:48,borderRadius:15,borderWidth:1,borderStyle:"dashed",borderColor:"rgba(255,255,255,.12)",alignItems:"center",justifyContent:"center"},
  plus:{color:"#798094",fontSize:16},
  openText:{color:"#686E82",fontSize:5.5,marginTop:1},
});
