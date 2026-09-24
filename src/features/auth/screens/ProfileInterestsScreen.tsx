import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { ChoiceChip } from "@/features/auth/components/ChoiceChip";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { useSession } from "@/core/session/SessionProvider";
import { colors } from "@/shared/theme";

const interests=["Music","Games","Friends","Movies","Travel","Fashion","Sports","Food","Karaoke","Dating"];

export function ProfileInterestsScreen(){
  const {draft,updateDraft}=useAuthDraft();
  const {setUser}=useSession();
  const toggle=(item:string)=>{
    const next=draft.interests.includes(item)?draft.interests.filter(v=>v!==item):[...draft.interests,item].slice(0,6);
    updateDraft({interests:next});
  };
  const finish=()=>{
    setUser({id:"demo-user",displayName:draft.displayName.trim()||"Ugo User"});
    router.replace("/home");
  };
  return(
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.stepRow}><Text style={styles.step}>3 / 3</Text><View style={styles.track}><View style={styles.progress}/></View></View>
      <Text style={styles.title}>Choose your interests</Text>
      <Text style={styles.sub}>Pick at least 2 so Ugo can personalize rooms and people for you.</Text>
      <View style={styles.counter}><Text style={styles.counterText}>{draft.interests.length} selected</Text></View>
      <View style={styles.chips}>{interests.map(i=><ChoiceChip key={i} label={i} selected={draft.interests.includes(i)} onPress={()=>toggle(i)}/>)}</View>
      <Pressable disabled={draft.interests.length<2} onPress={finish} style={[styles.primary,draft.interests.length<2&&styles.disabled]}><Text style={styles.primaryText}>FINISH</Text><Text style={styles.arrow}>→</Text></Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:14,paddingBottom:24},
  stepRow:{flexDirection:"row",alignItems:"center",gap:10},
  step:{color:"#BBA7D8",fontSize:8,fontWeight:"900"},
  track:{flex:1,height:4,borderRadius:2,backgroundColor:"#1B1D2A",overflow:"hidden"},
  progress:{width:"100%",height:"100%",backgroundColor:colors.primary},
  title:{color:colors.text,fontSize:31,lineHeight:36,fontWeight:"900",marginTop:30},
  sub:{color:colors.textMuted,fontSize:12,lineHeight:19,marginTop:8,maxWidth:330},
  counter:{alignSelf:"flex-start",borderRadius:20,backgroundColor:"#151728",paddingHorizontal:11,paddingVertical:7,marginTop:24},
  counterText:{color:"#C89DFF",fontSize:8,fontWeight:"900"},
  chips:{flexDirection:"row",flexWrap:"wrap",gap:9,marginTop:18},
  primary:{minHeight:58,borderRadius:20,backgroundColor:colors.primary,alignItems:"center",justifyContent:"center",marginTop:"auto"},
  disabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:12,fontWeight:"900",letterSpacing:1.1},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:20},
});
