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
  wrap:{flexDirection:"row",backgroundColor:"rgba(255,255,255,.10)",borderRadius:20,padding:4,marginTop:10,borderWidth:1,borderColor:"rgba(255,255,255,.08)"},
  tab:{flex:1,minHeight:44,borderRadius:16,alignItems:"center",justifyContent:"center",flexDirection:"row",gap:6},
  active:{backgroundColor:"#FFFFFF"},
  icon:{fontSize:15},
  text:{color:"rgba(255,255,255,.62)",fontSize:10,fontWeight:"900"},
  activeText:{color:"#6C4DF0"},
});
