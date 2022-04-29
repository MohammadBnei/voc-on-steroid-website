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
			d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
		></path>
	</svg>
</label>
