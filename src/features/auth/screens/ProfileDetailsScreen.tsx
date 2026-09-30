import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { normalizeUsername, isValidBirthDate, isValidDisplayName, isValidUsername } from "@/domains/users/profileRules";
import type { Gender } from "@/domains/users/profile";

const genders:Array<{value:Gender;label:string;icon:string}>=[
  {value:"female",label:"Female",icon:"♀"},
  {value:"male",label:"Male",icon:"♂"},
  {value:"other",label:"Other",icon:"✦"}
];

export function ProfileDetailsScreen(){
  const {draft,updateDraft}=useAuthDraft();
  const valid=isValidDisplayName(draft.displayName)&&isValidUsername(draft.username)&&isValidBirthDate(draft.birthDate);

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.top}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.steps}><View style={[styles.step,styles.done]}/><View style={[styles.step,styles.active]}/><View style={styles.step}/></View>
        <Text style={styles.stepText}>2 of 3</Text>
      </View>

      <Text style={styles.eyebrow}>YOUR UGO IDENTITY</Text>
      <Text style={styles.title}>Tell us about you</Text>
      <Text style={styles.sub}>Keep it simple. You can change these later from your profile.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>DISPLAY NAME</Text>
        <TextInput value={draft.displayName} onChangeText={displayName=>updateDraft({displayName})} placeholder="How should people call you?" placeholderTextColor="#A8A1B3" style={styles.input}/>

        <Text style={styles.label}>USERNAME</Text>
        <View style={styles.usernameWrap}><Text style={styles.at}>@</Text><TextInput value={draft.username} onChangeText={username=>updateDraft({username:normalizeUsername(username)})} placeholder="ugo_name" placeholderTextColor="#A8A1B3" autoCapitalize="none" style={styles.usernameInput}/></View>

        <Text style={styles.label}>BIRTH DATE</Text>
        <TextInput value={draft.birthDate} onChangeText={birthDate=>updateDraft({birthDate})} placeholder="YYYY-MM-DD" placeholderTextColor="#A8A1B3" keyboardType="numbers-and-punctuation" maxLength={10} style={styles.input}/>

        <Text style={styles.label}>GENDER</Text>
        <View style={styles.genderRow}>
          {genders.map(g=><Pressable key={g.value} onPress={()=>updateDraft({gender:g.value})} style={[styles.gender,draft.gender===g.value&&styles.genderActive]}><Text style={[styles.genderIcon,draft.gender===g.value&&styles.genderIconActive]}>{g.icon}</Text><Text style={[styles.genderText,draft.gender===g.value&&styles.genderTextActive]}>{g.label}</Text></Pressable>)}
        </View>
      </View>

      <View style={styles.tip}><Text style={styles.tipIcon}>✨</Text><Text style={styles.tipText}>A complete profile helps people trust you in rooms and private chat.</Text></View>

      <Pressable disabled={!valid} onPress={()=>router.push("/profile-interests")} style={[styles.primary,!valid&&styles.disabled]}><Text style={styles.primaryText}>Continue</Text><Text style={styles.arrow}>→</Text></Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:8,paddingBottom:18},
  top:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,justifyContent:"center"},
  backText:{color:"#554D68",fontSize:38,lineHeight:38},
  steps:{flex:1,flexDirection:"row",gap:6,justifyContent:"center"},
  step:{width:34,height:5,borderRadius:3,backgroundColor:"#E4DEED"},
  done:{backgroundColor:"#B8A8FF"},
  active:{backgroundColor:"#7A5CFF"},
  stepText:{color:"#9A92AA",fontSize:9,fontWeight:"800",width:42,textAlign:"right"},
  eyebrow:{color:"#8B5CFF",fontSize:9,fontWeight:"900",letterSpacing:1.4,marginTop:18},
  title:{color:"#251F39",fontSize:30,fontWeight:"900",marginTop:5},
  sub:{color:"#8C849D",fontSize:12,lineHeight:18,marginTop:7,maxWidth:330},
  card:{backgroundColor:"#FFFFFF",borderRadius:28,padding:18,marginTop:22,shadowColor:"#756A93",shadowOpacity:.08,shadowRadius:12,elevation:3},
  label:{color:"#928A9F",fontSize:8.5,fontWeight:"900",letterSpacing:1,marginBottom:7,marginTop:12},
  input:{minHeight:54,borderRadius:18,backgroundColor:"#F8F7FB",borderWidth:1.5,borderColor:"#EEEAF3",color:"#2B253B",paddingHorizontal:14,fontSize:13},
  usernameWrap:{minHeight:54,borderRadius:18,backgroundColor:"#F8F7FB",borderWidth:1.5,borderColor:"#EEEAF3",flexDirection:"row",alignItems:"center",paddingHorizontal:14},
  at:{color:"#7A5CFF",fontSize:15,fontWeight:"900",marginRight:5},
  usernameInput:{flex:1,color:"#2B253B",fontSize:13},
  genderRow:{flexDirection:"row",gap:8},
  gender:{flex:1,minHeight:62,borderRadius:18,backgroundColor:"#F8F7FB",borderWidth:1.5,borderColor:"#EEEAF3",alignItems:"center",justifyContent:"center"},
  genderActive:{backgroundColor:"#EEE9FF",borderColor:"#7A5CFF"},
  genderIcon:{color:"#8E879B",fontSize:18,fontWeight:"900"},
  genderIconActive:{color:"#6D4DF3"},
  genderText:{color:"#746C82",fontSize:9,fontWeight:"800",marginTop:3},
  genderTextActive:{color:"#6D4DF3"},
  tip:{flexDirection:"row",alignItems:"center",backgroundColor:"#FFF2F8",borderRadius:18,padding:12,marginTop:14},
  tipIcon:{fontSize:18,marginRight:8},
  tipText:{flex:1,color:"#826D78",fontSize:9,lineHeight:14},
  primary:{minHeight:58,borderRadius:21,backgroundColor:"#7A5CFF",alignItems:"center",justifyContent:"center",marginTop:18},
  disabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:20},
});
