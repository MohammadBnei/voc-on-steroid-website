<script lang="ts">
	import type { AssocWord } from '$entity/assoc/services';
	import Assoc from '$lib/shared/ui/components/word/Assoc.svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

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
