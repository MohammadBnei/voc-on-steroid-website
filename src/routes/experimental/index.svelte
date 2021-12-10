<script lang="ts">
	import { fetchImageWords } from '$entity/experimental/services';
	import wordListStore from '$entity/experimental/store';
	import Button from '$lib/shared/ui/components/button/Button.svelte';

	import FileUploader from '$lib/shared/ui/components/input/FileUploader.svelte';
	import { toast } from '$lib/shared/ui/components/toast';

	let files;
	let resultLine: string[] = [];

	const handleTransform = async () => {
		if (!files?.[0]) {
			return;
		}
		const formData = new FormData();
		formData.append('dataFile', files[0]);
		toast.push('Loading...');
		resultLine = (await fetchImageWords(formData)) as string[];
		wordListStore.setList(resultLine);
	};
</script>

<div class="flex">
	<FileUploader bind:files />
	{#if files?.[0]}
		<Button text="Convert to Word" on:click="{handleTransform}" />
	{/if}
</div>

<div class="flex flex-wrap">
	{#each $wordListStore as line}
		{#each line.split(' ') as word}
			<a href="{`/${word.toLowerCase()}`}" class="px-1 hover:font-bold">{word}</a>
		{/each}
	{/each}
</div>
