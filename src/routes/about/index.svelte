<script lang="ts" context="module">
	export const hydrate = false;
	export const prerender = true;
</script>

<script lang="ts">
	import HeadTags from '$shared/components/head-tags/HeadTags.svelte';
	import type { IMetaTagProperties } from '$lib/models';

	const metaData: Partial<IMetaTagProperties> = {
		title: 'About | Sveltekit',
		description: 'About page of Voc On Steroid project',
		url: 'https://voconsteroid.com/about',
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: ['sveltekit', 'Voc On Steroid', 'about'],
		searchUrl: 'https://voconsteroid.com/about',
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml',
	};
</script>

<HeadTags metaData="{metaData}" />

<div class="px-5 py-24 flex flex-col text-center">
	<h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">About Page</h1>
	<p class="mx-auto leading-relaxed text-base text-left">
		This was a school project which objective was to create an online french dictionnary. It uses wikitionary for
		the first fetch of a word, then it saves it in Elastic Search.
		<br />
		The front end part is written in Svelte, utilizing svelte kit for SSR.
		<br />
		The small apis (user, word-association and the wiki scraper) are written in Javascript.
		<br />
		The word api uses golang.
	</p>
</div>
