<script lang="ts">
	import { fade, blur } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fade="{{ delay: 200 }}" out:blur="{{ duration: 200 }}">
		<slot />
	</div>
{/key}
