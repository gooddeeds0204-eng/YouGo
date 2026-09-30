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
    void getMyWallet().then(wallet=>{if(wallet)setBalance(wallet.diamonds);}).catch(()=>undefined);
  },[]);

  const visible=useMemo(()=>gifts.filter(gift=>gift.category===tab),[tab]);
  const selected=gifts.find(gift=>gift.id===selectedId)??gifts[0];
  const total=selected.cost*qty;
  const canSend=total<=balance&&!sending;

  const submit=async()=>{
    if(!canSend)return;
    setSending(true);
    try{
      const result=await sendGift({giftId:selected.id,quantity:qty,roomId:roomId||null});
      if(result)setBalance(result.remainingDiamonds);
      else setBalance(current=>Math.max(0,current-total));
      router.push({pathname:"/live-effects",params:{gift:selected.name,icon:selected.icon,qty:String(qty)}});
    }finally{
      setSending(false);
    }
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View>
          <Text style={styles.title}>Send gift</Text>
          <Text style={styles.sub}>Choose a gift for the room</Text>
        </View>
        <Pressable onPress={()=>router.push("/wallet")} style={styles.balance}><Text style={styles.balanceText}>💎 {balance.toLocaleString()}</Text></Pressable>
      </View>

      <View style={styles.tabs}>
        {(["Popular","Luxury","Couple","Event"] as const).map(item=>(
          <Pressable key={item} onPress={()=>setTab(item)} style={[styles.tab,tab===item&&styles.tabActive]}>
            <Text style={[styles.tabText,tab===item&&styles.tabTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.grid}>
        {visible.map(gift=>(
          <Pressable key={gift.id} onPress={()=>setSelectedId(gift.id)} style={[styles.gift,selected.id===gift.id&&styles.giftActive]}>
            <Text style={styles.giftIcon}>{gift.icon}</Text>
            <Text style={styles.giftName}>{gift.name}</Text>
            <Text style={styles.cost}>💎 {gift.cost.toLocaleString()}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.summary}>
        <View style={styles.selectedIcon}><Text style={styles.selectedEmoji}>{selected.icon}</Text></View>
        <View style={styles.summaryCopy}>
          <Text style={styles.summaryTitle}>{selected.name}</Text>
          <Text style={styles.summaryCost}>Total 💎 {total.toLocaleString()}</Text>
        </View>

        <View style={styles.qty}>
          <Pressable onPress={()=>setQty(Math.max(1,qty-1))} style={styles.qtyButton}><Text style={styles.qtyButtonText}>−</Text></Pressable>
          <Text style={styles.qtyText}>{qty}</Text>
          <Pressable onPress={()=>setQty(Math.min(99,qty+1))} style={styles.qtyButton}><Text style={styles.qtyButtonText}>＋</Text></Pressable>
        </View>
      </View>

      {!canSend&&!sending?<Text style={styles.insufficient}>Not enough diamonds.</Text>:null}

      <Pressable disabled={!canSend} onPress={submit} style={[styles.primary,!canSend&&styles.disabled]}>
        <Text style={styles.primaryText}>{sending?"Sending...":"Send gift"}</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:24,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center",marginRight:10},
  backText:{color:"#4D4657",fontSize:30,marginTop:-3},
  title:{color:"#211D2C",fontSize:21,fontWeight:"900"},
  sub:{color:"#817A8B",fontSize:12,marginTop:2},
  balance:{marginLeft:"auto",paddingHorizontal:11,paddingVertical:9,borderRadius:14,backgroundColor:"#EEE9FF"},
  balanceText:{color:"#6749DB",fontSize:12,fontWeight:"900"},
  tabs:{flexDirection:"row",backgroundColor:"#FFFFFF",borderRadius:17,padding:4,borderWidth:1,borderColor:"#ECEAF2"},
  tab:{flex:1,minHeight:42,borderRadius:14,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#7657F6"},
  tabText:{color:"#817A8B",fontSize:11,fontWeight:"800"},
  tabTextActive:{color:"#FFFFFF"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  gift:{width:"31.5%",minHeight:118,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center",padding:10},
  giftActive:{borderColor:"#7657F6",backgroundColor:"#F4F1FF"},
  giftIcon:{fontSize:34},
  giftName:{color:"#443E4B",fontSize:12,fontWeight:"800",marginTop:8,textAlign:"center"},
  cost:{color:"#6749DB",fontSize:11,fontWeight:"800",marginTop:4},
  summary:{minHeight:78,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:11,flexDirection:"row",alignItems:"center"},
  selectedIcon:{width:54,height:54,borderRadius:16,backgroundColor:"#F3F0FA",alignItems:"center",justifyContent:"center"},
  selectedEmoji:{fontSize:28},
  summaryCopy:{flex:1,marginLeft:10},
  summaryTitle:{color:"#2F2937",fontSize:14,fontWeight:"900"},
  summaryCost:{color:"#817A8B",fontSize:11,marginTop:3},
  qty:{flexDirection:"row",alignItems:"center",gap:8},
  qtyButton:{width:32,height:32,borderRadius:16,backgroundColor:"#EEE9FF",alignItems:"center",justifyContent:"center"},
  qtyButtonText:{color:"#6749DB",fontSize:17,fontWeight:"900"},
  qtyText:{color:"#2F2937",fontSize:13,fontWeight:"900",minWidth:20,textAlign:"center"},
  insufficient:{color:"#E75872",fontSize:12,textAlign:"center"},
  primary:{minHeight:56,borderRadius:18,backgroundColor:"#F6549C",alignItems:"center",justifyContent:"center"},
  disabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
});
