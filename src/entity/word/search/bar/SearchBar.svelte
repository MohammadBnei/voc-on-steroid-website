<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { prefetch } from '$app/navigation';
	import { debounce } from 'ts-debounce';

	const dispatch = createEventDispatcher();
	export let listId: string;

	let input = '';
	const handleType = debounce(() => {
		dispatch('type', {
			input,
		});
		prefetch('/words/' + input);
	}, 300);

	$: input && handleType();

	const search = () => {
		input = '';
		dispatch('search', { input });
	};
</script>

<form on:submit|preventDefault="{search}">
	<div class="flex justify-center items-center ">
		<input
			bind:value="{input}"
			list="{listId}"
			type="text"
			class=" h-14 pl-10 rounded-lg  focus:shadow outline-none focus:outline-none border-1 border-red-500"
			placeholder="Search for words..."
			on:change="{search}"
		/>
		<button
			class="h-14 w-14 ml-2 text-white rounded-lg bg-red-500 hover:bg-red-600 align-items:center"
			type="submit"
		>
			<div class="pl-3.5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
			</div>
		</button>
	</div>
</form>
