import { getSupabaseClient } from "@/platform/supabase/client";

export type StoreItem={
  id:string;
  name:string;
  category:string;
  currency:"diamonds"|"coins";
  price:number;
  assetKey:string;
  metadata:Record<string,unknown>;
  owned:boolean;
  equipped:boolean;
};

export async function listStoreItems():Promise<StoreItem[]>{
  const supabase=getSupabaseClient();
  if(!supabase)return [];
  const [items,auth]=await Promise.all([
    supabase.from("store_items").select("id,name,category,currency,price,asset_key,metadata").eq("enabled",true),
    supabase.auth.getUser(),
  ]);
  if(items.error)throw items.error;

  const userId=auth.data.user?.id;
  let inventory:any[]=[];
  if(userId){
    const result=await supabase.from("user_inventory")
      .select("item_id,equipped")
      .eq("user_id",userId);
    if(result.error)throw result.error;
    inventory=result.data||[];
  }
  const owned=new Map(inventory.map(row=>[row.item_id,row.equipped]));

  return (items.data||[]).map((row:any)=>({
    id:row.id,
    name:row.name,
    category:row.category,
    currency:row.currency,
    price:Number(row.price),
    assetKey:row.asset_key,
    metadata:row.metadata||{},
    owned:owned.has(row.id),
    equipped:Boolean(owned.get(row.id)),
  }));
}

export async function buyStoreItem(itemId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return null;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return null;
  const {data,error}=await supabase.rpc("buy_store_item",{p_item_id:itemId});
  if(error)throw error;
  return data;
}

export async function equipStoreItem(itemId:string){
  const supabase=getSupabaseClient();
  if(!supabase)return false;
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)return false;
  const {data,error}=await supabase.rpc("equip_store_item",{p_item_id:itemId});
  if(error)throw error;
  return Boolean(data);
}
