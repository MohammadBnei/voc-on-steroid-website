<style>
	.word-layout {
		display: grid;
		grid-template-columns: auto 0.7fr;
		grid-template-rows: 1fr;
	}
</style>

<script lang="ts">
	import { session } from '$app/stores';
	import Actions from '$entity/assoc/Actions.svelte';

	import { AssocList } from '$lib/shared/components/assoc';
	import Input from '$lib/shared/ui/components/input/Input.svelte';
	import { assocStore, currentWord, headerHeight } from '$stores';
	import { slimscroll } from 'svelte-slimscroll';

	let h: number;
	let w: number;

	let search = '';

	$: filteredList = search.length ? $assocStore.filter(({ word }) => word.includes(search)) : $assocStore;

	$: showList = $session.user && w > 840;
</script>

<div class="h-full" class:word-layout="{showList}" bind:clientWidth="{w}">
	<div use:slimscroll="{{ height: `calc(100vh - ${$headerHeight}px` }}">
		{#if !showList && $session.user}
			<div class="px-5">
				<Actions word="{$currentWord}" />
			</div>
		{/if}
		<slot />
	</div>
	{#if showList}
		<div class="flex flex-col">
			<div class="mx-2" bind:clientHeight="{h}">
				<div class="flex justify-evenly items-center p-2">
					<p class="text-xl text-opacity-70 font-bold text-gray-700">Saved Words</p>
					<div class="px-5">
						<Actions word="{$currentWord}" />
					</div>
				</div>
				<Input options="{{ placeholder: 'Filter' }}" bind:value="{search}"/>
			</div>
			<div use:slimscroll="{{ height: `calc(100vh - ${h}px - ${$headerHeight}px` }}">
				<AssocList words="{filteredList}" />
			</div>
		</div>
	{/if}
</div>
