<script lang="ts" context="module">
	import Button from '$lib/shared/ui/components/button/Button.svelte';
	import Input from '$lib/shared/ui/components/input/Input.svelte';
	import { handleRes, post } from '$lib/utils/api';
	import { fetchUserWords } from '$entity/assoc/services';
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import { session } from '$app/stores';

	import { toast } from '$lib/shared/ui/components/toast';

	let identity = '',
		password = '';

	const handleLogin = async () => {
		if (!identity || !password) {
			toast.push('You have to type your email/username AND password');
			return;
		}
		const res = await post({ path: 'login', data: { identity, password } });
		const data = await handleRes(res);
		if (res.ok) {
			toast.push('Successfully logged in.');
			$session.user = data.user;
			fetchUserWords();
			goto('/');
		}
	};
</script>

<form on:submit|preventDefault="{handleLogin}">
	<div class="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
		<div class="rounded-md bg-white w-full max-w-sm sm:max-w-md border border-gray-500 shadow-md px-4 py-6 sm:p-8">
			<div class="text-sm sm:text-base text-gray-600 my-4">Log In</div>
			<Input display="Username / Email" bind:value="{identity}" options="{{ required: 'true' }}" />
			<Input display="Password" bind:value="{password}" options="{{ type: 'password', required: 'true' }}" />

			<div class="flex w-full mt-6 justify-center items-center gap-3">
				<Button text="Login" type="submit" />
			</div>
		</div>
	</div>
</form>
