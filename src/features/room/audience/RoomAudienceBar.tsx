import { StyleSheet, Text, View } from "react-native";

export function RoomAudienceBar(){
  return(
    <View style={styles.row}>
      <View>
        <Text style={styles.label}>Audience</Text>
        <Text style={styles.count}>1,842 listening</Text>
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
  row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:14,marginTop:18,borderRadius:17,backgroundColor:"rgba(255,255,255,.045)",borderWidth:1,borderColor:"rgba(255,255,255,.065)"},
  label:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  count:{color:"rgba(255,255,255,.46)",fontSize:10,marginTop:3},
  right:{flexDirection:"row",alignItems:"center"},
  avatar:{width:35,height:35,borderRadius:18,borderWidth:2,borderColor:"#1B1623",alignItems:"center",justifyContent:"center"},
  a1:{backgroundColor:"#C45182"},
  a2:{backgroundColor:"#4F7BC7",marginLeft:-7},
  a3:{backgroundColor:"#765ACD",marginLeft:-7},
  avatarText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  more:{height:35,minWidth:44,borderRadius:18,backgroundColor:"rgba(232,185,90,.10)",borderWidth:1,borderColor:"rgba(232,185,90,.18)",marginLeft:-5,alignItems:"center",justifyContent:"center",paddingHorizontal:7},
  moreText:{color:"#E8B95A",fontSize:10,fontWeight:"900"},
});
