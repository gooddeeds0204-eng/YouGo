import { StyleSheet, Text, View } from "react-native";
import type { RoomMode } from "@/contracts/room";

type Props={roomId:string;mode:RoomMode};

export function LiveRoomMedia({mode}:Props){
  if(mode==="game")return null;
  return(
    <View style={styles.card}>
      <View style={styles.dot}/>
      <View style={styles.copy}>
        <Text style={styles.title}>Native live media ready</Text>
        <Text style={styles.sub}>Voice/video connects in the Android or iOS development build after LiveKit Cloud credentials are configured.</Text>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  card:{minHeight:58,borderRadius:17,backgroundColor:"rgba(112,84,232,.08)",borderWidth:1,borderColor:"rgba(182,166,255,.12)",paddingHorizontal:13,flexDirection:"row",alignItems:"center",marginTop:12},
  dot:{width:9,height:9,borderRadius:5,backgroundColor:"#E8B95A",marginRight:10},
  copy:{flex:1},
  title:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  sub:{color:"rgba(255,255,255,.42)",fontSize:9,lineHeight:13,marginTop:2},
});
