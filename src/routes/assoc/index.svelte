<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session, url, params }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/account',
			};
		}

		return {
			props: {
				queryWord: url.searchParams.get('word'),
			},
		};
	};
</script>

<script lang="ts">
	import type { IMetaTagProperties } from '$lib/models';
	import { HeadTags } from '$lib/shared';
	import { assocStore, categoryStore } from '$stores';
	import { onMount } from 'svelte';
	import { getWord } from '$lib/core';
	import { Detail } from '$lib/shared/ui/components/word/detail';
	import type { WordModel } from '$lib/models/word.model';
	import type { AssocWord, Category } from '$lib/models/interfaces/assoc';
	import AssocComponent from '$lib/shared/components/assoc/AssocComponent.svelte';
	import CategoryComponent from '$lib/shared/components/assoc/CategoryComponent.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	export let queryWord: string;

	onMount(() => {
		const localAssoc = localStorage.getItem('assoc');
		if (localAssoc) {
			assocStore.setList(JSON.parse(localAssoc));
		}

		const unAssoc = assocStore.subscribe((a) => localStorage.setItem('assoc', JSON.stringify(a)));

		const localCategory = localStorage.getItem('category');
		if (localCategory) {
			categoryStore.setList(JSON.parse(localCategory));
		}

		const unCategory = categoryStore.subscribe((c) => localStorage.setItem('category', JSON.stringify(c)));

		if (queryWord) {
			selectedWord = $assocStore.find(({ id }) => id === queryWord);
		}

		return () => {
			unAssoc();
			unCategory();
		};
	});

	let selectedWord: AssocWord = null;
	let currentWord: WordModel = null;
	let selectedCategories: Category[] = [];
	let detailElem: HTMLElement;
	let pageElem: HTMLElement;

	let metaData: Partial<IMetaTagProperties> = {
		title: `Vos mots`,
		url: `https://voconsteroid.com/assoc`,
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: ['Voc On Steroid'],
		searchUrl: `https://voconsteroid.com/assoc`,
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml',
	};

	$: if (selectedWord) {
		getWord(selectedWord.id).then((r) => {
			currentWord = r;
		});
	} else {
		$page.url.searchParams.delete('word');
		browser && history.replaceState({}, '', $page.url);
		currentWord = null;
	}

	$: if (detailElem && currentWord) {
		pageElem.scrollIntoView({
			behavior: 'smooth',
		});
	}

	const handleClick = (w: AssocWord) => {
		if (w.id === selectedWord?.id) {
			selectedWord = null;
		} else {
			selectedWord = w;
			$page.url.searchParams.set('word', w.id);
			browser && history.replaceState({}, '', $page.url);
		}
	};
</script>

<HeadTags metaData="{metaData}" />

<div class="hero min-h-screen bg-base-200 lg:place-items-start" bind:this="{pageElem}">
	<div
		class="hero-content text-center flex-col-reverse lg:flex-row lg:justify-around lg:max-w-screen-xl lg:w-screen items-start"
	>
		<div class="flex gap-2 w-full flex-col lg:flex-row transition-height duration-500 ease-in-out">
			<div class="card bg-base-100 shadow-xl max-h-screen">
				<div class="card-body items-center grow-0">
					<CategoryComponent on:selection="{(event) => (selectedCategories = event.detail)}" />
				</div>
			</div>
			<div class="card bg-base-100 shadow-xl max-h-screen lg:w-72">
				<div class="card-body items-center overflow-auto grow">
					<AssocComponent
						handleSelect="{handleClick}"
						currentWord="{currentWord}"
						selectedCategories="{selectedCategories}"
					/>
				</div>
			</div>
		</div>
		{#if currentWord}
			<div class="w-80 lg:w-full max-h-[95vh]" bind:this="{detailElem}">
				<Detail word="{currentWord}" />
			</div>
		{:else}
			<div class="w-80 lg:w-full">
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<div class="flex justify-center lg:flex-row flex-wrap flex-col">
							<h2 class="card-title text-2xl lg:text-5xl capitalize mb-2">Aucune sélection</h2>
							<div class="mb-2"> Cliquez sur un mot de votre liste pour l'afficher ici </div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
