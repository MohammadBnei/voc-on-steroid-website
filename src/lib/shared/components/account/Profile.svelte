<script lang="ts">
	import { goto } from '$app/navigation';

	import { session } from '$app/stores';

	import type { User } from '$lib/models';

	export let user: User;

	session.subscribe(({ user }) => !user && goto('/'));
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Informations du compte</h2>
		<div class="stats stats-vertical lg:stats-horizontal shadow">
			<div class="stat">
				<div class="stat-desc">Email</div>
				<div class="stat-title">{user.email}</div>
			</div>
			<div class="stat">
				<div class="stat-desc">Identifiant</div>
				<div class="stat-title">{user.username}</div>
			</div>
			<div class="stat">
				<div class="stat-desc">Création</div>
				<div class="stat-title">{user.createdAt.toLocaleString()}</div>
			</div>
		</div>
	</div>
</div>
