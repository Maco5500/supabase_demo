<script lang="ts">
	import { supabase } from '$lib/supabase';

	let loading = false;
	let email = '';

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<div class="card w-96 bg-base-100 shadow-xl p-8 max-w-md mx-auto">
	<figure class="px-10 pt-10">
		<div class="card-body items-center text-center">
			<h1 class="card-title">Supabase + Svelte</h1>
			<br />
			<p class="description">Sign in via magic link with your email below</p>
			<form class="form-widget" on:submit|preventDefault={handleLogin}>
				<div>
					<input
						id="email"
						type="email"
						placeholder="Your Email"
						class="input input-bordered w-full max-w-xs"
						bind:value={email}
					/>
				</div>
				<br />
				<div>
					<button class="btn btn-wide">
						<span>{loading ? 'Loading' : 'Send magic link'}</span>
					</button>
				</div>
			</form>
		</div>
	</figure>
</div>
