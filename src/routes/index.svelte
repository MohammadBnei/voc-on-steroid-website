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
		title: 'Accueil',
		url: 'https://voconsteroid.com',
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: ['Voc On Steroid', 'Voc On Steroid Accueil'],
		searchUrl: 'https://voconsteroid.com',
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml',
	};
</script>

<HeadTags metaData="{metaData}" />

<div class="hero min-h-screen bg-base-200" style="background-image: url(/books-background.jpg)">
	<div class="hero-overlay bg-opacity-80"></div>
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-7xl">
			<h1 class="text-5xl font-bold mb-5">Bienvenue sur le dictionnaire personnel Voc On Steroid !</h1>
			<p class="py-6 mb-5 text-xl"
				>Vous pouvez chercher des définitions, mais si vous vous connectez vous découvrirez d'autres
				possibilités...</p
			>
			<div class="flex justify-center text-zinc-900">
				<Search />
			</div>
		</div>
	</div>
</div>
