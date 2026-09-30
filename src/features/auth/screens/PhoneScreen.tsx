import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
    }catch(error:any){
      Alert.alert(
        "OTP could not be sent",
        error?.message || "Please check the number and try again.",
      );
    }finally{
      setBusy(false);
    }
  };

  return(
    <LightAuthScreen contentStyle={styles.screen}>
      <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>Phone number</Text>
        <Text style={styles.sub}>Enter your mobile number to continue.</Text>
      </View>

      <View style={styles.field}>
        <View style={styles.country}><Text style={styles.flag}>🇮🇳</Text><Text style={styles.countryText}>+91</Text></View>
        <View style={styles.divider}/>
        <TextInput
          value={phone}
          onChangeText={v=>setPhone(normalizeIndianPhone(v))}
          keyboardType="phone-pad"
          placeholder="10-digit mobile number"
          placeholderTextColor="#A39CAB"
          maxLength={10}
          autoFocus
          style={styles.input}
        />
      </View>

      <Pressable disabled={!valid||busy} onPress={next} style={[styles.primary,(!valid||busy)&&styles.disabled]}>
        <Text style={styles.primaryText}>{busy?"Sending OTP...":"Continue"}</Text>
      </Pressable>

      <Pressable onPress={()=>router.push({pathname:"/password",params:{phone}})} style={styles.link}>
        <Text style={styles.linkText}>Login with password</Text>
      </Pressable>

      <View style={styles.note}>
        <Text style={styles.noteText}>Your phone number is used only for account verification and security.</Text>
      </View>
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
  field:{minHeight:60,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#E8E6ED",flexDirection:"row",alignItems:"center",paddingHorizontal:14,marginTop:30},
  country:{flexDirection:"row",alignItems:"center",gap:7},
  flag:{fontSize:20},
  countryText:{color:"#302B38",fontSize:15,fontWeight:"900"},
  divider:{width:1,height:28,backgroundColor:"#E6E3EA",marginHorizontal:12},
  input:{flex:1,color:"#2B2631",fontSize:15,paddingVertical:0},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",marginTop:16},
  disabled:{backgroundColor:"#C9C5D2"},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  link:{alignItems:"center",paddingVertical:18},
  linkText:{color:"#7054E8",fontSize:13,fontWeight:"800"},
  note:{marginTop:"auto",backgroundColor:"#F0EDF8",borderRadius:16,padding:13},
  noteText:{color:"#756F7E",fontSize:11,lineHeight:16,textAlign:"center"},
});
