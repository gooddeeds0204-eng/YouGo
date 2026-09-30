import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const chats=[
  {id:"priya",name:"Priya",msg:"Hey! are you there?",time:"2m",tone:"#F768A7",unread:4},
  {id:"arjun",name:"Arjun",msg:"Sent a gift 🎁",time:"12m",tone:"#5C8EF2"},
  {id:"official",name:"Ugo Official",msg:"Galaxy Party is live now ✨",time:"1h",tone:"#8B65E8",unread:1},
  {id:"sneha",name:"Sneha",msg:"Let's join tomorrow",time:"3h",tone:"#4EBF9E"},
];

export function MessagesScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <Pressable style={styles.newChat}><Text style={styles.newChatText}>＋</Text></Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput placeholder="Search messages" placeholderTextColor="#9C95A3" style={styles.search}/>
      </View>

      <View style={styles.tabs}>
        <Pressable style={styles.tabActive}><Text style={styles.tabActiveText}>Chats</Text></Pressable>
        <Pressable style={styles.tab}><Text style={styles.tabText}>Calls</Text></Pressable>
        <Pressable style={styles.tab}><Text style={styles.tabText}>Requests</Text></Pressable>
      </View>

      <View style={styles.list}>
        {chats.map(chat=>(
          <Pressable key={chat.id} onPress={()=>router.push({pathname:"/chat/[conversationId]",params:{conversationId:chat.id}})} style={styles.row}>
            <View style={[styles.avatar,{backgroundColor:chat.tone}]}>
              <Text style={styles.avatarText}>{chat.name[0]}</Text>
              {chat.id!=="official"?<View style={styles.online}/>:null}
            </View>
            <View style={styles.copy}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{chat.name}</Text>
                <Text style={styles.time}>{chat.time}</Text>
              </View>
              <Text numberOfLines={1} style={styles.msg}>{chat.msg}</Text>
            </View>
            {chat.unread?<View style={styles.unread}><Text style={styles.unreadText}>{chat.unread}</Text></View>:null}
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:104,gap:16},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  title:{color:"#211D2C",fontSize:26,fontWeight:"900"},
  newChat:{width:44,height:44,borderRadius:14,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center"},
  newChatText:{color:"#FFFFFF",fontSize:24},
  searchWrap:{minHeight:54,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",flexDirection:"row",alignItems:"center",paddingHorizontal:14},
  searchIcon:{color:"#817A8B",fontSize:20,marginRight:8},
  search:{flex:1,color:"#2B2631",fontSize:14},
  tabs:{flexDirection:"row",gap:8},
  tabActive:{paddingHorizontal:18,paddingVertical:11,borderRadius:18,backgroundColor:"#7657F6"},
  tabActiveText:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
  tab:{paddingHorizontal:18,paddingVertical:11,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2"},
  tabText:{color:"#817A8B",fontSize:12,fontWeight:"800"},
  list:{gap:8},
  row:{minHeight:76,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",flexDirection:"row",alignItems:"center",padding:11},
  avatar:{width:52,height:52,borderRadius:26,alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  online:{position:"absolute",right:0,bottom:0,width:13,height:13,borderRadius:7,backgroundColor:"#3BC795",borderWidth:3,borderColor:"#FFFFFF"},
  copy:{flex:1,marginLeft:11},
  nameRow:{flexDirection:"row",justifyContent:"space-between"},
  name:{color:"#332E3A",fontSize:14,fontWeight:"900"},
  time:{color:"#9A94A0",fontSize:11},
  msg:{color:"#817A8B",fontSize:12,marginTop:5},
  unread:{width:24,height:24,borderRadius:12,backgroundColor:"#F6549C",alignItems:"center",justifyContent:"center",marginLeft:8},
  unreadText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
});
