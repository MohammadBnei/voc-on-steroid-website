<script lang="ts" context="module">
	import { LoggerUtils } from '$lib/utils';
	import * as api from '$lib/utils/api';

	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/account',
			};
		}

		try {
			return {
				props: { user: session.user },
			};
		} catch (error) {
			LoggerUtils.getInstance('Profile').error(error);
			return {
				status: '500',
				error,
			};
		}
	}
</script>

<script lang="ts">
	import { Profile } from '$lib/shared/components/account';

	export let user;
</script>

<Profile user="{user}" />
