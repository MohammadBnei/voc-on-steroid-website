<script lang="ts" context="module">
	import { fetchUserWords } from '$entity/assoc/services';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page }) => {
		return {
			props: {
				key: page.path,
			},
		};
	};
</script>

<script lang="ts">
	import PageTransition from '$lib/shared/components/transition/PageTransition.svelte';
	import { session } from '$app/stores';
	import { assocStore } from '$lib/utils/stores';
	import Header from '$ui/components/header/Header.svelte';
	import { onMount } from 'svelte';
	import SvelteToast from '$lib/shared/ui/components/toast/SvelteToast.svelte';
	import Search from '$entity/word/search/Search.svelte';
	import { slimscroll } from 'svelte-slimscroll';
	import Actions from '$entity/assoc/Actions.svelte';
	import { currentWord, isFetching } from '$stores';
	import AuthHeader from '$lib/shared/components/account/AuthHeader.svelte';
	import { Spinner } from '$lib/shared/ui/components/spinner';
	export let key: string;

	let h: number;

	onMount(() => {
		if ($session.user) {
			fetchUserWords($session.user.id).then((data) => assocStore.setList(data));
		}
	});
</script>

<div class="flex justify-center flex-col md:flex-row items-center" bind:offsetHeight="{h}">
	<Header title="Voc On Steroid" />
	{#if $session.user && $currentWord}
		<div class="px-5">
			<Actions word="{$currentWord}" />
		</div>
	{/if}
	<div class="px-5">
		<Search />
	</div>
	<div class="px-5">
		<AuthHeader />
	</div>
</div>
{#if $isFetching}
	<div class="fixed right-0 top-0">
		<Spinner name="pulse" color="rgba(239, 68, 68)" />
	</div>
{/if}
<div use:slimscroll="{{ height: `calc(100vh - ${h}px` }}">
	<PageTransition refresh="{key}">
		<slot />
	</PageTransition>
</div>
<SvelteToast />
