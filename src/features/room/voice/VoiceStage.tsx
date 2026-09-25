import { StyleSheet, Text, View } from "react-native";
import { SeatGrid } from "@/features/room/seats/SeatGrid";

type Props={seatCount:number};

export function VoiceStage({seatCount}:Props){
  return(
    <View>
      <View style={styles.specialRow}>
        <View style={styles.chest}><Text style={styles.chestIcon}>🎁</Text><View><Text style={styles.chestTitle}>Lucky Chest</Text><Text style={styles.chestTime}>00:42</Text></View></View>
        <View style={styles.stat}><Text style={styles.statText}>🏆 11.5K</Text><Text style={styles.statText}>👥 1.8K</Text></View>
      </View>

      <View style={styles.hostStage}>
        <View style={styles.stageGlow}/>
        <Text style={styles.eyebrow}>ROYAL HOST</Text>
        <View style={styles.hostFrame}>
          <View style={styles.hostAvatar}><Text style={styles.hostInitial}>N</Text></View>
          <View style={styles.crown}><Text style={styles.crownText}>♛</Text></View>
        </View>
        <Text style={styles.hostName}>Neha</Text>
        <Text style={styles.hostMeta}>HOST • VIP 6 • LV.58</Text>
        <View style={styles.wave}><Text style={styles.waveText}>▂▅▇▃▆▂▅▇▃</Text></View>
      </View>

      <SeatGrid seatCount={seatCount}/>
    </View>
  );
}

const styles=StyleSheet.create({
  specialRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:10},
  chest:{flexDirection:"row",alignItems:"center",gap:7,paddingHorizontal:9,paddingVertical:7,borderRadius:14,backgroundColor:"rgba(232,60,185,.12)",borderWidth:1,borderColor:"rgba(232,60,185,.25)"},
  chestIcon:{fontSize:17},
  chestTitle:{color:"#FFFFFF",fontSize:7.5,fontWeight:"900"},
  chestTime:{color:"#D58FC7",fontSize:6,marginTop:1},
  stat:{flexDirection:"row",gap:9},
  statText:{color:"#B5B8C6",fontSize:7,fontWeight:"800"},
  hostStage:{minHeight:166,borderRadius:24,backgroundColor:"#171126",borderWidth:1,borderColor:"rgba(255,255,255,.07)",alignItems:"center",justifyContent:"center",marginTop:10,overflow:"hidden"},
  stageGlow:{position:"absolute",width:210,height:210,borderRadius:105,backgroundColor:"rgba(116,67,255,.18)"},
  eyebrow:{color:"#B789FF",fontSize:6.5,fontWeight:"900",letterSpacing:1.4,marginBottom:7},
  hostFrame:{width:82,height:82,borderRadius:41,borderWidth:2,borderColor:"#FFD56A",alignItems:"center",justifyContent:"center",shadowColor:"#FFD56A",shadowOpacity:.45,shadowRadius:16,elevation:7},
  hostAvatar:{width:70,height:70,borderRadius:35,backgroundColor:"#C54788",alignItems:"center",justifyContent:"center"},
  hostInitial:{color:"#FFFFFF",fontSize:24,fontWeight:"900"},
  crown:{position:"absolute",top:-12,width:28,height:22,borderRadius:11,backgroundColor:"#241B1A",borderWidth:1,borderColor:"#FFD56A",alignItems:"center",justifyContent:"center"},
  crownText:{color:"#FFD56A",fontSize:13},
  hostName:{color:"#FFFFFF",fontSize:13,fontWeight:"900",marginTop:7},
  hostMeta:{color:"#A48FA6",fontSize:6.5,marginTop:2},
  wave:{position:"absolute",right:14,bottom:12},
  waveText:{color:"#E889E0",fontSize:7,letterSpacing:1},
});
