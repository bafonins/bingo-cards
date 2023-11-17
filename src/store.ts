import { writable, derived } from "svelte/store";

const sizes = [3, 4, 5, 6] as const;
export type Size = typeof sizes[number];

export type GameStore = {
  size: Size;
  title: string;
  options: string[];
  matches: boolean[];
}

export const defaultGameStore: GameStore = {
  size: 3,
  title: "",
  options: [],
  matches: [],
}

export const gameStore = writable<GameStore>(defaultGameStore);

export const matchStore = derived(
  [gameStore],
  ([$gameStore]) => ({
    matchCount: $gameStore.matches
      .reduce((sum, matched) => matched ? sum + 1 : sum, 0),
    totalCount: $gameStore.options.length,
  })
);
