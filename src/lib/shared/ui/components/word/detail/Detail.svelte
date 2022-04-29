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
	import type { WordModel } from '$lib/models/word.model';
	import { ClickableText } from '$lib/shared/components';

	let openList: Array<string> = ['0:0'];

	const toggleCollapse = (idx: string) => {
		openList = openList.includes(idx) ? openList.filter((i) => i !== idx) : [...openList, idx];
	};

	export let word: WordModel;
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title text-4xl capitalize text-center">{word.word}</h2>
		{#each word.etymologies as e}
			<p class="grow-0">{e}</p>
		{/each}
		{#each word.types as r, ti}
			<div class="text-xl font-medium">
				{r.type}
			</div>
			{#each r.definitions as { definition, examples }, i}
				<div
					tabindex="0"
					class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box cursor-pointer"
					class:collapse-open="{openList.includes(`${ti}:${i}`)}"
					class:collapse-close="{!openList.includes(`${ti}:${i}`)}"
					on:click="{() => toggleCollapse(`${ti}:${i}`)}"
				>
					<div class="collapse-title text-m font-medium">
						Définition {i + 1}
					</div>
					<div tabindex="0" class="collapse-content">
						<div class="m-2">
							<p class="font-medium"><ClickableText text="{definition}" /></p>
							<p class="text-base font-extralight antialiased"
								><ClickableText text="{examples.join('\n')}" /></p
							>
						</div>
					</div>
				</div>
			{/each}
		{/each}
	</div>
</div>
