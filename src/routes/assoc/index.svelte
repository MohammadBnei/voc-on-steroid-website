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
		const data = (await handleRes(res, 'Endpoint:Assoc'));

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
	import Assoc from '$lib/shared/ui/components/word/Assoc.svelte';
	import type { AssocWord } from '$entity/assoc/services';

	export let words: AssocWord[] = [];

	$: sortedWords = words.sort((a, b) => a?.word.localeCompare(b.word));

	let search = '';

	$: filteredList = search.length ? sortedWords.filter(({ word }) => word.includes(search)) : sortedWords;
</script>

<div class="flex flex-auto justify-center">
	<Input display="Filter" options="{{ placeholder: '...' }}" bind:value="{search}" />
	<div class="w-52 text-center self-center">{filteredList.length}</div>
</div>
{#each filteredList as word}
	<Assoc {...word} />
{:else}
	<div> No word yet. Go search for some </div>
{/each}
