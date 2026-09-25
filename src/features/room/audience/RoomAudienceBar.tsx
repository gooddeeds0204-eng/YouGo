import { StyleSheet, Text, View } from "react-native";

export function RoomAudienceBar(){
  return(
    <View style={styles.row}>
      <View><Text style={styles.label}>AUDIENCE</Text><Text style={styles.count}>1,842 listening</Text></View>
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
  row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:10,marginTop:12,borderTopWidth:1,borderBottomWidth:1,borderColor:"rgba(255,255,255,.06)"},
  label:{color:"#686E82",fontSize:6,fontWeight:"900",letterSpacing:1.1},
  count:{color:"#C7CAD6",fontSize:7.5,fontWeight:"800",marginTop:2},
  right:{flexDirection:"row",alignItems:"center"},
  avatar:{width:27,height:27,borderRadius:14,borderWidth:2,borderColor:"#080912",alignItems:"center",justifyContent:"center"},
  a1:{backgroundColor:"#C54788"},
  a2:{backgroundColor:"#3976C8",marginLeft:-7},
  a3:{backgroundColor:"#7648D7",marginLeft:-7},
  avatarText:{color:"#FFFFFF",fontSize:7,fontWeight:"900"},
  more:{height:27,minWidth:36,borderRadius:14,backgroundColor:"#151725",marginLeft:-6,alignItems:"center",justifyContent:"center",paddingHorizontal:7},
  moreText:{color:"#BFC2CF",fontSize:6.5,fontWeight:"900"},
});
