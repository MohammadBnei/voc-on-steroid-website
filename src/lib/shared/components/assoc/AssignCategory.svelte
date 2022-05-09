<script lang="ts">
	import type { AssocWord, Category } from '$lib/models/interfaces/assoc';
	import { assocStore, categoryStore } from '$stores';
	import { assignCategory } from '$lib/core/services/category';
	import type { WordModel } from '$lib/models';
	import { onMount } from 'svelte';
	import CategoryBadge from './CategoryBadge.svelte';

	export let word: AssocWord | WordModel;
	let id: string;

	onMount(() => (id = Date.now().toString()));

	$: wordId = (<AssocWord>word)?.id || (<WordModel>word)?.word;

	$: selected = $assocStore.find(({ id }) => id === wordId) || ({} as AssocWord);

	$: filteredList = $categoryStore.filter(({ name }) => !selected.categories?.includes(name));
</script>
<label for="{id}" class="btn btn-ghost btn-circle modal-button">
	<div class="tooltip tooltip-left font-normal capitalize" data-tip="Assigner une catégorie">
		<span>📚</span>
	</div>
</label>

<input type="checkbox" id="{id}" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box relative">
		<label for="{id}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg">Catégories présentes : </h3>
		<CategoryBadge word="{word}" />
		<div class="divider"></div>
		{#each filteredList as cat}
			<div class="tooltip font-normal capitalize" data-tip="Assigner">
				<div
					class="badge badge-lg badge-outline uppercase gap-2 p-3 cursor-pointer mr-2"
					on:click="{() => assignCategory(wordId, cat)}"
				>
					{cat.name}
				</div>
			</div>
		{:else}
			<p class="py-4">Aucune catégorie à attribuer</p>
		{/each}
		<div class="modal-action">
			<label for="{id}" class="btn btn-secondary">Ok</label>
		</div>
	</div>
</div>
