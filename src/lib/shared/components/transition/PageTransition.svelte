<script lang="ts">
	import { slide } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div transition:slide>
		<slot />
	</div>
{/key}
