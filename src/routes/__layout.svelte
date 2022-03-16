<script lang="ts" context="module">
	import { fetchUserWords } from '$entity/assoc/services';
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
	import PageTransition from '$lib/shared/components/transition/PageTransition.svelte';
	import { session } from '$app/stores';
	import Header from '$ui/components/header/Header.svelte';
	import { onMount } from 'svelte';
	import SvelteToast from '$lib/shared/ui/components/toast/SvelteToast.svelte';
	import Search from '$entity/word/search/Search.svelte';
	import { headerHeight, isFetching } from '$stores';
	import AuthHeader from '$lib/shared/components/account/AuthHeader.svelte';
	import { Spinner } from '$lib/shared/ui/components/spinner';
	import { browser } from '$app/env';
	import { get } from '$lib/utils/api';
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

	let h: number;

	$: {
		browser && headerHeight.update(() => h);
	}
</script>

<div class="flex justify-center flex-col md:flex-row items-center bg-slate-300" bind:clientHeight="{h}">
	<Header title="Voc On Steroid" />
	<div class="px-5">
		<Search />
	</div>
	<div class="px-5">
		<AuthHeader />
	</div>
</div>
<PageTransition refresh="{key.split('/')[1]}">
	<slot />
</PageTransition>
{#if $isFetching}
	<div class="fixed right-0 top-0">
		<Spinner name="pulse" color="rgba(239, 68, 68)" />
	</div>
{/if}
<SvelteToast />
