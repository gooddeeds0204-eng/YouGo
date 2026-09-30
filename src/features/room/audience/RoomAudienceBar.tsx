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
  row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:14,marginTop:16,borderTopWidth:1,borderBottomWidth:1,borderColor:"rgba(255,255,255,.08)"},
  label:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  count:{color:"rgba(255,255,255,.58)",fontSize:11,marginTop:3},
  right:{flexDirection:"row",alignItems:"center"},
  avatar:{width:34,height:34,borderRadius:17,borderWidth:2,borderColor:"#241C31",alignItems:"center",justifyContent:"center"},
  a1:{backgroundColor:"#F768A7"},
  a2:{backgroundColor:"#5C8EF2",marginLeft:-7},
  a3:{backgroundColor:"#8B65E8",marginLeft:-7},
  avatarText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  more:{height:34,minWidth:44,borderRadius:17,backgroundColor:"rgba(255,255,255,.10)",marginLeft:-5,alignItems:"center",justifyContent:"center",paddingHorizontal:7},
  moreText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
});
