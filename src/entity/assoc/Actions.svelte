<script lang="ts">
	import { assocStore } from '$stores';
	import Button from '$lib/shared/ui/components/button/Button.svelte';
	import { addWord, removeWord } from './services';

	export let word;

	const handleAddWord = () => addWord(word);
	const handleRemoveWord = () => removeWord(word);
</script>

{#if $assocStore.some((v) => v.word === word)}
	<Button text=" - " on:click="{handleRemoveWord}" aria-label="forget word button"/>
{:else}
	<Button text=" + " on:click="{handleAddWord}" aria-label="save word button"/>
{/if}
