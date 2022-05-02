<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { blur } from 'svelte/transition';
	import type { WordModel } from '$lib/models';
	import type { AssocWord } from '$lib/models/interfaces/assoc';
	import { onMount } from 'svelte';
	import { fetchUserWords, removeWord } from '$lib/core';
import AssignCategory from './AssignCategory.svelte';

	export let words: AssocWord[];
	export let currentWord: WordModel = null;
	export let deleteMode: boolean;

	export let handleClick: (word: AssocWord) => void = (word: AssocWord) => {
		goto('/word/' + word.id);
	};

	export let onHover: (word: AssocWord) => void = (word: AssocWord) => {
		prefetch('/word/' + word.id);
	};

	$: sortedWords = words.sort((a, b) => a?.id?.localeCompare(b.id));

	onMount(fetchUserWords);

	const handleDelete = (word: string) => removeWord(word);
</script>

<div class="grid grid-cols-[auto_1fr]">
	{#each sortedWords as word (word.id)}
		<button
			class="btn justify-self-start {currentWord?.word === word.id ? 'btn-primary' : 'btn-ghost'}"
			on:click="{() => handleClick(word)}"
			on:mouseenter="{() => onHover(word)}"
			transition:blur="{{ duration: 300 }}"
		>
			{word.id}
		</button>
		{#if deleteMode}
			 <label
				 for="{word.id}"
				 class="btn btn-circle btn-ghost modal-button"
				 transition:blur="{{ duration: deleteMode ? 300 : 0 }}"
			 >
				 ❌
			 </label>
		{:else}
			 <AssignCategory
			 	word={currentWord}
			 />
		{/if}

		<input type="checkbox" id="{word.id}" class="modal-toggle" />
		<label for="{word.id}" class="modal modal-bottom sm:modal-middle">
			<div class="modal-box relative pt-12">
				<label for="{word.id}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
				<h3 class="text-lg mb-8">Voulez-vous retirer le mot <span class="font-semibold">{word.id}</span> ?</h3>
				<div class="modal-action mt-0">
					<label for="{word.id}" class="btn btn-warning" on:click="{() => handleDelete(word.id)}"
						>Supprimer</label
					>
				</div>
			</div>
		</label>
	{:else}
		<div> Aucun mot pour l'instant </div>
	{/each}
</div>
