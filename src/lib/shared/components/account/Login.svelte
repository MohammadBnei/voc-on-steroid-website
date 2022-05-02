<script lang="ts" context="module">
	import { handleRes, post } from '$lib/utils/api';
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { toast } from '$lib/shared/ui/components/toast';
	import { loginHistory } from '$stores';
	import { login } from '$lib/core/services/user';

	let identity = '',
		password = '';

	const handleLogin = () => {
		if (!identity || !password) {
			toast.push('Vous devez entrer les deux infromations.');
			return;
		}
		login(identity, password)
			.then(() => {
				goto($loginHistory?.startsWith('/word/') ? $loginHistory : '/');
				$loginHistory = null;
				toast.push('Connexion réussie !');
			})
			.catch();
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
