<script lang="ts">
  import { locale as localeStore, locales } from "svelte-i18n";
  import { setCurrentLanguage } from "../store/language";
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
  locales.subscribe((_) => {
    supportedLocales = _.filter((x) => x.indexOf("-") === -1);
  });
</script>

<style>
  aside {
    float: right;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  a {
    cursor: pointer;
    padding: 0 3px 0 3px;
    margin: 0 2px 0 2px;
  }
  a.selected {
    border: 1px solid #c57b7b;
    background-color: #e6d1d1;
  }
  span {
    color: #cccccc;
  }
</style>

<!-- svelte-ignore a11y-missing-attribute -->
<aside>
  {#each supportedLocales as locale, i}
    <a
      target="_blank"
      class={currentLocale.trimmedLocale === locale ? 'selected' : ''}
      on:click={() => setLocale(locale)}>
      {localeEmoji(locale)}
    </a>
    {#if i !== supportedLocales.length - 1}<span>|</span>{/if}
  {/each}
</aside>
