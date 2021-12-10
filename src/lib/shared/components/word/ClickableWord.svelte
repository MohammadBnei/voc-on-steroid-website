<script lang="ts" context="module">
	export const testClickable = /\b[a-zA-Z-âéèêâîïûùôç]{3,}\b/gi;
</script>

<script lang="ts">
	export let text: string;
	export let href: string;
</script>

{#if text.length > 2}
	<a href="{`/${href}`}" sveltekit:prefetch class="hover:font-bold">{text}</a>
{:else}
	{text}
{/if}
