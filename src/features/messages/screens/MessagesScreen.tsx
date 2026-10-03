import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { listConversations, type ConversationPreview } from "@/platform/supabase/messages";

const demo=[
  {id:"priya",otherUserId:"priya",name:"Priya",avatarUrl:null,lastMessage:"Hey! are you there?",updatedAt:new Date().toISOString()},
  {id:"arjun",otherUserId:"arjun",name:"Arjun",avatarUrl:null,lastMessage:"Sent a gift 🎁",updatedAt:new Date(Date.now()-12*60000).toISOString()},
  {id:"official",otherUserId:"official",name:"Ugo Official",avatarUrl:null,lastMessage:"Galaxy Party is live now ✨",updatedAt:new Date(Date.now()-3600000).toISOString()},
  {id:"sneha",otherUserId:"sneha",name:"Sneha",avatarUrl:null,lastMessage:"Let's join tomorrow",updatedAt:new Date(Date.now()-3*3600000).toISOString()},
];

export function MessagesScreen(){
  const [items,setItems]=useState<ConversationPreview[]>([]);
  const [query,setQuery]=useState("");

  useEffect(()=>{void listConversations().then(setItems).catch(()=>undefined);},[]);
  const shown=items.length?items:demo;
  const filtered=useMemo(()=>{
    const clean=query.trim().toLowerCase();
    return clean?shown.filter(item=>item.name.toLowerCase().includes(clean)||item.lastMessage.toLowerCase().includes(clean)):shown;
  },[query,shown]);

  const time=(value:string)=>{
    const diff=Date.now()-new Date(value).getTime();
    if(diff<3600000)return Math.max(1,Math.floor(diff/60000))+"m";
    if(diff<86400000)return Math.floor(diff/3600000)+"h";
    return new Date(value).toLocaleDateString();
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <Pressable onPress={()=>router.push("/discover")} style={styles.newChat}><Text style={styles.newChatText}>＋</Text></Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Search messages" placeholderTextColor="#9C95A3" style={styles.search}/>
      </View>

      <View style={styles.tabs}>
        <Pressable style={styles.tabActive}><Text style={styles.tabActiveText}>Chats</Text></Pressable>
        <Pressable style={styles.tab}><Text style={styles.tabText}>Calls</Text></Pressable>
        <Pressable style={styles.tab}><Text style={styles.tabText}>Requests</Text></Pressable>
      </View>

      <View style={styles.list}>
        {filtered.map((chat,index)=>(
          <Pressable key={chat.id} onPress={()=>router.push({pathname:"/chat/[conversationId]",params:{conversationId:chat.id}})} style={styles.row}>
            <View style={[styles.avatar,{backgroundColor:["#CF5A8C","#4F7BC7","#765ACD","#3FA987"][index%4]}]}>
              {chat.avatarUrl?<Image source={{uri:chat.avatarUrl}} style={styles.avatarImage}/>:<Text style={styles.avatarText}>{chat.name[0]}</Text>}
              {chat.otherUserId!=="official"?<View style={styles.online}/>:null}
            </View>
            <View style={styles.copy}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{chat.name}</Text>
                <Text style={styles.time}>{time(chat.updatedAt)}</Text>
              </View>
              <Text numberOfLines={1} style={styles.msg}>{chat.lastMessage}</Text>
            </View>
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
  newChat:{width:44,height:44,borderRadius:14,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  newChatText:{color:"#FFFFFF",fontSize:24},
  searchWrap:{minHeight:54,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",flexDirection:"row",alignItems:"center",paddingHorizontal:14},
  searchIcon:{color:"#817A8B",fontSize:20,marginRight:8},
  search:{flex:1,color:"#2B2631",fontSize:14},
  tabs:{flexDirection:"row",gap:8},
  tabActive:{paddingHorizontal:18,paddingVertical:11,borderRadius:18,backgroundColor:"#7054E8"},
  tabActiveText:{color:"#FFFFFF",fontSize:12,fontWeight:"900"},
  tab:{paddingHorizontal:18,paddingVertical:11,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1"},
  tabText:{color:"#817A8B",fontSize:12,fontWeight:"800"},
  list:{gap:8},
  row:{minHeight:76,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",flexDirection:"row",alignItems:"center",padding:11},
  avatar:{width:52,height:52,borderRadius:26,alignItems:"center",justifyContent:"center",overflow:"visible"},
  avatarImage:{width:52,height:52,borderRadius:26},
  avatarText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  online:{position:"absolute",right:0,bottom:0,width:13,height:13,borderRadius:7,backgroundColor:"#3BC795",borderWidth:3,borderColor:"#FFFFFF"},
  copy:{flex:1,marginLeft:11},
  nameRow:{flexDirection:"row",justifyContent:"space-between"},
  name:{color:"#332E3A",fontSize:14,fontWeight:"900"},
  time:{color:"#9A94A0",fontSize:11},
  msg:{color:"#817A8B",fontSize:12,marginTop:5},
});
