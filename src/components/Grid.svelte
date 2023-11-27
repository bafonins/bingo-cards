<script lang="ts">
  import textFit from "textfit";
  import MatchCounter from "./MatchCounter.svelte";
  import { onMount } from "svelte";
  import { gameStore, resetCardSelection, resetGame } from "../store";

  const handleCellClick = (optionKey: number) => {
    const matches = $gameStore.matches;
    $gameStore.matches[optionKey] = !$gameStore.matches[optionKey];
    $gameStore.matches = matches;
  };

  const handleTextFit = () => {
    textFit(document.getElementsByClassName("grid__cell"), {
      multiLine: true,
      alignVertWithFlexbox: true,
      maxFontSize: 100,
    });
  };

  onMount(() => {
    handleTextFit();
  });
</script>

<svelte:window on:resize={handleTextFit} />
<div class="layout">
  <div class="header">
    <h1 class="header__title">{$gameStore.title}</h1>
    <MatchCounter />
  </div>
  <div
    class="grid"
    class:grid--3x3={$gameStore.size === 3}
    class:grid--4x4={$gameStore.size === 4}
    class:grid--5x5={$gameStore.size === 5}
    class:grid--6x6={$gameStore.size === 6}
  >
    {#each $gameStore.options as option, optionKey}
      <button
        data-selected={$gameStore.matches[optionKey]}
        class="grid__cell"
        on:click={() => handleCellClick(optionKey)}
      >
        {option}
      </button>
    {/each}
  </div>
  <div class="button-group">
    <button on:click={resetCardSelection}>Reset card</button>
    <button on:click={resetGame}>Reset game</button>
  </div>
</div>

<style>
  .layout {
    width: 100%;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__title {
    font-size: 62px;
  }

  .grid {
    display: grid;
    gap: 4px;
    width: 100%;
    margin: auto;
  }

  .grid--3x3 {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .grid--4x4 {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }

  .grid--5x5 {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }

  .grid--6x6 {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }

  .grid__cell {
    overflow: hidden;
    display: block;
    background-color: var(--color-cell-bg);
    border: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border: 1px solid black;
    aspect-ratio: 1;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  .grid__cell:hover {
    background-color: var(--color-cell-bg-hover);
  }

  .grid__cell[data-selected="false"]:hover:before {
    opacity: 0.1;
  }

  .grid__cell[data-selected="true"] {
    background-color: var(--color-cell-bg-selected);
  }

  .grid__cell:before {
    transition: opacity 0.2s;
  }

  .grid__cell[data-selected="false"]:before {
    content: "";
    width: 120%;
    height: 120%;
    position: absolute;
    left: -10%;
    top: -10%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='white' height='800px' width='800px' version='1.1' id='Layer_1' viewBox='0 0 512 512' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpolygon points='512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 '/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0;
  }

  .grid__cell[data-selected="true"]:before {
    overflow: hidden;
    content: "";
    width: 120%;
    height: 120%;
    position: absolute;
    left: -10%;
    top: -10%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='white' height='800px' width='800px' version='1.1' id='Layer_1' viewBox='0 0 512 512' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpolygon points='512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 '/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.3;
  }

  .button-group {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }

  .button-group button {
    padding: 10px;
  }

  .button-group button:not(:last-of-type) {
    margin-right: 8px;
  }
</style>
