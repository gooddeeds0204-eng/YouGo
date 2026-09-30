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
  wrap:{flexDirection:"row",backgroundColor:"rgba(255,255,255,.08)",borderRadius:18,padding:4,marginTop:14},
  tab:{flex:1,minHeight:48,borderRadius:15,alignItems:"center",justifyContent:"center",flexDirection:"row",gap:7},
  active:{backgroundColor:"#FFFFFF"},
  icon:{fontSize:17},
  text:{color:"rgba(255,255,255,.62)",fontSize:13,fontWeight:"800"},
  activeText:{color:"#694BE6"},
});
