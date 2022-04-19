<style lang="scss">
	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}
	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<script lang="ts" context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`,
				status,
				error,
			},
		};
	}
</script>

<script lang="ts">
	import { dev } from '$app/env';
	import Title from '$lib/shared/components/title/Title.svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import Button from '$lib/shared/ui/components/button/Button.svelte';

	export let title: string;
	export let error: Error;

	let previousPage: string;
	afterNavigate((navigaton) => {
		previousPage = navigaton.from?.pathname;
	});
</script>

<Title title="{title} | Sveltekit" />
<div class="md:container md:mx-auto">
	<div class="flex flex-col justify-center items-center">
		<h1>
			{error.message}
		</h1>
		<Button on:click="{() => goto(previousPage || '/')}" text="Go back"/>
		{#if dev && error.stack}
			<pre> {error.message} </pre>
		{/if}
	</div>
</div>
