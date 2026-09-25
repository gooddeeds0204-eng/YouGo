import { StyleSheet, Text, View } from "react-native";

type Props={seatCount:number};

const seats=[
  {name:"Neha",initial:"N",role:"HOST",tone:"#C54788",ring:"#FFD56A",badge:"♛"},
  {name:"Arjun",initial:"A",role:"ADMIN",tone:"#3976C8",ring:"#76D8FF",badge:"A"},
  {name:"Priya",initial:"P",role:"VIP 5",tone:"#7648D7",ring:"#F09BFF",badge:"V"},
  {name:"Ravi",initial:"R",role:"LV.31",tone:"#D0783D",ring:"#FFC857",badge:""},
  {name:"Sneha",initial:"S",role:"LV.28",tone:"#2F9F8A",ring:"#63E2C4",badge:""},
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
              <View style={[styles.avatar,{backgroundColor:occupied?seat.tone:"#171A28"}]}>
                <Text style={styles.avatarText}>{occupied?seat.initial:"＋"}</Text>
              </View>
              {seat?.badge?<View style={styles.crown}><Text style={styles.crownText}>{seat.badge}</Text></View>:null}
              <View style={[styles.micDot,occupied&&styles.micLive]}><Text style={styles.micText}>{occupied?"🎤":"•"}</Text></View>
            </View>
            <Text numberOfLines={1} style={styles.name}>{occupied?seat.name:"Seat "+(index+1)}</Text>
            <Text style={[styles.role,seat?.role==="HOST"&&styles.hostRole]}>{occupied?seat.role:"OPEN"}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles=StyleSheet.create({
  grid:{flexDirection:"row",flexWrap:"wrap",rowGap:14,marginTop:14},
  seat:{width:"25%",alignItems:"center"},
  frame:{width:58,height:58,borderRadius:29,borderWidth:2,borderColor:"rgba(255,255,255,.10)",alignItems:"center",justifyContent:"center",shadowOpacity:.38,shadowRadius:10,shadowOffset:{width:0,height:4},elevation:4},
  avatar:{width:48,height:48,borderRadius:24,alignItems:"center",justifyContent:"center",overflow:"hidden"},
  avatarText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  crown:{position:"absolute",top:-9,minWidth:22,height:18,borderRadius:9,backgroundColor:"#1A1428",borderWidth:1,borderColor:"rgba(255,213,106,.45)",alignItems:"center",justifyContent:"center",paddingHorizontal:4},
  crownText:{color:"#FFD56A",fontSize:8,fontWeight:"900"},
  micDot:{position:"absolute",right:-1,bottom:-2,width:20,height:20,borderRadius:10,backgroundColor:"#171A28",borderWidth:2,borderColor:"#080912",alignItems:"center",justifyContent:"center"},
  micLive:{backgroundColor:"#25B987"},
  micText:{fontSize:7},
  name:{color:"#FFFFFF",fontSize:7.5,fontWeight:"800",marginTop:5,maxWidth:70},
  role:{color:"#6F7589",fontSize:5.5,fontWeight:"800",marginTop:2},
  hostRole:{color:"#FFD56A"},
});
