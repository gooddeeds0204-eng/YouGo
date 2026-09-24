import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { Avatar } from "@/shared/ui/Avatar";
import { colors } from "@/shared/theme";

const chats=[
  {id:"priya",name:"Priya",msg:"Hey! are you there?",time:"2m",tone:"#C44784",unread:4},
  {id:"arjun",name:"Arjun",msg:"Sent a gift 🎁",time:"12m",tone:"#3574C6"},
  {id:"official",name:"Ugo Official",msg:"New event is live now",time:"1h",tone:"#7646D6",unread:1},
  {id:"sneha",name:"Sneha",msg:"Let's join tomorrow",time:"3h",tone:"#2E9C88"},
  {id:"ravi",name:"Ravi",msg:"Ok sure",time:"5h",tone:"#D1773C"}
];

export function MessagesScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}><View><Text style={styles.kicker}>YOUR PEOPLE</Text><Text style={styles.title}>Messages</Text></View><View style={styles.headerActions}><Text style={styles.headerIcon}>⌕</Text><Text style={styles.headerIcon}>•••</Text></View></View>
      <View style={styles.tabs}><View style={styles.tabActive}><Text style={styles.tabActiveText}>Chats</Text></View><Text style={styles.tab}>Calls</Text><Text style={styles.tab}>Requests</Text></View>
      <View style={styles.searchWrap}><Text style={styles.searchIcon}>⌕</Text><TextInput placeholder="Search messages" placeholderTextColor="#646A7D" style={styles.search}/></View>
      <View style={styles.list}>
        {chats.map(chat=>(
          <Pressable key={chat.id} onPress={()=>router.push({pathname:"/chat/[conversationId]",params:{conversationId:chat.id}})} style={styles.row}>
            <Avatar name={chat.name} size={50} tone={chat.tone} ring={chat.unread?"#E83CB9":"transparent"}/>
            <View style={styles.copy}><View style={styles.nameRow}><Text style={styles.name}>{chat.name}</Text><Text style={styles.time}>{chat.time}</Text></View><Text style={styles.msg}>{chat.msg}</Text></View>
            {chat.unread?<View style={styles.unread}><Text style={styles.unreadText}>{chat.unread}</Text></View>:null}
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:104,gap:14},
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  kicker:{color:"#7F53C4",fontSize:7,fontWeight:"900",letterSpacing:1.2},
  title:{color:"#FFFFFF",fontSize:29,fontWeight:"900",marginTop:2},
  headerActions:{flexDirection:"row",gap:8},
  headerIcon:{width:36,height:36,borderRadius:12,backgroundColor:"#11131E",color:"#FFFFFF",textAlign:"center",textAlignVertical:"center",paddingTop:9,fontSize:14},
  tabs:{flexDirection:"row",alignItems:"center",gap:18},
  tabActive:{paddingHorizontal:15,paddingVertical:8,borderRadius:17,backgroundColor:"#E83CB9"},
  tabActiveText:{color:"#FFFFFF",fontSize:8,fontWeight:"900"},
  tab:{color:"#747A8E",fontSize:8,fontWeight:"800"},
  searchWrap:{minHeight:48,borderRadius:17,backgroundColor:"#11131E",flexDirection:"row",alignItems:"center",paddingHorizontal:12},
  searchIcon:{color:"#747A8E",fontSize:18,marginRight:7},
  search:{flex:1,color:"#FFFFFF",fontSize:10},
  list:{gap:6},
  row:{minHeight:72,borderBottomWidth:1,borderBottomColor:"rgba(255,255,255,.05)",flexDirection:"row",alignItems:"center",paddingVertical:8},
  copy:{flex:1,marginLeft:11},
  nameRow:{flexDirection:"row",justifyContent:"space-between"},
  name:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  time:{color:"#666C80",fontSize:7},
  msg:{color:"#80869A",fontSize:8,marginTop:5},
  unread:{width:20,height:20,borderRadius:10,backgroundColor:"#E83CB9",alignItems:"center",justifyContent:"center",marginLeft:8},
  unreadText:{color:"#FFFFFF",fontSize:7,fontWeight:"900"},
});
