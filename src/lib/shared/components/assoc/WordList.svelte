<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { AssocWord } from '$lib/core';
	import Time from 'svelte-time';

	export let words: AssocWord[];

	$: sortedWords = words.sort((a, b) => a?.id?.localeCompare(b.id));
</script>

{#each sortedWords as word (word.id)}
	<div in:fade animate:flip>
		<div class="mx-1 p-2 rounded-lg hover:bg-gray-100 align-items:center text-center">
			<a href="{'/word/' + word.id}" sveltekit:prefetch>
				<span class="text-lg font-semibold w-52">
					{word.id}
				</span>
				<div class="text-sm italic">
					<Time timestamp="{word.createdAt}" format="DD/MM/YYYY" />
				</div>
			</a>
		</div>
	</div>
{:else}
	<div> No word yet. Go search for some </div>
{/each}
