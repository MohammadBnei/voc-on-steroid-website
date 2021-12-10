<script lang="ts">
	import { goto } from '$app/navigation';
	import { fetchResemblingWord, searchWord } from '../services';
	import type { WordListModel } from '../word.model';
	import SearchBar from './bar/SearchBar.svelte';

	let results: WordListModel = [] as WordListModel;

	const handleType = async (input: string): Promise<void> => {
		results = (await fetchResemblingWord(input)) as WordListModel;
	};

	const handleSearch = async (word: string) => {
		if (!word) {
			return;
		}
		const r = await searchWord(word);

		if (r) {
			goto('/' + word);
		}
	};

	const listId = 'ResultList';
</script>

<div class="self-center">
	<SearchBar
		on:type="{(e) => handleType(e.detail.input)}"
		on:change="{(e) => handleSearch(e.detail.input)}"
		on:search="{(e) => handleSearch(e.detail.input)}"
		listId="{listId}"
	/>
	{#if results.length !== 0}
		<div class="fixed w-96">
			<datalist id="{listId}" class="bg-white border border-gray-100 mt-2">
				{#each results as r}
					<option
						value="{r.key}"
						label="{r.key.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}"
					>
					</option>
				{/each}
			</datalist>
		</div>
	{/if}
</div>
