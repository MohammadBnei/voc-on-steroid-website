import * as api from '$lib/utils/api';
import { assocStore, categoryStore } from '$stores';
import { toast } from '$lib/shared/ui/components/toast';
import type { AssocWord } from '$lib/models/interfaces/assoc';

export async function fetchUserWords(): Promise<AssocWord[]> {
	const res = await api.get({ path: 'assoc/' });
	const data = await api.handleRes(res);

	data.words && assocStore.setList(data.words);
	data.categories && categoryStore.setList(data.categories);


	return data.words;
}

export async function addWord(word: string): Promise<null | Response> {
	const res = await api.put({ path: 'assoc', data: { word } });
	const data = await api.handleRes(res);
	if (res.ok) {
		assocStore.setList(data.words);
		toast.push(`Successfully added ${word}`);
		return null;
	}
}

export async function removeWord(word: string): Promise<null | Response> {
	const res = await api.del({ path: `assoc`, data: { word } });
	api.handleRes(res);
	if (res.ok) {
		assocStore.removeWord(word);
		toast.push(`Successfully removed ${word}`);
	}

	return null;
}
