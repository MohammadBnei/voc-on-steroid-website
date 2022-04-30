<script lang="ts" context="module">
	export async function load({ session }) {
		if (session.user) {
			return { redirect: '/', status: 302 };
		}

		return {};
	}
</script>

<script lang="ts">
	import { Login, Register } from '$lib/shared/components/account';
</script>

<div class="hero min-h-screen bg-base-200" id="signin">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Login now!</h1>
			<p class="py-6"
				>Log in to your account so you can add words to your personnal list and gain tremendous vocabulary !</p
			>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<Login />
			</div>
		</div>
	</div>
</div>
<div class="hero min-h-screen bg-base-200" id="register">
	<div class="hero-content flex-col lg:flex-row">
		<div class="text-center lg:text-left flex-shrink-0">
			<h1 class="text-5xl font-bold">Register now!</h1>
			<p class="py-6"
				>Quickly create an account, and start using this app to the max !</p
			>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<Register />
			</div>
		</div>
	</div>
</div>
