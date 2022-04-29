<style lang="postcss">
	@media (min-width: 1024px) {
		.word-layout {
			display: grid;
			grid-template-columns: 7fr minmax(240px, 1fr);
			grid-template-areas: 'word assoc';
		}
	}

	.word {
		grid-area: word;
	}

	.assoc {
		grid-area: assoc;
	}

	.assoc-layout {
		display: grid;
		grid-template-rows: min-content auto min-content;
		overflow-y: auto;
	}
</style>

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
	import { assocStore } from '$stores';
	import { session } from '$app/stores';
	import { AssocList } from '$lib/shared/components/assoc';
	import Input from '$lib/shared/ui/components/input/Input.svelte';
	import PageTransition from '$lib/shared/components/transition/PageTransition.svelte';

	let search = '';

	export let key = '';

	$: filteredList = search.length ? $assocStore.filter(({ id }) => id.includes(search)) : $assocStore;

	let h: number;
</script>

<div class:word-layout="{$session.user}">
	<div class="m-2" bind:clientHeight="{h}">
		<PageTransition refresh="{key.split('/').pop()}">
			<slot />
		</PageTransition>
	</div>
	{#if $session.user}
		<div class="card bg-base-100 shadow-xl assoc m-2 max-h-[{h}px]">
			<div class="card-body ">
				<p class="text-xl text-opacity-70 font-bold grow-0">Saved Words</p>

				<Input options="{{ placeholder: 'Filter' }}" bind:value="{search}" />
				<div class="overflow-y-scroll mb-2">
					<AssocList words="{filteredList}" />
				</div>
			</div>
		</div>
	{/if}
</div>
