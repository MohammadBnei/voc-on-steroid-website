<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => {
		return {
			props: {
				key: url.pathname,
			},
		};
	};
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import Header from '$ui/components/header/Header.svelte';
	import { onMount } from 'svelte';
	import SvelteToast from '$lib/shared/ui/components/toast/SvelteToast.svelte';
	import { isFetching, loginHistory } from '$stores';
	import { get } from '$lib/utils/api';
	import { fetchResemblingWord, fetchUserWords } from '$lib/core';
	import { Search, PageTransition } from '$lib/shared';
	import { goto } from '$app/navigation';

	const logout = async () => {
		await get({ path: 'logout' });

		$session.user = null;
	};

	const login = () => {
		$loginHistory = key;
		goto('/account');
	};

	export let key = '/';

	onMount(async () => {
		try {
			const res = await get({ path: 'refresh' });

			if (res.ok) {
				const data = await res.json();
				session.update((s) => ({ ...s, user: data.user }));
				fetchUserWords();
			} else {
				throw new Error('Error refreshing token');
			}
		} catch (error) {
			session.update((s) => ({ ...s, user: null }));
		}
	});
</script>

<div class="flex justify-center flex-col md:flex-row items-center bg-slate-300">
	<Header title="Voc On Steroid" handleLogin="{login}" handleLogout="{logout}">
		<div class="px-5" slot="search">
			<Search
				getWords="{fetchResemblingWord}"
				handleSearch="{(word) => word?.key && goto('/word/' + word.key)}"
			/>
		</div>
		<PageTransition refresh="{key.split('/')[1]}" slot="content">
			<slot />
		</PageTransition>
	</Header>
</div>
{#if $isFetching.length}
	<div class="fixed top-0 w-screen">
		<progress class="progress w-full progress-primary"></progress>
	</div>
{/if}
<SvelteToast />
