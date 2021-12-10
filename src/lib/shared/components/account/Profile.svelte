<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import Time from 'svelte-time';
	import Button from '$lib/shared/ui/components/button/Button.svelte';

	export let user;

	if (!$session.user) goto('/');
</script>

<div class="bg-white p-3 shadow-sm rounded-sm">
	<div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
		<span class="text-green-500">
			<svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
			</svg>
		</span>
		<span class="tracking-wide">About</span>
	</div>
	<div class="text-gray-700">
		<div class="grid md:grid-cols-2 text-sm">
			<div class="grid grid-cols-2">
				<div class="px-4 py-2 font-semibold">First Name</div>
				<div class="px-4 py-2">{user.firstName}</div>
			</div>
			<div class="grid grid-cols-2">
				<div class="px-4 py-2 font-semibold">Last Name</div>
				<div class="px-4 py-2">{user.lastName}</div>
			</div>
			<div class="grid grid-cols-2">
				<div class="px-4 py-2 font-semibold">Email.</div>
				<div class="px-4 py-2">
					{user.email}
				</div>
			</div>
			<div class="grid grid-cols-2">
				<div class="px-4 py-2 font-semibold">Created At</div>
				<div class="px-4 py-2"><Time timestamp="{user.created}" format="dddd @ h:mm A · MMMM D, YYYY" /></div>
			</div>
		</div>
	</div>
	<div class="flex justify-center my-2">
		<Button text="Modify" />
	</div>
</div>
