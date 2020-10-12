<script lang="ts">
  import { locale as localeStore, locales as localesStore } from "svelte-i18n";
  import { setCurrentLanguage } from "../../store/language";
  import {
    localeContainer,
    languageSelector,
    selectedLocale,
    breakSymbol,
  } from "./SelectLanguage.styles";
  import localeEmoji from "locale-emoji";

  let currentLocale = void 0;
  localeStore.subscribe((fullLocale) => {
    const trimmedLocale = fullLocale.split("-")[0];
    currentLocale = { fullLocale, trimmedLocale };
    console.log("currentLocale", currentLocale);
  });

  const setLocale = async (selectedLocale) => {
    console.log("selectedLocale", selectedLocale);
    localeStore.set(selectedLocale);
    await setCurrentLanguage(selectedLocale);
  };

  let supportedLocales = [];
  localesStore.subscribe((_) => {
    supportedLocales = _.filter((x) => x.indexOf("-") === -1);
  });
</script>

<style>
</style>

<!-- svelte-ignore a11y-missing-attribute -->
<aside class={localeContainer}>
  {#each supportedLocales as locale, i}
    <a
      target="_blank"
      class="{languageSelector} {currentLocale.trimmedLocale === locale ? selectedLocale : ''}"
      on:click={() => setLocale(locale)}>
      {localeEmoji(locale)}
    </a>
    {#if i !== supportedLocales.length - 1}<span class={breakSymbol}>|</span>{/if}
  {/each}
</aside>
