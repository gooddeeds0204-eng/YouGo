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
          placeholder="Say something..."
          placeholderTextColor="#686E82"
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
      <Pressable style={styles.icon}><Text style={styles.iconText}>•••</Text></Pressable>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{flexDirection:"row",alignItems:"center",gap:7,paddingTop:8,borderTopWidth:1,borderTopColor:"rgba(255,255,255,.06)"},
  chat:{flex:1,minHeight:42,borderRadius:16,backgroundColor:"rgba(17,19,30,.92)",borderWidth:1,borderColor:"rgba(255,255,255,.06)",flexDirection:"row",alignItems:"center",paddingHorizontal:10},
  chatIcon:{color:"#8B90A3",fontSize:16,marginRight:7},
  input:{flex:1,color:"#FFFFFF",fontSize:8,paddingVertical:0},
  icon:{width:42,height:42,borderRadius:16,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)",alignItems:"center",justifyContent:"center"},
  send:{backgroundColor:"#7443FF",borderColor:"#7443FF"},
  gift:{backgroundColor:"#E83CB9",borderColor:"#E83CB9",shadowColor:"#E83CB9",shadowOpacity:.35,shadowRadius:12,elevation:6},
  iconText:{fontSize:17,color:"#FFFFFF"},
});
