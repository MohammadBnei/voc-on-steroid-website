<script lang="ts">
	import { prefetch } from '$app/navigation';

	import Time from 'svelte-time';

	export let word: string;
	export let created: Date;
</script>

<div class="ml-7 p-2 rounded-lg hover:bg-gray-100 align-items:center w-min">
	<a href="{'/' + word}" on:mouseenter="{() => prefetch('/' + word)}">
		<span class="text-lg font-semibold w-52">
			{word}
		</span>
		<div class="text-sm italic">
			<Time timestamp="{created}" format="DD/MM/YYYY" />
		</div>
	</a>
</div>
