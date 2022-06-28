<script lang="ts">
	import { unassignCategory } from '$lib/core';
	import type { WordModel } from '$lib/models';
	import type { AssocWord } from '$lib/models/interfaces/assoc';
	import { assocStore, categoryStore } from '$stores';

	export let word: AssocWord | WordModel;

	$: wordId = (<AssocWord>word)?.id || (<WordModel>word)?.word;

	const id = crypto.randomUUID();
	$: selected = $assocStore.find(({ id }) => id === wordId) || ({} as AssocWord);

	$: wordCatList = $categoryStore.filter(({ name }) => selected.categories?.includes(name));
</script>

{#each wordCatList as wCat}
	<div class="tooltip lg:tooltip-left capitalize" data-tip="Supprimer">
		<label
			for="wcat-{id}"
			class="badge badge-lg text-xs whitespace-nowrap uppercase gap-2 modal-button hover:badge-warning p-3 cursor-pointer mr-2"
		>
			{wCat.name}
		</label>
	</div>

	<input type="checkbox" id="wcat-{id}" class="modal-toggle" />
	<label for="wcat-{id}" class="modal modal-bottom sm:modal-middle">
		<div class="modal-box relative">
			<label for="wcat-{id}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
			<h3 class="text-lg">Voulez-vous retirer la catégorie <span class="font-semibold">{wCat.name}</span> ?</h3>
			<div class="modal-action">
				<label for="wcat-{id}" class="btn btn-warning z-10" on:click="{() => unassignCategory(wordId, wCat)}"
					>Supprimer</label
				>
			</div>
		</div>
	</label>
{/each}
