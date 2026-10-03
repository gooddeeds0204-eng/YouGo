import { useEffect, useMemo, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSession } from "@/core/session/SessionProvider";
import { claimRoomSeat, leaveRoomSeat, listRoomSeats, type RoomSeat } from "@/platform/supabase/roomRuntime";
import { subscribeToRoomSeats } from "@/platform/supabase/realtime";

type Props={roomId:string;seatCount:number};

const demoSeats=[
  {seatNo:1,userId:"host",displayName:"Neha",avatarUrl:null,level:24,vipLevel:3,isLocked:false,isMuted:false},
  {seatNo:2,userId:"admin",displayName:"Arjun",avatarUrl:null,level:31,vipLevel:4,isLocked:false,isMuted:false},
  {seatNo:3,userId:"vip",displayName:"Priya",avatarUrl:null,level:28,vipLevel:5,isLocked:false,isMuted:false},
] satisfies RoomSeat[];

const tones=["#CF5A8C","#4F7BC7","#765ACD","#3FA987","#B96836"];

export function SeatGrid({roomId,seatCount}:Props){
  const {user}=useSession();
  const [rows,setRows]=useState<RoomSeat[]>([]);
  const [previewSeat,setPreviewSeat]=useState<number|null>(null);
  const [busy,setBusy]=useState<number|null>(null);

  const load=()=>void listRoomSeats(roomId).then(setRows).catch(()=>setRows([]));

  useEffect(()=>{
    load();
    const unsubscribe=subscribeToRoomSeats(roomId,()=>load());
    return unsubscribe;
  },[roomId]);

  const seats=useMemo(()=>{
    const byNo=new Map(rows.map(row=>[row.seatNo,row]));
    const demoByNo=new Map(demoSeats.map(row=>[row.seatNo,row]));
    return Array.from({length:seatCount},(_,index)=>{
      const no=index+1;
      const real=byNo.get(no);
      if(real)return real;
      const demo=rows.length?null:demoByNo.get(no);
      if(demo)return demo;
      if(previewSeat===no){
        return {seatNo:no,userId:"preview-user",displayName:"You",avatarUrl:null,level:1,vipLevel:0,isLocked:false,isMuted:false} as RoomSeat;
      }
      return {seatNo:no,userId:null,displayName:null,avatarUrl:null,level:null,vipLevel:null,isLocked:false,isMuted:false} as RoomSeat;
    });
  },[rows,seatCount,previewSeat]);

  const tap=async(item:RoomSeat)=>{
    if(item.isLocked){
      Alert.alert("Seat locked","The host locked this mic seat.");
      return;
    }

    const mine=item.userId&&(item.userId===user?.id||item.userId==="preview-user");
    if(item.userId&&!mine)return;

    setBusy(item.seatNo);
    try{
      if(mine){
        const ok=await leaveRoomSeat(roomId);
        if(ok)load(); else setPreviewSeat(null);
      }else{
        const result=await claimRoomSeat(roomId,item.seatNo);
        if(result)load(); else setPreviewSeat(item.seatNo);
      }
    }catch(error:any){
      Alert.alert("Seat",error?.message||"Could not change seat.");
    }finally{
      setBusy(null);
    }
  };

  return(
    <View style={styles.grid}>
      {seats.map((item,index)=>{
        const occupied=Boolean(item.userId);
        const isHost=item.seatNo===1&&occupied;
        const ring=isHost?"#E8B95A":item.vipLevel&&item.vipLevel>0?"#BAA6FF":"#8CBFE7";
        const role=isHost?"HOST":occupied?(item.vipLevel&&item.vipLevel>0?"VIP "+item.vipLevel:"ON MIC"):(item.isLocked?"Locked":"Open");

        return(
          <Pressable key={item.seatNo} onPress={()=>tap(item)} style={styles.seat}>
            <View style={[styles.halo,occupied&&{backgroundColor:ring+"22"}]}>
              <View style={[styles.frame,occupied&&{borderColor:ring},item.isLocked&&styles.locked]}>
                <View style={[styles.avatar,{backgroundColor:occupied?tones[index%tones.length]:"rgba(255,255,255,.055)"}]}>
                  {item.avatarUrl?<Image source={{uri:item.avatarUrl}} style={styles.image}/>:<Text style={[styles.avatarText,!occupied&&styles.openIcon]}>{busy===item.seatNo?"…":occupied?(item.displayName?.[0]||"U"):(item.isLocked?"🔒":"🎤")}</Text>}
                </View>
                {isHost?<View style={styles.badge}><Text style={styles.badgeText}>♛</Text></View>:null}
                {occupied?<View style={styles.micDot}><View style={[styles.micCore,item.isMuted&&styles.muted]}/></View>:null}
              </View>
            </View>
            <Text numberOfLines={1} style={styles.name}>{occupied?(item.displayName||"Ugo member"):"Seat "+item.seatNo}</Text>
            <Text style={[styles.role,isHost&&styles.hostRole]}>{role}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles=StyleSheet.create({
  grid:{flexDirection:"row",flexWrap:"wrap",rowGap:22,marginTop:16},
  seat:{width:"25%",alignItems:"center"},
  halo:{width:72,height:72,borderRadius:36,alignItems:"center",justifyContent:"center"},
  frame:{width:66,height:66,borderRadius:33,borderWidth:2.5,borderColor:"rgba(255,255,255,.14)",alignItems:"center",justifyContent:"center"},
  locked:{opacity:.55},
  avatar:{width:54,height:54,borderRadius:27,alignItems:"center",justifyContent:"center",overflow:"hidden"},
  image:{width:"100%",height:"100%"},
  avatarText:{color:"#FFFFFF",fontSize:18,fontWeight:"900"},
  openIcon:{fontSize:17,opacity:.62},
  badge:{position:"absolute",top:-10,minWidth:25,height:20,borderRadius:10,backgroundColor:"#211A2B",borderWidth:1,borderColor:"rgba(232,185,90,.48)",alignItems:"center",justifyContent:"center",paddingHorizontal:5},
  badgeText:{color:"#E8B95A",fontSize:10,fontWeight:"900"},
  micDot:{position:"absolute",right:-1,bottom:-1,width:22,height:22,borderRadius:11,backgroundColor:"#1B1623",borderWidth:2,borderColor:"#3A2B47",alignItems:"center",justifyContent:"center"},
  micCore:{width:8,height:8,borderRadius:4,backgroundColor:"#4CCDA4"},
  muted:{backgroundColor:"#E25F78"},
  name:{color:"#FFFFFF",fontSize:12,fontWeight:"800",marginTop:7,maxWidth:78},
  role:{color:"rgba(255,255,255,.43)",fontSize:10,fontWeight:"600",marginTop:2},
  hostRole:{color:"#E8B95A"},
});
