import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { useSession } from "@/core/session/SessionProvider";
import { isUsernameAvailable } from "@/platform/supabase/profiles";
import { normalizeUsername, isValidBirthDate, isValidDisplayName, isValidUsername } from "@/domains/users/profileRules";
import type { Gender } from "@/domains/users/profile";

const genders:Array<{value:Gender;label:string}>=[
  {value:"female",label:"Female"},
  {value:"male",label:"Male"},
  {value:"other",label:"Other"}
];

export function ProfileDetailsScreen(){
  const {draft,updateDraft}=useAuthDraft();
  const {user}=useSession();
  const [checking,setChecking]=useState(false);
  const valid=isValidDisplayName(draft.displayName)&&isValidUsername(draft.username)&&isValidBirthDate(draft.birthDate);

  const next=async()=>{
    if(!valid||checking)return;
    setChecking(true);
    try{
      const available=await isUsernameAvailable(draft.username,user?.id);
      if(!available){
        Alert.alert("Username already taken","Choose another Ugo username.");
        return;
      }
      router.push("/profile-interests");
    }catch(error:any){
      Alert.alert("Could not check username",error?.message||"Try again.");
    }finally{
      setChecking(false);
    }
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.top}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.stepText}>2 of 3</Text>
      </View>

      <View style={styles.progress}><View style={styles.progressFill}/></View>

      <View style={styles.header}>
        <Text style={styles.title}>Your details</Text>
        <Text style={styles.sub}>Add the basics. You can edit these later.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Display name</Text>
        <TextInput value={draft.displayName} onChangeText={displayName=>updateDraft({displayName})} placeholder="Your name" placeholderTextColor="#A39CAB" style={styles.input}/>

        <Text style={styles.label}>Username</Text>
        <View style={styles.usernameWrap}>
          <Text style={styles.at}>@</Text>
          <TextInput value={draft.username} onChangeText={username=>updateDraft({username:normalizeUsername(username)})} placeholder="ugo_name" placeholderTextColor="#A39CAB" autoCapitalize="none" style={styles.usernameInput}/>
        </View>

        <Text style={styles.label}>Birth date</Text>
        <TextInput value={draft.birthDate} onChangeText={birthDate=>updateDraft({birthDate})} placeholder="YYYY-MM-DD" placeholderTextColor="#A39CAB" keyboardType="numbers-and-punctuation" maxLength={10} style={styles.input}/>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          {genders.map(g=>(
            <Pressable key={g.value} onPress={()=>updateDraft({gender:g.value})} style={[styles.gender,draft.gender===g.value&&styles.genderActive]}>
              <Text style={[styles.genderText,draft.gender===g.value&&styles.genderTextActive]}>{g.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable disabled={!valid||checking} onPress={next} style={[styles.primary,(!valid||checking)&&styles.disabled]}>
        <Text style={styles.primaryText}>{checking?"Checking username...":"Continue"}</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:20},
  top:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{width:44,height:44,justifyContent:"center"},
  backText:{color:"#4E4858",fontSize:38,lineHeight:38},
  stepText:{color:"#8E8795",fontSize:12,fontWeight:"800"},
  progress:{height:5,borderRadius:3,backgroundColor:"#E7E4EB",marginTop:5,overflow:"hidden"},
  progressFill:{width:"66%",height:"100%",backgroundColor:"#7054E8"},
  header:{marginTop:28},
  title:{color:"#211D2C",fontSize:28,fontWeight:"900"},
  sub:{color:"#7F7889",fontSize:14,lineHeight:20,marginTop:7},
  form:{marginTop:24},
  label:{color:"#5D5764",fontSize:13,fontWeight:"800",marginBottom:7,marginTop:14},
  input:{minHeight:56,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#E8E6ED",color:"#2B2631",paddingHorizontal:14,fontSize:14},
  usernameWrap:{minHeight:56,borderRadius:17,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#E8E6ED",flexDirection:"row",alignItems:"center",paddingHorizontal:14},
  at:{color:"#7054E8",fontSize:16,fontWeight:"900",marginRight:5},
  usernameInput:{flex:1,color:"#2B2631",fontSize:14},
  genderRow:{flexDirection:"row",gap:8},
  gender:{flex:1,minHeight:48,borderRadius:16,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#E8E6ED",alignItems:"center",justifyContent:"center"},
  genderActive:{backgroundColor:"#EEE9FF",borderColor:"#7054E8"},
  genderText:{color:"#726B7A",fontSize:13,fontWeight:"800"},
  genderTextActive:{color:"#6749DB"},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",marginTop:28},
  disabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
});
