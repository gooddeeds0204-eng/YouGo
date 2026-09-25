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
          </Pressable>
        );
      })}
    </View>
  );
}

const styles=StyleSheet.create({
  wrap:{flexDirection:"row",backgroundColor:"rgba(17,19,30,.90)",borderRadius:18,padding:4,marginTop:10,borderWidth:1,borderColor:"rgba(255,255,255,.06)"},
  tab:{flex:1,minHeight:40,borderRadius:14,alignItems:"center",justifyContent:"center",flexDirection:"row",gap:5},
  active:{backgroundColor:"#2A173B",borderWidth:1,borderColor:"rgba(232,60,185,.28)"},
  icon:{fontSize:13},
  text:{color:"#747A8E",fontSize:7.5,fontWeight:"900"},
  activeText:{color:"#FFFFFF"},
});
