<script lang="ts" context="module">
	import { handleRes, post } from '$lib/utils/api';
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { toast } from '$lib/shared/ui/components/toast';
	import { loginHistory } from '$stores';

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
			goto($loginHistory?.startsWith('/word/') ? $loginHistory : '/');
			$loginHistory = null;
		}
	};
</script>

<form on:submit|preventDefault="{handleLogin}">
	<div class="form-control">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Username / Email</span>
		</label>
		<input type="text" placeholder="email" class="input input-bordered" bind:value="{identity}" />
	</div>
	<div class="form-control">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">Password</span>
		</label>
		<input type="password" placeholder="password" class="input input-bordered" bind:value="{password}" />
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<!-- <label class="label">
			<a href="#" class="label-text-alt link link-hover">Forgot password?</a>
		</label> -->
	</div>
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit">Login</button>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<a href="#register" class="label-text-alt link link-hover">Sign up</a>
		</label>
	</div>
</form>
