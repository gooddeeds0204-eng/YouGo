import { StyleSheet, Text, View } from "react-native";

export function RoomAudienceBar(){
  return(
    <View style={styles.row}>
      <View>
        <Text style={styles.label}>AUDIENCE</Text>
        <Text style={styles.count}>1,842 in room</Text>
      </View>
      <View style={styles.right}>
        <View style={[styles.avatar,styles.a1]}><Text style={styles.avatarText}>R</Text></View>
        <View style={[styles.avatar,styles.a2]}><Text style={styles.avatarText}>S</Text></View>
        <View style={[styles.avatar,styles.a3]}><Text style={styles.avatarText}>K</Text></View>
        <View style={styles.more}><Text style={styles.moreText}>+99</Text></View>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:11,marginTop:12,borderTopWidth:1,borderBottomWidth:1,borderColor:"rgba(255,255,255,.08)"},
  label:{color:"rgba(255,255,255,.46)",fontSize:7,fontWeight:"900",letterSpacing:1.1},
  count:{color:"#FFFFFF",fontSize:9,fontWeight:"800",marginTop:2},
  right:{flexDirection:"row",alignItems:"center"},
  avatar:{width:30,height:30,borderRadius:15,borderWidth:2,borderColor:"#33204F",alignItems:"center",justifyContent:"center"},
  a1:{backgroundColor:"#FF6AA9"},
  a2:{backgroundColor:"#5E9BFF",marginLeft:-7},
  a3:{backgroundColor:"#986BFF",marginLeft:-7},
  avatarText:{color:"#FFFFFF",fontSize:8,fontWeight:"900"},
  more:{height:30,minWidth:42,borderRadius:15,backgroundColor:"rgba(255,255,255,.09)",marginLeft:-6,alignItems:"center",justifyContent:"center",paddingHorizontal:7},
  moreText:{color:"#FFFFFF",fontSize:7,fontWeight:"900"},
});
