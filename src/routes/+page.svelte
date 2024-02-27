<script>
	import { supabase } from '$lib/supabase.js';

	let promise = supabase.from('countries').select();
</script>

<div class="prose">
	<h1>Aufgaben:</h1>

	<ul>
		<li>
			ansatt eines JS-Objekts, das auf einer Seite dargestellt wird will ich eine Liste aller Länder
		</li>
		<li>integrier einen Loading Spinner oÄ von daisyUI in dein PRojekt</li>

		<li>gib die Vercel-URL zu deinem Projekt via Aufgabe im Teams ab</li>
	</ul>
</div>
{#await promise}
	<div>Loading...</div>
{:then result}
	<div>{JSON.stringify(result)}</div>
{/await}
