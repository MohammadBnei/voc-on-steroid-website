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
	import { browser } from '$app/env';

	let search = '';

	export let key: string;
	let lastKey: string = null;

	$: if (browser && lastKey && key !== lastKey) {
		document.getElementById('word-data').scrollIntoView();
		lastKey = key;
	}

	// export let key: string;

	$: filteredList = search.length ? $assocStore.filter(({ id }) => id.includes(search)) : $assocStore;
</script>

<div class="hero min-h-screen bg-base-200 place-items-start" id="word-data">
	<div class="hero-content max-w-full w-full flex-col lg:flex-row items-center lg:items-start justify-between">
		<div class="lg:m-2 grow">
			<slot />
		</div>
		{#if $session.user}
			<div class="card bg-base-100 shadow-xl assoc m-2 max-h-screen lg:w-80 flex-none">
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
</div>
