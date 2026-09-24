import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { demoAuthService } from "@/features/auth/services/authService";
import { isValidIndianPhone, normalizeIndianPhone } from "@/domains/users/profileRules";

export function PhoneScreen(){
  const {draft,updateDraft}=useAuthDraft();
  const [phone,setPhone]=useState(draft.phone);
  const [busy,setBusy]=useState(false);
  const valid=isValidIndianPhone(phone);

  const next=async()=>{
    const normalized=normalizeIndianPhone(phone);
    if(!isValidIndianPhone(normalized)||busy)return;
    setBusy(true); updateDraft({phone:normalized});
    const result=await demoAuthService.sendOtp(normalized);
    setBusy(false);
    router.push({pathname:"/otp",params:{challengeId:result.challengeId}});
  };

  return(
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
      <Text style={styles.title}>Phone number</Text>
      <Text style={styles.sub}>Enter your mobile number to continue.</Text>

      <View style={styles.form}>
        <View style={[styles.field,valid&&styles.fieldValid]}>
          <Pressable style={styles.code}><Text style={styles.codeText}>+91</Text><Text style={styles.chev}>⌄</Text></Pressable>
          <View style={styles.divider}/>
          <TextInput value={phone} onChangeText={v=>setPhone(normalizeIndianPhone(v))} keyboardType="phone-pad" placeholder="99966 55522" placeholderTextColor="#A1A3A8" maxLength={10} autoFocus style={styles.input}/>
        </View>

        <Pressable disabled={!valid||busy} onPress={next} style={[styles.primary,(!valid||busy)&&styles.disabled]}>
          <Text style={styles.primaryText}>{busy?"Sending...":"Continue"}</Text>
        </Pressable>

        <Pressable onPress={()=>router.push({pathname:"/password",params:{phone}})} style={styles.link}>
          <Text style={styles.linkText}>Login with password</Text>
        </Pressable>
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
  form:{marginTop:70,paddingHorizontal:28},
  field:{minHeight:64,borderRadius:23,backgroundColor:"#F5F5F6",flexDirection:"row",alignItems:"center",paddingHorizontal:16,borderWidth:1,borderColor:"transparent"},
  fieldValid:{borderColor:"#BFECE1",backgroundColor:"#F4FAF8"},
  code:{flexDirection:"row",alignItems:"center",gap:9},
  codeText:{color:"#26282C",fontSize:18,fontWeight:"800"},
  chev:{color:"#34363A",fontSize:18},
  divider:{width:1,height:25,backgroundColor:"#DDDEE2",marginHorizontal:13},
  input:{flex:1,color:"#25272B",fontSize:17,fontWeight:"500"},
  primary:{minHeight:58,borderRadius:29,backgroundColor:"#27D1AC",alignItems:"center",justifyContent:"center",marginTop:34,shadowColor:"#27D1AC",shadowOpacity:.22,shadowRadius:14,shadowOffset:{width:0,height:7},elevation:4},
  disabled:{backgroundColor:"#A7A8AA",shadowOpacity:0},
  primaryText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  link:{alignItems:"center",paddingVertical:20},
  linkText:{color:"#32CBA8",fontSize:15,fontWeight:"800"},
});
