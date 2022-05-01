<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { blur } from 'svelte/transition';
	import type { WordModel } from '$lib/models';
	import type { AssocWord } from '$lib/models/interfaces/assoc';

	export let words: AssocWord[];
	export let currentWord: WordModel;

	export let handleClick: (word: AssocWord) => void = (word: AssocWord) => {
		goto('/word/' + word.id);
	};

	export let onHover: (word: AssocWord) => void = (word: AssocWord) => {
		prefetch('/word/' + word.id);
	};

	$: sortedWords = words.sort((a, b) => a?.id?.localeCompare(b.id));
</script>

{#each sortedWords as word (word.id)}
	<button
		class="btn {currentWord?.word === word.id ? 'btn-primary' : 'btn-ghost'}"
		on:click="{() => handleClick(word)}"
		on:mouseenter="{() => onHover(word)}"
		transition:blur
	>
		{word.id}
	</button>
{:else}
	<div> Aucun mot pour l'instant </div>
{/each}
