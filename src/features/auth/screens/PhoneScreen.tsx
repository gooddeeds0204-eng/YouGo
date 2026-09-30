import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { LightAuthScreen } from "@/features/auth/components/LightAuthScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { authService } from "@/features/auth/services/authService";
import { isValidIndianPhone, normalizeIndianPhone } from "@/domains/users/profileRules";

export function PhoneScreen(){
  const {draft,updateDraft}=useAuthDraft();
  const [phone,setPhone]=useState(draft.phone);
  const [busy,setBusy]=useState(false);
  const valid=isValidIndianPhone(phone);

  const next=async()=>{
    const normalized=normalizeIndianPhone(phone);
    if(!isValidIndianPhone(normalized)||busy)return;
    setBusy(true);
    try{
      updateDraft({phone:normalized});
      const result=await authService.sendOtp(normalized);
      router.push({pathname:"/otp",params:{challengeId:result.challengeId}});
    }finally{setBusy(false);}
  };

  return(
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>

      <View style={styles.hero}>
        <View style={styles.phoneBubble}><Text style={styles.phoneEmoji}>📱</Text></View>
        <Text style={styles.title}>Your phone, your Ugo ID</Text>
        <Text style={styles.sub}>We'll send a one-time code to verify your number.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>MOBILE NUMBER</Text>
        <View style={[styles.field,valid&&styles.fieldValid]}>
          <Pressable style={styles.code}><Text style={styles.flag}>🇮🇳</Text><Text style={styles.codeText}>+91</Text><Text style={styles.chev}>⌄</Text></Pressable>
          <View style={styles.divider}/>
          <TextInput value={phone} onChangeText={v=>setPhone(normalizeIndianPhone(v))} keyboardType="phone-pad" placeholder="Enter 10-digit number" placeholderTextColor="#AAA4B5" maxLength={10} autoFocus style={styles.input}/>
        </View>

        <Pressable disabled={!valid||busy} onPress={next} style={[styles.primary,(!valid||busy)&&styles.disabled]}>
          <Text style={styles.primaryText}>{busy?"Sending code...":"Send OTP"}</Text><Text style={styles.arrow}>→</Text>
        </Pressable>

        <Pressable onPress={()=>router.push({pathname:"/password",params:{phone}})} style={styles.link}><Text style={styles.linkText}>Use password instead</Text></Pressable>
      </View>

      <View style={styles.trust}><Text style={styles.trustIcon}>🛡</Text><Text style={styles.trustText}>Your number stays private and is only used for account security.</Text></View>
    </LightAuthScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:18},
  back:{width:42,height:42,justifyContent:"center"},
  backText:{color:"#554D68",fontSize:40,lineHeight:40,fontWeight:"300"},
  hero:{alignItems:"center",marginTop:16},
  phoneBubble:{width:92,height:92,borderRadius:30,backgroundColor:"#EDE7FF",alignItems:"center",justifyContent:"center"},
  phoneEmoji:{fontSize:42},
  title:{color:"#261F39",fontSize:27,fontWeight:"900",textAlign:"center",marginTop:18},
  sub:{color:"#8D869E",fontSize:12,lineHeight:18,textAlign:"center",marginTop:7,maxWidth:310},
  card:{backgroundColor:"#FFFFFF",borderRadius:28,padding:18,marginTop:28,shadowColor:"#76699A",shadowOpacity:.09,shadowRadius:14,shadowOffset:{width:0,height:7},elevation:3},
  label:{color:"#938BA5",fontSize:9,fontWeight:"900",letterSpacing:1,marginBottom:8},
  field:{minHeight:62,borderRadius:20,backgroundColor:"#F8F7FB",flexDirection:"row",alignItems:"center",paddingHorizontal:14,borderWidth:1.5,borderColor:"#EEEAF4"},
  fieldValid:{borderColor:"#8B5CFF",backgroundColor:"#FBFAFF"},
  code:{flexDirection:"row",alignItems:"center",gap:6},
  flag:{fontSize:18},
  codeText:{color:"#2F2940",fontSize:15,fontWeight:"900"},
  chev:{color:"#8A839B",fontSize:15},
  divider:{width:1,height:26,backgroundColor:"#E5E1EC",marginHorizontal:12},
  input:{flex:1,color:"#2C263B",fontSize:15,fontWeight:"600"},
  primary:{minHeight:58,borderRadius:20,backgroundColor:"#7A5CFF",alignItems:"center",justifyContent:"center",marginTop:16},
  disabled:{backgroundColor:"#CDC7DD"},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  arrow:{position:"absolute",right:18,color:"#FFFFFF",fontSize:20},
  link:{alignItems:"center",paddingTop:15},
  linkText:{color:"#7A5CFF",fontSize:11,fontWeight:"800"},
  trust:{marginTop:"auto",flexDirection:"row",alignItems:"center",backgroundColor:"#F1EDFF",borderRadius:18,padding:12},
  trustIcon:{fontSize:18,marginRight:8},
  trustText:{flex:1,color:"#756C8B",fontSize:9,lineHeight:14},
});
