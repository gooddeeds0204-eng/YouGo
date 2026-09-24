import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { useSession } from "@/core/session/SessionProvider";
import { demoAuthService } from "@/features/auth/services/authService";
import { isValidIndianPhone, normalizeIndianPhone } from "@/domains/users/profileRules";

export function PasswordScreen(){
  const params=useLocalSearchParams<{phone?:string}>();
  const {draft,updateDraft}=useAuthDraft();
  const {setUser}=useSession();
  const [phone,setPhone]=useState(normalizeIndianPhone(params.phone||draft.phone));
  const [password,setPassword]=useState("");
  const [show,setShow]=useState(false);
  const valid=isValidIndianPhone(phone)&&password.length>=4;

  const login=()=>{
    if(!valid)return;
    updateDraft({phone});
    setUser({id:"demo-user",displayName:"Ugo User"});
    router.replace("/home");
  };

  const otp=async()=>{
    if(!isValidIndianPhone(phone))return;
    updateDraft({phone});
    const r=await demoAuthService.sendOtp(phone);
    router.push({pathname:"/otp",params:{challengeId:r.challengeId}});
  };

  return(
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
      <Text style={styles.title}>Phone login</Text>
      <Text style={styles.sub}>Use your number and password.</Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Pressable style={styles.code}><Text style={styles.codeText}>+91</Text><Text style={styles.chev}>⌄</Text></Pressable>
          <View style={styles.divider}/>
          <TextInput value={phone} onChangeText={v=>setPhone(normalizeIndianPhone(v))} keyboardType="phone-pad" placeholder="Phone number" placeholderTextColor="#A1A3A8" maxLength={10} style={styles.input}/>
        </View>
        <View style={styles.field}>
          <TextInput value={password} onChangeText={setPassword} secureTextEntry={!show} placeholder="Password" placeholderTextColor="#A1A3A8" style={styles.password}/>
          <Pressable onPress={()=>setShow(v=>!v)}><Text style={styles.eye}>{show?"◉":"◌"}</Text></Pressable>
        </View>

        <Pressable disabled={!valid} onPress={login} style={[styles.primary,!valid&&styles.disabled]}><Text style={styles.primaryText}>Login</Text></Pressable>
        <Pressable onPress={otp} style={styles.link}><Text style={styles.linkText}>OTP verification</Text></Pressable>
      </View>
    </LightAuthScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8},
  back:{width:42,height:42,justifyContent:"center"},
  backText:{color:"#6B6D71",fontSize:40,lineHeight:40,fontWeight:"300"},
  title:{color:"#181A1D",fontSize:31,fontWeight:"900",textAlign:"center",marginTop:28},
  sub:{color:"#989A9F",fontSize:12,textAlign:"center",marginTop:8},
  form:{marginTop:64,paddingHorizontal:28,gap:18},
  field:{minHeight:64,borderRadius:23,backgroundColor:"#F5F5F6",flexDirection:"row",alignItems:"center",paddingHorizontal:16},
  code:{flexDirection:"row",alignItems:"center",gap:9},
  codeText:{color:"#26282C",fontSize:18,fontWeight:"800"},
  chev:{color:"#34363A",fontSize:18},
  divider:{width:1,height:25,backgroundColor:"#DDDEE2",marginHorizontal:13},
  input:{flex:1,color:"#25272B",fontSize:17},
  password:{flex:1,color:"#25272B",fontSize:17},
  eye:{color:"#96989D",fontSize:24,paddingHorizontal:4},
  primary:{minHeight:58,borderRadius:29,backgroundColor:"#27D1AC",alignItems:"center",justifyContent:"center",marginTop:12},
  disabled:{backgroundColor:"#A7A8AA"},
  primaryText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  link:{alignItems:"center",paddingVertical:2},
  linkText:{color:"#32CBA8",fontSize:15,fontWeight:"800"},
});
