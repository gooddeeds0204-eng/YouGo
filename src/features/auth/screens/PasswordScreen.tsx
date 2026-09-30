import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { useSession } from "@/core/session/SessionProvider";
import { authService } from "@/features/auth/services/authService";
import { isValidIndianPhone, normalizeIndianPhone } from "@/domains/users/profileRules";

export function PasswordScreen(){
  const params=useLocalSearchParams<{phone?:string}>();
  const {draft,updateDraft}=useAuthDraft();
  const {setUser}=useSession();
  const [phone,setPhone]=useState(normalizeIndianPhone(params.phone||draft.phone));
  const [password,setPassword]=useState("");
  const [show,setShow]=useState(false);
  const valid=isValidIndianPhone(phone)&&password.length>=4;

  const login=async()=>{
    if(!valid)return;
    updateDraft({phone});
    const user=await authService.signInWithPassword(phone,password);
    setUser(user);
    router.replace("/home");
  };

  const otp=async()=>{
    if(!isValidIndianPhone(phone))return;
    updateDraft({phone});
    const result=await authService.sendOtp(phone);
    router.push({pathname:"/otp",params:{challengeId:result.challengeId}});
  };

  return(
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>Login with password</Text>
        <Text style={styles.sub}>Use your registered mobile number and password.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Phone number</Text>
        <View style={styles.field}>
          <Text style={styles.code}>+91</Text>
          <View style={styles.divider}/>
          <TextInput value={phone} onChangeText={v=>setPhone(normalizeIndianPhone(v))} keyboardType="phone-pad" maxLength={10} placeholder="10-digit number" placeholderTextColor="#A39CAB" style={styles.input}/>
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.field}>
          <TextInput value={password} onChangeText={setPassword} secureTextEntry={!show} placeholder="Enter password" placeholderTextColor="#A39CAB" style={styles.input}/>
          <Pressable onPress={()=>setShow(v=>!v)} style={styles.show}><Text style={styles.showText}>{show?"Hide":"Show"}</Text></Pressable>
        </View>
      </View>

      <Pressable disabled={!valid} onPress={login} style={[styles.primary,!valid&&styles.disabled]}>
        <Text style={styles.primaryText}>Login</Text>
      </Pressable>

      <Pressable onPress={otp} style={styles.otpLink}><Text style={styles.otpText}>Login with OTP instead</Text></Pressable>
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
  form:{marginTop:26},
  label:{color:"#5D5764",fontSize:13,fontWeight:"800",marginBottom:7,marginTop:14},
  field:{minHeight:56,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#E8E6ED",flexDirection:"row",alignItems:"center",paddingHorizontal:14},
  code:{color:"#302B38",fontSize:14,fontWeight:"900"},
  divider:{width:1,height:26,backgroundColor:"#E6E3EA",marginHorizontal:12},
  input:{flex:1,color:"#2B2631",fontSize:14,paddingVertical:0},
  show:{paddingHorizontal:8,paddingVertical:7},
  showText:{color:"#7657F6",fontSize:12,fontWeight:"800"},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#7657F6",alignItems:"center",justifyContent:"center",marginTop:24},
  disabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  otpLink:{alignItems:"center",paddingVertical:18},
  otpText:{color:"#7657F6",fontSize:13,fontWeight:"800"},
});
