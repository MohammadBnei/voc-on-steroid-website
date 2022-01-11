<style>
	.word-layout {
		display: grid;
		grid-template-columns: 3fr 1fr;
		grid-template-rows: 1fr;
	}
</style>

<script lang="ts">
	import { browser } from '$app/env';

	import { session } from '$app/stores';
	import Actions from '$entity/assoc/Actions.svelte';

	import { AssocList } from '$lib/shared/components/assoc';
	import { assocStore, currentWord, headerHeight } from '$stores';
	import { slimscroll } from 'svelte-slimscroll';

	let h: number;
	let w: number;

	$: showList = $session.user && w > 840;
</script>

<div class="h-full" class:word-layout="{showList}" bind:clientWidth="{w}">
	<div use:slimscroll="{{ height: `calc(100vh - ${$headerHeight}px` }}">
		{#if !showList}
			<div class="px-5">
				<Actions word="{$currentWord}" />
			</div>
		{/if}
		<slot />
	</div>
	{#if showList}
		<div class="flex flex-col">
			<div class="flex justify-evenly items-center" bind:clientHeight="{h}">
				<p class="text-lg text-opacity-70">Saved Words</p>
				<div class="px-5">
					<Actions word="{$currentWord}" />
				</div>
			</div>
			<div use:slimscroll="{{ height: `calc(100vh - ${h}px - ${$headerHeight}px` }}">
				<AssocList words="{$assocStore}" />
			</div>
		</div>
	{/if}
</div>
