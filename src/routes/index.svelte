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
	import { HeadTags } from '$lib/shared';
	import type { IMetaTagProperties } from '$lib/models';
	import Search from '$lib/shared/components/word/Search.svelte';

	const metaData: Partial<IMetaTagProperties> = {
		title: 'Home',
		url: 'https://voconsteroid.com',
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: ['sveltekit', 'Voc On Steroid', 'Voc On Steroid home'],
		searchUrl: 'https://voconsteroid.com',
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml',
	};
</script>

<HeadTags metaData="{metaData}" />

<div class="hero min-h-screen bg-base-200" style="background-image: url(/books-background.jpeg">
	<div class="hero-overlay bg-opacity-80"></div>
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-7xl">
			<h1 class="text-5xl font-bold mb-5">Welcome to Voc on Steroid Dictionary !</h1>
			<p class="py-6 mb-5 text-xl">You can search for word definition, but if you log in there's more...</p>
			<div class="flex justify-center">
				<Search />
			</div>
		</div>
	</div>
</div>
