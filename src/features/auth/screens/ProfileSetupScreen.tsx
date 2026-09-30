import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { useAuthDraft } from "@/features/auth/store/AuthDraftProvider";
import { useSession } from "@/core/session/SessionProvider";
import { uploadMyAvatar } from "@/platform/supabase/avatarStorage";

export function ProfileSetupScreen(){
  const {draft,updateDraft}=useAuthDraft();
  const {user}=useSession();
  const [previewUri,setPreviewUri]=useState<string|null>(draft.avatarUri||null);
  const [uploading,setUploading]=useState(false);

  const choosePhoto=async()=>{
    if(uploading)return;

    const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!permission.granted){
      Alert.alert("Photo access needed","Allow photo access to choose a profile picture.");
      return;
    }

    const result=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:["images"],
      allowsEditing:true,
      aspect:[1,1],
      quality:.82,
    });

    if(result.canceled)return;
    const asset=result.assets[0];
    setPreviewUri(asset.uri);

    if(!user?.id){
      Alert.alert("Session required","Verify your phone number before uploading a photo.");
      return;
    }

    setUploading(true);
    try{
      const publicUrl=await uploadMyAvatar(user.id,asset);
      updateDraft({avatarUri:publicUrl});
      setPreviewUri(publicUrl);
    }catch(error:any){
      setPreviewUri(draft.avatarUri||null);
      Alert.alert("Photo upload failed",error?.message||"Choose the photo again.");
    }finally{
      setUploading(false);
    }
  };

  return(
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.top}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.stepText}>1 of 3</Text>
      </View>

      <View style={styles.progress}><View style={styles.progressFill}/></View>

      <View style={styles.header}>
        <Text style={styles.title}>Add your photo</Text>
        <Text style={styles.sub}>Choose a clear profile photo. You can change it later.</Text>
      </View>

      <View style={styles.photoArea}>
        <View style={styles.avatar}>
          {previewUri
            ? <Image source={{uri:previewUri}} style={styles.image}/>
            : <Text style={styles.avatarText}>U</Text>}
        </View>
        <Pressable onPress={choosePhoto} style={styles.addButton}><Text style={styles.addText}>＋</Text></Pressable>
      </View>

      <Pressable disabled={uploading} onPress={choosePhoto} style={[styles.choose,uploading&&styles.chooseDisabled]}>
        <Text style={styles.chooseText}>{uploading?"Uploading...":previewUri?"Change photo":"Choose photo"}</Text>
      </Pressable>
      <Text style={styles.hint}>{draft.avatarUri?"Photo saved securely":"You can skip this and add one later"}</Text>

      <Pressable disabled={uploading} onPress={()=>router.push("/profile-details")} style={[styles.primary,uploading&&styles.primaryDisabled]}>
        <Text style={styles.primaryText}>Continue</Text>
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
  progressFill:{width:"33%",height:"100%",backgroundColor:"#7054E8"},
  header:{marginTop:34},
  title:{color:"#211D2C",fontSize:28,fontWeight:"900"},
  sub:{color:"#7F7889",fontSize:14,lineHeight:20,marginTop:7},
  photoArea:{alignSelf:"center",marginTop:42,position:"relative"},
  avatar:{width:150,height:150,borderRadius:75,backgroundColor:"#EEE9FF",borderWidth:3,borderColor:"#7054E8",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  image:{width:"100%",height:"100%"},
  avatarText:{color:"#6749DB",fontSize:48,fontWeight:"900"},
  addButton:{position:"absolute",right:4,bottom:6,width:38,height:38,borderRadius:19,backgroundColor:"#F05B91",borderWidth:4,borderColor:"#F8F7FC",alignItems:"center",justifyContent:"center"},
  addText:{color:"#FFFFFF",fontSize:20,fontWeight:"900",marginTop:-2},
  choose:{alignSelf:"center",minHeight:46,paddingHorizontal:22,borderRadius:23,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center",marginTop:18},
  chooseDisabled:{opacity:.55},
  chooseText:{color:"#6749DB",fontSize:13,fontWeight:"900"},
  hint:{color:"#9B95A1",fontSize:11,textAlign:"center",marginTop:9},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",marginTop:"auto"},
  primaryDisabled:{opacity:.45},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
});
