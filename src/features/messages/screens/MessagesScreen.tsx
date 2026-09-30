import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const chats=[
  {id:"priya",name:"Priya",msg:"Hey! are you there?",time:"2m",tone:"#FF6AA9",unread:4},
  {id:"arjun",name:"Arjun",msg:"Sent a gift 🎁",time:"12m",tone:"#5E9BFF"},
  {id:"official",name:"Ugo Official",msg:"Galaxy Party is live now ✨",time:"1h",tone:"#986BFF",unread:1},
  {id:"sneha",name:"Sneha",msg:"Let's join tomorrow",time:"3h",tone:"#4CCFB0"},
  {id:"ravi",name:"Ravi",msg:"Ok sure",time:"5h",tone:"#FF9A52"}
];

export function MessagesScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <View><Text style={styles.kicker}>STAY CONNECTED</Text><Text style={styles.title}>Inbox</Text></View>
        <View style={styles.headerActions}><Pressable style={styles.icon}><Text style={styles.iconText}>⌕</Text></Pressable><Pressable style={styles.icon}><Text style={styles.iconText}>＋</Text></Pressable></View>
      </View>

      <View style={styles.storyRow}>
        {[["P","#FF6AA9"],["A","#5E9BFF"],["S","#4CCFB0"],["R","#FF9A52"]].map(([n,tone])=>(
          <View key={n} style={styles.story}><View style={[styles.storyAvatar,{backgroundColor:tone}]}><Text style={styles.storyText}>{n}</Text></View><View style={styles.onlineDot}/></View>
        ))}
        <View style={styles.storyAdd}><Text style={styles.storyAddText}>＋</Text></View>
      </View>

      <View style={styles.tabs}>
        <Pressable style={styles.tabActive}><Text style={styles.tabActiveText}>Chats</Text></Pressable>
        <Pressable style={styles.tab}><Text style={styles.tabText}>Calls</Text></Pressable>
        <Pressable style={styles.tab}><Text style={styles.tabText}>Requests</Text></Pressable>
      </View>

      <View style={styles.searchWrap}><Text style={styles.searchIcon}>⌕</Text><TextInput placeholder="Search messages" placeholderTextColor="#9F97AA" style={styles.search}/></View>

      <View style={styles.list}>
        {chats.map(chat=>(
          <Pressable key={chat.id} onPress={()=>router.push({pathname:"/chat/[conversationId]",params:{conversationId:chat.id}})} style={styles.row}>
            <View style={[styles.avatar,{backgroundColor:chat.tone}]}><Text style={styles.avatarText}>{chat.name[0]}</Text>{chat.id!=="official"?<View style={styles.online}/>:null}</View>
            <View style={styles.copy}>
              <View style={styles.nameRow}><Text style={styles.name}>{chat.name}</Text><Text style={styles.time}>{chat.time}</Text></View>
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
  screen:{paddingTop:10,paddingBottom:102,gap:14},
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  kicker:{color:"#8B5CFF",fontSize:8,fontWeight:"900",letterSpacing:1.2},
  title:{color:"#2B243D",fontSize:28,fontWeight:"900",marginTop:2},
  headerActions:{flexDirection:"row",gap:8},
  icon:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  iconText:{color:"#554D65",fontSize:18,fontWeight:"900"},
  storyRow:{flexDirection:"row",gap:10},
  story:{position:"relative"},
  storyAvatar:{width:54,height:54,borderRadius:27,alignItems:"center",justifyContent:"center",borderWidth:3,borderColor:"#FFFFFF"},
  storyText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  onlineDot:{position:"absolute",right:1,bottom:1,width:14,height:14,borderRadius:7,backgroundColor:"#42D29D",borderWidth:3,borderColor:"#F8F7FF"},
  storyAdd:{width:54,height:54,borderRadius:27,borderWidth:1.5,borderStyle:"dashed",borderColor:"#BDB4C7",alignItems:"center",justifyContent:"center"},
  storyAddText:{color:"#8A8296",fontSize:23},
  tabs:{flexDirection:"row",gap:8},
  tabActive:{paddingHorizontal:16,paddingVertical:9,borderRadius:17,backgroundColor:"#7A5CFF"},
  tabActiveText:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  tab:{paddingHorizontal:16,paddingVertical:9,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4"},
  tabText:{color:"#8C8497",fontSize:9,fontWeight:"800"},
  searchWrap:{minHeight:50,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",flexDirection:"row",alignItems:"center",paddingHorizontal:12},
  searchIcon:{color:"#8C8497",fontSize:19,marginRight:7},
  search:{flex:1,color:"#30293E",fontSize:10},
  list:{gap:7},
  row:{minHeight:74,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",flexDirection:"row",alignItems:"center",padding:10},
  avatar:{width:50,height:50,borderRadius:25,alignItems:"center",justifyContent:"center",position:"relative"},
  avatarText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  online:{position:"absolute",right:0,bottom:0,width:13,height:13,borderRadius:7,backgroundColor:"#42D29D",borderWidth:3,borderColor:"#FFFFFF"},
  copy:{flex:1,marginLeft:11},
  nameRow:{flexDirection:"row",justifyContent:"space-between"},
  name:{color:"#342D43",fontSize:11,fontWeight:"900"},
  time:{color:"#A39BAD",fontSize:7},
  msg:{color:"#8A8297",fontSize:8.5,marginTop:5},
  unread:{width:22,height:22,borderRadius:11,backgroundColor:"#FF5FA2",alignItems:"center",justifyContent:"center",marginLeft:8},
  unreadText:{color:"#FFFFFF",fontSize:7,fontWeight:"900"},
});
