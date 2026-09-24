export type GiftCategory = "popular" | "couple" | "event" | "luxury";

export type GiftManifest = {
  id: string;
  name: string;
  icon: string;
  category: GiftCategory;
  diamondCost: number;
  enabled: boolean;
  animationKey?: string;
};
