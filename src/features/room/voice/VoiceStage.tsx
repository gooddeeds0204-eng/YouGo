import { StyleSheet, Text, View } from "react-native";
import { SeatGrid } from "@/features/room/seats/SeatGrid";

type Props={seatCount:number};

export function VoiceStage({seatCount}:Props){
  return(
    <View style={styles.wrap}>
      <View style={styles.host}>
        <View style={styles.hostRing}>
          <View style={styles.hostAvatar}><Text style={styles.hostText}>N</Text></View>
        </View>
        <Text style={styles.hostName}>Neha</Text>
        <Text style={styles.hostRole}>Room host • speaking now</Text>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.status}><Text style={styles.statusDot}>●</Text><Text style={styles.statusText}>Audio connected</Text></View>
        <Text style={styles.statusMeta}>2 online</Text>
      </View>

      <View style={styles.listenButton}>
        <Text style={styles.listenIcon}>🔊</Text>
        <Text style={styles.listenText}>Tap to hear the room</Text>
      </View>

      <Text style={styles.sectionTitle}>Mic seats</Text>
      <SeatGrid seatCount={seatCount}/>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:16},
  host:{alignItems:"center"},
  hostRing:{width:106,height:106,borderRadius:53,borderWidth:4,borderColor:"#F8C957",alignItems:"center",justifyContent:"center"},
  hostAvatar:{width:88,height:88,borderRadius:44,backgroundColor:"#F768A7",alignItems:"center",justifyContent:"center"},
  hostText:{color:"#FFFFFF",fontSize:34,fontWeight:"900"},
  hostName:{color:"#FFFFFF",fontSize:18,fontWeight:"900",marginTop:10},
  hostRole:{color:"rgba(255,255,255,.62)",fontSize:12,marginTop:3},
  statusRow:{minHeight:50,borderRadius:15,backgroundColor:"rgba(255,255,255,.08)",marginTop:16,paddingHorizontal:14,flexDirection:"row",alignItems:"center"},
  status:{flexDirection:"row",alignItems:"center",gap:7},
  statusDot:{color:"#48D6C7",fontSize:14},
  statusText:{color:"#FFFFFF",fontSize:12,fontWeight:"800"},
  statusMeta:{marginLeft:"auto",color:"rgba(255,255,255,.58)",fontSize:11,fontWeight:"700"},
  listenButton:{minHeight:52,borderRadius:16,backgroundColor:"#4FD3CB",marginTop:10,flexDirection:"row",alignItems:"center",justifyContent:"center"},
  listenIcon:{fontSize:17,marginRight:8},
  listenText:{color:"#171321",fontSize:14,fontWeight:"900"},
  sectionTitle:{color:"#FFFFFF",fontSize:15,fontWeight:"900",marginTop:18},
});
