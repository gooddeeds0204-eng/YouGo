import type { GameManifest } from "@/contracts/game";
import { spinWinManifest } from "@/modules/games/spin-win/manifest";
import { diamondHuntManifest } from "@/modules/games/diamond-hunt/manifest";
import { ludoManifest } from "@/modules/games/ludo/manifest";
import { cardsManifest } from "@/modules/games/cards/manifest";
import { diceManifest } from "@/modules/games/dice/manifest";
import { greedyManifest } from "@/modules/games/greedy/manifest";
import { eatBallManifest } from "@/modules/games/eat-ball/manifest";
import { truthDareManifest } from "@/modules/games/truth-dare/manifest";

export const gameRegistry: GameManifest[] = [
  spinWinManifest,
  diamondHuntManifest,
  ludoManifest,
  cardsManifest,
  diceManifest,
  greedyManifest,
  eatBallManifest,
  truthDareManifest,
];

export function enabledGames() {
  return gameRegistry.filter((game) => game.enabled);
}
