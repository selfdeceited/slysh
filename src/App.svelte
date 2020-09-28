<script lang="ts">
  import { _ } from "svelte-i18n";
  import { broadcast } from "./broadcast";
  import { getCurrentChore, setCurrentChore } from "./store/currentChore";
  import {
    arrived as getArrived,
    departed,
    hasArrived,
  } from "./store/connected";

  const setArrived = async () => {
    arrived = true;
    await getArrived();
  };

  const setDeparted = async () => {
    arrived = false;
    await departed();
    submittedChore = void 0;
    await setCurrentChore(void 0);
  };

  const submit = async () => {
    broadcast(chore);
    submittedChore = chore;
    await setCurrentChore(chore);
    chore = "";
  };

  let chore = "";
  let submittedChore = void 0;

  let arrived = false;
  hasArrived().then((_) => (arrived = _));
  getCurrentChore().then((_) => (submittedChore = _));
</script>

<style>
  main {
    text-align: center;
    padding: 1rem;
    max-width: 280px;
    margin: 0 auto;
    min-width: 150px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  article {
    text-align: left;
  }
</style>

<main>
  <article>
    {#if !arrived}
      <div><button on:click={setArrived}>{$_('popup.arrived')}</button></div>
    {/if}

    {#if arrived}
      {#if submittedChore}
        <p>{$_('popup.currentChore')} <i> <u>{submittedChore}</u> </i></p>
      {/if}
      <form on:submit|preventDefault={submit}>
        <input
          type="text"
          placeholder={$_('popup.intentQuestion')}
          bind:value={chore} />
      </form>
    {/if}

    {#if arrived}
      <div><button on:click={setDeparted}>{$_('popup.departed')}</button></div>
    {/if}
  </article>
</main>
