import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";

export function OtpScreen(){
  const {challengeId=""}=useLocalSearchParams<{challengeId?:string}>();
  const {draft}=useAuthDraft();
  const [otp,setOtp]=useState("");
  const [busy,setBusy]=useState(false);
  const valid=otp.length===6;
  const verify=async()=>{
    if(!valid||busy)return;
    setBusy(true); await demoAuthService.verifyOtp(challengeId,otp); setBusy(false); router.replace("/profile-setup");
  };
  return(
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.sub}>We sent a 6-digit code to +91 {draft.phone||"your number"}</Text>

      <TextInput value={otp} onChangeText={v=>setOtp(v.replace(/\D/g,"").slice(0,6))} keyboardType="number-pad" textContentType="oneTimeCode" autoFocus maxLength={6} placeholder="•  •  •  •  •  •" placeholderTextColor="#B4B5B8" style={styles.otp}/>

      <Pressable disabled={!valid||busy} onPress={verify} style={[styles.primary,(!valid||busy)&&styles.disabled]}><Text style={styles.primaryText}>{busy?"Verifying...":"Verify"}</Text></Pressable>
      <Pressable style={styles.link}><Text style={styles.linkText}>Resend OTP</Text></Pressable>
      <Text style={styles.preview}>Preview: any 6 digits will work.</Text>
    </LightAuthScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8},
  back:{width:42,height:42,justifyContent:"center"},
  backText:{color:"#6B6D71",fontSize:40,lineHeight:40,fontWeight:"300"},
  title:{color:"#181A1D",fontSize:31,fontWeight:"900",textAlign:"center",marginTop:28},
  sub:{color:"#989A9F",fontSize:12,textAlign:"center",marginTop:8,paddingHorizontal:28},
  otp:{minHeight:66,borderRadius:23,backgroundColor:"#F5F5F6",color:"#25272B",fontSize:24,fontWeight:"900",letterSpacing:7,textAlign:"center",marginHorizontal:28,marginTop:66,paddingHorizontal:14},
  primary:{minHeight:58,borderRadius:29,backgroundColor:"#27D1AC",alignItems:"center",justifyContent:"center",marginHorizontal:28,marginTop:34},
  disabled:{backgroundColor:"#A7A8AA"},
  primaryText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  link:{alignItems:"center",paddingVertical:20},
  linkText:{color:"#32CBA8",fontSize:15,fontWeight:"800"},
  preview:{color:"#ACADB1",fontSize:9,textAlign:"center",marginTop:12},
});
