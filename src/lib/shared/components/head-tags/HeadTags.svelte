<script lang="ts">
	import type { IMetaTagProperties } from '$lib/models';
	import SEO from '../seo/SEO.svelte';

	const description =
		'Voc On Steroid project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable project. (sveltekit, typescript, tailwindcss, postcss, husky, Storybook).';

	/**
	 * @type {IMetaTagProperties}
	 */
	export let metaData: Partial<IMetaTagProperties> = {};

	metaData = {
		title: metaData.title ? metaData.title : 'Voc On Steroid',
		description: metaData.description ? metaData.description : description,
		...metaData,
	};
</script>

<SEO metaData="{metaData}" />
