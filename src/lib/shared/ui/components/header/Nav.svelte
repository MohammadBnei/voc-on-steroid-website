<script lang="ts">
	import { session } from '$app/stores';
	import { navLinks } from '$lib/utils/config';

	export let handleLogin: () => void;
	export let handleLogout: () => void;
</script>

{#each navLinks as { href, title, connected }}
	{#if $session.user || !connected}
		<li><a href="{href}">{title}</a></li>
	{/if}
{/each}
{#if $session.user}
	<li><button class="btn btn-secondary " on:click="{handleLogout}">Logout</button></li>
{:else}
	<li><button class="btn btn-primary" on:click="{handleLogin}">Login</button></li>
{/if}
