import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { authService } from "@/features/auth/services/authService";

export function OtpScreen(){
  const {challengeId=""}=useLocalSearchParams<{challengeId?:string}>();
  const {draft}=useAuthDraft();
  const [otp,setOtp]=useState("");
  const [busy,setBusy]=useState(false);
  const valid=otp.length===6;

  const verify=async()=>{
    if(!valid||busy)return;
    setBusy(true);
    try{await authService.verifyOtp(challengeId,otp);router.replace("/profile-setup");}
    finally{setBusy(false);}
  };

  return(
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>

      <View style={styles.hero}>
        <View style={styles.codeBubble}><Text style={styles.codeEmoji}>🔐</Text></View>
        <Text style={styles.title}>Enter verification code</Text>
        <Text style={styles.sub}>Code sent to +91 {draft.phone||"your number"}</Text>
      </View>

      <View style={styles.card}>
        <TextInput value={otp} onChangeText={v=>setOtp(v.replace(/\D/g,"").slice(0,6))} keyboardType="number-pad" textContentType="oneTimeCode" autoFocus maxLength={6} placeholder="•  •  •  •  •  •" placeholderTextColor="#B7B0C4" style={styles.otp}/>
        <Pressable disabled={!valid||busy} onPress={verify} style={[styles.primary,(!valid||busy)&&styles.disabled]}><Text style={styles.primaryText}>{busy?"Checking...":"Verify & continue"}</Text></Pressable>
        <Pressable style={styles.link}><Text style={styles.linkText}>Didn't get it? <Text style={styles.strong}>Resend OTP</Text></Text></Pressable>
      </View>

      <View style={styles.preview}><Text style={styles.previewIcon}>✨</Text><Text style={styles.previewText}>Preview build: any 6 digits will work.</Text></View>
    </LightAuthScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:18},
  back:{width:42,height:42,justifyContent:"center"},
  backText:{color:"#554D68",fontSize:40,lineHeight:40,fontWeight:"300"},
  hero:{alignItems:"center",marginTop:18},
  codeBubble:{width:92,height:92,borderRadius:30,backgroundColor:"#FFE9F3",alignItems:"center",justifyContent:"center"},
  codeEmoji:{fontSize:40},
  title:{color:"#261F39",fontSize:27,fontWeight:"900",textAlign:"center",marginTop:18},
  sub:{color:"#8D869E",fontSize:12,textAlign:"center",marginTop:7},
  card:{backgroundColor:"#FFFFFF",borderRadius:28,padding:18,marginTop:28,shadowColor:"#76699A",shadowOpacity:.09,shadowRadius:14,shadowOffset:{width:0,height:7},elevation:3},
  otp:{minHeight:64,borderRadius:20,backgroundColor:"#F8F7FB",color:"#2B253A",fontSize:23,fontWeight:"900",letterSpacing:7,textAlign:"center",paddingHorizontal:12,borderWidth:1.5,borderColor:"#EEEAF4"},
  primary:{minHeight:58,borderRadius:20,backgroundColor:"#7A5CFF",alignItems:"center",justifyContent:"center",marginTop:16},
  disabled:{backgroundColor:"#CDC7DD"},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  link:{alignItems:"center",paddingTop:16},
  linkText:{color:"#938CA2",fontSize:10},
  strong:{color:"#7A5CFF",fontWeight:"900"},
  preview:{marginTop:"auto",alignSelf:"center",flexDirection:"row",alignItems:"center",backgroundColor:"#F1EDFF",borderRadius:16,paddingHorizontal:13,paddingVertical:9},
  previewIcon:{fontSize:13,marginRight:5},
  previewText:{color:"#7C7393",fontSize:8.5,fontWeight:"700"},
});
