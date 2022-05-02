<script lang="ts">
	import type { WordModel } from '$lib/models';
	import type { AssocWord, Category } from '$lib/models/interfaces/assoc';
	import { assocStore, categoryStore } from '$stores';
	import { blur } from 'svelte/transition';

	export let word: WordModel;
	export let unassignCategory: (word: WordModel, category: Category) => void;

	$: selectedAssoc = $assocStore.find(({ id }) => id === word.word) || ({} as AssocWord);

	$: wordCatList = $categoryStore.filter(({ name }) => selectedAssoc.categories?.includes(name));
</script>

{#each wordCatList as wCat, i}
		<div class="tooltip tooltip-left capitalize" data-tip="Supprimer">
			<label
				for="{wCat.name + i}"
				class="badge badge-lg uppercase gap-2 modal-button hover:badge-warning p-3 cursor-pointer mr-2"
				transition:blur
			>
				{wCat.name}
			</label>
		</div>

		<input type="checkbox" id="{wCat.name + i}" class="modal-toggle" />
		<label for="{wCat.name + i}" class="modal modal-bottom sm:modal-middle">
			<div class="modal-box relative">
				<label for="{wCat.name + i}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
				<h3 class="text-lg"
					>Voulez-vous retirer la catégorie <span class="font-semibold">{wCat.name}</span> ?</h3
				>
				<div class="modal-action">
					<label for="{wCat.name + i}" class="btn btn-warning" on:click="{() => unassignCategory(word, wCat)}"
						>Supprimer</label
					>
				</div>
			</div>
		</label>
	{/each}