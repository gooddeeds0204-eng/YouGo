import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { getMyWallet } from "@/platform/supabase/wallet";
import { sendGift } from "@/platform/supabase/gifts";

type GiftItem={
  id:string;
  icon:string;
  name:string;
  cost:number;
  category:"Popular"|"Luxury"|"Couple"|"Event";
  tone:string;
};

const gifts:GiftItem[]=[
  {id:"rose",icon:"🌹",name:"Rose",cost:10,category:"Popular",tone:"#FFF0F5"},
  {id:"couple-heart",icon:"💗",name:"Heart",cost:50,category:"Couple",tone:"#FFEAF3"},
  {id:"ice-cream",icon:"🍦",name:"Ice Cream",cost:100,category:"Popular",tone:"#FFF5DF"},
  {id:"supercar",icon:"🚗",name:"Supercar",cost:500,category:"Luxury",tone:"#EAF3FF"},
  {id:"castle",icon:"🏰",name:"Castle",cost:1000,category:"Luxury",tone:"#F0EAFF"},
  {id:"rocket",icon:"🚀",name:"Rocket",cost:5000,category:"Event",tone:"#EAFBFF"},
  {id:"crown",icon:"👑",name:"Crown",cost:8888,category:"Luxury",tone:"#FFF6D9"},
  {id:"galaxy",icon:"💎",name:"Galaxy",cost:12999,category:"Event",tone:"#ECE9FF"},
];

export function GiftsScreen(){
  const {roomId}=useLocalSearchParams<{roomId?:string}>();
  const [tab,setTab]=useState<GiftItem["category"]>("Popular");
  const [qty,setQty]=useState(1);
  const [selectedId,setSelectedId]=useState("rose");
  const [balance,setBalance]=useState(1250);
  const [sending,setSending]=useState(false);

  useEffect(()=>{
    void getMyWallet().then((wallet)=>{if(wallet)setBalance(wallet.diamonds);}).catch(()=>undefined);
  },[]);

  const visible=useMemo(()=>gifts.filter((gift)=>gift.category===tab),[tab]);
  const selected=gifts.find((gift)=>gift.id===selectedId)??gifts[0];
  const total=selected.cost*qty;
  const canSend=total<=balance&&!sending;

  const submit=async()=>{
    if(!canSend)return;
    setSending(true);
    try{
      const result=await sendGift({giftId:selected.id,quantity:qty,roomId:roomId||null});
      if(result)setBalance(result.remainingDiamonds);
      else setBalance((current)=>Math.max(0,current-total));
      router.push({pathname:"/live-effects",params:{gift:selected.name,icon:selected.icon,qty:String(qty)}});
    }finally{setSending(false);}
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.title}>Send a gift</Text><Text style={styles.sub}>Light up the room ✨</Text></View>
        <Pressable onPress={()=>router.push("/wallet")} style={styles.balance}><Text style={styles.balanceText}>💎 {balance.toLocaleString()}</Text></Pressable>
      </View>

      <View style={styles.preview}>
        <View style={[styles.previewArt,{backgroundColor:selected.tone}]}><Text style={styles.previewIcon}>{selected.icon}</Text></View>
        <View style={styles.previewCopy}><Text style={styles.previewName}>{selected.name}</Text><Text style={styles.previewMeta}>Room effect • combo ready</Text></View>
        <Text style={styles.previewCost}>💎 {selected.cost.toLocaleString()}</Text>
      </View>

      <View style={styles.tabs}>
        {(["Popular","Luxury","Couple","Event"] as const).map((item)=>(
          <Pressable key={item} onPress={()=>setTab(item)} style={[styles.tab,tab===item&&styles.tabActive]}>
            <Text style={[styles.tabText,tab===item&&styles.tabTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.grid}>
        {visible.map((gift)=>(
          <Pressable key={gift.id} onPress={()=>setSelectedId(gift.id)} style={[styles.gift,selected.id===gift.id&&styles.giftActive]}>
            <View style={[styles.giftArt,{backgroundColor:gift.tone}]}><Text style={styles.giftIcon}>{gift.icon}</Text></View>
            <Text style={styles.giftName}>{gift.name}</Text>
            <Text style={styles.cost}>💎 {gift.cost.toLocaleString()}</Text>
            {selected.id===gift.id?<View style={styles.check}><Text style={styles.checkText}>✓</Text></View>:null}
          </Pressable>
        ))}
      </View>

      <View style={styles.combo}>
        <View><Text style={styles.comboTitle}>Combo</Text><Text style={styles.comboSub}>{selected.name} × {qty} • 💎 {total.toLocaleString()}</Text></View>
        <View style={styles.qty}>
          <Pressable onPress={()=>setQty(Math.max(1,qty-1))}><Text style={styles.qtyBtn}>−</Text></Pressable>
          <Text style={styles.qtyText}>{qty}</Text>
          <Pressable onPress={()=>setQty(Math.min(99,qty+1))}><Text style={styles.qtyBtn}>＋</Text></Pressable>
        </View>
      </View>

      {!canSend&&!sending?<Text style={styles.insufficient}>You need more diamonds for this combo.</Text>:null}

      <Pressable disabled={!canSend} onPress={submit} style={[styles.primary,!canSend&&styles.primaryDisabled]}>
        <Text style={styles.primaryText}>{sending?"Sending...":"Send gift"}</Text>
        <Text style={styles.arrow}>🎁</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:26,gap:14},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#EEEAF4"},
  backText:{color:"#4E465E",fontSize:29,marginTop:-3},
  title:{color:"#2B243D",fontSize:20,fontWeight:"900",marginLeft:10},
  sub:{color:"#968FA2",fontSize:8,marginLeft:10,marginTop:2},
  balance:{marginLeft:"auto",paddingHorizontal:11,paddingVertical:9,borderRadius:15,backgroundColor:"#EEE9FF"},
  balanceText:{color:"#6C4DF1",fontSize:9,fontWeight:"900"},
  preview:{minHeight:88,borderRadius:24,backgroundColor:"#FFFFFF",padding:12,flexDirection:"row",alignItems:"center",borderWidth:1,borderColor:"#EEEAF4"},
  previewArt:{width:64,height:64,borderRadius:20,alignItems:"center",justifyContent:"center"},
  previewIcon:{fontSize:35},
  previewCopy:{flex:1,marginLeft:11},
  previewName:{color:"#30283F",fontSize:14,fontWeight:"900"},
  previewMeta:{color:"#9891A4",fontSize:8,marginTop:3},
  previewCost:{color:"#7A5CFF",fontSize:10,fontWeight:"900"},
  tabs:{flexDirection:"row",backgroundColor:"#FFFFFF",borderRadius:18,padding:4,borderWidth:1,borderColor:"#EEEAF4"},
  tab:{flex:1,minHeight:40,borderRadius:14,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#7A5CFF"},
  tabText:{color:"#918A9F",fontSize:8.5,fontWeight:"800"},
  tabTextActive:{color:"#FFFFFF"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:9},
  gift:{width:"23.1%",minHeight:118,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1.5,borderColor:"#EEEAF4",alignItems:"center",padding:8,position:"relative"},
  giftActive:{borderColor:"#8B5CFF",backgroundColor:"#FBFAFF"},
  giftArt:{width:56,height:56,borderRadius:18,alignItems:"center",justifyContent:"center"},
  giftIcon:{fontSize:29},
  giftName:{color:"#4B435A",fontSize:8,fontWeight:"900",marginTop:7},
  cost:{color:"#7A5CFF",fontSize:7,marginTop:3,fontWeight:"800"},
  check:{position:"absolute",right:5,top:5,width:18,height:18,borderRadius:9,backgroundColor:"#7A5CFF",alignItems:"center",justifyContent:"center"},
  checkText:{color:"#FFFFFF",fontSize:10,fontWeight:"900"},
  combo:{minHeight:74,borderRadius:20,backgroundColor:"#FFFFFF",padding:13,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderWidth:1,borderColor:"#EEEAF4"},
  comboTitle:{color:"#3A3249",fontSize:10,fontWeight:"900"},
  comboSub:{color:"#8C8499",fontSize:8,marginTop:3},
  qty:{flexDirection:"row",alignItems:"center",gap:11},
  qtyBtn:{color:"#6D4DF2",fontSize:17,width:30,height:30,borderRadius:15,backgroundColor:"#EEE9FF",textAlign:"center",paddingTop:3},
  qtyText:{color:"#332B43",fontSize:11,fontWeight:"900"},
  insufficient:{color:"#FF647B",fontSize:8,textAlign:"center"},
  primary:{minHeight:58,borderRadius:21,backgroundColor:"#FF5FA2",alignItems:"center",justifyContent:"center",flexDirection:"row"},
  primaryDisabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  arrow:{position:"absolute",right:20,fontSize:18},
});
