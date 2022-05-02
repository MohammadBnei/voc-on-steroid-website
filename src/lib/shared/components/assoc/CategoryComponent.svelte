<script lang="ts">
	import { assocStore, categoryStore } from '$stores';
	import { createEventDispatcher, onMount } from 'svelte';
	import CategoryModal from '$lib/shared/components/assoc/CreateCategoryModal.svelte';
	import { createCateory, removeCateory } from '$lib/core/services/category';
	import CategoryList from '$lib/shared/components/assoc/CategoryList.svelte';
	import type { Category } from '$lib/models/interfaces/assoc';

	const dispatch = createEventDispatcher();

	onMount(() => {
		const localCategory = localStorage.getItem('category');
		if (localCategory) {
			categoryStore.setList(JSON.parse(localCategory));
		}

		return categoryStore.subscribe((c) => localStorage.setItem('category', JSON.stringify(c)));
	});

	let selectedCategories: Category[] = [];
	let deleteModeCat: any = false;

	const filterCategory = (cat: Category) => {
		if (selectedCategories.some(({ name }) => name === cat.name)) {
			selectedCategories = selectedCategories.filter(({ name }) => name !== cat.name);
		} else {
			selectedCategories = [...selectedCategories, cat];
		}
	};

	$: dispatch('selection', selectedCategories);

	$: if (!$categoryStore.length) deleteModeCat = false;
</script>

<h2 class="card-title">Catégories 📚</h2>
<div class="flex">
	<CategoryModal handleCreate="{createCateory}" />
	<div class="tooltip" data-tip="Supprimer des catégories">
		<button
			class="btn {deleteModeCat ? 'btn-primary' : 'btn-ghost'} btn-circle"
			on:click="{() => (deleteModeCat ^= 1)}">🗑</button
		>
	</div>
</div>
<div class="flex flex-col h-full overflow-y-scroll grow-0 scrollbar-thin">
	<CategoryList
		categories="{$categoryStore}"
		handleDelete="{removeCateory}"
		handleClick="{filterCategory}"
		selectionList="{selectedCategories}"
		deleteMode="{deleteModeCat}"
	/>
</div>
