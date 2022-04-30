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
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ error, status, params }) => {
		return {
			props: {
				title: `${status}: ${error.message}`,
				status,
				error,
				word: params.word,
			},
		};
	};
</script>

<script lang="ts">
	import Title from '$lib/shared/components/title/Title.svelte';
	import { goto, afterNavigate } from '$app/navigation';

	export let title: string;
	export let word: string;
	export let error: Error;

	let previousPage: string;
	afterNavigate((navigaton) => {
		previousPage = navigaton.from?.pathname;
	});
</script>

<Title title="{title} | Voc On Steroid" />
<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row">
		<img src="/404.jpeg" class="max-w-sm rounded-lg shadow-2xl" alt="404"/>
		<div>
			<h1 class="text-5xl font-bold">{word}</h1>
			<p class="py-6">{error.message}</p>
			<button class="btn btn-primary" on:click="{() => goto(previousPage || '/')}">Get back</button>
		</div>
	</div>
</div>
