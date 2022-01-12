<script lang="ts" context="module">
	import { get } from '$lib/utils/api';
	import { handleRes } from '$lib/utils/api';

	export async function load({ session, fetch }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/account/login',
			};
		}

		const res = await get({ path: 'assoc/' + session.user.id, fetch });
		const data = await handleRes(res, 'Endpoint:Assoc');

		if (!res.ok) {
			return {
				status: res.status,
			};
		}

		return {
			props: { words: data },
			maxage: 10,
		};
	}
</script>

<script lang="ts">
	import Input from '$lib/shared/ui/components/input/Input.svelte';
	import type { AssocWord } from '$entity/assoc/services';
	import { AssocList } from '$lib/shared/components/assoc';
	import type { IMetaTagProperties } from '$lib/models';
	import HeadTags from '$shared/components/head-tags/HeadTags.svelte';

	export let words: AssocWord[] = [];

	let search = '';

	$: filteredList = search.length ? words.filter(({ word }) => word.includes(search)) : words;

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
</script>

<HeadTags metaData="{metaData}" />

<div class="flex flex-auto justify-center">
	<Input display="Filter" options="{{ placeholder: '...' }}" bind:value="{search}" />
	<div class="w-52 text-center self-center">{filteredList.length}</div>
</div>
<div class="mx-96 flex flex-wrap gap-5">
	<AssocList words="{filteredList}" />
</div>
