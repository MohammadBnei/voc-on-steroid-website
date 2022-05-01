<script lang="ts">
	import type { Category } from '$lib/models/interfaces/assoc';
	import { blur } from 'svelte/transition';

	export let categories: Category[];
	export let deleteMode: boolean;

	export let handleDelete: (cat: Category) => void;
	export let handleClick: (cat: Category) => void;
	export let selectionList: Category[] = [];

	$: sortedCategories = categories.sort((a, b) => a?.name?.localeCompare(b.name));
</script>

{#each sortedCategories as category (category.name)}
	<div class="flex justify-between">
		<button
			class="modal-button btn {selectionList.some(({ name }) => name === category.name)
				? 'btn-primary'
				: 'btn-ghost'}"
			transition:blur
			on:click="{() => handleClick(category)}"
		>
			{category.name}
		</button>
		{#if deleteMode}
			<label for="{category.name}" class="btn btn-circle btn-ghost modal-button" transition:blur> ❌ </label>

			<input type="checkbox" id="{category.name}" class="modal-toggle" />
			<label for="{category.name}" class="modal modal-bottom sm:modal-middle">
				<div class="modal-box relative">
					<label for="{category.name}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<h3 class="text-lg"
						>Voulez-vous supprimer la catégorie <span class="font-semibold">{category.name}</span> ?</h3
					>
					<p class="py-4">Cela supprimera la catégorie de tous vos mots sans possibilité de retour</p>
					<div class="modal-action mt-0">
						<label for="{category.name}" class="btn btn-warning" on:click="{() => handleDelete(category)}"
							>Supprimer</label
						>
					</div>
				</div>
			</label>
		{/if}
	</div>
{:else}
	<div> Aucune catégorie </div>
{/each}
