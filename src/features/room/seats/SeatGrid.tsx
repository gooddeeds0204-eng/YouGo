import { StyleSheet, Text, View } from "react-native";

type Props={seatCount:number};

const seats=[
  {name:"Mehek",initial:"M",role:"HOST",tone:"#CF5A8C",ring:"#E8B95A",badge:"♛"},
  {name:"Arjun",initial:"A",role:"ADMIN",tone:"#4F7BC7",ring:"#8CBFE7",badge:"A"},
  {name:"Priya",initial:"P",role:"VIP 5",tone:"#765ACD",ring:"#BAA6FF",badge:"V"},
];

export function SeatGrid({seatCount}:Props){
  return(
    <View style={styles.grid}>
      {Array.from({length:seatCount}).map((_,index)=>{
        const seat=seats[index];
        const occupied=Boolean(seat);
        return(
          <View key={index} style={styles.seat}>
            <View style={[styles.halo,occupied&&{backgroundColor:seat.ring+"22"}]}>
              <View style={[styles.frame,occupied&&{borderColor:seat.ring}]}>
                <View style={[styles.avatar,{backgroundColor:occupied?seat.tone:"rgba(255,255,255,.055)"}]}>
                  <Text style={[styles.avatarText,!occupied&&styles.openIcon]}>{occupied?seat.initial:"🎤"}</Text>
                </View>
                {seat?.badge?<View style={styles.badge}><Text style={styles.badgeText}>{seat.badge}</Text></View>:null}
                {occupied?<View style={styles.micDot}><View style={styles.micCore}/></View>:null}
              </View>
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
  grid:{flexDirection:"row",flexWrap:"wrap",rowGap:22,marginTop:16},
  seat:{width:"25%",alignItems:"center"},
  halo:{width:72,height:72,borderRadius:36,alignItems:"center",justifyContent:"center"},
  frame:{width:66,height:66,borderRadius:33,borderWidth:2.5,borderColor:"rgba(255,255,255,.14)",alignItems:"center",justifyContent:"center"},
  avatar:{width:54,height:54,borderRadius:27,alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  openIcon:{fontSize:17,opacity:.62},
  badge:{position:"absolute",top:-10,minWidth:25,height:20,borderRadius:10,backgroundColor:"#211A2B",borderWidth:1,borderColor:"rgba(232,185,90,.48)",alignItems:"center",justifyContent:"center",paddingHorizontal:5},
  badgeText:{color:"#E8B95A",fontSize:10,fontWeight:"900"},
  micDot:{position:"absolute",right:-1,bottom:-1,width:22,height:22,borderRadius:11,backgroundColor:"#1B1623",borderWidth:2,borderColor:"#3A2B47",alignItems:"center",justifyContent:"center"},
  micCore:{width:8,height:8,borderRadius:4,backgroundColor:"#4CCDA4"},
  name:{color:"#FFFFFF",fontSize:12,fontWeight:"800",marginTop:7,maxWidth:78},
  role:{color:"rgba(255,255,255,.43)",fontSize:10,fontWeight:"600",marginTop:2},
  hostRole:{color:"#E8B95A"},
});
