<script lang="ts">
	import { unassignCategory } from '$lib/core';
	import type { WordModel } from '$lib/models';
	import type { AssocWord } from '$lib/models/interfaces/assoc';
	import { assocStore, categoryStore } from '$stores';
	import { blur } from 'svelte/transition';

	export let word: AssocWord | WordModel;

	$: wordId = word?.id || word?.word;


	$: selectedAssoc = $assocStore.find(({ id }) => id === wordId) || ({} as AssocWord);

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
			<h3 class="text-lg">Voulez-vous retirer la catégorie <span class="font-semibold">{wCat.name}</span> ?</h3>
			<div class="modal-action">
				<label for="{wCat.name + i}" class="btn btn-warning" on:click="{() => unassignCategory(wordId, wCat)}"
					>Supprimer</label
				>
			</div>
		</div>
	</label>
{/each}
