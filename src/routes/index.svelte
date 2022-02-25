<style lang="postcss" type="text/postcss">
</style>

<script lang="ts" context="module">
	export const prerender = true;

	export async function load({ fetch, session }) {
		try {
			await fetch('/sitemap.xml');
			return {
				props: {
					user: session.user,
				},
			};
		} catch (error) {
			console.error(error);
		}
	}
</script>

<script lang="ts">
	import HeadTags from '$shared/components/head-tags/HeadTags.svelte';
	import type { IMetaTagProperties } from '$lib/models';
	import { onMount } from 'svelte';
	import { fetchUserWords } from '$entity/assoc/services';

	let user = null;

	onMount(() => {
		if (user) {
			fetchUserWords();
		}
	});

	const metaData: Partial<IMetaTagProperties> = {
		title: 'Home | VocOnSteroid',
		description:
			'Voc On Steroid project created with sveltekit, typescript, tailwindcss. The project has the structure set up for the scaleable project. (sveltekit, typescript, tailwindcss, postcss, husky, Storybook).',
		url: 'https://voconsteroid.com',
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: ['sveltekit', 'Voc On Steroid', 'Voc On Steroid home'],
		searchUrl: 'https://voconsteroid.com',
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml',
	};
</script>

<HeadTags metaData="{metaData}" />

<section class="text-gray-600">
	<div class="container mx-auto px-5 py-24 text-center">
		<h1>Welcome to Voc on Steroid Dictionary !</h1>
		<p>You can search for word definition, but if you log in there's more...</p>
	</div>
</section>
