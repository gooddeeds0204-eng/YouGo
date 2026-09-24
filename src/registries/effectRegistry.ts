export type EffectType = "avatar-frame" | "vehicle" | "entry-effect" | "chat-bubble";

export type EffectManifest = {
  id: string;
  name: string;
  type: EffectType;
  enabled: boolean;
  assetKey: string;
};

export const effectRegistry: EffectManifest[] = [];
