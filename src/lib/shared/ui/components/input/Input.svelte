<script lang="ts">
	export let value = '';
	export let display = '';
	export let options: Record<string, string | boolean> = {};
</script>

<div class="flex flex-col mb-4">
	{#if display}
		<label for="{display}" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">{display} :</label>
	{/if}
	<input
		id="{display}"
		type="text"
		name="{display}"
		class="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-500 hover:border-gray-600 py-2 focus:outline-none focus:border-gray-700"
		placeholder="{options.placeholder || display}"
		bind:value
		{...options}
	/>
</div>
