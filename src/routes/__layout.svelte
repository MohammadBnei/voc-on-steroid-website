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
	import { isFetching } from '$stores';
	import { Spinner } from '$lib/shared/ui/components/spinner';
	import { get } from '$lib/utils/api';
	import { fetchResemblingWord, fetchUserWords } from '$lib/core';
	import { Search, AuthHeader, PageTransition } from '$lib/shared';
	import { goto } from '$app/navigation';

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
	<Header title="Voc On Steroid">
		<span slot="header">
			<div class="px-5">
				<Search
					getWords="{fetchResemblingWord}"
					handleSearch="{(word) => word?.key && goto('/word/' + word.key)}"
				/>
			</div>
			<div class="px-5">
				<AuthHeader />
			</div>
		</span>
		<span slot="content">
			<PageTransition refresh="{key.split('/')[1]}">
				<slot />
			</PageTransition>
		</span>
	</Header>
</div>
{#if $isFetching.length}
	<div class="fixed right-0 top-0">
		<Spinner name="pulse" color="rgba(239, 68, 68)" />
	</div>
{/if}
<SvelteToast />
