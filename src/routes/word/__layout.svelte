<style lang="postcss">
	.word-layout {
		display: grid;
		grid-template-columns: 7fr minmax(240px, 1fr);
		grid-template-areas: 'word assoc';
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
	import { assocStore, currentWord, headerHeight } from '$stores';
	import { session } from '$app/stores';
	import AddRemoveButton from '$lib/component/assoc/AddRemoveButton.svelte';
	import { AssocList } from '$lib/shared/components/assoc';
	import Input from '$lib/shared/ui/components/input/Input.svelte';
	import PageTransition from '$lib/shared/components/transition/PageTransition.svelte';
	import { slimscroll } from 'svelte-slimscroll';
	import { addWord, removeWord } from '$lib/service/assoc';
	
	let search = '';

	let h: number;

	export let key = '';

	$: filteredList = search.length ? $assocStore.filter(({ id }) => id.includes(search)) : $assocStore;
</script>

<div class="word-layout">
	<PageTransition refresh="{key.split('/').pop()}">
		<div use:slimscroll="{{ height: `calc(100vh - ${$headerHeight}px` }}" class="word">
			<slot />
		</div>
	</PageTransition>
	{#if $session.user}
		<div class="assoc-layout assoc">
			<div class="mx-2" bind:clientHeight="{h}">
				<div class="flex justify-evenly items-center p-2">
					<p class="text-xl text-opacity-70 font-bold text-gray-700">Saved Words</p>
					<div class="px-5">
						<AddRemoveButton
							buttonType="{$assocStore.some(({ id }) => id === $currentWord)}"
							handleAddWord="{() => addWord($currentWord)}"
							handleRemoveWord="{() => removeWord($currentWord)}"
						/>
					</div>
				</div>
				<Input options="{{ placeholder: 'Filter' }}" bind:value="{search}" />
			</div>
			<div class="overflow-y-auto">
				<div use:slimscroll="{{ height: `calc(100vh - ${h}px - ${$headerHeight}px` }}">
					<AssocList words="{filteredList}" />
				</div>
			</div>
		</div>
	{/if}
</div>
