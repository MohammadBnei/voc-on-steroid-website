<script lang="ts">
	import type { AssocWord } from '$lib/core';
	import { goto, prefetch } from '$app/navigation';
	import { blur } from 'svelte/transition';

	export let words: AssocWord[];

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
		class="btn btn-ghost"
		on:click="{() => handleClick(word)}"
		on:mouseenter="{() => onHover(word)}"
		transition:blur
	>
		{word.id}
	</button>
{:else}
	<div> No word yet. Go search for some </div>
{/each}
