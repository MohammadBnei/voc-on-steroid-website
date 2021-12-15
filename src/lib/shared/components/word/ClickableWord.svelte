<script lang="ts" context="module">
	export const testClickable = /[a-zA-ZÀÁÂÄÅÃÆÇÉÈÊËÍÌÎÏÑÓÒÔÖØÕŒÚÙÛÜÝŸŶÇÔÏŒâéèêâîïûùôçœ]{3,}/gi;
</script>

<script lang="ts">
	import { prefetch } from '$app/navigation';

	export let text: string;
	export let href: string;
	$: path = `/${href}`;
</script>

{#if text.length > 2}
	<a on:mouseenter="{() => prefetch(path)}" href="{path}" class="hover:font-bold">{text}</a>
{:else}
	{text}
{/if}
