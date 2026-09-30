import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export function SplashScreen(){
  const scale=useRef(new Animated.Value(.90)).current;
  const opacity=useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.parallel([
      Animated.spring(scale,{toValue:1,useNativeDriver:true,friction:7}),
      Animated.timing(opacity,{toValue:1,duration:520,useNativeDriver:true}),
    ]).start();

    const timer=setTimeout(()=>router.replace("/welcome"),1350);
    return()=>clearTimeout(timer);
  },[opacity,scale]);

  return(
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light"/>
      <View style={styles.orbPurple}/><View style={styles.orbGold}/><View style={styles.orbPink}/>

      <Animated.View style={[styles.center,{opacity,transform:[{scale}]}]}>
        <View style={styles.logoHalo}>
          <View style={styles.logoRing}>
            <View style={styles.logo}><Text style={styles.logoText}>U</Text></View>
          </View>
        </View>
        <Text style={styles.name}>Ugo</Text>
        <Text style={styles.tag}>VOICE • PARTY • PLAY</Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.goldDot}/>
        <Text style={styles.footerText}>Premium social rooms</Text>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#17131F",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  orbPurple:{position:"absolute",width:420,height:420,borderRadius:210,backgroundColor:"rgba(112,84,232,.24)",right:-210,top:-140},
  orbGold:{position:"absolute",width:260,height:260,borderRadius:130,backgroundColor:"rgba(232,185,90,.07)",left:-130,bottom:40},
  orbPink:{position:"absolute",width:250,height:250,borderRadius:125,backgroundColor:"rgba(240,91,145,.08)",right:-145,bottom:-80},
  center:{alignItems:"center"},
  logoHalo:{width:154,height:154,borderRadius:52,backgroundColor:"rgba(232,185,90,.07)",alignItems:"center",justifyContent:"center"},
  logoRing:{width:136,height:136,borderRadius:46,borderWidth:1.5,borderColor:"rgba(232,185,90,.55)",alignItems:"center",justifyContent:"center"},
  logo:{width:118,height:118,borderRadius:40,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",shadowColor:"#7054E8",shadowOpacity:.35,shadowRadius:24,shadowOffset:{width:0,height:12},elevation:10},
  logoText:{color:"#FFFFFF",fontSize:66,fontWeight:"900"},
  name:{color:"#FFFFFF",fontSize:40,fontWeight:"900",letterSpacing:-1,marginTop:20},
  tag:{color:"#E8B95A",fontSize:10,fontWeight:"900",letterSpacing:2,marginTop:5},
  footer:{position:"absolute",bottom:36,flexDirection:"row",alignItems:"center"},
  goldDot:{width:7,height:7,borderRadius:4,backgroundColor:"#E8B95A",marginRight:7},
  footerText:{color:"rgba(255,255,255,.46)",fontSize:10,fontWeight:"700"},
});
