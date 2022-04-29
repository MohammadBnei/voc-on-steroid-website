<script lang="ts">
	import { session } from '$app/stores';
	import { navLinks } from '$lib/utils/config';

	export let handleLogin: () => void;
	export let handleLogout: () => void;
</script>

{#each navLinks as { href, title, connected }}
	{#if $session.user || connected === undefined}
		<li><a href="{href}">{title}</a></li>
	{/if}
{/each}
{#if $session.user}
	<li><button class="btn btn-active btn-secondary " on:click="{handleLogout}">Logout</button></li>
{:else}
	<li><button class="btn btn-active btn-primary" on:click="{handleLogin}">Login</button></li>
{/if}
