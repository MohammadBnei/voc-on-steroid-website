<script lang="ts">
	import { fade, blur } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fade out:blur>
		<slot />
	</div>
{/key}
