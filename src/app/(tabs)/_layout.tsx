import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { colors } from "@/shared/theme";

const TabIcon=({symbol,focused}:{symbol:string;focused:boolean})=>(
  <View style={{
    width:34,height:34,borderRadius:17,alignItems:"center",justifyContent:"center",
    backgroundColor:focused?"rgba(232,60,185,0.15)":"transparent"
  }}>
    <Text style={{fontSize:18,opacity:focused?1:.55,color:focused?colors.text:colors.textMuted}}>{symbol}</Text>
  </View>
);

export default function TabsLayout(){
  return(
    <Tabs screenOptions={{
      headerShown:false,
      tabBarStyle:{
        backgroundColor:"#0B0D16",
        borderTopColor:"rgba(255,255,255,0.06)",
        height:74,
        paddingTop:7,
        paddingBottom:8,
        position:"absolute"
      },
      tabBarActiveTintColor:"#FFFFFF",
      tabBarInactiveTintColor:"#6F7488",
      tabBarLabelStyle:{fontSize:7,fontWeight:"800"}
    }}>
      <Tabs.Screen name="home" options={{title:"Home",tabBarIcon:({focused})=><TabIcon symbol="⌂" focused={focused}/>}}/>
      <Tabs.Screen name="discover" options={{title:"Discover",tabBarIcon:({focused})=><TabIcon symbol="◉" focused={focused}/>}}/>
      <Tabs.Screen name="create" options={{
        title:"Room",
        tabBarLabelStyle:{fontSize:7,fontWeight:"900",color:"#FFFFFF"},
        tabBarIcon:({focused})=>(
          <View style={{
            width:48,height:48,borderRadius:24,marginTop:-18,alignItems:"center",justifyContent:"center",
            backgroundColor:"#E83CB9",borderWidth:4,borderColor:"#0B0D16",
            shadowColor:"#E83CB9",shadowOpacity:.45,shadowRadius:14,shadowOffset:{width:0,height:5},elevation:9
          }}>
            <Text style={{color:"#FFFFFF",fontSize:26,lineHeight:28,fontWeight:"500"}}>＋</Text>
          </View>
        )
      }}/>
      <Tabs.Screen name="messages" options={{title:"Messages",tabBarIcon:({focused})=><TabIcon symbol="✉" focused={focused}/>}}/>
      <Tabs.Screen name="profile" options={{title:"Profile",tabBarIcon:({focused})=><TabIcon symbol="♙" focused={focused}/>}}/>
    </Tabs>
  );
}
