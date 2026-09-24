import type { GameManifest } from "@/contracts/game";
import { spinWinManifest } from "@/modules/games/spin-win/manifest";
import { diamondHuntManifest } from "@/modules/games/diamond-hunt/manifest";

export const gameRegistry: GameManifest[] = [
  spinWinManifest,
  diamondHuntManifest,
];

export function enabledGames() {
  return gameRegistry.filter((game) => game.enabled);
}
