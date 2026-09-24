import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { colors } from "@/shared/theme";

const gifts=[
  ["🌹","Rose","10"],["💗","Heart","50"],["🍦","Ice Cream","100"],["🚗","Supercar","500"],
  ["🏰","Castle","1,000"],["🚀","Rocket","5,000"],["👑","Crown","8,888"],["💎","Galaxy","12,999"]
];

export function GiftsScreen(){
  const [tab,setTab]=useState("Popular");
  const [qty,setQty]=useState(1);
  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}><Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.title}>Gifts</Text><Pressable onPress={()=>router.push("/wallet")} style={styles.balance}><Text style={styles.balanceText}>💎 1,250</Text></Pressable></View>
      <View style={styles.tabs}>{["Popular","Luxury","Couple","Event"].map(item=><Pressable key={item} onPress={()=>setTab(item)} style={[styles.tab,tab===item&&styles.tabActive]}><Text style={[styles.tabText,tab===item&&styles.tabTextActive]}>{item}</Text></Pressable>)}</View>

      <View style={styles.grid}>
        {gifts.map(([icon,name,cost],index)=><Pressable key={name} style={[styles.gift,index===1&&styles.giftActive]}>
          <View style={styles.giftArt}><Text style={styles.giftIcon}>{icon}</Text></View>
          <Text style={styles.giftName}>{name}</Text>
          <Text style={styles.cost}>💎 {cost}</Text>
        </Pressable>)}
      </View>

      <View style={styles.combo}>
        <View><Text style={styles.comboTitle}>Gift combo</Text><Text style={styles.comboSub}>Tap fast to build a combo</Text></View>
        <View style={styles.qty}><Pressable onPress={()=>setQty(Math.max(1,qty-1))}><Text style={styles.qtyBtn}>−</Text></Pressable><Text style={styles.qtyText}>{qty}</Text><Pressable onPress={()=>setQty(Math.min(99,qty+1))}><Text style={styles.qtyBtn}>＋</Text></Pressable></View>
      </View>

      <Pressable onPress={()=>router.push("/live-effects")} style={styles.primary}><Text style={styles.primaryText}>SEND GIFT</Text><Text style={styles.primarySub}>Heart × {qty}</Text></Pressable>
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
  primary:{minHeight:58,borderRadius:20,backgroundColor:"#E83CB9",alignItems:"center",justifyContent:"center"},
  primaryText:{color:"#FFFFFF",fontSize:12,fontWeight:"900",letterSpacing:1},
  primarySub:{color:"rgba(255,255,255,.75)",fontSize:7,marginTop:2},
});
