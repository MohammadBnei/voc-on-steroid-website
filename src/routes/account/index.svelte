<script lang="ts" context="module">
	export async function load({ fetch, session }) {
		if (session.user) {
			return { redirect: '/', status: 302 };
		}
		try {
			await fetch('/sitemap.xml');

			return true;
		} catch (error) {
			console.error(error);
		}
	}
</script>

<script lang="ts">
	import { Login, Register } from '$lib/shared/components/account';
</script>

<section>
	<div class="grid grid-cols-2 grid-rows-1">
		<Login />
		<Register />
	</div>
</section>
