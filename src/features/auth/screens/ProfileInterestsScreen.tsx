import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { useSession } from "@/core/session/SessionProvider";
import { authService } from "@/features/auth/services/authService";
import { upsertMyProfile } from "@/platform/supabase/profiles";

const interests=[
  ["🎵","Music"],["🎮","Games"],["💬","Friends"],["🎬","Movies"],["✈️","Travel"],
  ["👗","Fashion"],["🏏","Sports"],["🍜","Food"],["🎤","Karaoke"],["💞","Dating"]
];

export function ProfileInterestsScreen(){
  const {draft,updateDraft}=useAuthDraft();
  const {setUser}=useSession();

  const toggle=(item:string)=>{
    const next=draft.interests.includes(item)?draft.interests.filter(v=>v!==item):[...draft.interests,item].slice(0,6);
    updateDraft({interests:next});
  };

  const finish=async()=>{
    const authUser=await authService.getCurrentUser();
    if(authUser){
      const profile=await upsertMyProfile(authUser.id,draft);
      setUser({id:authUser.id,displayName:profile?.displayName||draft.displayName.trim()||authUser.displayName});
    }else{
      setUser({id:"demo-user",displayName:draft.displayName.trim()||"Ugo User"});
    }
    router.replace("/home");
  };

  return(
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.top}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.steps}><View style={[styles.step,styles.done]}/><View style={[styles.step,styles.done]}/><View style={[styles.step,styles.active]}/></View>
        <Text style={styles.stepText}>3 of 3</Text>
      </View>

      <Text style={styles.eyebrow}>PERSONALIZE UGO</Text>
      <Text style={styles.title}>What are you into?</Text>
      <Text style={styles.sub}>Pick at least 2. We'll use these to suggest rooms, games and people.</Text>

      <View style={styles.counter}><Text style={styles.counterText}>{draft.interests.length} / 6 selected</Text></View>

      <View style={styles.grid}>
        {interests.map(([icon,label])=>{
          const selected=draft.interests.includes(label);
          return <Pressable key={label} onPress={()=>toggle(label)} style={[styles.card,selected&&styles.cardActive]}>
            <View style={[styles.iconWrap,selected&&styles.iconWrapActive]}><Text style={styles.icon}>{icon}</Text></View>
            <Text style={[styles.cardText,selected&&styles.cardTextActive]}>{label}</Text>
            {selected?<View style={styles.check}><Text style={styles.checkText}>✓</Text></View>:null}
          </Pressable>;
        })}
      </View>

      <View style={styles.preview}><Text style={styles.previewEmoji}>🎉</Text><View><Text style={styles.previewTitle}>Your party feed is ready</Text><Text style={styles.previewText}>You'll land on personalized live rooms first.</Text></View></View>

      <Pressable disabled={draft.interests.length<2} onPress={finish} style={[styles.primary,draft.interests.length<2&&styles.disabled]}><Text style={styles.primaryText}>Enter Ugo</Text><Text style={styles.arrow}>→</Text></Pressable>
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
  counter:{alignSelf:"flex-start",marginTop:14,paddingHorizontal:11,paddingVertical:7,borderRadius:14,backgroundColor:"#EEE9FF"},
  counterText:{color:"#7154E9",fontSize:8.5,fontWeight:"900"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10,marginTop:16},
  card:{width:"48.5%",minHeight:86,borderRadius:21,backgroundColor:"#FFFFFF",borderWidth:1.5,borderColor:"#EEEAF3",padding:12,flexDirection:"row",alignItems:"center"},
  cardActive:{backgroundColor:"#EEE9FF",borderColor:"#8B5CFF"},
  iconWrap:{width:42,height:42,borderRadius:14,backgroundColor:"#F7F4FB",alignItems:"center",justifyContent:"center"},
  iconWrapActive:{backgroundColor:"#FFFFFF"},
  icon:{fontSize:21},
  cardText:{color:"#51495F",fontSize:11,fontWeight:"800",marginLeft:9},
  cardTextActive:{color:"#6849E9"},
  check:{position:"absolute",right:8,top:8,width:18,height:18,borderRadius:9,backgroundColor:"#7A5CFF",alignItems:"center",justifyContent:"center"},
  checkText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  preview:{flexDirection:"row",alignItems:"center",backgroundColor:"#FFF1F7",borderRadius:19,padding:12,marginTop:15},
  previewEmoji:{fontSize:24,marginRight:9},
  previewTitle:{color:"#4D4050",fontSize:10,fontWeight:"900"},
  previewText:{color:"#8D7A85",fontSize:8,marginTop:2},
  primary:{minHeight:58,borderRadius:21,backgroundColor:"#FF5FA2",alignItems:"center",justifyContent:"center",marginTop:"auto"},
  disabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  arrow:{position:"absolute",right:20,color:"#FFFFFF",fontSize:20},
});
