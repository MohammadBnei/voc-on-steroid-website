<script lang="ts">
	import { fade } from 'svelte/transition';
	import { expoOut, quintIn } from 'svelte/easing';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fade="{{ easing: quintIn }}" out:fade="{{ duration: 200, easing: expoOut }}">
		<slot />
	</div>
{/key}
