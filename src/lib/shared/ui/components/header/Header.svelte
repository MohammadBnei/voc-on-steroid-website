<script lang="ts">
	import { browser } from '$app/env';

	import Nav from './Nav.svelte';

	export let title = 'Voc On Steroid';

	export let handleLogin: () => void;
	export let handleLogout: () => void;

	let drawerToggle = false;

	const closeDrawer = () => (drawerToggle = false);

	let currentTheme: string;

	$: if (browser && currentTheme) document.documentElement.setAttribute('data-theme', currentTheme);

	if (browser)
		currentTheme =
			localStorage.getItem('theme') ??
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'forest' : 'garden');

	const switchTheme = () => {
		if (currentTheme === 'garden') {
			currentTheme = 'forest';
		} else {
			currentTheme = 'garden';
		}
		localStorage.setItem('theme', currentTheme);
	};
</script>

<div class="drawer stop-scroll-side">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked="{drawerToggle}" />
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
			<div class="flex-1 px-2 mx-2 hidden lg:block"><a href="/" sveltekit:prefetch on:click="{closeDrawer}">{title}</a></div>
			<label class="swap swap-rotate hidden lg:inline-grid">
				<input type="checkbox" checked="{currentTheme === 'garden'}" on:change="{switchTheme}" />
				<span class="swap-on ">🌞</span>
				<span class="swap-off ">🌚</span>
			</label>
			<slot name="search" />
			<div class="flex-none hidden lg:block">
				<ul class="menu menu-horizontal">
					<Nav handleLogin="{handleLogin}" handleLogout="{handleLogout}" on:clicked="{closeDrawer}" />
				</ul>
			</div>
		</div>
		<slot name="content" />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay"></label>
		<ul class="menu p-4 overflow-y-auto w-52 bg-base-100">
			<li><a href="/" sveltekit:prefetch on:click="{closeDrawer}">{title}</a></li>
			<label class="swap swap-rotate">
				<input type="checkbox" checked="{currentTheme === 'garden'}" on:change="{switchTheme}" />
				<span class="swap-on">🌞</span>
				<span class="swap-off">🌚</span>
			</label>
			<Nav handleLogin="{handleLogin}" handleLogout="{handleLogout}" on:clicked="{closeDrawer}" />
		</ul>
	</div>
</div>
