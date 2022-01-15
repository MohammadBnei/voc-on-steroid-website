<style>
	ul {
		top: var(--toastContainerTop, auto);
		right: var(--toastContainerRight, 2rem);
		bottom: var(--toastContainerBottom, 1.5rem);
		left: var(--toastContainerLeft, auto);
		position: fixed;
		margin: 0;
		padding: 0;
		list-style-type: none;
		pointer-events: none;
		z-index: 9999;
	}
</style>

<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { toast } from './store';
	import ToastItem from './ToastItem.svelte';

	export let options = {};
	const defaults = {
		duration: 4000,
		dismissable: true,
		initial: 1,
		progress: 0,
		reversed: false,
		intro: { x: 256 },
		theme: {},
	};
	toast._opts(defaults);
	$: toast._opts(options);

	const getCss = (theme) => Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, '');
</script>

<ul>
	{#each $toast as item (item.id)}
		<li in:fly="{item.intro}" out:fade animate:flip="{{ duration: 200 }}" style="{getCss(item.theme)}">
			<ToastItem item="{item}" />
		</li>
	{/each}
</ul>
