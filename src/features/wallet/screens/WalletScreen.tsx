import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";

const tx=[
  ["🎁","Gift sent • Heart ×10","-500","Today"],
  ["💎","Recharge","＋2,000","Yesterday"],
  ["🎮","Game reward","＋120","Sep 23"],
  ["🛍","Frame purchase","-850","Sep 22"],
];

export function WalletScreen(){
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}><Pressable onPress={()=>router.back()}><Text style={styles.back}>‹</Text></Pressable><Text style={styles.title}>Wallet</Text><Text style={styles.history}>History</Text></View>

      <View style={styles.balanceCard}>
        <View style={styles.glow}/>
        <Text style={styles.label}>AVAILABLE BALANCE</Text>
        <Text style={styles.balance}>💎 3,480</Text>
        <Text style={styles.rupee}>Approx. premium balance</Text>
        <View style={styles.actions}>
          <Pressable style={styles.recharge}><Text style={styles.rechargeText}>RECHARGE</Text></Pressable>
          <Pressable style={styles.secondary}><Text style={styles.secondaryText}>STORE</Text></Pressable>
        </View>
      </View>

      <View style={styles.currencyRow}>
        {[
          ["💎","Diamonds","3,480"],["🪙","Coins","18,240"],["🎟","Event tokens","560"],["🎡","Free spins","12"]
        ].map(([icon,label,value])=><View key={label} style={styles.currency}><Text style={styles.currencyIcon}>{icon}</Text><Text style={styles.currencyValue}>{value}</Text><Text style={styles.currencyLabel}>{label}</Text></View>)}
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Recent activity</Text><Text style={styles.see}>View all</Text></View>
      <View style={styles.list}>
        {tx.map(([icon,title,amount,date])=><View key={title} style={styles.row}><View style={styles.txIcon}><Text>{icon}</Text></View><View style={styles.copy}><Text style={styles.txTitle}>{title}</Text><Text style={styles.date}>{date}</Text></View><Text style={[styles.amount,amount.startsWith("＋")&&styles.plus]}>{amount}</Text></View>)}
      </View>

      <View style={styles.note}><Text style={styles.noteIcon}>🛡</Text><Text style={styles.noteText}>Production balances and transactions will be server-authoritative. This screen is the UI layer only.</Text></View>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:28,gap:15},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{color:"#FFFFFF",fontSize:30},
  title:{color:"#FFFFFF",fontSize:20,fontWeight:"900"},
  history:{color:"#A87BFF",fontSize:8,fontWeight:"800"},
  balanceCard:{minHeight:220,borderRadius:30,backgroundColor:"#171A2B",padding:20,alignItems:"center",overflow:"hidden",borderWidth:1,borderColor:"rgba(116,67,255,.18)"},
  glow:{position:"absolute",width:260,height:260,borderRadius:130,backgroundColor:"rgba(116,67,255,.15)",top:-120,right:-60},
  label:{color:"#7D8296",fontSize:7,fontWeight:"900",letterSpacing:1.2},
  balance:{color:"#FFFFFF",fontSize:34,fontWeight:"900",marginTop:12},
  rupee:{color:"#777D91",fontSize:7,marginTop:4},
  actions:{flexDirection:"row",gap:8,width:"100%",marginTop:28},
  recharge:{flex:1,minHeight:48,borderRadius:16,backgroundColor:"#E83CB9",alignItems:"center",justifyContent:"center"},
  rechargeText:{color:"#FFFFFF",fontSize:9,fontWeight:"900"},
  secondary:{flex:1,minHeight:48,borderRadius:16,backgroundColor:"#23263A",alignItems:"center",justifyContent:"center"},
  secondaryText:{color:"#D8DAE4",fontSize:9,fontWeight:"900"},
  currencyRow:{flexDirection:"row",gap:7},
  currency:{flex:1,minHeight:86,borderRadius:17,backgroundColor:"#11131E",alignItems:"center",justifyContent:"center"},
  currencyIcon:{fontSize:18},
  currencyValue:{color:"#FFFFFF",fontSize:10,fontWeight:"900",marginTop:4},
  currencyLabel:{color:"#6D7386",fontSize:5.5,marginTop:2,textAlign:"center"},
  sectionHead:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  sectionTitle:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
  see:{color:"#A87BFF",fontSize:7.5,fontWeight:"800"},
  list:{gap:7},
  row:{minHeight:62,borderRadius:17,backgroundColor:"#11131E",padding:10,flexDirection:"row",alignItems:"center"},
  txIcon:{width:40,height:40,borderRadius:14,backgroundColor:"#1B1D2A",alignItems:"center",justifyContent:"center"},
  copy:{flex:1,marginLeft:10},
  txTitle:{color:"#FFFFFF",fontSize:8.5,fontWeight:"800"},
  date:{color:"#676D80",fontSize:6.5,marginTop:3},
  amount:{color:"#FF9EAE",fontSize:8.5,fontWeight:"900"},
  plus:{color:"#5AD5A5"},
  note:{borderRadius:18,backgroundColor:"#11131E",padding:12,flexDirection:"row",gap:8},
  noteIcon:{fontSize:16},
  noteText:{color:"#707688",fontSize:6.5,lineHeight:10,flex:1},
});
