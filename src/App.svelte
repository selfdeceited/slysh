<script>
	import { storeUri, apiKey } from "./secret_key"
	const broadCast = text => {
		fetch(storeUri, {
			method: 'POST',	
			headers: {
				'x-api-key': apiKey,
				"content-type": "application/json",
			},
			body: JSON.stringify({
				postedAt: new Date(),
				action: text
			})
		})
		
		console.log(text, new Date())
	}

	const hasArrived = () => {
		var here = localStorage.getItem("slysh.arrived");
		if (here != void 0) {
			return Boolean(here);
		} else {
			localStorage.setItem("slysh.arrived", false);
		}
	}

	const setArrived = () => {
		arrived = true;
		localStorage.setItem("slysh.arrived", true);
		broadCast("Пришел")
	}

	const setDeparted = () => {
		arrived = false;
		localStorage.setItem("slysh.arrived", false);
		broadCast("Ушел")
	}

	const submit = (text) => {
		broadCast(chore)
		submittedChore = chore;
		chore = '';
	}

	let chore = '';
	let submittedChore = void 0;
	let arrived = hasArrived();
	$: departed = !arrived;
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