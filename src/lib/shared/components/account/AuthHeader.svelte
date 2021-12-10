<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from '$lib/shared/ui/components/toast';
	import { session } from '$app/stores';
	import Button from '$lib/shared/ui/components/button/Button.svelte';
	import { get } from '$lib/utils/api';

	const logout = async () => {
		const res = await get('logout');

		if (res.ok) {
			$session.user = null;
			toast.push('Successfully logged out.');
		}
	};
</script>

{#if $session.user}
	<Button text="Logout" on:click="{logout}" />
{:else}
	<Button text="Login" on:click="{() => goto('/account')}" />
{/if}
