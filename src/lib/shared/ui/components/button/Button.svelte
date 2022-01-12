<script lang="ts">
	export let text = '';
	export let className = null;
</script>

<button
	class="{className
		? className
		: 'p-3 text-white rounded-lg border transition duration-500 ease-in-out border-red-500 hover:bg-gray-100 hover:text-white align-items:center min-w-[50px]'}"
	on:click
	{...$$props}
>
	<p class="text-red-500 cursor-pointer inline-flex items-center self-center">
		{text}
	</p>
</button>
