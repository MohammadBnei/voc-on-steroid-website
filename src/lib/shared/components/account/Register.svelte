<script lang="ts">
	import { goto } from '$app/navigation';

	import { session } from '$app/stores';
	import { toast } from '$lib/shared/ui/components/toast';
	import { handleRes, post } from '$lib/utils/api';
	import { loginHistory } from '$stores';

	let username = '',
		email = '',
		password = '',
		confirmPassword = '';

	$: userInfos = {
		username,
		email,
		password,
		confirmPassword,
	};

	const handleRegister = async () => {
		if (Object.values(userInfos).some((v) => !v)) {
			toast.push('You have to put all informations');
			return;
		}
		const res = await post({ path: 'register', data: userInfos });
		const data = await handleRes(res);
		if (res.ok) {
			toast.push('Successfully logged in.');
			$session.user = data.user;
			goto($loginHistory?.startsWith('/word/') ? $loginHistory : '/');
			$loginHistory = null;
		}
		handleRes(res, 'Auth');
		res.ok && toast.push('Successfully registered. You can now log in.');
	};
</script>

<form on:submit|preventDefault="{handleRegister}">
	<div class="form-control">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Username</span>
		</label>
		<input type="text" class="input input-bordered" bind:value="{username}" required />
	</div>
	<div class="form-control">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Email</span>
		</label>
		<input type="text" class="input input-bordered" bind:value="{email}" required />
	</div>
	<div class="form-control">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Password</span>
		</label>
		<input type="password" class="input input-bordered" bind:value="{password}" required />
	</div>
	<div class="form-control">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Confirm Password</span>
		</label>
		<input type="password" class="input input-bordered" bind:value="{confirmPassword}" required />
	</div>
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit">Register</button>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<a href="#signin" class="label-text-alt link link-hover">Sign in</a>
		</label>
	</div>
</form>
