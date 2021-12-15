<script lang="ts" context="module">
	export const testClickable = /[a-zA-ZÀÁÂÄÅÃÆÇÉÈÊËÍÌÎÏÑÓÒÔÖØÕŒÚÙÛÜÝŸŶÇÔÏŒâéèêâîïûùôçœ]{3,}/gi;
</script>

<script lang="ts">
	export let text: string;
	export let href: string;
</script>

{#if text.length > 2}
	<a sveltekit:prefetch href="{`/${href}`}" class="hover:font-bold">{text}</a>
{:else}
	{text}
{/if}
