<script lang="ts">
	import ClickableWord, { testClickable } from './ClickableWord.svelte';

	export let text: string;

	$: clickable = text.split(' ').map((w) => ({ text: w, href: w.match(testClickable)?.[0]?.toLocaleLowerCase() }));
</script>

<p>
	{#each clickable as word, i}
		{i === 0 ? '' : ' '}
		<ClickableWord {...word} />
	{/each}
</p>
