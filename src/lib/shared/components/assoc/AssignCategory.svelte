<script lang="ts">
	import type { WordModel } from '$lib/models';
	import type { AssocWord } from '$lib/models/interfaces/assoc';
	import { assocStore, categoryStore } from '$stores';
	import { blur } from 'svelte/transition';
	import { assignCategory } from '$lib/core/services/category';

	export let word: WordModel;

	$: selectedAssoc = $assocStore.find(({ id }) => id === word.word) || ({} as AssocWord);

	$: filteredList = $categoryStore.filter(({ name }) => !selectedAssoc.categories?.includes(name));
</script>

<div class="dropdown dropdown-end">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn btn-ghost m-1 btn-circle" transition:blur>
		<div class="tooltip tooltip-left font-normal capitalize" data-tip="Assigner une catégorie">
			<span class="text-2xl">📚</span>
		</div>
	</label>
	<ul tabindex="0" class="dropdown-content menu p-4 shadow bg-base-100 rounded-box">
		{#each filteredList as cat}
			<!-- svelte-ignore a11y-missing-attribute -->
			<li on:click="{() => assignCategory(word, cat)}"><a>{cat.name}</a></li>
		{:else}
			<li>Aucune catégorie.</li>
		{/each}
	</ul>
</div>
