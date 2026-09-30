import { StyleSheet, Text, View } from "react-native";

const tiles=[
  {name:"Neha",tone:"#7C3159",badge:"HOST",mic:"🎤"},
  {name:"Arjun",tone:"#315D9A",badge:"VIP 4",mic:"🎤"},
  {name:"Priya",tone:"#543A9E",badge:"LV.33",mic:"🔇"},
  {name:"Ravi",tone:"#9A542A",badge:"LV.28",mic:"🎤"},
];

export function VideoStage(){
  return(
    <View style={styles.wrap}>
      <View style={styles.top}>
        <View><Text style={styles.eyebrow}>LIVE VIDEO</Text><Text style={styles.title}>On camera</Text></View>
        <View style={styles.countPill}><Text style={styles.count}>4 / 8</Text></View>
      </View>

      <View style={styles.grid}>
        {tiles.map(tile=>(
          <View key={tile.name} style={[styles.tile,{backgroundColor:tile.tone}]}>
            <View style={styles.glow}/>
            <View style={styles.badge}><Text style={styles.badgeText}>{tile.badge}</Text></View>
            <View style={styles.avatarHalo}><Text style={styles.avatar}>{tile.name[0]}</Text></View>
            <View style={styles.bottom}>
              <View><Text style={styles.name}>{tile.name}</Text><Text style={styles.live}>● live</Text></View>
              <View style={styles.micWrap}><Text style={styles.mic}>{tile.mic}</Text></View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.openRow}>
        {[1,2].map(i=><View key={i} style={styles.open}><View style={styles.plusWrap}><Text style={styles.plus}>＋</Text></View><Text style={styles.openText}>Join camera</Text></View>)}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:18},
  top:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:11},
  eyebrow:{color:"#E8B95A",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#FFFFFF",fontSize:17,fontWeight:"900",marginTop:2},
  countPill:{paddingHorizontal:11,paddingVertical:7,borderRadius:12,backgroundColor:"rgba(255,255,255,.07)",borderWidth:1,borderColor:"rgba(255,255,255,.07)"},
  count:{color:"rgba(255,255,255,.66)",fontSize:11,fontWeight:"800"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  tile:{width:"48.5%",height:174,borderRadius:21,overflow:"hidden",alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"rgba(255,255,255,.10)"},
  glow:{position:"absolute",width:150,height:150,borderRadius:75,backgroundColor:"rgba(255,255,255,.075)",right:-45,top:-45},
  avatarHalo:{width:76,height:76,borderRadius:38,backgroundColor:"rgba(255,255,255,.10)",borderWidth:1,borderColor:"rgba(255,255,255,.16)",alignItems:"center",justifyContent:"center"},
  avatar:{color:"#FFFFFF",fontSize:40,fontWeight:"800"},
  badge:{position:"absolute",left:10,top:10,paddingHorizontal:8,paddingVertical:5,borderRadius:9,backgroundColor:"rgba(20,15,28,.42)",borderWidth:1,borderColor:"rgba(232,185,90,.26)"},
  badgeText:{color:"#F3D58C",fontSize:9,fontWeight:"900"},
  bottom:{position:"absolute",left:11,right:11,bottom:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  name:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  live:{color:"rgba(255,255,255,.58)",fontSize:9,marginTop:2},
  micWrap:{width:32,height:32,borderRadius:12,backgroundColor:"rgba(20,15,28,.35)",alignItems:"center",justifyContent:"center"},
  mic:{fontSize:14},
  openRow:{flexDirection:"row",gap:10,marginTop:10},
  open:{flex:1,minHeight:68,borderRadius:18,borderWidth:1,borderStyle:"dashed",borderColor:"rgba(232,185,90,.28)",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255,255,255,.035)"},
  plusWrap:{width:28,height:28,borderRadius:14,backgroundColor:"rgba(232,185,90,.10)",alignItems:"center",justifyContent:"center"},
  plus:{color:"#E8B95A",fontSize:17},
  openText:{color:"rgba(255,255,255,.54)",fontSize:11,marginTop:5},
});
