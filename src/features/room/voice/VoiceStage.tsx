import { StyleSheet, Text, View } from "react-native";
import { SeatGrid } from "@/features/room/seats/SeatGrid";

type Props={seatCount:number};

export function VoiceStage({seatCount}:Props){
  return(
    <View style={styles.wrap}>
      <View style={styles.partyStrip}>
        <View style={styles.partyInfo}><Text style={styles.partyEmoji}>🎁</Text><View><Text style={styles.partyTitle}>Lucky bag</Text><Text style={styles.partySub}>Open in 00:42</Text></View></View>
        <View style={styles.partyInfo}><Text style={styles.partyEmoji}>🎵</Text><View><Text style={styles.partyTitle}>Now playing</Text><Text style={styles.partySub}>Midnight Vibes</Text></View></View>
        <View style={styles.partyInfo}><Text style={styles.partyEmoji}>🏆</Text><View><Text style={styles.partyTitle}>11.5K</Text><Text style={styles.partySub}>Room charm</Text></View></View>
      </View>

      <View style={styles.seatPanel}>
        <View style={styles.panelTop}>
          <Text style={styles.panelTitle}>Mic seats</Text>
          <View style={styles.speaking}><Text style={styles.speakingText}>● Neha speaking</Text></View>
        </View>
        <SeatGrid seatCount={seatCount}/>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:12},
  partyStrip:{flexDirection:"row",gap:7},
  partyInfo:{flex:1,minHeight:52,borderRadius:16,backgroundColor:"rgba(255,255,255,.10)",paddingHorizontal:8,flexDirection:"row",alignItems:"center"},
  partyEmoji:{fontSize:17,marginRight:6},
  partyTitle:{color:"#FFFFFF",fontSize:8,fontWeight:"900"},
  partySub:{color:"rgba(255,255,255,.56)",fontSize:6.5,marginTop:2},
  seatPanel:{marginTop:10,borderRadius:26,backgroundColor:"rgba(28,18,52,.52)",borderWidth:1,borderColor:"rgba(255,255,255,.08)",padding:14},
  panelTop:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  panelTitle:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  speaking:{paddingHorizontal:9,paddingVertical:6,borderRadius:12,backgroundColor:"rgba(80,221,172,.14)"},
  speakingText:{color:"#74E7BF",fontSize:7,fontWeight:"900"},
});
