<style>
	.layout {
		display: grid;
		grid-template-columns: 0.2fr auto;
	}
</style>

<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/account',
			};
		}

		return {};
	};
</script>

<script lang="ts">
	import Input from '$lib/shared/ui/components/input/Input.svelte';
	import { AssocList } from '$lib/shared/components/assoc';
	import type { IMetaTagProperties } from '$lib/models';
	import { HeadTags } from '$lib/shared';
	import { assocStore } from '$stores';
	import { onMount } from 'svelte';
	import { fetchUserWords } from '$lib/core';

	onMount(fetchUserWords);

	let search = '';

	$: filteredList = search.length ? $assocStore.filter(({ id }) => id.includes(search)) : $assocStore;

	let metaData: Partial<IMetaTagProperties> = {
		title: `Your Words`,
		description:
			'Voc On Steroid project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable project. (sveltekit, typescript, tailwindcss, postcss, husky, Storybook).',
		url: `https://voconsteroid.com/assoc`,
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: ['sveltekit', 'Voc On Steroid', 'Voc On Steroid words'],
		searchUrl: `https://voconsteroid.com/assoc`,
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml',
	};

	let h: number;
</script>

<HeadTags metaData="{metaData}" />

<div class="flex flex-auto justify-center items-center" bind:clientHeight="{h}">
	<Input options="{{ placeholder: '...' }}" bind:value="{search}" />
	<div class="w-52 text-center self-center">{filteredList.length}</div>
</div>
<div class="layout mx-3">
	<AssocList words="{filteredList}" />
</div>
