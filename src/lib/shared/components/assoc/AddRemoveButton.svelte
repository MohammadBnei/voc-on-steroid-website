<script lang="ts">
	export let savedWord: boolean;

	export let handleAddWord: () => void;
	export let handleRemoveWord: () => void;
</script>

<label class="swap swap-rotate">
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" checked="{!savedWord}" on:change="{savedWord ? handleRemoveWord : handleAddWord}" />

	<div class="tooltip tooltip-left swap-on " data-tip="Sauvegarder ce mot">
		<span class="btn btn-circle btn-ghost font-normal capitalize  text-2xl">💾</span>
	</div>
	<div class="tooltip tooltip-left swap-off" data-tip="Retirer ce mot de votre liste">
		<span class="btn btn-circle btn-ghost font-normal capitalize text-2xl">❌</span>
	</div>
</label>
