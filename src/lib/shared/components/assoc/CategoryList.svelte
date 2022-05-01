<script lang="ts">
	import type { Category } from '$lib/models/interfaces/assoc';
	import { blur } from 'svelte/transition';

	export let categories: Category[];

	export let handleDelete: (cat: Category) => void;
	export let handleClick: (cat: Category) => void;;
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
		<label for="{category.name}" class="btn btn-ghost modal-button" transition:blur> 🗑 </label>

		<input type="checkbox" id="{category.name}" class="modal-toggle" />
		<label for="{category.name}" class="modal modal-bottom sm:modal-middle">
			<div class="modal-box relative">
				<label for="{category.name}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
				<h3 class="text-lg"
					>Voulez-vous supprimer la catégorie <span class="font-semibold">{category.name}</span> ?</h3
				>
				<div class="modal-action">
					<label for="{category.name}" class="btn btn-warning" on:click="{() => handleDelete(category)}"
						>Supprimer</label
					>
				</div>
			</div>
		</label>
	</div>
{:else}
	<div> No category yet. Go search for some </div>
{/each}
