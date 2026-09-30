import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { useSession } from "@/core/session/SessionProvider";
import { authService } from "@/features/auth/services/authService";
import { upsertMyProfile } from "@/platform/supabase/profiles";

const interests=[
  ["🎵","Music"],["🎮","Games"],["💬","Friends"],["🎬","Movies"],
  ["✈️","Travel"],["👗","Fashion"],["🏏","Sports"],["🎤","Karaoke"]
];

export function ProfileInterestsScreen(){
  const {draft,updateDraft,resetDraft}=useAuthDraft();
  const {refreshUser}=useSession();
  const [saving,setSaving]=useState(false);

  const toggle=(item:string)=>{
    const next=draft.interests.includes(item)
      ? draft.interests.filter(v=>v!==item)
      : [...draft.interests,item].slice(0,6);
    updateDraft({interests:next});
  };

  const finish=async()=>{
    if(draft.interests.length<2||saving)return;
    setSaving(true);
    try{
      const authUser=await authService.getCurrentUser();
      if(!authUser)throw new Error("Your login session expired. Verify your phone again.");

      await upsertMyProfile(authUser.id,draft);
      await refreshUser();
      resetDraft();
      router.replace("/home");
    }catch(error:any){
      Alert.alert("Profile could not be saved",error?.message||"Please try again.");
    }finally{
      setSaving(false);
    }
  };

  return(
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.top}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.stepText}>3 of 3</Text>
      </View>

      <View style={styles.progress}><View style={styles.progressFill}/></View>

      <View style={styles.header}>
        <Text style={styles.title}>Choose interests</Text>
        <Text style={styles.sub}>Pick at least 2 so we can show better rooms and people.</Text>
      </View>

      <View style={styles.grid}>
        {interests.map(([icon,label])=>{
          const selected=draft.interests.includes(label);
          return(
            <Pressable key={label} onPress={()=>toggle(label)} style={[styles.card,selected&&styles.cardActive]}>
              <Text style={styles.icon}>{icon}</Text>
              <Text style={[styles.cardText,selected&&styles.cardTextActive]}>{label}</Text>
              {selected?<Text style={styles.check}>✓</Text>:null}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.counter}>{draft.interests.length} selected</Text>

      <Pressable disabled={draft.interests.length<2||saving} onPress={finish} style={[styles.primary,(draft.interests.length<2||saving)&&styles.disabled]}>
        <Text style={styles.primaryText}>{saving?"Saving profile...":"Enter Ugo"}</Text>
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
  progressFill:{width:"100%",height:"100%",backgroundColor:"#7054E8"},
  header:{marginTop:30},
  title:{color:"#211D2C",fontSize:28,fontWeight:"900"},
  sub:{color:"#7F7889",fontSize:14,lineHeight:20,marginTop:7},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10,marginTop:28},
  card:{width:"48.5%",minHeight:68,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#E8E6ED",paddingHorizontal:14,flexDirection:"row",alignItems:"center"},
  cardActive:{backgroundColor:"#EEE9FF",borderColor:"#7054E8"},
  icon:{fontSize:22},
  cardText:{color:"#504A57",fontSize:13,fontWeight:"800",marginLeft:10},
  cardTextActive:{color:"#6749DB"},
  check:{marginLeft:"auto",color:"#6749DB",fontSize:15,fontWeight:"900"},
  counter:{color:"#8E8795",fontSize:12,fontWeight:"700",marginTop:14},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",marginTop:"auto"},
  disabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
});
