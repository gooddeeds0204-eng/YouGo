import { StyleSheet, Text, View } from "react-native";
import { SeatGrid } from "@/features/room/seats/SeatGrid";

type Props={seatCount:number};

export function VoiceStage({seatCount}:Props){
  return(
    <View style={styles.wrap}>
      <View style={styles.host}>
        <View style={styles.hostGlow}>
          <View style={styles.hostOuter}>
            <View style={styles.hostRing}>
              <View style={styles.hostAvatar}><Text style={styles.hostText}>N</Text></View>
            </View>
          </View>
        </View>
        <View style={styles.hostBadge}><Text style={styles.hostBadgeText}>♛ HOST</Text></View>
        <Text style={styles.hostName}>Neha</Text>
        <Text style={styles.hostRole}>Speaking now • Room owner</Text>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.status}>
          <View style={styles.statusDot}/>
          <View>
            <Text style={styles.statusText}>Real audio connected</Text>
            <Text style={styles.statusSub}>Live voice is active</Text>
          </View>
        </View>
        <Text style={styles.statusMeta}>2 online</Text>
      </View>

      <View style={styles.listenButton}>
        <Text style={styles.listenIcon}>🔊</Text>
        <View>
          <Text style={styles.listenText}>Hear the room</Text>
          <Text style={styles.listenSub}>Tap to enable room audio</Text>
        </View>
        <Text style={styles.listenArrow}>→</Text>
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Mic seats</Text>
        <Text style={styles.sectionMeta}>{seatCount} seats</Text>
      </View>
      <SeatGrid seatCount={seatCount}/>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:18},
  host:{alignItems:"center"},
  hostGlow:{width:126,height:126,borderRadius:63,backgroundColor:"rgba(232,185,90,.08)",alignItems:"center",justifyContent:"center"},
  hostOuter:{width:112,height:112,borderRadius:56,backgroundColor:"rgba(112,84,232,.16)",alignItems:"center",justifyContent:"center"},
  hostRing:{width:102,height:102,borderRadius:51,borderWidth:2.5,borderColor:"#E8B95A",alignItems:"center",justifyContent:"center"},
  hostAvatar:{width:88,height:88,borderRadius:44,backgroundColor:"#CF5A8C",alignItems:"center",justifyContent:"center"},
  hostText:{color:"#FFFFFF",fontSize:34,fontWeight:"900"},
  hostBadge:{marginTop:-9,paddingHorizontal:10,paddingVertical:5,borderRadius:10,backgroundColor:"#211A2B",borderWidth:1,borderColor:"rgba(232,185,90,.45)"},
  hostBadgeText:{color:"#E8B95A",fontSize:9,fontWeight:"900",letterSpacing:.5},
  hostName:{color:"#FFFFFF",fontSize:19,fontWeight:"900",marginTop:9},
  hostRole:{color:"rgba(255,255,255,.52)",fontSize:12,marginTop:3},
  statusRow:{minHeight:58,borderRadius:17,backgroundColor:"rgba(255,255,255,.055)",borderWidth:1,borderColor:"rgba(255,255,255,.07)",marginTop:18,paddingHorizontal:14,flexDirection:"row",alignItems:"center"},
  status:{flexDirection:"row",alignItems:"center",gap:9},
  statusDot:{width:10,height:10,borderRadius:5,backgroundColor:"#4CCDA4",shadowColor:"#4CCDA4",shadowOpacity:.45,shadowRadius:7,elevation:3},
  statusText:{color:"#FFFFFF",fontSize:12,fontWeight:"900",textTransform:"uppercase",letterSpacing:.35},
  statusSub:{color:"rgba(255,255,255,.42)",fontSize:10,marginTop:2},
  statusMeta:{marginLeft:"auto",color:"rgba(255,255,255,.52)",fontSize:11,fontWeight:"700"},
  listenButton:{minHeight:64,borderRadius:18,backgroundColor:"#E8B95A",marginTop:10,flexDirection:"row",alignItems:"center",paddingHorizontal:16},
  listenIcon:{fontSize:19,marginRight:10},
  listenText:{color:"#211A22",fontSize:14,fontWeight:"900"},
  listenSub:{color:"rgba(33,26,34,.62)",fontSize:10,marginTop:2},
  listenArrow:{marginLeft:"auto",color:"#211A22",fontSize:20,fontWeight:"900"},
  sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:20},
  sectionTitle:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  sectionMeta:{color:"rgba(255,255,255,.42)",fontSize:10,fontWeight:"700"},
});
