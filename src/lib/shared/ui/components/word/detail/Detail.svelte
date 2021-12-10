<style lang="postcss" type="text/postcss">
	.container {
		display: flex;
		flex-direction: column;
		justify-items: center;
		> div {
			margin: 1em;
		}
	}
</style>

<script lang="ts">
	import type { WordModel } from 'src/entity/word';
	import Definitions from './Definitions.svelte';

	export let word: WordModel;
</script>

<div class="container">
	<div class="title">
		<h3 class="text-5xl capitalize font-black">{word.word}</h3>
	</div>
	<div class="etymologies">
		{#each word.etymologies as e}
			<p class="text-xl">{e}</p>
		{/each}
	</div>
	<div class="definitions">
		{#each word.results as r}
			<Definitions results="{r}" />
		{/each}
	</div>
</div>
