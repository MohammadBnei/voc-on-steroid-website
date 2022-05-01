<script lang="ts">
	import { session } from '$app/stores';
	import { navLinks } from '$lib/utils/config';
	import { createEventDispatcher } from 'svelte';

	export let handleLogin: () => void;
	export let handleLogout: () => void;

	const dispatch = createEventDispatcher();

	const handleClick = (login: boolean) => () => {
		dispatch('clicked');
		login ? handleLogin() : handleLogout();
	};
</script>

{#each navLinks as { href, title, connected }}
	{#if $session.user || !connected}
		<li><a href="{href}" on:click="{() => dispatch('clicked')}" sveltekit:prefetch>{title}</a></li>
	{/if}
{/each}
{#if $session.user}
	<li><button class="btn btn-accent " on:click="{handleClick(false)}">Déconnexion</button></li>
{:else}
	<li><button class="btn btn-primary" on:click="{handleClick(true)}">Connexion</button></li>
{/if}
