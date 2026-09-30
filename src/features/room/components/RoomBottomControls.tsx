import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

type Props = {
  roomId: string;
  message: string;
  onChangeMessage: (value: string) => void;
  onSend: () => void;
  sending?: boolean;
};

export function RoomBottomControls({roomId,message,onChangeMessage,onSend,sending=false}:Props){
  return(
    <View style={styles.wrap}>
      <View style={styles.chat}>
        <Text style={styles.chatIcon}>☺</Text>
        <TextInput
          value={message}
          onChangeText={onChangeMessage}
          placeholder="Say hi to everyone..."
          placeholderTextColor="rgba(255,255,255,.42)"
          maxLength={500}
          style={styles.input}
          onSubmitEditing={onSend}
          returnKeyType="send"
        />
      </View>
      <Pressable onPress={message.trim()?onSend:undefined} style={[styles.icon,message.trim()&&styles.send]}>
        <Text style={styles.iconText}>{sending?"…":message.trim()?"➤":"🎤"}</Text>
      </Pressable>
      <Pressable onPress={()=>router.push({pathname:"/gifts",params:{roomId}})} style={[styles.icon,styles.gift]}><Text style={styles.iconText}>🎁</Text></Pressable>
      <Pressable style={styles.icon}><Text style={styles.more}>•••</Text></Pressable>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{flexDirection:"row",alignItems:"center",gap:7,paddingTop:10,borderTopWidth:1,borderTopColor:"rgba(255,255,255,.08)"},
  chat:{flex:1,minHeight:46,borderRadius:18,backgroundColor:"rgba(255,255,255,.10)",borderWidth:1,borderColor:"rgba(255,255,255,.08)",flexDirection:"row",alignItems:"center",paddingHorizontal:11},
  chatIcon:{color:"rgba(255,255,255,.66)",fontSize:17,marginRight:7},
  input:{flex:1,color:"#FFFFFF",fontSize:10,paddingVertical:0},
  icon:{width:46,height:46,borderRadius:17,backgroundColor:"rgba(255,255,255,.10)",borderWidth:1,borderColor:"rgba(255,255,255,.08)",alignItems:"center",justifyContent:"center"},
  send:{backgroundColor:"#7A5CFF",borderColor:"#8B72FF"},
  gift:{backgroundColor:"#FF5FA2",borderColor:"#FF82B8",shadowColor:"#FF5FA2",shadowOpacity:.28,shadowRadius:10,elevation:5},
  iconText:{fontSize:18,color:"#FFFFFF"},
  more:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
});
