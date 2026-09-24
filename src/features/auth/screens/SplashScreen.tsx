import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { UgoMark } from "@/shared/ui/UgoMark";

export function SplashScreen(){
  const scale=useRef(new Animated.Value(.88)).current;
  const opacity=useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    Animated.parallel([
      Animated.spring(scale,{toValue:1,useNativeDriver:true,friction:7}),
      Animated.timing(opacity,{toValue:1,duration:650,useNativeDriver:true}),
    ]).start();
    const t=setTimeout(()=>router.replace("/welcome"),1500);
    return()=>clearTimeout(t);
  },[opacity,scale]);

  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light"/>
      <View style={styles.blue}/>
      <View style={styles.violet}/>
      <View style={styles.pink}/>
      <Text style={[styles.float,styles.music]}>♫</Text>
      <Text style={[styles.float,styles.game]}>🎮</Text>
      <Text style={[styles.float,styles.gift]}>🎁</Text>
      <Animated.View style={[styles.center,{opacity,transform:[{scale}]}]}>
        <View style={styles.halo}><UgoMark size={110} light/></View>
        <Text style={styles.name}>Ugo</Text>
        <Text style={styles.tag}>TALK • PLAY • CONNECT</Text>
      </Animated.View>
      <View style={styles.loader}><View style={styles.loaderFill}/></View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#09163B",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  blue:{position:"absolute",width:520,height:520,borderRadius:260,backgroundColor:"#073FE0",top:-160,left:-190,opacity:.65},
  violet:{position:"absolute",width:470,height:470,borderRadius:235,backgroundColor:"#7B22E4",right:-210,top:120,opacity:.58},
  pink:{position:"absolute",width:430,height:430,borderRadius:215,backgroundColor:"#F02FB6",left:-190,bottom:-190,opacity:.55},
  float:{position:"absolute",fontSize:46,opacity:.65},
  music:{top:120,left:32,transform:[{rotate:"-10deg"}]},
  game:{right:28,top:210,transform:[{rotate:"13deg"}]},
  gift:{left:46,bottom:160,transform:[{rotate:"-12deg"}]},
  center:{alignItems:"center"},
  halo:{width:190,height:190,borderRadius:65,backgroundColor:"rgba(255,255,255,.08)",borderWidth:1,borderColor:"rgba(255,255,255,.22)",alignItems:"center",justifyContent:"center",shadowColor:"#FFFFFF",shadowOpacity:.25,shadowRadius:28,shadowOffset:{width:0,height:10}},
  name:{color:"#FFFFFF",fontSize:48,fontWeight:"900",letterSpacing:-2,marginTop:24},
  tag:{color:"rgba(255,255,255,.88)",fontSize:10,fontWeight:"900",letterSpacing:2.1,marginTop:5},
  loader:{position:"absolute",bottom:46,width:92,height:4,borderRadius:2,backgroundColor:"rgba(255,255,255,.16)",overflow:"hidden"},
  loaderFill:{width:"68%",height:"100%",backgroundColor:"#FFFFFF",borderRadius:2},
});
