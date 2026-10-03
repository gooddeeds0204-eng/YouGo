export type RechargePackage={
  id:string;
  diamonds:number;
  bonus:number;
  priceInr:number;
};

export const rechargePackages:RechargePackage[]=[
  {id:"d80",diamonds:80,bonus:0,priceInr:89},
  {id:"d420",diamonds:400,bonus:20,priceInr:399},
  {id:"d1100",diamonds:1000,bonus:100,priceInr:899},
  {id:"d2400",diamonds:2000,bonus:400,priceInr:1699},
  {id:"d6500",diamonds:5000,bonus:1500,priceInr:3999},
];

export type PaymentCheckout={
  provider:"unconfigured";
  ready:false;
  package:RechargePackage;
};

export function isRechargeProviderConfigured(){
  return false;
}

export async function createRechargeCheckout(pkg:RechargePackage):Promise<PaymentCheckout>{
  return {
    provider:"unconfigured",
    ready:false,
    package:pkg,
  };
}
