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

<div class="hero min-h-screen bg-base-200" style="background-image: url(/books2.jpeg">
	<div class="hero-overlay bg-opacity-80"></div>
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-xl">
			<h1 class="text-5xl font-bold mb-5">About</h1>
			<div class="text-xl">
				<p class="py-6 mb-5"
					>This was a school project which objective was to create an online french dictionnary. It uses
					wikitionary for the first fetch of a word, then it saves it in Elastic Search.</p
				>
				<p class="mb-5">The front end part is written in Svelte, utilizing svelte kit for SSR.</p>
				<p class="mb-5"
					>I used <a href="https://nestjs.com">NestJS</a> for the word api and the word manager api.</p
				>
				<p class="mb-5">The gateway and the user api are written in golang.</p>
				<p class="mb-5">Feel free to visit my <a href="https://bnei.dev">portfolio</a> for more informations.</p
				>
			</div>
		</div>
	</div>
</div>
