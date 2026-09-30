import { Tabs } from "expo-router";
import { Text, View } from "react-native";

const TabIcon=({symbol,focused}:{symbol:string;focused:boolean})=>(
  <View style={{
    width:40,height:36,borderRadius:16,alignItems:"center",justifyContent:"center",
    backgroundColor:focused?"#EEE9FF":"transparent"
  }}>
    <Text style={{fontSize:21,color:focused?"#7050EE":"#9E98A8",fontWeight:"800"}}>{symbol}</Text>
  </View>
);

export default function TabsLayout(){
  return(
    <Tabs screenOptions={{
      headerShown:false,
      tabBarStyle:{
        backgroundColor:"#FFFFFF",
        borderTopColor:"#ECEAF2",
        height:82,
        paddingTop:7,
        paddingBottom:10,
        position:"absolute",
        elevation:10,
      },
      tabBarActiveTintColor:"#7050EE",
      tabBarInactiveTintColor:"#9E98A8",
      tabBarLabelStyle:{fontSize:11,fontWeight:"800",marginTop:1}
    }}>
      <Tabs.Screen name="home" options={{title:"Home",tabBarIcon:({focused})=><TabIcon symbol="⌂" focused={focused}/>}}/>
      <Tabs.Screen name="discover" options={{title:"Explore",tabBarIcon:({focused})=><TabIcon symbol="◉" focused={focused}/>}}/>
      <Tabs.Screen name="create" options={{
        title:"Room",
        tabBarIcon:()=>(
          <View style={{width:54,height:54,borderRadius:27,marginTop:-16,alignItems:"center",justifyContent:"center",backgroundColor:"#7657F6",borderWidth:4,borderColor:"#FFFFFF",elevation:8}}>
            <Text style={{color:"#FFFFFF",fontSize:28,lineHeight:30,fontWeight:"500"}}>＋</Text>
          </View>
        )
      }}/>
      <Tabs.Screen name="messages" options={{title:"Inbox",tabBarIcon:({focused})=><TabIcon symbol="✉" focused={focused}/>}}/>
      <Tabs.Screen name="profile" options={{title:"Profile",tabBarIcon:({focused})=><TabIcon symbol="♙" focused={focused}/>}}/>
    </Tabs>
  );
}
