<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import type { WordModel } from '$lib/models';
	import type { AssocWord } from '$lib/models/interfaces/assoc';
	import { onMount } from 'svelte';
	import { fetchUserWords } from '$lib/core';

	export let words: AssocWord[];
	export let currentWord: WordModel = null;

	export let handleClick: (word: AssocWord) => void = (word: AssocWord) => {
		goto('/word/' + word.id);
	};

	export let onHover: (word: AssocWord) => void = (word: AssocWord) => {
		prefetch('/word/' + word.id);
	};

	$: sortedWords = words.sort((a, b) => a?.id?.localeCompare(b.id));

	onMount(fetchUserWords);
</script>

{#each sortedWords as word (word)}
	<button
		class="btn {currentWord?.word === word.id ? 'btn-primary' : 'btn-ghost'}"
		on:click="{() => handleClick(word)}"
		on:mouseenter="{() => onHover(word)}"
		transition:fly="{{y:-100, duration:200}}"
	>
		{word.id}
	</button>
{:else}
	<div> Aucun mot pour l'instant </div>
{/each}
