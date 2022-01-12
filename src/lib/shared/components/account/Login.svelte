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

	let email = '',
		password = '';

	const handleLogin = async () => {
		if (!email || !password) {
			toast.push('You have to type your email AND password');
			return;
		}
		const res = await post({ path: 'login', data: { email, password } });
		const data = await handleRes(res);
		if (res.ok) {
			toast.push('Successfully logged in.');
			$session.user = data;
			fetchUserWords(data.id);
			goto('/');
		}
	};
</script>

<form on:submit|preventDefault="{handleLogin}">
	<div class="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
		<div class="rounded-md bg-white w-full max-w-sm sm:max-w-md border border-gray-500 shadow-md px-4 py-6 sm:p-8">
			<div class="text-sm sm:text-base text-gray-600 my-4">Log In</div>
			<Input display="Email adress" bind:value="{email}" options="{{ type: 'email', required: 'true' }}" />
			<Input display="Password" bind:value="{password}" options="{{ type: 'password', required: 'true' }}" />

			<div class="flex w-full mt-6 justify-center items-center gap-3">
				<Button text="Login" type="submit" name="login"/>
				<!-- <a href="/account/register" class="rounded-lg hover:shadow-md p-3">Create an account</a> -->
			</div>
		</div>
	</div>
</form>
