<script lang="ts">
	import { prefetch } from '$app/navigation';

	import Time from 'svelte-time';

	export let id: string;
	export let created: Date;
</script>

<div class="mx-1 p-2 rounded-lg hover:bg-gray-100 align-items:center text-center">
	<a href="{'/word/' + id}" on:mouseenter="{() => prefetch('/' + id)}">
		<span class="text-lg font-semibold w-52">
			{id}
		</span>
		<div class="text-sm italic">
			<Time timestamp="{created}" format="DD/MM/YYYY" />
		</div>
	</a>
</div>
