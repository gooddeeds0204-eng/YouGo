import { Pressable, StyleSheet, Text, View } from "react-native";
import type { RoomMode } from "@/contracts/room";

type Props={mode:RoomMode;onChange:(mode:RoomMode)=>void};

const items:Array<{id:RoomMode;icon:string;label:string}>=[
  {id:"voice",icon:"🎙",label:"Voice"},
  {id:"video",icon:"🎥",label:"Video"},
  {id:"game",icon:"🎮",label:"Game"},
];

export function RoomModeTabs({mode,onChange}:Props){
  return(
    <View style={styles.wrap}>
      {items.map(item=>{
        const active=mode===item.id;
        return(
          <Pressable key={item.id} onPress={()=>onChange(item.id)} style={[styles.tab,active&&styles.active]}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={[styles.text,active&&styles.activeText]}>{item.label}</Text>
            {active?<View style={styles.activeLine}/>:null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{flexDirection:"row",backgroundColor:"rgba(255,255,255,.055)",borderRadius:18,padding:4,marginTop:14,borderWidth:1,borderColor:"rgba(255,255,255,.07)"},
  tab:{flex:1,minHeight:48,borderRadius:14,alignItems:"center",justifyContent:"center",flexDirection:"row",gap:7},
  active:{backgroundColor:"rgba(255,255,255,.10)"},
  icon:{fontSize:16},
  text:{color:"rgba(255,255,255,.54)",fontSize:13,fontWeight:"800"},
  activeText:{color:"#FFFFFF"},
  activeLine:{position:"absolute",bottom:0,width:34,height:2,borderRadius:1,backgroundColor:"#E8B95A"},
});
