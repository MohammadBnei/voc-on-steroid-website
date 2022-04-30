<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ error, status, params }) => {
		return {
			props: {
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

	export let word: string;
	export let error: Error;

	let previousPage: string;
	afterNavigate((navigaton) => {
		previousPage = navigaton.from?.pathname;
	});
</script>

<Title title="Error" />
<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row">
		<img src="/404.jpeg" class="max-w-xs lg:max-w-sm rounded-lg shadow-2xl " alt="404" />
		<div class="flex flex-col items-center lg:block">
			<h1 class="text-5xl font-bold">{word}</h1>
			<p class="py-6">{error.message}</p>
			<button class="btn btn-primary" on:click="{() => goto(previousPage || '/')}">Get back</button>
		</div>
	</div>
</div>
