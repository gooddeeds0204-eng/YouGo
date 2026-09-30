import { StyleSheet, Text, View } from "react-native";

type Props={seatCount:number};

const seats=[
  {name:"Mehek",initial:"M",role:"HOST",tone:"#F768A7",ring:"#F8C957",badge:"♛"},
  {name:"Arjun",initial:"A",role:"ADMIN",tone:"#5C8EF2",ring:"#8DD8FF",badge:"A"},
  {name:"Priya",initial:"P",role:"VIP 5",tone:"#8B65E8",ring:"#E1A8FF",badge:"V"},
];

export function SeatGrid({seatCount}:Props){
  return(
    <View style={styles.grid}>
      {Array.from({length:seatCount}).map((_,index)=>{
        const seat=seats[index];
        const occupied=Boolean(seat);
        return(
          <View key={index} style={styles.seat}>
            <View style={[styles.frame,occupied&&{borderColor:seat.ring}]}>
              <View style={[styles.avatar,{backgroundColor:occupied?seat.tone:"rgba(255,255,255,.08)"}]}>
                <Text style={styles.avatarText}>{occupied?seat.initial:"🎤"}</Text>
              </View>
              {seat?.badge?<View style={styles.badge}><Text style={styles.badgeText}>{seat.badge}</Text></View>:null}
              {occupied?<View style={styles.micDot}><Text style={styles.micText}>●</Text></View>:null}
            </View>
            <Text numberOfLines={1} style={styles.name}>{occupied?seat.name:"Seat "+(index+1)}</Text>
            <Text style={[styles.role,seat?.role==="HOST"&&styles.hostRole]}>{occupied?seat.role:"Open"}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles=StyleSheet.create({
  grid:{flexDirection:"row",flexWrap:"wrap",rowGap:20,marginTop:16},
  seat:{width:"25%",alignItems:"center"},
  frame:{width:66,height:66,borderRadius:33,borderWidth:3,borderColor:"rgba(255,255,255,.18)",alignItems:"center",justifyContent:"center"},
  avatar:{width:54,height:54,borderRadius:27,alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  badge:{position:"absolute",top:-9,minWidth:24,height:20,borderRadius:10,backgroundColor:"#2C2538",borderWidth:1,borderColor:"rgba(248,201,87,.65)",alignItems:"center",justifyContent:"center",paddingHorizontal:4},
  badgeText:{color:"#F8C957",fontSize:10,fontWeight:"900"},
  micDot:{position:"absolute",right:-2,bottom:-2,width:22,height:22,borderRadius:11,backgroundColor:"#3BC795",borderWidth:3,borderColor:"#2A2137",alignItems:"center",justifyContent:"center"},
  micText:{color:"#FFFFFF",fontSize:7},
  name:{color:"#FFFFFF",fontSize:12,fontWeight:"800",marginTop:7,maxWidth:78},
  role:{color:"rgba(255,255,255,.52)",fontSize:10,fontWeight:"600",marginTop:2},
  hostRole:{color:"#F8C957"},
});
