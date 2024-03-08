<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabase';

	import { session } from '$lib/store';

	let loading = false;
	let username: string | null = null;
	let website: string | null = null;
	let avatarUrl: string | null = null;

	onMount(() => {
		getProfile();
	});

	async function getProfile() {
		try {
			loading = true;
			const { user } = $session;

			const { data, error, status } = await supabase
				.from('profiles')
				.select('username, website, avatar_url')
				.eq('id', user.id)
				.single();

			if (error && status !== 406) throw error;

			if (data) {
				username = data.username;
				website = data.website;
				avatarUrl = data.avatar_url;
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	async function updateProfile() {
		try {
			loading = true;
			const { user } = $session;

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url: avatarUrl,
				updated_at: new Date().toISOString()
			};

			const { error } = await supabase.from('profiles').upsert(updates);

			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

{#if $session}
	<div class="card w-110 bg-base-100 shadow-xl p-8 max-w-md mx-auto">
		<figure class="px-10 pt-10">
			<form on:submit|preventDefault={updateProfile} class="form-widget">
				<div>Email: {$session.user.email}</div>
				<div>
					<label for="username">Name:</label>
					<input id="username" type="text" bind:value={username} />
				</div>
				<div>
					<label for="website">Website:</label>
					<input id="website" type="text" bind:value={website} />
				</div>
				<br />
				<div>
					<button type="submit" class="btn btn-wide" disabled={loading}>
						{loading ? 'Saving ...' : 'Update profile'}
					</button>
				</div>
				<br />
				<button type="button" class="btn btn-wide" on:click={() => supabase.auth.signOut()}>
					Sign Out
				</button>
			</form>
		</figure>
	</div>
{:else}
	<div>seems you're not logged in!</div>
{/if}
