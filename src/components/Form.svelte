<script lang="ts">
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import {
    gameStore,
    createGameFromQuery,
    type Size,
  } from "../store";

  const sizeOptions: { size: Size; title: string }[] = [
    { size: 3, title: "3x3" },
    { size: 4, title: "4x4" },
    { size: 5, title: "5x5" },
    { size: 6, title: "6x6" },
  ];

  onMount(() => {
    createGameFromQuery(window.location.search);
  });

  let gameTitle: string = $gameStore.title;
  let gameOptions: string = $gameStore.options.join("\n").trim();
  let selectedSize: Size = $gameStore.size;

  $: lines = gameOptions.split("\n").length;

  const handleOptionsKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === "Enter" && lines >= selectedSize * selectedSize) {
      evt.preventDefault();
    }
  };
</script>

<div>
  <form class="form">
    <div class="form__title">
      <label for="title"> Enter a title </label>
      <input
        class="form__title__input"
        id="title"
        bind:value={gameTitle}
        type="text"
        name="title"
        placeholder="Your bingo game name"
        required
      />
    </div>
    <div class="form__size">
      <label for="size">Select grid size</label>
      <select
        class="form__size__input"
        id="size"
        name="size"
        bind:value={selectedSize}
      >
        {#each sizeOptions as option}
          <option value={option.size}>{option.title}</option>
        {/each}
      </select>
    </div>
    <label for="options"> Enter bingo options </label>
    <div class="form__options">
      <div class="form__options__lines">
        <span class="form__options__line" />
        {#each { length: lines - 1 } as _}
          <span class="form__options__line" />
        {/each}
      </div>
      <textarea
        id="options"
        class="form__options__input"
        name="options"
        bind:value={gameOptions}
        on:keydown={handleOptionsKeyDown}
        rows={selectedSize}
        required
      />
    </div>
    <div>
      <Button type="submit" title="Create" />
    </div>
  </form>
</div>

<style>
  .form {
    --input-label-font-size: 26px;
    --input-value-font-size: 22px;
    --input-max-width: 320px;

    --textarea-bg-color: #334155;
    --textarea-line-color: #94a3b8;
    --textarea-text-color: #e2e8f0;

    display: inline-block;
  }

  .form label {
    display: block;
    font-size: var(--input-label-font-size);
  }

  .form__options {
    display: inline-flex;
    gap: 10px;
    font-family: monospace;
    line-height: 21px;
    background-color: var(--textarea-bg-color);
    border-radius: 2px;
    padding: 20px 10px;
    height: 200px;
    overflow-y: auto;
    margin-bottom: 16px;
  }

  .form__title {
    margin-bottom: 8px;
    max-width: var(--input-max-width);
  }

  .form__size {
    margin-bottom: 8px;
    max-width: var(--input-max-width);
  }

  .form__options__lines {
    width: 20px;
    text-align: right;
    height: calc(var(--input-value-font-size) * 36);
  }

  .form__options__line {
    counter-increment: linenumber;
    line-height: 1;
    font-size: var(--input-value-font-size);
  }

  .form__options__line:before {
    content: counter(linenumber);
    display: block;
    color: var(--textarea-line-color);
  }

  .form__options__input {
    font-size: var(--input-value-font-size);
    line-height: 1;
    overflow-y: hidden;
    padding: 0;
    border: 0;
    background-color: var(--textarea-bg-color);
    color: var(--textarea-text-color);
    min-width: 500px;
    outline: none;
    resize: none;
    height: calc(var(--input-value-font-size) * 36);
  }

  .form__title__input,
  .form__size__input {
    padding: 4px;
    font-size: var(--input-value-font-size);
    width: 100%;
    box-sizing: inherit;
  }
</style>
