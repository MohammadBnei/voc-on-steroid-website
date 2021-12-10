<script lang="ts">
	export let value: boolean;
	export let display = '';
	export let options: Record<string, string | boolean> = {};
</script>

<div class="flex mb-4 items-center">
	<label for="{display}" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">{display} :</label>
	<input
		id="{display}"
		type="checkbox"
		name="{display}"
		class="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-500 hover:border-gray-600 py-2 ml-4 focus:outline-none focus:border-gray-700"
		placeholder="{display}"
		bind:checked="{value}"
		{...options}
	/>
</div>
