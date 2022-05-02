<script lang="ts">
	import { createCateory } from '$lib/core/services/category';
	import { onMount } from 'svelte';

	export let handleCreate: (name: string) => void = createCateory;
	let catName: string;
	let id: string;
	let validate: HTMLElement;

	onMount(() => (id = Date.now().toString()));

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') validate.click();
	};

	const handleClick = () => {
		handleCreate(catName);
		catName = '';
	};
</script>

<label for="{id}" class="btn btn-ghost btn-circle modal-button"> <span class="text-2xl">🆕</span></label>

<input type="checkbox" id="{id}" class="modal-toggle" />
<label for="{id}" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box relative">
		<label for="{id}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<input
			type="text"
			placeholder="Nom de la catégorie"
			bind:value="{catName}"
			class="input input-bordered"
			on:keyup="{handleKeyPress}"
		/>
		{#if catName}
			<div class="modal-action">
				<label for="{id}" class="btn btn-primary" on:click="{handleClick}" bind:this="{validate}">Créer</label>
			</div>
		{/if}
	</div>
</label>
