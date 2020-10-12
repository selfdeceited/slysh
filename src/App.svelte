<script lang="ts">
  import { _ } from "svelte-i18n";
  import SelectLanguage from "./components/SelectLanguage.svelte";
  import { adjustLanguage } from "./i18n";
  import { main, article } from "./App.styles";
  import Arrival from "./components/Arrival.svelte";

  adjustLanguage();
</script>

<main class="{main} {article}">
  <Arrival />
  <SelectLanguage />
</main>
