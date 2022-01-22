<script lang="ts" context="module">
	export const testClickable = /[a-zA-ZÀÁÂÄÅÃÆÇÉÈÊËÍÌÎÏÑÓÒÔÖØÕŒÚÙÛÜÝŸŶÇÔÏŒâéèêâîïûùôçœ]{3,}/gi;
</script>

<script lang="ts">
	import { prefetch } from '$app/navigation';

	export let text: string;
	export let href: string;
	$: path = `/word/${href}`;

	let notFound = false;

	const handlePrefetch = () => {
		prefetch(path).then((r) => {
			if (r?.props?.page?.status === 404) {
				notFound = true;
			}
		});
	};

	$: clickable = href && !notFound;
</script>

{#if clickable}
	<a on:mouseenter="{handlePrefetch}" href="{path}" class="hover:underline">{text}</a>
{:else}
	{text}
{/if}
