<script lang="ts" context="module">
	import { get } from '$lib/utils/api';
	import { handleRes } from '$lib/utils/api';

	export async function load({ session, fetch }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/account/login',
			};
		}

		const res = await fetch('/endpoint/assoc/' + session.user.id);
		const data = await handleRes(res, 'Endpoint:Assoc');

		if (!res.ok) {
			return {
				status: res.status,
			};
		}

		return {
			props: { words: data },
			maxage: 10,
		};
	}
</script>

<script lang="ts">
	import Input from '$lib/shared/ui/components/input/Input.svelte';
	import type { AssocWord } from '$entity/assoc/services';
	import { AssocList } from '$lib/shared/components/assoc';

	export let words: AssocWord[] = [];

	let search = '';

	$: filteredList = search.length ? words.filter(({ word }) => word.includes(search)) : words;
</script>

<div class="flex flex-auto justify-center">
	<Input display="Filter" options="{{ placeholder: '...' }}" bind:value="{search}" />
	<div class="w-52 text-center self-center">{filteredList.length}</div>
</div>
<AssocList words="{filteredList}" />
