<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { fetchResemblingWord } from '$lib/core';

	import type { IWordList } from '$lib/models';
	import type { WordListModel } from '$lib/models/word.model';

	import AutoComplete from 'simple-svelte-autocomplete';

	export let getWords: (keyword: string) => Promise<WordListModel> = fetchResemblingWord;
	export let handleSearch: (word: Partial<IWordList>) => void = (word) => word?.key && goto('/word/' + word.key);

	export let fullwidth = false;

	const handleCreate = (keyword: string) => {
		handleSearch({ key: keyword });
	};

	let word: IWordList;
	let highlightedItem: IWordList;

	$: highlightedItem && prefetch('/word/' + highlightedItem.key);
</script>

<div class="flex items-center gap-2 max-h-8 z-10">
	<AutoComplete
		searchFunction="{getWords}"
		localFiltering="false"
		labelFieldName="title"
		valueFieldName="key"
		bind:selectedItem="{word}"
		onChange="{handleSearch}"
		bind:highlightedItem
		html5autocomplete
		inputClassName="input !px-3 !py-3"
		placeholder="Rechercher..."
		className="!h-min max-h-12{fullwidth ? 'grow' : ''}"
		create
		onCreate="{handleCreate}"
	/>

	<button class="btn btn-accent btn-circle" on:click="{() => handleSearch(word)}">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg
		>
	</button>
</div>
