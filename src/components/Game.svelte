<script lang="ts">
  import Grid from "./Grid.svelte";
  import Form from "./Form.svelte";
  import { phaseStore } from "../store";
</script>

<div class="game">
  {#if $phaseStore === "create"}
    <Form />
  {/if}
  {#if $phaseStore === "play"}
    <Grid />
  {/if}
</div>

<style>
  .game {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
