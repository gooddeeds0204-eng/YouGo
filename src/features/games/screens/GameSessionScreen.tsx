import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { enabledGames } from "@/registries/gameRegistry";
import {
  finishGameSession,
  getGameSession,
  performGameAction,
  type GameActionResult,
} from "@/platform/supabase/roomRuntime";

function previewAction(gameKey:string,score:number,action:string):GameActionResult{
  const round=Math.max(1,Math.floor(Math.random()*99));
  if(gameKey==="lucky-dice"||gameKey==="ludo"){
    const value=1+Math.floor(Math.random()*6);
    return {session_id:"preview",game_key:gameKey,round,score:score+value,result:{kind:gameKey==="ludo"?"ludo":"dice",value,position:gameKey==="ludo"?Math.min(57,score+value):undefined,score:score+value}};
  }
  if(gameKey==="diamond-hunt"){
    const value=1+Math.floor(Math.random()*20);
    return {session_id:"preview",game_key:gameKey,round,score:score+value,result:{kind:"diamonds",value,score:score+value}};
  }
  if(gameKey==="spin-win"){
    const values=[10,20,0,50,40,25];
    const labels=["10 pts","20 pts","Try again","50 pts","Bonus","25 pts"];
    const index=Math.floor(Math.random()*values.length);
    return {session_id:"preview",game_key:gameKey,round,score:score+values[index],result:{kind:"spin",value:index,label:labels[index],score:score+values[index]}};
  }
  if(gameKey==="greedy"){
    if(action==="collect")return {session_id:"preview",game_key:gameKey,round,score,result:{kind:"collect",value:score,score}};
    const bust=Math.random()<.35;
    const value=bust?0:5+Math.floor(Math.random()*26);
    return {session_id:"preview",game_key:gameKey,round,score:bust?0:score+value,result:{kind:bust?"bust":"gain",value,score:bust?0:score+value}};
  }
  if(gameKey==="truth-dare"){
    const prompts=[
      "Truth: What made you smile today?",
      "Dare: Sing one line of a song.",
      "Truth: What is your dream trip?",
      "Dare: Compliment someone in the room.",
      "Truth: What is your funniest habit?",
      "Dare: Use only emojis for one minute.",
    ];
    return {session_id:"preview",game_key:gameKey,round,score,result:{kind:"prompt",label:prompts[Math.floor(Math.random()*prompts.length)]}};
  }
  const value=1+Math.floor(Math.random()*13);
  return {session_id:"preview",game_key:gameKey,round,score:score+value,result:{kind:gameKey==="cards"?"card":"score",value,score:score+value}};
}

export function GameSessionScreen(){
  const {sessionId="",gameKey:gameKeyParam=""}=useLocalSearchParams<{sessionId?:string;gameKey?:string}>();
  const [gameKey,setGameKey]=useState(gameKeyParam||"diamond-hunt");
  const [score,setScore]=useState(0);
  const [round,setRound]=useState(0);
  const [result,setResult]=useState<GameActionResult["result"]|null>(null);
  const [busy,setBusy]=useState(false);

  useEffect(()=>{
    void getGameSession(sessionId).then(session=>{
      if(!session)return;
      setGameKey(session.game_key);
      setScore(Number(session.state?.score||0));
      setRound(Number(session.state?.round||0));
      if(session.state?.last_result)setResult(session.state.last_result);
    }).catch(()=>undefined);
  },[sessionId]);

  const game=useMemo(()=>enabledGames().find(item=>item.id===gameKey),[gameKey]);

  const play=async(action="play")=>{
    if(busy)return;
    setBusy(true);
    try{
      const real=await performGameAction(sessionId,action);
      const next=real||previewAction(gameKey,score,action);
      setScore(next.score);
      setRound(next.round);
      setResult(next.result);
    }catch(error:any){
      Alert.alert("Game",error?.message||"Could not play this round.");
    }finally{
      setBusy(false);
    }
  };

  const finish=async()=>{
    await finishGameSession(sessionId).catch(()=>false);
    router.back();
  };

  const resultText=()=>{
    if(!result)return "Tap play to start";
    if(result.label)return result.label;
    if(result.kind==="ludo")return "Dice "+result.value+" • Position "+(result.position??score);
    if(result.kind==="dice")return "You rolled "+result.value;
    if(result.kind==="diamonds")return "Found "+result.value+" gems";
    if(result.kind==="card")return "Drew card "+result.value;
    if(result.kind==="bust")return "Bust! Score reset";
    if(result.kind==="gain")return "+"+result.value+" points";
    if(result.kind==="eat")return "Ate +"+result.value+" balls";
    return "+"+(result.value??0)+" points";
  };

  return(
    <AppScreen dark contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.eyebrow}>LIVE GAME</Text><Text style={styles.title}>{game?.name||"Ugo Game"}</Text></View>
        <Pressable onPress={finish} style={styles.finish}><Text style={styles.finishText}>Exit</Text></Pressable>
      </View>

      <View style={styles.arena}>
        <View style={styles.glow}/>
        <Text style={styles.gameIcon}>{game?.icon||"🎮"}</Text>
        <Text style={styles.result}>{resultText()}</Text>
        <View style={styles.scoreRow}>
          <View style={styles.scoreBox}><Text style={styles.scoreValue}>{score}</Text><Text style={styles.scoreLabel}>Score</Text></View>
          <View style={styles.scoreBox}><Text style={styles.scoreValue}>{round}</Text><Text style={styles.scoreLabel}>Round</Text></View>
        </View>
      </View>

      <View style={styles.players}>
        {["You","A","P","R"].map((letter,index)=>(
          <View key={letter} style={styles.player}>
            <View style={[styles.avatar,{backgroundColor:["#7054E8","#4F7BC7","#CF5A8C","#3FA987"][index]}]}><Text style={styles.avatarText}>{letter[0]}</Text></View>
            <Text style={styles.playerName}>{letter}</Text>
          </View>
        ))}
      </View>

      {gameKey==="greedy"?(
        <View style={styles.actions}>
          <Pressable onPress={()=>play("risk")} style={styles.primary}><Text style={styles.primaryText}>{busy?"...":"Risk again"}</Text></Pressable>
          <Pressable onPress={()=>play("collect")} style={styles.secondary}><Text style={styles.secondaryText}>Collect</Text></Pressable>
        </View>
      ):(
        <Pressable onPress={()=>play("play")} style={styles.primary}>
          <Text style={styles.primaryText}>{busy?"Playing...":gameKey==="truth-dare"?"Next prompt":"Play round"}</Text>
        </Pressable>
      )}

      <View style={styles.note}><Text style={styles.noteIcon}>✨</Text><Text style={styles.noteText}>Game rewards are in-app points and social progression only. No cash-out.</Text></View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:20,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"rgba(255,255,255,.06)",borderWidth:1,borderColor:"rgba(255,255,255,.08)",alignItems:"center",justifyContent:"center",marginRight:10},
  backText:{color:"#FFFFFF",fontSize:30,marginTop:-3},
  eyebrow:{color:"#E8B95A",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#FFFFFF",fontSize:20,fontWeight:"900"},
  finish:{marginLeft:"auto",paddingHorizontal:12,paddingVertical:8,borderRadius:12,backgroundColor:"rgba(255,255,255,.08)"},
  finishText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  arena:{minHeight:330,borderRadius:28,backgroundColor:"#211A2B",borderWidth:1,borderColor:"#34283F",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  glow:{position:"absolute",width:320,height:320,borderRadius:160,backgroundColor:"rgba(112,84,232,.24)",right:-100,top:-100},
  gameIcon:{fontSize:76},
  result:{color:"#FFFFFF",fontSize:20,fontWeight:"900",textAlign:"center",maxWidth:300,marginTop:18},
  scoreRow:{flexDirection:"row",gap:12,marginTop:24},
  scoreBox:{minWidth:95,paddingVertical:12,paddingHorizontal:18,borderRadius:17,backgroundColor:"rgba(255,255,255,.07)",alignItems:"center"},
  scoreValue:{color:"#E8B95A",fontSize:22,fontWeight:"900"},
  scoreLabel:{color:"rgba(255,255,255,.45)",fontSize:9,marginTop:3},
  players:{flexDirection:"row",justifyContent:"center",gap:18},
  player:{alignItems:"center"},
  avatar:{width:48,height:48,borderRadius:24,alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  playerName:{color:"rgba(255,255,255,.55)",fontSize:9,marginTop:5},
  actions:{flexDirection:"row",gap:10},
  primary:{flex:1,minHeight:58,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  primaryText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  secondary:{flex:1,minHeight:58,borderRadius:18,backgroundColor:"#E8B95A",alignItems:"center",justifyContent:"center"},
  secondaryText:{color:"#241D28",fontSize:14,fontWeight:"900"},
  note:{borderRadius:17,backgroundColor:"rgba(76,205,164,.07)",padding:13,flexDirection:"row",alignItems:"center"},
  noteIcon:{fontSize:18,marginRight:9},
  noteText:{flex:1,color:"rgba(127,225,193,.75)",fontSize:10.5,lineHeight:16},
});
