import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { getMyWallet, listMyWalletTransactions, type WalletTransactionRow } from "@/platform/supabase/wallet";

const demoTx=[
  ["🎁","Gift sent","-500","Today"],
  ["💎","Recharge","＋2,000","Yesterday"],
  ["🎮","Game reward","＋120","Sep 23"],
];

export function WalletScreen(){
  const [diamonds,setDiamonds]=useState(3480);
  const [coins,setCoins]=useState(18240);
  const [eventTokens,setEventTokens]=useState(560);
  const [freeSpins,setFreeSpins]=useState(12);
  const [transactions,setTransactions]=useState<WalletTransactionRow[]>([]);

  useEffect(()=>{
    void getMyWallet().then(wallet=>{
      if(!wallet)return;
      setDiamonds(wallet.diamonds);
      setCoins(wallet.coins);
      setEventTokens(wallet.eventTokens);
      setFreeSpins(wallet.freeSpins);
    }).catch(()=>undefined);
    void listMyWalletTransactions().then(setTransactions).catch(()=>undefined);
  },[]);

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.title}>Wallet</Text>
        <Text style={styles.history}>History</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Diamond balance</Text>
        <Text style={styles.balance}>💎 {diamonds.toLocaleString()}</Text>
        <View style={styles.actions}>
          <Pressable style={styles.recharge}><Text style={styles.rechargeText}>Recharge</Text></Pressable>
          <Pressable style={styles.store}><Text style={styles.storeText}>Store</Text></Pressable>
        </View>
      </View>

      <View style={styles.currencyRow}>
        {[
          ["🪙","Coins",coins.toLocaleString()],
          ["🎟","Tokens",eventTokens.toLocaleString()],
          ["🎡","Spins",freeSpins.toLocaleString()],
        ].map(([icon,label,value])=>(
          <View key={label} style={styles.currency}>
            <Text style={styles.currencyIcon}>{icon}</Text>
            <Text style={styles.currencyValue}>{value}</Text>
            <Text style={styles.currencyLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent activity</Text>
      <View style={styles.list}>
        {transactions.length?transactions.slice(0,6).map(tx=>{
          const positive=tx.amount>0;
          return(
            <View key={tx.id} style={styles.row}>
              <View style={styles.txIcon}><Text>{tx.type==="gift-send"?"🎁":tx.type==="reward"?"🎮":"💎"}</Text></View>
              <View style={styles.copy}><Text style={styles.txTitle}>{tx.type.replaceAll("-"," ")}</Text><Text style={styles.date}>{new Date(tx.createdAt).toLocaleDateString()}</Text></View>
              <Text style={[styles.amount,positive&&styles.plus]}>{positive?"＋":""}{tx.amount.toLocaleString()}</Text>
            </View>
          );
        }):demoTx.map(([icon,title,amount,date])=>(
          <View key={title} style={styles.row}>
            <View style={styles.txIcon}><Text>{icon}</Text></View>
            <View style={styles.copy}><Text style={styles.txTitle}>{title}</Text><Text style={styles.date}>{date}</Text></View>
            <Text style={[styles.amount,amount.startsWith("＋")&&styles.plus]}>{amount}</Text>
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:24,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  backText:{color:"#4D4657",fontSize:30,marginTop:-3},
  title:{color:"#211D2C",fontSize:22,fontWeight:"900",marginLeft:10},
  history:{marginLeft:"auto",color:"#7657F6",fontSize:12,fontWeight:"900"},
  balanceCard:{minHeight:190,borderRadius:24,backgroundColor:"#7657F6",padding:18,alignItems:"center",justifyContent:"center"},
  balanceLabel:{color:"rgba(255,255,255,.72)",fontSize:12,fontWeight:"700"},
  balance:{color:"#FFFFFF",fontSize:32,fontWeight:"900",marginTop:8},
  actions:{flexDirection:"row",gap:10,width:"100%",marginTop:22},
  recharge:{flex:1,minHeight:48,borderRadius:16,backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center"},
  rechargeText:{color:"#6749DB",fontSize:13,fontWeight:"900"},
  store:{flex:1,minHeight:48,borderRadius:16,backgroundColor:"rgba(255,255,255,.16)",alignItems:"center",justifyContent:"center"},
  storeText:{color:"#FFFFFF",fontSize:13,fontWeight:"900"},
  currencyRow:{flexDirection:"row",gap:8},
  currency:{flex:1,minHeight:94,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",alignItems:"center",justifyContent:"center"},
  currencyIcon:{fontSize:23},
  currencyValue:{color:"#332E3A",fontSize:14,fontWeight:"900",marginTop:5},
  currencyLabel:{color:"#817A8B",fontSize:10,marginTop:2},
  sectionTitle:{color:"#211D2C",fontSize:18,fontWeight:"900"},
  list:{gap:8},
  row:{minHeight:66,borderRadius:18,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#ECEAF2",padding:10,flexDirection:"row",alignItems:"center"},
  txIcon:{width:42,height:42,borderRadius:14,backgroundColor:"#F2EFF9",alignItems:"center",justifyContent:"center"},
  copy:{flex:1,marginLeft:10},
  txTitle:{color:"#433E49",fontSize:13,fontWeight:"800",textTransform:"capitalize"},
  date:{color:"#9A94A0",fontSize:10,marginTop:3},
  amount:{color:"#E75B72",fontSize:12,fontWeight:"900"},
  plus:{color:"#35B987"},
});
