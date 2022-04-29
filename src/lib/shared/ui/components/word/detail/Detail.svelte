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

	let openList: Array<string> = [];

	const toggleCollapse = (idx: string) => {
		openList = openList.includes(idx) ? openList.filter((i) => i !== idx) : [...openList, idx];
	};

	export let word: WordModel;
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title text-5xl capitalize text-center mb-2">{word.word}</h2>
		<div class="mb-2">
			{#each word.etymologies as e}
				<p class="grow-0">{e}</p>
			{/each}
		</div>
		{#each word.types as r, ti}
			<div class="text-2xl font-medium">
				{r.type}
			</div>
			<div class="ml-4">
				{#each r.definitions as { definition, examples }, i (`${ti}:${i}`)}
					<p class="font-medium mb-1"><ClickableText text="{definition}" /></p>
					<div
						tabindex="0"
						class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box cursor-pointer {openList.includes(
							`${ti}:${i}`,
						)
							? ''
							: 'w-min'} mb-2 ml-1"
						class:collapse-open="{openList.includes(`${ti}:${i}`)}"
						class:collapse-close="{!openList.includes(`${ti}:${i}`)}"
						on:click="{() => toggleCollapse(`${ti}:${i}`)}"
					>
						<div class="collapse-title text-m font-medium"> Exemple </div>
						<div tabindex="0" class="collapse-content">
							<div class="m-2">
								<p class="text-base font-extralight antialiased"
									><ClickableText text="{examples.join('\n')}" /></p
								>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
