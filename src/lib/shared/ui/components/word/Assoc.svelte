<script lang="ts">
	import Time from 'svelte-time';

	export let word: string;
	export let created: Date;
</script>

<div class="flex flex-col p-3">
	<a href="{'/' + word}" sveltekit:prefetch>
		<div class="flex p-2 rounded-lg hover:bg-gray-100 align-items:center justify-around">
            <span class="text-lg font-semibold w-52">
                {word}
            </span>
			<div>
				<Time timestamp="{created}" format="dddd @ h:mm A · MMMM D, YYYY" />
			</div>
		</div>
	</a>
</div>
