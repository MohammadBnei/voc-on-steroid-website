<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { AssocWord } from '$lib/core';
	import Assoc from '$lib/shared/ui/components/word/Assoc.svelte';

	export let words: AssocWord[];

	$: sortedWords = words.sort((a, b) => a?.id?.localeCompare(b.id));
</script>

{#each sortedWords as word (word.id)}
	<div in:fade animate:flip>
		<Assoc {...word} />
	</div>
{:else}
	<div> No word yet. Go search for some </div>
{/each}
