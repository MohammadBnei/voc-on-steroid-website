<script lang="ts" context="module">
	export const testClickable = /[a-zA-ZÀÁÂÄÅÃÆÇÉÈÊËÍÌÎÏÑÓÒÔÖØÕŒÚÙÛÜÝŸŶÇÔÏŒâéèêâîïûùôçœ]{3,}/gi;
</script>

<script lang="ts">
	export let text: string;
	export let href: string;
	$: path = `/word/${href}`;

	let notFound = false;

	$: clickable = href && !notFound;
</script>

{#if clickable}
	<a sveltekit:prefetch href="{path}" class="hover:underline">{text}</a>
{:else}
	{text}
{/if}
