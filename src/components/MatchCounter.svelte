<script lang="ts">
  import { matchStore } from "../store";
</script>

<div class="counter" class:counter--hidden={$matchStore.totalCount > 0}>
  <span>{$matchStore.matchCount}</span>/<span>{$matchStore.totalCount}</span>
</div>

<style>
  .counter {
    font-size: 42px;
    text-align: center;
    margin-bottom: 8px;
    visibility: visible;
  }

  .counter--hidden {
    visibility: none;
  }
</style>
