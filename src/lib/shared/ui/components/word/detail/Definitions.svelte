<style lang="postcss" type="text/postcss">
</style>

<script lang="ts">
	import { ClickableText } from '$lib/shared/components/word';

	export let types: import('src/entity/word/iword.interface').ITypes;
</script>

<div class="mt-8">
	<div>
		<p class="text-3xl font-medium italic">
			{types.type}
		</p>
	</div>
	<div class="p-5 pb-0 pt-3 body-2">
		{#each types.definitions as { definition, examples }}
			<div class="m-2">
				<p class="font-medium"><ClickableText text="{definition}" /></p>
				<p class="text-base font-extralight antialiased"
					><ClickableText text="{examples.join('\n')}" /></p
				>
			</div>
		{/each}
	</div>
</div>
