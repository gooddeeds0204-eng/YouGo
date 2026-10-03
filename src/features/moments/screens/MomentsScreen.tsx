import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { createMoment, listMoments, toggleMomentLike, type MomentItem } from "@/platform/supabase/social";

const demo:MomentItem[]=[
  {id:"d1",userId:"p1",displayName:"Priya",username:"priya",avatarUrl:null,kind:"status",body:"Music Adda tonight 🎵 Who is joining?",mediaUrl:null,likesCount:128,commentsCount:18,createdAt:new Date().toISOString()},
  {id:"d2",userId:"p2",displayName:"Arjun",username:"arjun",avatarUrl:null,kind:"status",body:"Game room was crazy today 😂 GG everyone!",mediaUrl:null,likesCount:96,commentsCount:11,createdAt:new Date(Date.now()-3600000).toISOString()},
  {id:"d3",userId:"p3",displayName:"Neha",username:"neha",avatarUrl:null,kind:"status",body:"New VIP frame unlocked ✨",mediaUrl:null,likesCount:204,commentsCount:27,createdAt:new Date(Date.now()-7200000).toISOString()},
];

export function MomentsScreen(){
  const [items,setItems]=useState<MomentItem[]>([]);
  const [text,setText]=useState("");
  const [posting,setPosting]=useState(false);

  const load=()=>void listMoments().then(setItems).catch(()=>setItems([]));
  useEffect(load,[]);

  const post=async()=>{
    const clean=text.trim();
    if(!clean||posting)return;
    setPosting(true);
    try{
      const id=await createMoment(clean);
      if(id){
        setText("");
        await listMoments().then(setItems);
      }else{
        setItems(current=>[{
          id:"preview-"+Date.now(),userId:"preview-user",displayName:"You",username:"ugo_tester",avatarUrl:null,kind:"status",body:clean,mediaUrl:null,likesCount:0,commentsCount:0,createdAt:new Date().toISOString(),
        },...(current.length?current:demo)]);
        setText("");
      }
    }catch(error:any){
      Alert.alert("Could not post",error?.message||"Try again.");
    }finally{
      setPosting(false);
    }
  };

  const like=async(item:MomentItem)=>{
    try{
      const result=await toggleMomentLike(item.id);
      setItems(current=>(current.length?current:demo).map(x=>x.id===item.id?{...x,likesCount:result?.likes_count??x.likesCount+1}:x));
    }catch{
      setItems(current=>(current.length?current:demo).map(x=>x.id===item.id?{...x,likesCount:x.likesCount+1}:x));
    }
  };

  const shown=items.length?items:demo;

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.eyebrow}>SOCIAL FEED</Text><Text style={styles.title}>Moments</Text></View>
        <View style={styles.spacer}/>
      </View>

      <View style={styles.composer}>
        <View style={styles.myAvatar}><Text style={styles.myAvatarText}>U</Text></View>
        <TextInput value={text} onChangeText={setText} placeholder="Share a moment..." placeholderTextColor="#9B94A0" style={styles.input} multiline maxLength={500}/>
        <Pressable onPress={post} disabled={!text.trim()||posting} style={[styles.post,(!text.trim()||posting)&&styles.disabled]}><Text style={styles.postText}>{posting?"...":"Post"}</Text></Pressable>
      </View>

      <View style={styles.feed}>
        {shown.map(item=>(
          <View key={item.id} style={styles.card}>
            <View style={styles.userRow}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{item.displayName[0]}</Text></View>
              <View style={styles.userCopy}><Text style={styles.name}>{item.displayName}</Text><Text style={styles.meta}>@{item.username||"ugo"} • {new Date(item.createdAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</Text></View>
              <Text style={styles.more}>•••</Text>
            </View>
            <Text style={styles.body}>{item.body}</Text>
            <View style={styles.actions}>
              <Pressable onPress={()=>like(item)} style={styles.action}><Text style={styles.actionIcon}>♥</Text><Text style={styles.actionText}>{item.likesCount}</Text></Pressable>
              <View style={styles.action}><Text style={styles.actionIcon}>💬</Text><Text style={styles.actionText}>{item.commentsCount}</Text></View>
              <View style={styles.action}><Text style={styles.actionIcon}>↗</Text><Text style={styles.actionText}>Share</Text></View>
            </View>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:30,gap:15},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",marginRight:10},
  backText:{color:"#4B4551",fontSize:30,marginTop:-3},
  eyebrow:{color:"#A1874F",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#1D1924",fontSize:21,fontWeight:"900"},
  spacer:{marginLeft:"auto",width:42},
  composer:{minHeight:84,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:11,flexDirection:"row",alignItems:"center"},
  myAvatar:{width:44,height:44,borderRadius:22,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  myAvatarText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  input:{flex:1,color:"#39333F",fontSize:13,maxHeight:80,marginHorizontal:10},
  post:{paddingHorizontal:13,paddingVertical:9,borderRadius:12,backgroundColor:"#7054E8"},
  disabled:{opacity:.35},
  postText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  feed:{gap:10},
  card:{borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:13},
  userRow:{flexDirection:"row",alignItems:"center"},
  avatar:{width:46,height:46,borderRadius:23,backgroundColor:"#CF5A8C",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  userCopy:{flex:1,marginLeft:10},
  name:{color:"#332E3A",fontSize:13,fontWeight:"900"},
  meta:{color:"#958E9B",fontSize:10,marginTop:2},
  more:{color:"#948D9A",fontSize:12},
  body:{color:"#49434F",fontSize:13,lineHeight:19,marginTop:13},
  actions:{flexDirection:"row",gap:18,marginTop:14,paddingTop:11,borderTopWidth:1,borderTopColor:"#F0EDF3"},
  action:{flexDirection:"row",alignItems:"center",gap:5},
  actionIcon:{color:"#7054E8",fontSize:15},
  actionText:{color:"#77707D",fontSize:11,fontWeight:"700"},
});
