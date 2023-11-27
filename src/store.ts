import { writable, derived } from "svelte/store";

const phases = ["create", "play"] as const;
export type Phase = (typeof phases)[number];

const sizes = [3, 4, 5, 6] as const;
export type Size = (typeof sizes)[number];

export type GameStore = {
  size: Size;
  title: string;
  options: string[];
  matches: boolean[];
};

export const defaultGameStore: GameStore = {
  size: 3,
  title: "",
  options: [],
  matches: [],
};
export const phaseStore = writable<Phase>("create");

export const gameStore = writable<GameStore>(defaultGameStore);

export const matchStore = derived([gameStore], ([$gameStore]) => ({
  matchCount: $gameStore.matches.reduce(
    (sum, matched) => (matched ? sum + 1 : sum),
    0,
  ),
  totalCount: $gameStore.options.length,
}));

export function createGame(size: Size, title: string, options: string[]): void {
  gameStore.set({
    title: title,
    size: size,
    options: options,
    matches: [...Array(options.length).keys()].map(() => false),
  });
  phaseStore.set("play");
}

export function createGameFromQuery(searchQuery: string) {
  const params = new URLSearchParams(searchQuery);

  const sizeParam = params.get("size") ?? "";
  const size = parseInt(sizeParam);
  const hasSize = !isNaN(size) && size >= 3 && size <= 6;

  const title = (params.get("title") ?? "").trim();
  const hasTitle = title.length > 0;

  const optionsParam = params.get("options");
  const options = (optionsParam ?? "")
    .split("\r\n")
    .filter((option) => option.length);
  const hasOptions = options.length > 0;

  if (!hasSize || !hasTitle || !hasOptions) {
    phaseStore.set("create");
  } else {
    createGame(size as Size, title, options);
  }
}

export function resetCardSelection() {
  gameStore.update((prevStore) => ({
    title: prevStore.title,
    size: prevStore.size,
    matches: [...Array(prevStore.options.length).keys()].map(() => false),
    options: prevStore.options,
  }));
}

export function resetGame() {
  window.location.search = "";
}
