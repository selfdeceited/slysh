<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { broadcast } from '../../operations/broadcast'
	import { getCurrentChore, setCurrentChore } from '../../persistence/currentChore'
	import { markArrived, markDeparted, hasArrived } from '../../persistence/connected'

	let chore = ''
	let submittedChore = void 0
	let arrived = false

	const setArrived = async () => {
		arrived = true
		await markArrived()
	}

	const setDeparted = async () => {
		arrived = false
		await markDeparted()

		submittedChore = ''
		await setCurrentChore('')
	}

	const submit = async () => {
		broadcast(chore)
		submittedChore = chore
		await setCurrentChore(chore)
		chore = ''
	}

	const focus = el => {
		el.focus()
	}

	hasArrived().then(_ => (arrived = _))
	getCurrentChore().then(_ => (submittedChore = _))
</script>

<section>
	{#if !arrived}<button on:click={setArrived}>{$_('popup.arrived')}</button>{/if}

	{#if arrived}
		{#if submittedChore}
			<p>{$_('popup.currentChore')} <i> <u>{submittedChore}</u> </i></p>
		{/if}
		<form on:submit|preventDefault={submit}>
			<input type="text" placeholder={$_('popup.intentQuestion')} bind:value={chore} use:focus />
		</form>

		<button on:click={setDeparted}>{$_('popup.departed')}</button>
	{/if}
</section>
