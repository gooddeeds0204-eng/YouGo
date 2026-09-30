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
        <TextInput
          value={message}
          onChangeText={onChangeMessage}
          placeholder="Say hi..."
          placeholderTextColor="rgba(255,255,255,.42)"
          maxLength={500}
          style={styles.input}
          onSubmitEditing={onSend}
          returnKeyType="send"
        />
      </View>

      <Pressable onPress={message.trim()?onSend:undefined} style={styles.round}>
        <Text style={styles.roundText}>{sending?"…":message.trim()?"➤":"🎤"}</Text>
      </Pressable>

      <Pressable onPress={()=>router.push({pathname:"/gifts",params:{roomId}})} style={[styles.round,styles.gift]}>
        <Text style={styles.roundText}>🎁</Text>
      </Pressable>

      <Pressable style={styles.round}>
        <Text style={styles.more}>•••</Text>
      </Pressable>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{flexDirection:"row",alignItems:"center",gap:8,paddingTop:12,borderTopWidth:1,borderTopColor:"rgba(255,255,255,.08)"},
  inputWrap:{flex:1,minHeight:52,borderRadius:18,backgroundColor:"rgba(255,255,255,.08)",borderWidth:1,borderColor:"rgba(255,255,255,.08)",paddingHorizontal:14,justifyContent:"center"},
  input:{color:"#FFFFFF",fontSize:13,paddingVertical:0},
  round:{width:52,height:52,borderRadius:18,backgroundColor:"rgba(255,255,255,.10)",alignItems:"center",justifyContent:"center"},
  gift:{backgroundColor:"#F6549C"},
  roundText:{color:"#FFFFFF",fontSize:20},
  more:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
});
