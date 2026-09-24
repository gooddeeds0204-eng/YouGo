export type GameManifest = {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  minUserLevel?: number;
  supportsGamePk?: boolean;
};
