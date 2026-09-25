import { StyleSheet, Text, View } from "react-native";

const feed=[
  {kind:"entry",text:"✨ VIP 6  Neha entered with Royal Aurora"},
  {kind:"chat",name:"Arjun",badge:"LV.38",text:"Tonight's room is packed 🔥"},
  {kind:"gift",name:"Priya",text:"sent 💗 Heart ×99"},
  {kind:"chat",name:"Ravi",badge:"VIP 3",text:"Music next please 🎵"},
];

export function RoomChatFeed(){
  return(
    <View style={styles.wrap}>
      <Text style={styles.title}>LIVE CHAT</Text>
      <View style={styles.feed}>
        {feed.map((item,index)=>{
          if(item.kind==="entry") return <View key={index} style={styles.entry}><Text style={styles.entryText}>{item.text}</Text></View>;
          if(item.kind==="gift") return <View key={index} style={styles.gift}><Text style={styles.giftText}><Text style={styles.strong}>{item.name}</Text> {item.text}</Text></View>;
          return <View key={index} style={styles.line}>
            <View style={styles.miniAvatar}><Text style={styles.miniAvatarText}>{item.name?.[0]}</Text></View>
            <View style={styles.copy}>
              <View style={styles.meta}><Text style={styles.name}>{item.name}</Text><Text style={styles.badge}>{item.badge}</Text></View>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>;
        })}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{marginTop:12},
  title:{color:"#666D82",fontSize:6.5,fontWeight:"900",letterSpacing:1.2,marginBottom:6},
  feed:{gap:5},
  entry:{alignSelf:"flex-start",borderRadius:12,backgroundColor:"rgba(116,67,255,.14)",paddingHorizontal:9,paddingVertical:6},
  entryText:{color:"#C7A9FF",fontSize:6.5,fontWeight:"800"},
  line:{flexDirection:"row",alignItems:"flex-start",gap:7},
  miniAvatar:{width:24,height:24,borderRadius:12,backgroundColor:"#2A2142",alignItems:"center",justifyContent:"center"},
  miniAvatarText:{color:"#FFFFFF",fontSize:7,fontWeight:"900"},
  copy:{maxWidth:"82%",borderRadius:12,borderTopLeftRadius:4,backgroundColor:"rgba(17,19,30,.86)",paddingHorizontal:8,paddingVertical:6},
  meta:{flexDirection:"row",alignItems:"center",gap:5},
  name:{color:"#FFFFFF",fontSize:7.5,fontWeight:"900"},
  badge:{color:"#F09DFF",fontSize:5.5,fontWeight:"900"},
  text:{color:"#C5C8D4",fontSize:7.5,lineHeight:11,marginTop:2},
  gift:{alignSelf:"flex-start",borderRadius:12,backgroundColor:"rgba(232,60,185,.11)",paddingHorizontal:9,paddingVertical:6},
  giftText:{color:"#F7C8E8",fontSize:7},
  strong:{fontWeight:"900",color:"#FFFFFF"},
});
