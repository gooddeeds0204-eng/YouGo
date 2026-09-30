import { Tabs } from "expo-router";
import { Text, View } from "react-native";

const TabIcon=({symbol,focused}:{symbol:string;focused:boolean})=>(
  <View style={{
    width:38,height:38,borderRadius:19,alignItems:"center",justifyContent:"center",
    backgroundColor:focused?"#EEE9FF":"transparent"
  }}>
    <Text style={{fontSize:19,color:focused?"#7050EE":"#AAA4B5"}}>{symbol}</Text>
  </View>
);

export default function TabsLayout(){
  return(
    <Tabs screenOptions={{
      headerShown:false,
      tabBarStyle:{
        backgroundColor:"#FFFFFF",
        borderTopColor:"rgba(85,67,125,.08)",
        height:76,
        paddingTop:7,
        paddingBottom:8,
        position:"absolute",
        shadowColor:"#5A4D78",
        shadowOpacity:.08,
        shadowRadius:12,
        elevation:8,
      },
      tabBarActiveTintColor:"#7050EE",
      tabBarInactiveTintColor:"#A7A0B2",
      tabBarLabelStyle:{fontSize:8,fontWeight:"800"}
    }}>
      <Tabs.Screen name="home" options={{title:"Home",tabBarIcon:({focused})=><TabIcon symbol="⌂" focused={focused}/>}}/>
      <Tabs.Screen name="discover" options={{title:"Explore",tabBarIcon:({focused})=><TabIcon symbol="◉" focused={focused}/>}}/>
      <Tabs.Screen name="create" options={{
        title:"Party",
        tabBarLabelStyle:{fontSize:8,fontWeight:"900",color:"#7050EE"},
        tabBarIcon:()=>(
          <View style={{
            width:54,height:54,borderRadius:27,marginTop:-20,alignItems:"center",justifyContent:"center",
            backgroundColor:"#7A5CFF",borderWidth:5,borderColor:"#FFFFFF",
            shadowColor:"#7A5CFF",shadowOpacity:.28,shadowRadius:14,shadowOffset:{width:0,height:7},elevation:9
          }}>
            <Text style={{color:"#FFFFFF",fontSize:27,lineHeight:29,fontWeight:"500"}}>＋</Text>
          </View>
        )
      }}/>
      <Tabs.Screen name="messages" options={{title:"Inbox",tabBarIcon:({focused})=><TabIcon symbol="✉" focused={focused}/>}}/>
      <Tabs.Screen name="profile" options={{title:"Me",tabBarIcon:({focused})=><TabIcon symbol="♙" focused={focused}/>}}/>
    </Tabs>
  );
}
