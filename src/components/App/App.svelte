<script lang="ts">
  import SelectLanguage from "../SelectLanguage/SelectLanguage.svelte";
  import { adjustLanguage } from "../../i18n";
  import { main, article } from "./App.styles";
  import Arrival from "../Arrival/Arrival.svelte";

  adjustLanguage();
</script>

<main class="{main} {article}">
  <Arrival />
  <SelectLanguage />
</main>
