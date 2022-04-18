<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from '$lib/shared/ui/components/toast';
	import { page, session } from '$app/stores';
	import Button from '$lib/shared/ui/components/button/Button.svelte';
	import { get } from '$lib/utils/api';
	import { loginHistory } from '$stores';

	const logout = async () => {
		const res = await get({ path: 'logout' });

		if (res.ok) {
			$session.user = null;
			toast.push('Successfully logged out.');
		}
	};

	const goToLogin = () => {
		console.log({ page: $page });
		$loginHistory = $page.url.pathname;
		goto('/account');
	};
</script>

{#if $session.user}
	<Button text="Logout" on:click="{logout}" />
{:else}
	<Button text="Login" on:click="{goToLogin}" />
{/if}
