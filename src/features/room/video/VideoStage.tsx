import { StyleSheet, Text, View } from "react-native";

const tiles=[
  {name:"Neha",tone:"#FF6AA9",badge:"HOST",mic:"🎤"},
  {name:"Arjun",tone:"#5E9BFF",badge:"VIP 4",mic:"🎤"},
  {name:"Priya",tone:"#986BFF",badge:"LV.33",mic:"🔇"},
  {name:"Ravi",tone:"#FF9A52",badge:"LV.28",mic:"🎤"},
];

export function VideoStage(){
  return(
    <View style={styles.wrap}>
      <View style={styles.top}><Text style={styles.label}>Video party</Text><View style={styles.live}><Text style={styles.liveText}>● 4 live</Text></View></View>
      <View style={styles.grid}>
        {tiles.map((tile,index)=>(
          <View key={tile.name} style={[styles.tile,{backgroundColor:tile.tone}]}>
            <View style={styles.lightA}/><View style={styles.lightB}/>
            <Text style={styles.avatar}>{tile.name[0]}</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>{tile.badge}</Text></View>
            <View style={styles.tileBottom}>
              <View><Text style={styles.name}>{tile.name}</Text><Text style={styles.meta}>Camera {index+1}</Text></View>
              <View style={styles.micWrap}><Text style={styles.mic}>{tile.mic}</Text></View>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.openRow}>
        {Array.from({length:4}).map((_,i)=><View key={i} style={styles.open}><Text style={styles.plus}>＋</Text><Text style={styles.openText}>Join camera</Text></View>)}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:12},
  top:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:8},
  label:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  live:{paddingHorizontal:9,paddingVertical:5,borderRadius:11,backgroundColor:"rgba(255,95,162,.18)"},
  liveText:{color:"#FF9FCC",fontSize:7,fontWeight:"900"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:8},
  tile:{width:"48.8%",height:158,borderRadius:22,overflow:"hidden",alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"rgba(255,255,255,.12)"},
  lightA:{position:"absolute",width:120,height:120,borderRadius:60,backgroundColor:"rgba(255,255,255,.12)",right:-35,top:-30},
  lightB:{position:"absolute",width:100,height:100,borderRadius:50,backgroundColor:"rgba(0,0,0,.10)",left:-25,bottom:-30},
  avatar:{color:"#FFFFFF",fontSize:48,fontWeight:"900"},
  badge:{position:"absolute",left:9,top:9,paddingHorizontal:8,paddingVertical:5,borderRadius:10,backgroundColor:"rgba(0,0,0,.20)"},
  badgeText:{color:"#FFFFFF",fontSize:6.5,fontWeight:"900"},
  tileBottom:{position:"absolute",left:10,right:10,bottom:9,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  name:{color:"#FFFFFF",fontSize:9.5,fontWeight:"900"},
  meta:{color:"rgba(255,255,255,.70)",fontSize:6.5,marginTop:2},
  micWrap:{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,.20)",alignItems:"center",justifyContent:"center"},
  mic:{fontSize:13},
  openRow:{flexDirection:"row",gap:7,marginTop:9},
  open:{flex:1,minHeight:54,borderRadius:16,borderWidth:1,borderStyle:"dashed",borderColor:"rgba(255,255,255,.20)",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255,255,255,.04)"},
  plus:{color:"#FFFFFF",fontSize:17},
  openText:{color:"rgba(255,255,255,.52)",fontSize:6,marginTop:1},
});
