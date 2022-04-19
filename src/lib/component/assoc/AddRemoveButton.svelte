<script lang="ts">
	import Button from '$lib/shared/ui/components/button/Button.svelte';

	export let buttonType: boolean;

	export let handleAddWord: () => void;
	export let handleRemoveWord: () => void;
</script>

{#if buttonType}
	<Button text=" - " on:click="{handleRemoveWord}" aria-label="forget word button" />
{:else}
	<Button text=" + " on:click="{handleAddWord}" aria-label="save word button" />
{/if}
