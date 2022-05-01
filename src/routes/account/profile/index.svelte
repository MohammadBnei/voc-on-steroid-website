<script lang="ts" context="module">
	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/account',
			};
		}

		return {
			props: { user: session.user },
		};
	}
</script>

<script lang="ts">
	import type { User } from '$lib/models';
	import { Profile } from '$lib/shared/components/account';

	export let user: User;
</script>

<div class="hero min-h-screen bg-base-200 justify-center items-start">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<Profile user="{user}" />
	</div>
</div>
