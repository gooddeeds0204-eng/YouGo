import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { getMyWallet, listMyWalletTransactions, type WalletTransactionRow } from "@/platform/supabase/wallet";

const demoTx=[
  ["🎁","Gift sent • Heart ×10","-500","Today"],
  ["💎","Recharge","＋2,000","Yesterday"],
  ["🎮","Game reward","＋120","Sep 23"],
  ["🛍","Frame purchase","-850","Sep 22"],
];

export function WalletScreen(){
  const [diamonds,setDiamonds]=useState(3480);
  const [coins,setCoins]=useState(18240);
  const [eventTokens,setEventTokens]=useState(560);
  const [freeSpins,setFreeSpins]=useState(12);
  const [transactions,setTransactions]=useState<WalletTransactionRow[]>([]);

  useEffect(()=>{
    void getMyWallet().then((wallet)=>{
      if(!wallet)return;
      setDiamonds(wallet.diamonds);
      setCoins(wallet.coins);
      setEventTokens(wallet.eventTokens);
      setFreeSpins(wallet.freeSpins);
    }).catch(()=>undefined);
    void listMyWalletTransactions().then(setTransactions).catch(()=>undefined);
  },[]);

  const currency=[
    ["💎","Diamonds",diamonds.toLocaleString(),"#EEE9FF"],
    ["🪙","Coins",coins.toLocaleString(),"#FFF4D9"],
    ["🎟","Tokens",eventTokens.toLocaleString(),"#FFEAF3"],
    ["🎡","Spins",freeSpins.toLocaleString(),"#E9FFF7"],
  ];

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.kicker}>MY ASSETS</Text><Text style={styles.title}>Wallet</Text></View>
        <Text style={styles.history}>History</Text>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.orbA}/><View style={styles.orbB}/>
        <Text style={styles.label}>AVAILABLE DIAMONDS</Text>
        <Text style={styles.balance}>💎 {diamonds.toLocaleString()}</Text>
        <Text style={styles.balanceSub}>Use diamonds for gifts, store items and premium experiences.</Text>
        <View style={styles.actions}>
          <Pressable style={styles.recharge}><Text style={styles.rechargeText}>＋ Recharge</Text></Pressable>
          <Pressable style={styles.store}><Text style={styles.storeText}>🛍 Store</Text></Pressable>
        </View>
      </View>

      <View style={styles.currencyRow}>
        {currency.map(([icon,label,value,tone])=><View key={label} style={[styles.currency,{backgroundColor:tone}]}><Text style={styles.currencyIcon}>{icon}</Text><Text style={styles.currencyValue}>{value}</Text><Text style={styles.currencyLabel}>{label}</Text></View>)}
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Recent activity</Text><Text style={styles.see}>View all</Text></View>
      <View style={styles.list}>
        {transactions.length?transactions.map((tx)=>{
          const positive=tx.amount>0;
          const icon=tx.type==="gift-send"?"🎁":tx.type==="reward"?"🎮":tx.type==="recharge"?"💎":"🛍";
          return <View key={tx.id} style={styles.row}><View style={styles.txIcon}><Text>{icon}</Text></View><View style={styles.copy}><Text style={styles.txTitle}>{tx.type.replaceAll("-"," ")}</Text><Text style={styles.date}>{new Date(tx.createdAt).toLocaleString()}</Text></View><Text style={[styles.amount,positive&&styles.plus]}>{positive?"＋":""}{tx.amount.toLocaleString()}</Text></View>;
        }):demoTx.map(([icon,title,amount,date])=><View key={title} style={styles.row}><View style={styles.txIcon}><Text>{icon}</Text></View><View style={styles.copy}><Text style={styles.txTitle}>{title}</Text><Text style={styles.date}>{date}</Text></View><Text style={[styles.amount,amount.startsWith("＋")&&styles.plus]}>{amount}</Text></View>)}
      </View>

      <View style={styles.note}><Text style={styles.noteIcon}>🛡</Text><Text style={styles.noteText}>Wallet balance is server-authoritative when Supabase is connected. Gift spending uses secure database transactions.</Text></View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:15},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:40,height:40,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",alignItems:"center",justifyContent:"center"},
  backText:{color:"#554D65",fontSize:29,marginTop:-3},
  kicker:{color:"#8B5CFF",fontSize:7.5,fontWeight:"900",letterSpacing:1.1,marginLeft:10},
  title:{color:"#2B243D",fontSize:21,fontWeight:"900",marginLeft:10},
  history:{marginLeft:"auto",color:"#7A5CFF",fontSize:9,fontWeight:"900"},
  balanceCard:{minHeight:215,borderRadius:30,backgroundColor:"#7A5CFF",padding:20,alignItems:"center",overflow:"hidden"},
  orbA:{position:"absolute",width:250,height:250,borderRadius:125,backgroundColor:"rgba(255,255,255,.10)",right:-90,top:-110},
  orbB:{position:"absolute",width:170,height:170,borderRadius:85,backgroundColor:"rgba(255,95,162,.25)",left:-70,bottom:-80},
  label:{color:"rgba(255,255,255,.68)",fontSize:7,fontWeight:"900",letterSpacing:1.2},
  balance:{color:"#FFFFFF",fontSize:34,fontWeight:"900",marginTop:11},
  balanceSub:{color:"rgba(255,255,255,.68)",fontSize:8,lineHeight:12,textAlign:"center",maxWidth:280,marginTop:5},
  actions:{flexDirection:"row",gap:9,width:"100%",marginTop:24},
  recharge:{flex:1,minHeight:48,borderRadius:17,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  rechargeText:{color:"#6B4CF0",fontSize:9,fontWeight:"900"},
  store:{flex:1,minHeight:48,borderRadius:17,backgroundColor:"rgba(255,255,255,.16)",alignItems:"center",justifyContent:"center"},
  storeText:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  currencyRow:{flexDirection:"row",gap:7},
  currency:{flex:1,minHeight:88,borderRadius:18,alignItems:"center",justifyContent:"center"},
  currencyIcon:{fontSize:20},
  currencyValue:{color:"#3C354A",fontSize:10,fontWeight:"900",marginTop:4},
  currencyLabel:{color:"#8C8498",fontSize:6.5,marginTop:2,textAlign:"center"},
  sectionHead:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  sectionTitle:{color:"#2D263D",fontSize:16,fontWeight:"900"},
  see:{color:"#7A5CFF",fontSize:8.5,fontWeight:"800"},
  list:{gap:7},
  row:{minHeight:64,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EEEAF4",padding:10,flexDirection:"row",alignItems:"center"},
  txIcon:{width:42,height:42,borderRadius:14,backgroundColor:"#F2EDFF",alignItems:"center",justifyContent:"center"},
  copy:{flex:1,marginLeft:10},
  txTitle:{color:"#433B52",fontSize:8.5,fontWeight:"900",textTransform:"capitalize"},
  date:{color:"#9991A3",fontSize:6.5,marginTop:3},
  amount:{color:"#FF647B",fontSize:8.5,fontWeight:"900"},
  plus:{color:"#39BD8D"},
  note:{borderRadius:18,backgroundColor:"#EAF8F4",padding:12,flexDirection:"row",gap:8},
  noteIcon:{fontSize:16},
  noteText:{color:"#63857B",fontSize:6.8,lineHeight:10,flex:1},
});
