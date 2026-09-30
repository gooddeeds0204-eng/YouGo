import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export function SplashScreen(){
  const scale=useRef(new Animated.Value(.84)).current;
  const opacity=useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.parallel([
      Animated.spring(scale,{toValue:1,useNativeDriver:true,friction:6}),
      Animated.timing(opacity,{toValue:1,duration:550,useNativeDriver:true}),
    ]).start();
    const t=setTimeout(()=>router.replace("/welcome"),1350);
    return()=>clearTimeout(t);
  },[opacity,scale]);

  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light"/>
      <View style={styles.purple}/><View style={styles.pink}/><View style={styles.blue}/>
      <Text style={[styles.float,styles.m1]}>🎤</Text>
      <Text style={[styles.float,styles.m2]}>🎮</Text>
      <Text style={[styles.float,styles.m3]}>🎁</Text>
      <Text style={[styles.float,styles.m4]}>♫</Text>

      <Animated.View style={[styles.center,{opacity,transform:[{scale}]}]}>
        <View style={styles.logo}><Text style={styles.logoText}>U</Text><View style={styles.liveDot}/></View>
        <Text style={styles.name}>Ugo</Text>
        <Text style={styles.tag}>VOICE • PARTY • PLAY</Text>
      </Animated.View>

      <View style={styles.loader}><View style={styles.loaderFill}/></View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#7049F3",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  purple:{position:"absolute",width:520,height:520,borderRadius:260,backgroundColor:"#7E5CFF",top:-150,left:-160},
  pink:{position:"absolute",width:420,height:420,borderRadius:210,backgroundColor:"#F35AA6",right:-180,bottom:-100,opacity:.72},
  blue:{position:"absolute",width:320,height:320,borderRadius:160,backgroundColor:"#45C7F5",right:-130,top:150,opacity:.5},
  float:{position:"absolute",fontSize:42,opacity:.34},
  m1:{left:34,top:130,transform:[{rotate:"-14deg"}]},
  m2:{right:34,top:240,transform:[{rotate:"12deg"}]},
  m3:{left:48,bottom:170,transform:[{rotate:"-10deg"}]},
  m4:{right:58,bottom:130},
  center:{alignItems:"center"},
  logo:{width:132,height:132,borderRadius:42,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center",shadowColor:"#3E246F",shadowOpacity:.28,shadowRadius:25,shadowOffset:{width:0,height:13},elevation:12},
  logoText:{color:"#7A5CFF",fontSize:74,fontWeight:"900",letterSpacing:-4},
  liveDot:{position:"absolute",right:18,top:17,width:18,height:18,borderRadius:9,backgroundColor:"#FF5FA2",borderWidth:4,borderColor:"#FFFFFF"},
  name:{color:"#FFFFFF",fontSize:45,fontWeight:"900",letterSpacing:-1.5,marginTop:18},
  tag:{color:"rgba(255,255,255,.88)",fontSize:10,fontWeight:"900",letterSpacing:2.2,marginTop:3},
  loader:{position:"absolute",bottom:42,width:100,height:5,borderRadius:3,backgroundColor:"rgba(255,255,255,.22)",overflow:"hidden"},
  loaderFill:{width:"74%",height:"100%",backgroundColor:"#FFFFFF",borderRadius:3},
});
