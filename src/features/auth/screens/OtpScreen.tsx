import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { authService } from "@/features/auth/services/authService";
import { useSession } from "@/core/session/SessionProvider";

export function OtpScreen(){
  const {challengeId=""}=useLocalSearchParams<{challengeId?:string}>();
  const {draft}=useAuthDraft();
  const {refreshUser}=useSession();
  const [otp,setOtp]=useState("");
  const [busy,setBusy]=useState(false);
  const valid=otp.length===6;

  const verify=async()=>{
    if(!valid||busy)return;
    setBusy(true);
    try{
      const result=await authService.verifyOtp(challengeId,otp);
      await refreshUser();
      router.replace(result.isNewUser?"/profile-setup":"/home");
    }catch(error:any){
      Alert.alert(
        "Verification failed",
        error?.message || "Check the OTP and try again.",
      );
    }finally{
      setBusy(false);
    }
  };

  return(
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.sub}>Enter the 6-digit code sent to +91 {draft.phone||"your number"}.</Text>
      </View>

      <TextInput
        value={otp}
        onChangeText={v=>setOtp(v.replace(/\D/g,"").slice(0,6))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoFocus
        maxLength={6}
        placeholder="• • • • • •"
        placeholderTextColor="#B5AFBC"
        style={styles.otp}
      />

      <Pressable disabled={!valid||busy} onPress={verify} style={[styles.primary,(!valid||busy)&&styles.disabled]}>
        <Text style={styles.primaryText}>{busy?"Verifying...":"Verify"}</Text>
      </Pressable>

      <Pressable onPress={async()=>{
        try{
          await authService.sendOtp(draft.phone);
          Alert.alert("OTP sent","A new verification code was sent.");
        }catch(error:any){
          Alert.alert("Could not resend OTP",error?.message||"Try again shortly.");
        }
      }} style={styles.link}>
        <Text style={styles.linkText}>Didn't get the code? <Text style={styles.strong}>Resend</Text></Text>
      </Pressable>
    </LightAuthScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:20},
  back:{width:44,height:44,justifyContent:"center"},
  backText:{color:"#4E4858",fontSize:38,lineHeight:38},
  header:{marginTop:34},
  title:{color:"#211D2C",fontSize:28,fontWeight:"900"},
  sub:{color:"#7F7889",fontSize:14,lineHeight:20,marginTop:7},
  otp:{minHeight:64,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#E8E6ED",color:"#2A2530",fontSize:24,fontWeight:"900",letterSpacing:8,textAlign:"center",marginTop:30},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",marginTop:16},
  disabled:{backgroundColor:"#C9C5D2"},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  link:{alignItems:"center",paddingVertical:18},
  linkText:{color:"#8A8391",fontSize:13},
  strong:{color:"#7054E8",fontWeight:"900"},
});
