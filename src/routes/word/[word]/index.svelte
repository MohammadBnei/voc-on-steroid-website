<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import Detail from '$lib/shared/ui/components/word/detail/Detail.svelte';
	import { handleRes, get } from '$lib/utils/api';
	import { WordModel } from '$lib/models/word.model';
	import type { IMetaTagProperties, IWord } from '$lib/models';

	export const load: Load = async ({ params, fetch, url }) => {
		const res = await get({ path: `${url.origin}/endpoint/words?term=${params.word}`, fetch });
		const data = await handleRes(res, 'Words');
		if (!res.ok) {
			return {
				status: res.status,
				redirect: '/',
				error: `Unable to get definition for : ${params.word}`,
			};
		}
		const wordModel = new WordModel().deserialize(data.word as unknown as IWord);
		return {
			props: {
				word: wordModel,
			},
		};
	};
</script>

<script lang="ts">
	import { HeadTags } from '$lib/shared';
	import { afterUpdate, onDestroy } from 'svelte';
	import { currentWord } from '$stores';
	import { blur } from 'svelte/transition';

	export let word: WordModel;

	let metaData: Partial<IMetaTagProperties> = {
		title: `${word?.word}`,
		description: ` Definitions : ${word.types.reduce((acc, cur) => {
			acc += cur.type + ' : ';
			acc += cur.definitions.reduce((acc, cur) => {
				acc += cur.definition;
				acc += '\n';

				return acc;
			}, '');

			acc += '\n';
			return acc;
		}, '')}
				Etymologie : ${word.etymologies}
		`,
		url: `https://voconsteroid.com/word/${word.word}`,
		logoUrl: 'https://voconsteroid.com/favicon.ico',
		keywords: [word?.word, 'Definition', 'Voc On Steroid', word.lang === 'fr' ? 'French' : ''],
		searchUrl: `https://voconsteroid.com/word/${word.word}`,
		image: 'https://voconsteroid.com/voconsteroidLogo512.png',
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
<Detail word="{word}" />
