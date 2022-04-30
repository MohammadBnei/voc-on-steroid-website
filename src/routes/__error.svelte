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

	export const load: Load = ({ error, status }) => {
		return {
			props: {
				status,
				error,
			},
		};
	};
</script>

<script lang="ts">
	import { dev } from '$app/env';
	import Title from '$lib/shared/components/title/Title.svelte';

	export let status: string;
	export let error: Error;
</script>

<Title title="Error" />
<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row">
		<img src="/404.jpg" class="max-w-sm rounded-lg shadow-2xl" alt="404" />
		<div>
			<h1 class="text-5xl font-bold">{status}</h1>
			<p class="py-6">{error.name}</p>
			{#if dev && error.stack}
				<pre> {error.message} </pre>
			{/if}
		</div>
	</div>
</div>
