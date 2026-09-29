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
};

const gifts:GiftItem[]=[
  {id:"rose",icon:"🌹",name:"Rose",cost:10,category:"Popular"},
  {id:"couple-heart",icon:"💗",name:"Heart",cost:50,category:"Couple"},
  {id:"ice-cream",icon:"🍦",name:"Ice Cream",cost:100,category:"Popular"},
  {id:"supercar",icon:"🚗",name:"Supercar",cost:500,category:"Luxury"},
  {id:"castle",icon:"🏰",name:"Castle",cost:1000,category:"Luxury"},
  {id:"rocket",icon:"🚀",name:"Rocket",cost:5000,category:"Event"},
  {id:"crown",icon:"👑",name:"Crown",cost:8888,category:"Luxury"},
  {id:"galaxy",icon:"💎",name:"Galaxy",cost:12999,category:"Event"},
];

export function GiftsScreen(){
  const {roomId}=useLocalSearchParams<{roomId?:string}>();
  const [tab,setTab]=useState<GiftItem["category"]>("Popular");
  const [qty,setQty]=useState(1);
  const [selectedId,setSelectedId]=useState("rose");
  const [balance,setBalance]=useState(1250);
  const [sending,setSending]=useState(false);

  useEffect(()=>{
    void getMyWallet().then((wallet)=>{
      if(wallet) setBalance(wallet.diamonds);
    }).catch(()=>undefined);
  },[]);

  const visible=useMemo(()=>gifts.filter((gift)=>gift.category===tab),[tab]);
  const selected=gifts.find((gift)=>gift.id===selectedId)??gifts[0];
  const total=selected.cost*qty;
  const canSend=total<=balance&&!sending;

  const submit=async()=>{
    if(!canSend)return;
    setSending(true);
    try{
      const result=await sendGift({
        giftId:selected.id,
        quantity:qty,
        roomId:roomId||null,
      });

      if(result){
        setBalance(result.remainingDiamonds);
      }else{
        setBalance((current)=>Math.max(0,current-total));
      }

      router.push({
        pathname:"/live-effects",
        params:{
          gift:selected.name,
          icon:selected.icon,
          qty:String(qty),
        },
      });
    }finally{
      setSending(false);
    }
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>Gifts</Text>
        <Pressable onPress={()=>router.push("/wallet")} style={styles.balance}><Text style={styles.balanceText}>💎 {balance.toLocaleString()}</Text></Pressable>
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
            <View style={styles.giftArt}><Text style={styles.giftIcon}>{gift.icon}</Text></View>
            <Text style={styles.giftName}>{gift.name}</Text>
            <Text style={styles.cost}>💎 {gift.cost.toLocaleString()}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.combo}>
        <View>
          <Text style={styles.comboTitle}>Gift combo</Text>
          <Text style={styles.comboSub}>{selected.name} • total 💎 {total.toLocaleString()}</Text>
        </View>
        <View style={styles.qty}>
          <Pressable onPress={()=>setQty(Math.max(1,qty-1))}><Text style={styles.qtyBtn}>−</Text></Pressable>
          <Text style={styles.qtyText}>{qty}</Text>
          <Pressable onPress={()=>setQty(Math.min(99,qty+1))}><Text style={styles.qtyBtn}>＋</Text></Pressable>
        </View>
      </View>

      {!canSend&&!sending?<Text style={styles.insufficient}>Not enough diamonds for this combo.</Text>:null}

      <Pressable disabled={!canSend} onPress={submit} style={[styles.primary,!canSend&&styles.primaryDisabled]}>
        <Text style={styles.primaryText}>{sending?"SENDING...":"SEND GIFT"}</Text>
        <Text style={styles.primarySub}>{selected.name} × {qty}</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:14},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{width:38,height:38,borderRadius:13,backgroundColor:"#11131E",alignItems:"center",justifyContent:"center"},
  backText:{color:"#FFFFFF",fontSize:28,marginTop:-3},
  title:{color:"#FFFFFF",fontSize:20,fontWeight:"900"},
  balance:{paddingHorizontal:11,paddingVertical:8,borderRadius:15,backgroundColor:"#17192A"},
  balanceText:{color:"#FFFFFF",fontSize:8,fontWeight:"900"},
  tabs:{flexDirection:"row",backgroundColor:"#11131E",borderRadius:16,padding:4},
  tab:{flex:1,minHeight:38,borderRadius:13,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#2A173A"},
  tabText:{color:"#6E7488",fontSize:8,fontWeight:"800"},
  tabTextActive:{color:"#F08BD8"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:9},
  gift:{width:"23.1%",minHeight:112,borderRadius:18,backgroundColor:"#11131E",borderWidth:1,borderColor:"rgba(255,255,255,.06)",alignItems:"center",padding:8},
  giftActive:{borderColor:"rgba(232,60,185,.5)",backgroundColor:"#211426"},
  giftArt:{width:52,height:52,borderRadius:18,backgroundColor:"#1A1830",alignItems:"center",justifyContent:"center"},
  giftIcon:{fontSize:28},
  giftName:{color:"#FFFFFF",fontSize:7.5,fontWeight:"800",marginTop:7},
  cost:{color:"#E1C3FF",fontSize:6.5,marginTop:3},
  combo:{minHeight:70,borderRadius:18,backgroundColor:"#11131E",padding:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  comboTitle:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  comboSub:{color:"#73798D",fontSize:7,marginTop:3},
  qty:{flexDirection:"row",alignItems:"center",gap:13},
  qtyBtn:{color:"#FFFFFF",fontSize:18,width:28,height:28,borderRadius:14,backgroundColor:"#1B1D2A",textAlign:"center",paddingTop:2},
  qtyText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  insufficient:{color:"#FF8EA4",fontSize:7.5,textAlign:"center"},
  primary:{minHeight:58,borderRadius:20,backgroundColor:"#E83CB9",alignItems:"center",justifyContent:"center"},
  primaryDisabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:12,fontWeight:"900",letterSpacing:1},
  primarySub:{color:"rgba(255,255,255,.75)",fontSize:7,marginTop:2},
});
