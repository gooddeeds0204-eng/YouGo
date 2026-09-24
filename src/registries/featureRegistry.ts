import { featureFlags, type FeatureFlag } from "@/config/featureFlags";

export type RegisteredFeature = {
  id: FeatureFlag;
  enabled: boolean;
};

export const featureRegistry: RegisteredFeature[] = Object.entries(featureFlags).map(
  ([id, enabled]) => ({
    id: id as FeatureFlag,
    enabled,
  }),
);

export function isFeatureEnabled(id: FeatureFlag) {
  return featureRegistry.find((feature) => feature.id === id)?.enabled ?? false;
}
