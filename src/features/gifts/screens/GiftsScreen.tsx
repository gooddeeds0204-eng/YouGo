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
          <Text style={styles.eyebrow}>GIFT COLLECTION</Text>
          <Text style={styles.title}>Send a gift</Text>
        </View>
        <Pressable onPress={()=>router.push("/wallet")} style={styles.balance}><Text style={styles.balanceText}>💎 {balance.toLocaleString()}</Text></Pressable>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroOrb}/>
        <View style={styles.heroIcon}><Text style={styles.heroEmoji}>{selected.icon}</Text></View>
        <View style={styles.heroCopy}>
          <Text style={styles.heroLabel}>SELECTED GIFT</Text>
          <Text style={styles.heroName}>{selected.name}</Text>
          <Text style={styles.heroCost}>💎 {selected.cost.toLocaleString()} each</Text>
        </View>
        <View style={styles.premiumMark}><Text style={styles.premiumText}>✦</Text></View>
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
            <View style={[styles.giftIconWrap,selected.id===gift.id&&styles.giftIconWrapActive]}><Text style={styles.giftIcon}>{gift.icon}</Text></View>
            <Text style={styles.giftName}>{gift.name}</Text>
            <Text style={styles.cost}>💎 {gift.cost.toLocaleString()}</Text>
            {selected.id===gift.id?<View style={styles.selectedDot}/>:null}
          </Pressable>
        ))}
      </View>

      <View style={styles.summary}>
        <View>
          <Text style={styles.summaryLabel}>SEND COMBO</Text>
          <Text style={styles.summaryTitle}>{selected.name} × {qty}</Text>
          <Text style={styles.summaryCost}>Total 💎 {total.toLocaleString()}</Text>
        </View>

        <View style={styles.qty}>
          <Pressable onPress={()=>setQty(Math.max(1,qty-1))} style={styles.qtyButton}><Text style={styles.qtyButtonText}>−</Text></Pressable>
          <Text style={styles.qtyText}>{qty}</Text>
          <Pressable onPress={()=>setQty(Math.min(99,qty+1))} style={styles.qtyButton}><Text style={styles.qtyButtonText}>＋</Text></Pressable>
        </View>
      </View>

      {!canSend&&!sending?<Text style={styles.insufficient}>Not enough diamonds for this combo.</Text>:null}

      <Pressable disabled={!canSend} onPress={submit} style={[styles.primary,!canSend&&styles.disabled]}>
        <Text style={styles.primaryText}>{sending?"Sending...":"Send gift"}</Text>
        <Text style={styles.primaryIcon}>✦</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:24,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",marginRight:10},
  backText:{color:"#4B4551",fontSize:30,marginTop:-3},
  eyebrow:{color:"#A1874F",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#1D1924",fontSize:22,fontWeight:"900",marginTop:1},
  balance:{marginLeft:"auto",paddingHorizontal:11,paddingVertical:9,borderRadius:14,backgroundColor:"#EEE9FF",borderWidth:1,borderColor:"#DED5FF"},
  balanceText:{color:"#6549D5",fontSize:12,fontWeight:"900"},
  hero:{minHeight:116,borderRadius:23,backgroundColor:"#1B1623",padding:14,flexDirection:"row",alignItems:"center",overflow:"hidden",borderWidth:1,borderColor:"#34283F"},
  heroOrb:{position:"absolute",width:140,height:140,borderRadius:70,backgroundColor:"rgba(112,84,232,.22)",right:-45,top:-50},
  heroIcon:{width:76,height:76,borderRadius:23,backgroundColor:"rgba(255,255,255,.07)",borderWidth:1,borderColor:"rgba(232,185,90,.18)",alignItems:"center",justifyContent:"center"},
  heroEmoji:{fontSize:39},
  heroCopy:{flex:1,marginLeft:13},
  heroLabel:{color:"#E8B95A",fontSize:8,fontWeight:"900",letterSpacing:1},
  heroName:{color:"#FFFFFF",fontSize:19,fontWeight:"900",marginTop:3},
  heroCost:{color:"rgba(255,255,255,.58)",fontSize:11,marginTop:4},
  premiumMark:{width:34,height:34,borderRadius:12,backgroundColor:"rgba(232,185,90,.10)",alignItems:"center",justifyContent:"center"},
  premiumText:{color:"#E8B95A",fontSize:17},
  tabs:{flexDirection:"row",backgroundColor:"#F0EDF6",borderRadius:17,padding:4},
  tab:{flex:1,minHeight:42,borderRadius:14,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#FFFFFF",shadowColor:"#342A43",shadowOpacity:.05,shadowRadius:7,elevation:2},
  tabText:{color:"#817A88",fontSize:11,fontWeight:"800"},
  tabTextActive:{color:"#5F47CF"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  gift:{width:"31.5%",minHeight:126,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",padding:10,position:"relative"},
  giftActive:{borderColor:"#B9A8FF",backgroundColor:"#FAF8FF"},
  giftIconWrap:{width:58,height:58,borderRadius:18,backgroundColor:"#F3F0F8",alignItems:"center",justifyContent:"center"},
  giftIconWrapActive:{backgroundColor:"#EEE9FF"},
  giftIcon:{fontSize:31},
  giftName:{color:"#443E49",fontSize:12,fontWeight:"900",marginTop:8,textAlign:"center"},
  cost:{color:"#7054E8",fontSize:10.5,fontWeight:"800",marginTop:4},
  selectedDot:{position:"absolute",right:8,top:8,width:8,height:8,borderRadius:4,backgroundColor:"#E8B95A"},
  summary:{minHeight:86,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:13,flexDirection:"row",alignItems:"center"},
  summaryLabel:{color:"#A1874F",fontSize:8,fontWeight:"900",letterSpacing:1},
  summaryTitle:{color:"#2C2732",fontSize:14,fontWeight:"900",marginTop:3},
  summaryCost:{color:"#7C7583",fontSize:11,marginTop:3},
  qty:{marginLeft:"auto",flexDirection:"row",alignItems:"center",gap:8},
  qtyButton:{width:34,height:34,borderRadius:13,backgroundColor:"#F0EDF6",alignItems:"center",justifyContent:"center"},
  qtyButtonText:{color:"#6549D5",fontSize:17,fontWeight:"900"},
  qtyText:{color:"#2F2935",fontSize:13,fontWeight:"900",minWidth:20,textAlign:"center"},
  insufficient:{color:"#D9546D",fontSize:11.5,textAlign:"center"},
  primary:{minHeight:58,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",flexDirection:"row"},
  disabled:{opacity:.38},
  primaryText:{color:"#FFFFFF",fontSize:15,fontWeight:"900"},
  primaryIcon:{position:"absolute",right:18,color:"#E8B95A",fontSize:18},
});
