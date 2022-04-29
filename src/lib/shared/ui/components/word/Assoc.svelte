<script lang="ts">
	export let id: string;
	// export let createdAt: Date;
</script>

<a href="{'/word/' + id}" sveltekit:prefetch>
	<div class="mx-1 p-2 rounded-lg hover:bg-secondary align-items:center text-center">
		<span class="text-lg font-semibold w-52">
			{id}
		</span>
	</div>
</a>
