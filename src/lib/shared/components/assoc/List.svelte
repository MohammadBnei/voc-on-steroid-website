<script lang="ts">
	import type { AssocWord } from '$entity/assoc/services';
	import Assoc from '$lib/shared/ui/components/word/Assoc.svelte';

	export let words: AssocWord[];

	$: sortedWords = words.sort((a, b) => a?.id?.localeCompare(b.id));
</script>

{#each sortedWords as word}
	<Assoc {...word} />
{:else}
	<div> No word yet. Go search for some </div>
{/each}
