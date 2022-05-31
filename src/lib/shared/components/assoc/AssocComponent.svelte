<script lang="ts">
	import { assocStore, categoryStore } from '$stores';
	import { onMount } from 'svelte';
	import type { WordModel } from '$lib/models/word.model';
	import type { AssocWord, Category } from '$lib/models/interfaces/assoc';
	import { AssocList } from '.';

	onMount(() => {
		const localAssoc = localStorage.getItem('assoc');
		if (localAssoc) {
			assocStore.setList(JSON.parse(localAssoc));
		}

		return assocStore.subscribe((a) => localStorage.setItem('assoc', JSON.stringify(a)));
	});

	let search = '';
	export let currentWord: WordModel;
	export let selectedCategories: Category[] = [];
	export let handleSelect: (word: AssocWord) => void;
	let deleteModeAssoc: any = false;

	// helpers
	$: mapSCat = selectedCategories.map(({ name }) => name);
	$: mapSCatStore = $categoryStore.map(({ name }) => name);

	// Handle removal of a category
	$: selectedCategories = selectedCategories.filter(({ name }) => mapSCatStore.includes(name));

	// Filter word list on search input
	$: filteredWordList = search.length ? $assocStore.filter(({ id }) => id.startsWith(search)) : $assocStore;

	// Filter word list on category
	$: cFilteredList = selectedCategories.length
		? filteredWordList.filter(({ categories }) => categories?.some((name) => mapSCat.includes(name)))
		: filteredWordList;

	const toggleAssocDelete = () => {
		if (cFilteredList.length) deleteModeAssoc ^= 1;
	};
</script>

<h2 class="card-title ">Mots sauvegardés</h2>
<div class="h-12 flex">
	<input class="input w-36" placeholder="Filtrer..." type="text" bind:value="{search}" />
	<div class="tooltip tooltip-left" data-tip="Supprimer des Mots">
		<button class="btn {deleteModeAssoc ? 'btn-primary' : 'btn-ghost'} btn-circle" on:click="{toggleAssocDelete}"
			>🗑</button
		>
	</div>
</div>
<div class="flex flex-col overflow-y-auto">
	<AssocList
		words="{cFilteredList}"
		handleClick="{handleSelect}"
		currentWord="{currentWord}"
		deleteMode="{deleteModeAssoc}"
	/>
</div>
