<script>
	import { supabase } from '$lib/supabase.js';

	let promise = supabase.from('countries').select();
	let names = supabase.from('rabbits').select();

	let name = '';
	async function sendName() {
		const response = await fetch('/api/hello/sendName', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name })
		});
		const data = await response.text();
		console.log(data);
		name = '';
		names = supabase.from('rabbits').select();
	}
</script>

<div class="prose mx-3">
	<h1>Aufgaben:</h1>

	<ul>
		<li>
			ansatt eines JS-Objekts, das auf einer Seite dargestellt wird will ich eine Liste aller Länder
		</li>
		<li>integrier einen Loading Spinner oÄ von daisyUI in dein PRojekt</li>

		<li>gib die Vercel-URL zu deinem Projekt via Aufgabe im Teams ab</li>
	</ul>
	<br />
	<ul>
		<li><a href="/api/hello?name=Maco">Link zur API mit Query-Parameter</a></li>
		<li><a href="/api/hello/name=Maco">Link zur API mit Route-Parameter</a></li>
	</ul>
	<br />
</div>

<div class="prose mx-3">
	<form>
		<h1>All my rabbits</h1>
		<input type="text" bind:value={name} /> <br />
		<button class="btn" on:click={sendName}>Add Rabbit!</button>
	</form>

	<h2>Rabbit names:</h2>
	{#await names}
		<span class="loading loading-bars loading-lg text-primary" />
	{:then result}
		<ul>
			{#each result.data as rabbit (rabbit.id)}
				<li>{rabbit.name}</li>
			{/each}
		</ul>
	{/await}
</div>
<br />

<div class="prose mx-4">
	<h2>Liste aller Länder:</h2>

	{#await promise}
		<div><span class="loading loading-bars loading-lg" /></div>
	{:then result}
		{#each result.data as country}
			<li>
				{country.name}
			</li>
		{/each}
	{/await}
</div>
