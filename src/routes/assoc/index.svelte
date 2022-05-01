<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/account',
			};
		}

		return {};
	};
</script>

<script lang="ts">
	import { AssocList } from '$lib/shared/components/assoc';
	import type { IMetaTagProperties } from '$lib/models';
	import { HeadTags } from '$lib/shared';
	import { assocStore, categoryStore } from '$stores';
	import { onMount } from 'svelte';
	import { fetchUserWords, getWord } from '$lib/core';
	import { Detail } from '$lib/shared/ui/components/word/detail';
	import type { WordModel } from '$lib/models/word.model';
	import CategoryModal from '$lib/shared/components/assoc/CategoryModal.svelte';
	import { createCateory, removeCateory } from '$lib/core/services/category';
	import CategoryList from '$lib/shared/components/assoc/CategoryList.svelte';
	import type { AssocWord } from '$lib/models/interfaces/assoc';

	onMount(fetchUserWords);

	let search = '';

	$: filteredWordList = search.length ? $assocStore.filter(({ id }) => id.includes(search)) : $assocStore;

	let metaData: Partial<IMetaTagProperties> = {
		title: `Your Words`,
		url: `https://voconsteroid.com/assoc`,
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: ['sveltekit', 'Voc On Steroid', 'Voc On Steroid words'],
		searchUrl: `https://voconsteroid.com/assoc`,
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml',
	};

	let selectedWord: AssocWord = null;
	let currentWord: WordModel = null;

	$: if (selectedWord) {
		getWord(selectedWord.id).then((r) => (currentWord = r));
	} else {
		currentWord = null;
	}

	const handleClick = (w: AssocWord) => {
		if (w.id === selectedWord?.id) {
			selectedWord = null;
		} else {
			selectedWord = w;
		}
	};
</script>

<HeadTags metaData="{metaData}" />

<div class="hero min-h-screen bg-base-200">
	<div
		class="hero-content text-center flex-col lg:flex-row lg:flex-wrap lg:justify-around lg:max-w-screen-xl lg:w-screen"
	>
		<div class="flex gap-1">
			<div class="card bg-base-100 shadow-xl max-h-screen w-80">
				<div class="card-body items-center overflow-auto">
					<h2 class="card-title">Mots sauvegardés</h2>
					<div class="h-12">
						<input class="input" placeholder="Filtrer..." type="text" bind:value="{search}" />
					</div>
					<div class="flex flex-col h-full overflow-auto grow-0">
						<AssocList words="{filteredWordList}" handleClick="{handleClick}" />
					</div>
				</div>
			</div>
			<div class="card bg-base-100 shadow-xl max-h-screen">
				<div class="card-body items-center grow-0">
					<h2 class="card-title">Catégories 📚</h2>
					<CategoryModal handleCreate="{createCateory}" />
					<div class="flex flex-col h-full overflow-auto grow-0">
						<CategoryList categories="{$categoryStore}" handleDelete="{removeCateory}" />
					</div>
				</div>
			</div>
		</div>
		{#if currentWord}
			<Detail word="{currentWord}" />
		{/if}
	</div>
</div>
