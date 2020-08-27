<script lang="ts">
	import { broadcast } from "./broadcast"
	import * as ls from "./localStorage.adapter"

	const setArrived = () => {
		arrived = true
		ls.arrived()
	}

	const setDeparted = () => {
		arrived = false
		ls.departed()
	}

	const submit = (text) => {
		broadcast(chore)
		submittedChore = chore;
		chore = ''
	}

	let chore = ''
	let submittedChore = void 0
	let arrived = ls.hasArrived()
</script>

<main>
	<h1>Ну здорово отец</h1>

	<article>
		{#if !arrived}
		<div>
			<button on:click={setArrived}>Пришел</button>
		</div>
		{/if}

		{#if arrived}
			{#if submittedChore}
			<p>Сейчас: <i><u>{submittedChore}</u></i></p>
			{/if}
			<form on:submit|preventDefault={submit}>
				<input type="text" placeholder="что делаешь?" bind:value={chore}/>
			</form>
		{/if}

		{#if arrived}
		<div>
			<button on:click={setDeparted}>Ухожу</button>
		</div>
		{/if}
	</article>
</main>

<style>
	main {
		text-align: center;
		padding: 1rem;
		max-width: 280px;
		margin: 0 auto;
		min-width: 150px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 1rem;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	article {
		text-align: left;
	}
	label{
		display: inline-block;
	}
</style>