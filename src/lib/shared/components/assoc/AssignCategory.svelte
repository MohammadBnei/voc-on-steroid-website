<script lang="ts">
	import type { WordModel } from '$lib/models';
	import type { Category } from '$lib/models/interfaces/assoc';
	import { assocStore, categoryStore } from '$stores';
	import { blur } from 'svelte/transition';

	export let word: WordModel;
	export let assignCategory: (word: WordModel, category: Category) => void;
	export let unassignCategory: (word: WordModel, category: Category) => void;

	$: selectedAssoc = $assocStore.find(({ id }) => id === word.word) || {};

	const handleClick = (category: Category) => {
		selectedAssoc.categories?.includes(category.name)
			? unassignCategory(word, category)
			: assignCategory(word, category);
	};

	$: filteredList = $categoryStore.filter(({ name }) => !selectedAssoc.categories?.includes(name));
	$: wordCatList = $categoryStore.filter(({ name }) => selectedAssoc.categories?.includes(name));
</script>

<div class="flex place-items-center">
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
	<div class="dropdown dropdown-end">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label tabindex="0" class="btn btn-ghost m-1">
			<div class="tooltip tooltip-left font-normal capitalize" data-tip="Assigner une catégorie">
				<span class="text-2xl">📚</span>
			</div>
		</label>
		<ul tabindex="0" class="dropdown-content menu p-4 shadow bg-base-100 rounded-box">
			{#each filteredList as cat}
				<!-- svelte-ignore a11y-missing-attribute -->
				<li on:click="{() => handleClick(cat)}"><a>{cat.name}</a></li>
			{:else}
				<li>Aucune catégorie.</li>
			{/each}
		</ul>
	</div>
</div>
