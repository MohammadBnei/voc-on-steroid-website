<script lang="ts">
	import Nav from './Nav.svelte';

	export let title = 'Voc On Steroid';

	export let handleLogin: () => void;
	export let handleLogout: () => void;
</script>

<div class="drawer stop-scroll-side">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="my-drawer-3" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"></path></svg
					>
				</label>
			</div>
			<div class="flex-1 px-2 mx-2"><a href="/">{title}</a></div>
			<slot name="search" />
			<div class="flex-none hidden lg:block">
				<ul class="menu menu-horizontal">
					<Nav handleLogin="{handleLogin}" handleLogout="{handleLogout}" />
				</ul>
			</div>
		</div>
		<slot name="content" />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay"></label>
		<ul class="menu p-4 overflow-y-auto w-44 bg-base-100">
			<Nav handleLogin="{handleLogin}" handleLogout="{handleLogout}" />
		</ul>
	</div>
</div>

<!-- 
	<header class="text-gray-600 body-font stop-scroll-side">
	<div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
		<a sveltekit:prefetch class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
			<span class="ml-3 text-xl">{title}</span>
		</a>
		<nav
			class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center"
		>
			{#if $session.user}
				<a sveltekit:prefetch class="mr-5 hover:text-gray-900" href="/account/profile">Account</a>
				<a sveltekit:prefetch class="mr-5 hover:text-gray-900" href="/assoc">Your Words</a>
				{/if}
				<a sveltekit:prefetch class="mr-5 hover:text-gray-900" href="/about">About</a>
		</nav>
	</div>
</header>
 -->
