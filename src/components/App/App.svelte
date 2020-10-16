<script lang="ts">
  import SelectLanguage from "../SelectLanguage/SelectLanguage.svelte";
  import { adjustLanguage } from "../../i18n";
  import { main, devInfo } from "./App.styles";
  import Arrival from "../Arrival/Arrival.svelte";

  adjustLanguage();
  let devMode = process.env.devMode === "true";
</script>

<main class={main}>
  {#if devMode}
    <pre class={devInfo}>Dev Mode</pre>
  {/if}
  <Arrival />
  <SelectLanguage />
</main>
