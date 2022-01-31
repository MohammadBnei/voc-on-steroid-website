<script lang="ts">
	import Button from '$lib/shared/ui/components/button/Button.svelte';
	import Checkbox from '$lib/shared/ui/components/checkbox/Checkbox.svelte';
	import Input from '$lib/shared/ui/components/input/Input.svelte';
	import { toast } from '$lib/shared/ui/components/toast';
	import { handleRes, post } from '$lib/utils/api';

	let username = '',
		email = '',
		password = '',
		confirmPassword = '';
	let acceptTerms = false;
	$: userInfos = {
		username,
		email,
		password,
		confirmPassword,
		acceptTerms,
	};

	const handleRegister = async () => {
		if (Object.values(userInfos).some((v) => !v)) {
			toast.push('You have to type all informations and accept the terms');
			return;
		}
		const res = await post({ path: 'register', data: userInfos });
		handleRes(res, 'Auth');
		res.ok && toast.push('Successfully registered. You can now log in.');
	};
</script>

<form on:submit|preventDefault="{handleRegister}">
	<div class="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
		<div class="rounded-md bg-white w-full max-w-sm sm:max-w-md border border-gray-500 shadow-md px-4 py-6 sm:p-8">
			<div class="text-sm sm:text-base text-gray-600 my-4">Register</div>
			<Input display="Username" bind:value="{username}" />
			<Input display="Email adress" bind:value="{email}" options="{{ type: 'email', required: true }}" />
			<Input display="Password" bind:value="{password}" options="{{ type: 'password', required: true }}" />
			<Input
				display="Confirm Password"
				bind:value="{confirmPassword}"
				options="{{ type: 'password', required: true }}"
			/>
			<Checkbox display="Accept terms" bind:value="{acceptTerms}" />

			<div class="flex w-full mt-6 justify-center items-center gap-3">
				<Button text="Register" type="submit" />
				<!-- <a href="/account" class="rounded-lg hover:shadow-md p-3">Log in to your account</a> -->
			</div>
		</div>
	</div>
</form>
