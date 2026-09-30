import { StyleSheet, Text, View } from "react-native";

type Props={seatCount:number};

const seats=[
  {name:"Neha",initial:"N",role:"HOST",tone:"#FF6AA9",ring:"#FFD65E",badge:"♛"},
  {name:"Arjun",initial:"A",role:"ADMIN",tone:"#5E9BFF",ring:"#8EDFFF",badge:"A"},
  {name:"Priya",initial:"P",role:"VIP 5",tone:"#986BFF",ring:"#F0A0FF",badge:"V"},
  {name:"Ravi",initial:"R",role:"LV.31",tone:"#FF9A52",ring:"#FFD070",badge:""},
  {name:"Sneha",initial:"S",role:"LV.28",tone:"#4CCFB0",ring:"#84F0D4",badge:""},
];

export function SeatGrid({seatCount}:Props){
  return(
    <View style={styles.grid}>
      {Array.from({length:seatCount}).map((_,index)=>{
        const seat=seats[index];
        const occupied=Boolean(seat);
        return(
          <View key={index} style={styles.seat}>
            <View style={[styles.frame,occupied&&{borderColor:seat.ring,shadowColor:seat.ring}]}>
              <View style={[styles.avatar,{backgroundColor:occupied?seat.tone:"rgba(255,255,255,.09)"}]}>
                <Text style={styles.avatarText}>{occupied?seat.initial:"＋"}</Text>
              </View>
              {seat?.badge?<View style={styles.badge}><Text style={styles.badgeText}>{seat.badge}</Text></View>:null}
              <View style={[styles.micDot,occupied&&styles.micLive]}><Text style={styles.micText}>{occupied?"🎤":"•"}</Text></View>
            </View>
            <Text numberOfLines={1} style={styles.name}>{occupied?seat.name:"Seat "+(index+1)}</Text>
            <Text style={[styles.role,seat?.role==="HOST"&&styles.hostRole]}>{occupied?seat.role:"Tap to join"}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles=StyleSheet.create({
  grid:{flexDirection:"row",flexWrap:"wrap",rowGap:18,marginTop:14},
  seat:{width:"25%",alignItems:"center"},
  frame:{width:68,height:68,borderRadius:34,borderWidth:3,borderColor:"rgba(255,255,255,.18)",alignItems:"center",justifyContent:"center",shadowOpacity:.35,shadowRadius:11,shadowOffset:{width:0,height:5},elevation:4},
  avatar:{width:56,height:56,borderRadius:28,alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  badge:{position:"absolute",top:-10,minWidth:24,height:20,borderRadius:10,backgroundColor:"#33243A",borderWidth:1,borderColor:"rgba(255,214,94,.6)",alignItems:"center",justifyContent:"center",paddingHorizontal:4},
  badgeText:{color:"#FFD65E",fontSize:9,fontWeight:"900"},
  micDot:{position:"absolute",right:-1,bottom:-2,width:23,height:23,borderRadius:12,backgroundColor:"#302B42",borderWidth:3,borderColor:"#33204F",alignItems:"center",justifyContent:"center"},
  micLive:{backgroundColor:"#42CFA2"},
  micText:{fontSize:8},
  name:{color:"#FFFFFF",fontSize:9,fontWeight:"900",marginTop:7,maxWidth:78},
  role:{color:"rgba(255,255,255,.50)",fontSize:6.5,fontWeight:"700",marginTop:2},
  hostRole:{color:"#FFD65E"},
});
