<style lang="postcss">
	.word-layout {
		display: grid;
		grid-template-columns: auto minmax(auto, 250px);
		grid-template-rows: 1fr;
	}
</style>

<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { IWord } from '$entity/word/iword.interface';
	import { WordModel } from '$entity/word';
	import Detail from '$lib/shared/ui/components/word/detail/Detail.svelte';
	import { handleRes, get } from '$lib/utils/api';

	export const load: Load = async ({ params, fetch }) => {
		const res = await get({ path: 'words?value=' + encodeURIComponent(params.word), fetch });
		const data = await handleRes(res, 'Words');
		if (!res.ok) {
			return {
				status: res.status,
				redirect: '/',
				error: data?.message || 'Could not load word definition',
			};
		}
		const wordModel = new WordModel().deserialize(data as unknown as IWord);
		return {
			props: {
				word: wordModel,
				maxage: 1200,
			},
		};
	};
</script>

<script lang="ts">
	import HeadTags from '$shared/components/head-tags/HeadTags.svelte';
	import type { IMetaTagProperties } from '$lib/models';
	import { afterUpdate, onDestroy } from 'svelte';
	import { assocStore, currentWord, headerHeight } from '$stores';
	import { session } from '$app/stores';
	import Actions from '$entity/assoc/Actions.svelte';
	import { fade } from 'svelte/transition';
	import { AssocList } from '$lib/shared/components/assoc';
	import Input from '$lib/shared/ui/components/input/Input.svelte';
	import { slimscroll } from 'svelte-slimscroll';
import { access } from 'fs';

	export let word: WordModel;
	let h: number;
	let w: number;

	let search = '';

	$: filteredList = search.length ? $assocStore.filter(({ word }) => word.includes(search)) : $assocStore;

	$: showList = $session.user && w > 840;

	let metaData: Partial<IMetaTagProperties> = {
		title: `VocOnSteroid : ${word?.word || 'Not found'}`,
		description: ` Etymologie : ${word.etymologies}
				Definitions : ${word.results.reduce((acc, cur) => {
					acc += cur.type + ' : '
					acc += cur.definitions.reduce((acc, cur) => {
						acc += cur.definition
						acc += '\n'
						
						return acc
					}, '')
					
					acc += '\n'
					return acc
				}, '')}
		`,
		url: `https://voconsteroid.com/${word.word}`,
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: [word?.word, 'Definition', 'Voc On Steroid', 'Voc On Steroid words'],
		searchUrl: `https://voconsteroid.com/${word.word}`,
		image: 'https://voconsteroid.com/logo-512.png',
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml',
	};

	afterUpdate(() => {
		$currentWord = word.word;
	});
	onDestroy(() => {
		$currentWord = null;
	});
</script>

<HeadTags metaData="{metaData}" />

<div class="h-full" class:word-layout="{showList}" bind:clientWidth="{w}">
	<div use:slimscroll="{{ height: `calc(100vh - ${$headerHeight}px` }}" >
		{#if !showList && $session.user}
			<div class="px-5">
				<Actions word="{$currentWord}" />
			</div>
		{/if}
		<div class="px-5 mx-auto">
			<Detail word="{word}" />
		</div>
	</div>
	{#if showList}
		<div class="flex flex-col" transition:fade>
			<div class="mx-2" bind:clientHeight="{h}">
				<div class="flex justify-evenly items-center p-2">
					<p class="text-xl text-opacity-70 font-bold text-gray-700">Saved Words</p>
					<div class="px-5">
						<Actions word="{$currentWord}" />
					</div>
				</div>
				<Input options="{{ placeholder: 'Filter' }}" bind:value="{search}" />
			</div>
			<div use:slimscroll="{{ height: `calc(100vh - ${h}px - ${$headerHeight}px` }}">
				<AssocList words="{filteredList}" />
			</div>
		</div>
	{/if}
</div>
