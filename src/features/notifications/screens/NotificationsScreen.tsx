import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const items=[
  ["🎁","Priya sent you a Heart ×10","2m"],["🎙","Neha invited you to Chill Vibes","8m"],["🏆","You moved to #12 in Galaxy Carnival","24m"],["🫶","Neon Tribe completed a family mission","1h"],["👀","3 people viewed your profile","2h"]
];

export function NotificationsScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}><Pressable onPress={()=>router.back()}><Text style={styles.back}>‹</Text></Pressable><Text style={styles.title}>Notifications</Text><Text style={styles.mark}>Mark read</Text></View>
      <View style={styles.list}>{items.map(([icon,text,time],index)=><View key={text} style={[styles.row,index<3&&styles.newRow]}><View style={styles.icon}><Text>{icon}</Text></View><View style={styles.copy}><Text style={styles.text}>{text}</Text><Text style={styles.time}>{time} ago</Text></View>{index<3?<View style={styles.dot}/>:null}</View>)}</View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{color:"#FFFFFF",fontSize:30},
  title:{color:"#FFFFFF",fontSize:19,fontWeight:"900"},
  mark:{color:"#B17BFF",fontSize:8,fontWeight:"800"},
  list:{gap:8,marginTop:18},
  row:{minHeight:68,borderRadius:18,backgroundColor:"#11131E",padding:11,flexDirection:"row",alignItems:"center"},
  newRow:{backgroundColor:"#171426"},
  icon:{width:42,height:42,borderRadius:14,backgroundColor:"#1D1B31",alignItems:"center",justifyContent:"center"},
  copy:{flex:1,marginLeft:10},
  text:{color:"#FFFFFF",fontSize:9,fontWeight:"800"},
  time:{color:"#6E7488",fontSize:7,marginTop:4},
  dot:{width:6,height:6,borderRadius:3,backgroundColor:"#E83CB9"},
});
