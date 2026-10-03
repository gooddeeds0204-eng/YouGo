import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppScreen } from "@/shared/ui/AppScreen";
import { buyStoreItem, equipStoreItem, listStoreItems, type StoreItem } from "@/platform/supabase/store";

const demo:StoreItem[]=[
  {id:"royal-frame",name:"Royal Halo",category:"frame",currency:"diamonds",price:800,assetKey:"royal-frame",metadata:{rarity:"epic"},owned:false,equipped:false},
  {id:"neon-ride",name:"Neon Ride",category:"vehicle",currency:"diamonds",price:1500,assetKey:"neon-ride",metadata:{rarity:"epic"},owned:false,equipped:false},
  {id:"gold-bubble",name:"Gold Chat Bubble",category:"bubble",currency:"coins",price:5000,assetKey:"gold-bubble",metadata:{rarity:"rare"},owned:true,equipped:true},
  {id:"galaxy-entry",name:"Galaxy Entry",category:"entry_effect",currency:"diamonds",price:2200,assetKey:"galaxy-entry",metadata:{rarity:"legendary"},owned:false,equipped:false},
  {id:"star-badge",name:"Star Badge",category:"badge",currency:"coins",price:2500,assetKey:"star-badge",metadata:{rarity:"rare"},owned:true,equipped:false},
  {id:"midnight-theme",name:"Midnight Theme",category:"theme",currency:"diamonds",price:1800,assetKey:"midnight-theme",metadata:{rarity:"epic"},owned:false,equipped:false},
];
const icons:Record<string,string>={frame:"👑",vehicle:"🚘",bubble:"💬",entry_effect:"✨",badge:"🏅",theme:"🌌"};

export function StoreScreen(){
  const [items,setItems]=useState<StoreItem[]>([]);
  const [tab,setTab]=useState<"store"|"bag">("store");
  const [busy,setBusy]=useState<string|null>(null);

  const load=()=>void listStoreItems().then(setItems).catch(()=>setItems([]));
  useEffect(load,[]);

  const shown=items.length?items:demo;
  const visible=useMemo(()=>tab==="store"?shown:shown.filter(item=>item.owned),[shown,tab]);

  const action=async(item:StoreItem)=>{
    if(busy)return;
    setBusy(item.id);
    try{
      if(item.owned){
        const ok=await equipStoreItem(item.id);
        if(ok){
          await listStoreItems().then(setItems);
          Alert.alert("Equipped",item.name+" is now active.");
        }else{
          setItems(current=>(current.length?current:demo).map(x=>({...x,equipped:x.id===item.id&&x.category===item.category?true:x.category===item.category?false:x.equipped})));
          Alert.alert("Preview","Equipped in preview mode.");
        }
      }else{
        const result=await buyStoreItem(item.id);
        if(result){
          await listStoreItems().then(setItems);
          Alert.alert("Purchased",item.name+" was added to your bag.");
        }else{
          setItems(current=>(current.length?current:demo).map(x=>x.id===item.id?{...x,owned:true}:x));
          Alert.alert("Preview","Item added to the preview bag.");
        }
      }
    }catch(error:any){
      Alert.alert("Action failed",error?.message||"Try again.");
    }finally{
      setBusy(null);
    }
  };

  return(
    <AppScreen scroll contentStyle={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <View><Text style={styles.eyebrow}>PREMIUM IDENTITY</Text><Text style={styles.title}>Store & Bag</Text></View>
        <Pressable onPress={()=>router.push("/wallet")} style={styles.wallet}><Text style={styles.walletText}>💎 Wallet</Text></Pressable>
      </View>

      <View style={styles.tabs}>
        <Pressable onPress={()=>setTab("store")} style={[styles.tab,tab==="store"&&styles.tabActive]}><Text style={[styles.tabText,tab==="store"&&styles.tabTextActive]}>Store</Text></Pressable>
        <Pressable onPress={()=>setTab("bag")} style={[styles.tab,tab==="bag"&&styles.tabActive]}><Text style={[styles.tabText,tab==="bag"&&styles.tabTextActive]}>My Bag</Text></Pressable>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroIcon}>✦</Text>
        <View><Text style={styles.heroTitle}>Make your entrance yours</Text><Text style={styles.heroSub}>Frames, vehicles, bubbles, badges, themes and entry effects.</Text></View>
      </View>

      <View style={styles.grid}>
        {visible.map(item=>(
          <View key={item.id} style={styles.card}>
            <View style={styles.art}><Text style={styles.icon}>{icons[item.category]||"✨"}</Text></View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.rarity}>{String(item.metadata.rarity||"premium").toUpperCase()}</Text>
            <Text style={styles.price}>{item.owned?(item.equipped?"Equipped":"Owned"):(item.currency==="diamonds"?"💎":"🪙")+" "+item.price.toLocaleString()}</Text>
            <Pressable onPress={()=>action(item)} style={[styles.button,item.equipped&&styles.buttonEquipped]}>
              <Text style={[styles.buttonText,item.equipped&&styles.buttonTextEquipped]}>{busy===item.id?"...":item.owned?(item.equipped?"Active":"Equip"):"Buy"}</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {tab==="bag"&&!visible.length?<View style={styles.empty}><Text style={styles.emptyIcon}>👜</Text><Text style={styles.emptyTitle}>Your bag is empty</Text><Text style={styles.emptySub}>Buy cosmetics from the Store to see them here.</Text></View>:null}
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
  wallet:{marginLeft:"auto",paddingHorizontal:10,paddingVertical:8,borderRadius:13,backgroundColor:"#EEE9FF"},
  walletText:{color:"#6549D5",fontSize:10,fontWeight:"900"},
  tabs:{flexDirection:"row",backgroundColor:"#F0EDF6",borderRadius:17,padding:4},
  tab:{flex:1,minHeight:43,borderRadius:14,alignItems:"center",justifyContent:"center"},
  tabActive:{backgroundColor:"#FFFFFF"},
  tabText:{color:"#817A88",fontSize:12,fontWeight:"800"},
  tabTextActive:{color:"#5F47CF"},
  hero:{minHeight:100,borderRadius:21,backgroundColor:"#1B1623",padding:15,flexDirection:"row",alignItems:"center"},
  heroIcon:{color:"#E8B95A",fontSize:31,marginRight:13},
  heroTitle:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
  heroSub:{color:"rgba(255,255,255,.55)",fontSize:11,lineHeight:16,marginTop:4,maxWidth:290},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  card:{width:"48.5%",minHeight:214,borderRadius:20,backgroundColor:"#FFFFFF",borderWidth:1,borderColor:"#EAE7F1",padding:12},
  art:{height:78,borderRadius:17,backgroundColor:"#F2EFF9",alignItems:"center",justifyContent:"center"},
  icon:{fontSize:35},
  name:{color:"#37313D",fontSize:13,fontWeight:"900",marginTop:10},
  rarity:{color:"#A1874F",fontSize:8,fontWeight:"900",letterSpacing:.8,marginTop:3},
  price:{color:"#6D6575",fontSize:11,fontWeight:"800",marginTop:7},
  button:{minHeight:38,borderRadius:13,backgroundColor:"#7054E8",alignItems:"center",justifyContent:"center",marginTop:"auto"},
  buttonEquipped:{backgroundColor:"#EDF8F4"},
  buttonText:{color:"#FFFFFF",fontSize:11,fontWeight:"900"},
  buttonTextEquipped:{color:"#339875"},
  empty:{alignItems:"center",paddingVertical:45},
  emptyIcon:{fontSize:40},
  emptyTitle:{color:"#3D3743",fontSize:16,fontWeight:"900",marginTop:10},
  emptySub:{color:"#8C8592",fontSize:11,marginTop:4},
});
