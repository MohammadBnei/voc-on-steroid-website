<style lang="postcss">
</style>

<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { IWord } from '$entity/word/iword.interface';
	import { WordModel } from '$entity/word';
	import Detail from '$lib/shared/ui/components/word/detail/Detail.svelte';
	import { handleRes, get } from '$lib/utils/api';

	export const load: Load = async ({ params, fetch }) => {
		const res = await get({ path: 'words?value=' + encodeURIComponent(params.word), fetch });
		const data = await handleRes(res, 'Words');
		if (!res.ok) {
			return {
				status: res.status,
				redirect: '/',
				error: data?.message || 'Could not load word definition',
			};
		}
		const wordModel = new WordModel().deserialize(data as unknown as IWord);
		return {
			props: {
				word: wordModel,
				maxage: 1200,
			},
		};
	};
</script>

<script lang="ts">
	import HeadTags from '$shared/components/head-tags/HeadTags.svelte';
	import type { IMetaTagProperties } from '$lib/models';
	import { afterUpdate, onDestroy } from 'svelte';
	import { currentWord } from '$stores';
	export let word: WordModel;

	let metaData: Partial<IMetaTagProperties> = {
		title: `${word?.word || 'Not found'} | Voc On Steroid`,
		description:
			'Voc On Steroid project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable project. (sveltekit, typescript, tailwindcss, postcss, husky, Storybook).',
		url: `https://voconsteroid.com/${word.word}`,
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: ['sveltekit', 'Voc On Steroid', 'Voc On Steroid words'],
		searchUrl: `https://voconsteroid.com/${word.word}`,
		sitemapUrl: 'https://voconsteroid.com/sitemap.xml',
	};

	afterUpdate(() => {
		$currentWord = word.word;
	});
	onDestroy(() => {
		$currentWord = null;
	});
</script>

<HeadTags metaData="{metaData}" />

<div class="px-5 mx-auto">
	<Detail word="{word}" />
</div>
