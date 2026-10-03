import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import {
  createRechargeCheckout,
  isRechargeProviderConfigured,
  rechargePackages,
  type RechargePackage,
} from "@/platform/payments/recharge";

export function RechargeScreen(){
  const [selected,setSelected]=useState<RechargePackage>(rechargePackages[1]);
  const [busy,setBusy]=useState(false);
  const ready=isRechargeProviderConfigured();

  const checkout=async()=>{
    if(busy)return;
    setBusy(true);
    try{
      const result=await createRechargeCheckout(selected);
      if(!result.ready){
        Alert.alert(
          "Payment provider pending",
          "Recharge UI and secure checkout boundary are ready. Connect the production payment gateway to accept real payments.",
        );
      }
    }finally{
      setBusy(false);
    }
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.eyebrow}>SECURE CHECKOUT</Text><Text style={styles.title}>Recharge</Text></View>
        <View style={styles.secure}><Text style={styles.secureText}>🔒</Text></View>
      </View>

      <View style={styles.hero}>
        <View style={styles.glow}/>
        <Text style={styles.heroIcon}>💎</Text>
        <Text style={styles.heroTitle}>{(selected.diamonds+selected.bonus).toLocaleString()} diamonds</Text>
        <Text style={styles.heroSub}>{selected.bonus ? selected.diamonds.toLocaleString()+" + "+selected.bonus.toLocaleString()+" bonus" : selected.diamonds.toLocaleString()+" diamonds"}</Text>
        <Text style={styles.heroPrice}>₹{selected.priceInr.toLocaleString()}</Text>
      </View>

      <Text style={styles.sectionTitle}>Choose a pack</Text>
      <View style={styles.grid}>
        {rechargePackages.map(pkg=>{
          const active=selected.id===pkg.id;
          return(
            <Pressable key={pkg.id} onPress={()=>setSelected(pkg)} style={[styles.card,active&&styles.cardActive]}>
              {pkg.bonus?<View style={styles.bonus}><Text style={styles.bonusText}>+{pkg.bonus}</Text></View>:null}
              <Text style={styles.diamond}>💎</Text>
              <Text style={styles.amount}>{(pkg.diamonds+pkg.bonus).toLocaleString()}</Text>
              <Text style={styles.base}>{pkg.diamonds.toLocaleString()} base</Text>
              <Text style={styles.price}>₹{pkg.priceInr.toLocaleString()}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.info}>
        <Text style={styles.infoIcon}>🛡</Text>
        <View style={styles.infoCopy}>
          <Text style={styles.infoTitle}>Server-authoritative balance</Text>
          <Text style={styles.infoText}>Diamonds are credited only after the payment provider verifies the transaction. The mobile client never edits wallet balances directly.</Text>
        </View>
      </View>

      <Pressable onPress={checkout} style={styles.primary}>
        <Text style={styles.primaryText}>{busy ? "Preparing..." : ready ? "Pay ₹"+selected.priceInr.toLocaleString() : "Payment setup pending"}</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles=StyleSheet.create({
  screen:{paddingTop:10,paddingBottom:30,gap:16},
  header:{flexDirection:"row",alignItems:"center"},
  back:{width:42,height:42,borderRadius:14,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",marginRight:10},
  backText:{color:"#4B4551",fontSize:30,marginTop:-3},
  eyebrow:{color:"#A1874F",fontSize:9,fontWeight:"900",letterSpacing:1.1},
  title:{color:"#1D1924",fontSize:21,fontWeight:"900"},
  secure:{marginLeft:"auto",width:42,height:42,borderRadius:14,backgroundColor:"#EAF8F4",alignItems:"center",justifyContent:"center"},
  secureText:{fontSize:17},
  hero:{minHeight:205,borderRadius:25,backgroundColor:"#1B1623",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  glow:{position:"absolute",width:240,height:240,borderRadius:120,backgroundColor:"rgba(112,84,232,.28)",right:-80,top:-90},
  heroIcon:{fontSize:42},
  heroTitle:{color:"#FFFFFF",fontSize:24,fontWeight:"900",marginTop:9},
  heroSub:{color:"rgba(255,255,255,.55)",fontSize:11,marginTop:4},
  heroPrice:{color:"#E8B95A",fontSize:18,fontWeight:"900",marginTop:12},
  sectionTitle:{color:"#1D1924",fontSize:18,fontWeight:"900"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  card:{width:"31.5%",minHeight:140,borderRadius:19,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",alignItems:"center",justifyContent:"center",padding:9,position:"relative"},
  cardActive:{borderColor:"#A996F5",backgroundColor:"#F8F5FF"},
  bonus:{position:"absolute",right:7,top:7,paddingHorizontal:6,paddingVertical:3,borderRadius:8,backgroundColor:"#EAF8F4"},
  bonusText:{color:"#319372",fontSize:8,fontWeight:"900"},
  diamond:{fontSize:26},
  amount:{color:"#332E3A",fontSize:15,fontWeight:"900",marginTop:5},
  base:{color:"#918A97",fontSize:9,marginTop:2},
  price:{color:"#7054E8",fontSize:12,fontWeight:"900",marginTop:8},
  info:{borderRadius:18,backgroundColor:"#EAF8F4",padding:13,flexDirection:"row"},
  infoIcon:{fontSize:20,marginRight:9},
  infoCopy:{flex:1},
  infoTitle:{color:"#416A5D",fontSize:12,fontWeight:"900"},
  infoText:{color:"#69877E",fontSize:10.5,lineHeight:16,marginTop:3},
  primary:{minHeight:58,borderRadius:18,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center"},
  primaryText:{color:"#FFFFFF",fontSize:14,fontWeight:"900"},
});
