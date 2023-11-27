<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let title: string;
  export let type: "reset" | "submit";

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("click");
  };
</script>

<button class="button" {type} on:click={handleClick}>
  {title}
</button>

<style>
  .button {
    --button-font-size: 26px;

    padding: 8px;
    font-size: var(--button-font-size);
  }
</style>
