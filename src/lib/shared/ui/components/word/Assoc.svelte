<script lang="ts">
	import Time from 'svelte-time';

	export let id: string;
	export let createdAt: Date;
</script>

<div class="mx-1 p-2 rounded-lg hover:bg-gray-100 align-items:center text-center">
	<a href="{'/word/' + id}" sveltekit:prefetch>
		<span class="text-lg font-semibold w-52">
			{id}
		</span>
		<div class="text-sm italic">
			<Time timestamp="{createdAt}" format="DD/MM/YYYY" />
		</div>
	</a>
</div>
