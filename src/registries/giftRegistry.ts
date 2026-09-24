import type { GiftManifest } from "@/contracts/gift";
import { roseGiftManifest } from "@/modules/gifts/rose/manifest";

export const giftRegistry: GiftManifest[] = [roseGiftManifest];

export function enabledGifts() {
  return giftRegistry.filter((gift) => gift.enabled);
}
