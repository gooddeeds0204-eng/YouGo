import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { ChoiceChip } from "@/features/auth/components/ChoiceChip";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { normalizeUsername, isValidBirthDate, isValidDisplayName, isValidUsername } from "@/domains/users/profileRules";
import type { Gender } from "@/domains/users/profile";
import { colors } from "@/shared/theme";

const genders:Array<{value:Gender;label:string}>=[
  {value:"female",label:"Female"},{value:"male",label:"Male"},{value:"other",label:"Other"}
];

export function ProfileDetailsScreen(){
  const {draft,updateDraft}=useAuthDraft();
  const valid=isValidDisplayName(draft.displayName)&&isValidUsername(draft.username)&&isValidBirthDate(draft.birthDate);
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.stepRow}><Text style={styles.step}>2 / 3</Text><View style={styles.track}><View style={styles.progress}/></View></View>
      <Text style={styles.title}>Your details</Text>
      <Text style={styles.sub}>Keep it simple. You can edit these later.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>DISPLAY NAME</Text>
        <TextInput value={draft.displayName} onChangeText={displayName=>updateDraft({displayName})} placeholder="Your name" placeholderTextColor="#62687B" style={styles.input}/>
        <Text style={styles.label}>USERNAME</Text>
        <TextInput value={draft.username} onChangeText={username=>updateDraft({username:normalizeUsername(username)})} placeholder="ugo_name" placeholderTextColor="#62687B" autoCapitalize="none" style={styles.input}/>
        <Text style={styles.label}>BIRTH DATE</Text>
        <TextInput value={draft.birthDate} onChangeText={birthDate=>updateDraft({birthDate})} placeholder="YYYY-MM-DD" placeholderTextColor="#62687B" keyboardType="numbers-and-punctuation" maxLength={10} style={styles.input}/>
        <Text style={styles.label}>GENDER</Text>
        <View style={styles.chips}>{genders.map(g=><ChoiceChip key={g.value} label={g.label} selected={draft.gender===g.value} onPress={()=>updateDraft({gender:g.value})}/>)}</View>
      </View>

      <Pressable disabled={!valid} onPress={()=>router.push("/profile-interests")} style={[styles.primary,!valid&&styles.disabled]}><Text style={styles.primaryText}>NEXT</Text><Text style={styles.arrow}>→</Text></Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:14,paddingBottom:24},
  stepRow:{flexDirection:"row",alignItems:"center",gap:10},
  step:{color:"#BBA7D8",fontSize:8,fontWeight:"900"},
  track:{flex:1,height:4,borderRadius:2,backgroundColor:"#1B1D2A",overflow:"hidden"},
  progress:{width:"66%",height:"100%",backgroundColor:colors.primary},
  title:{color:colors.text,fontSize:31,fontWeight:"900",marginTop:30},
  sub:{color:colors.textMuted,fontSize:12,marginTop:8},
  form:{marginTop:26,gap:8},
  label:{color:"#777D91",fontSize:7,fontWeight:"900",letterSpacing:1.2,marginTop:9},
  input:{minHeight:52,borderRadius:16,backgroundColor:"#11131E",borderWidth:1,borderColor:colors.border,color:colors.text,paddingHorizontal:13,fontSize:12},
  chips:{flexDirection:"row",gap:8,flexWrap:"wrap"},
  primary:{minHeight:58,borderRadius:20,backgroundColor:colors.primary,alignItems:"center",justifyContent:"center",marginTop:26},
  disabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:12,fontWeight:"900",letterSpacing:1.1},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:20},
});
