<script lang="ts">
	export let savedWord: boolean;

	export let handleAddWord: () => void;
	export let handleRemoveWord: () => void;
</script>

<label class="swap swap-rotate">
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" checked="{!savedWord}" on:change="{savedWord ? handleRemoveWord : handleAddWord}" />

	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="swap-on w-10 h-10"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
		></path>
	</svg>

	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="swap-off w-10 h-10"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
		></path>
	</svg>

</label>
