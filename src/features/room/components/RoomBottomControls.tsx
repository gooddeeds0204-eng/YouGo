import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

type Props={
  roomId:string;
  message:string;
  onChangeMessage:(value:string)=>void;
  onSend:()=>void;
  sending?:boolean;
};

export function RoomBottomControls({roomId,message,onChangeMessage,onSend,sending=false}:Props){
  return(
    <View style={styles.wrap}>
      <View style={styles.inputWrap}>
        <Text style={styles.smile}>☺</Text>
        <TextInput value={message} onChangeText={onChangeMessage} placeholder="Say hi..." placeholderTextColor="rgba(255,255,255,.38)" maxLength={500} style={styles.input} onSubmitEditing={onSend} returnKeyType="send"/>
      </View>

      <Pressable onPress={message.trim()?onSend:undefined} style={styles.round}>
        <Text style={styles.roundText}>{sending?"…":message.trim()?"➤":"🎤"}</Text>
      </Pressable>

      <Pressable onPress={()=>router.push({pathname:"/gifts",params:{roomId}})} style={[styles.round,styles.gift]}>
        <Text style={styles.roundText}>🎁</Text>
      </Pressable>

      <Pressable onPress={()=>router.push({pathname:"/room-tools",params:{roomId}})} style={styles.round}><Text style={styles.more}>•••</Text></Pressable>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{flexDirection:"row",alignItems:"center",gap:8,paddingTop:13,borderTopWidth:1,borderTopColor:"rgba(255,255,255,.065)"},
  inputWrap:{flex:1,minHeight:54,borderRadius:18,backgroundColor:"rgba(255,255,255,.055)",borderWidth:1,borderColor:"rgba(255,255,255,.075)",paddingHorizontal:13,flexDirection:"row",alignItems:"center"},
  smile:{color:"rgba(255,255,255,.55)",fontSize:18,marginRight:8},
  input:{flex:1,color:"#FFFFFF",fontSize:13,paddingVertical:0},
  round:{width:54,height:54,borderRadius:18,backgroundColor:"rgba(255,255,255,.065)",borderWidth:1,borderColor:"rgba(255,255,255,.075)",alignItems:"center",justifyContent:"center"},
  gift:{backgroundColor:"#7054E8",borderColor:"rgba(182,166,255,.38)",shadowColor:"#7054E8",shadowOpacity:.25,shadowRadius:10,elevation:5},
  roundText:{color:"#FFFFFF",fontSize:20},
  more:{color:"#E8B95A",fontSize:14,fontWeight:"900"},
});
