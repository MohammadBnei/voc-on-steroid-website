import * as api from '$lib/utils/api';
import { assocStore, categoryStore } from '$stores';
import { toast } from '$lib/shared/ui/components/toast';
import type { AssocWord } from '$lib/models/interfaces/assoc';

export const addAssocHelper = (words: AssocWord[], word: string) => {
	const newA = words?.find(({ id }) => id === word);

	newA && assocStore.addWord(newA);
};

export async function fetchUserWords(): Promise<AssocWord[]> {
	const res = await api.get({ path: 'assoc/' });
	const data = await api.handleRes(res);

	if (res.ok) {
		assocStore.setList(data.words);
		categoryStore.setList(data.categories);
		
		return data.words;
	}
}

export async function addWord(word: string): Promise<null | Response> {
	const res = await api.put({ path: 'assoc', data: { word } });
	const data = await api.handleRes(res);
	if (res.ok) {
		addAssocHelper(data.words, word);
		toast.push(`Successfully added ${word}`);
		return null;
	}
}

export async function removeWord(word: string): Promise<void> {
	const res = await api.del({ path: `assoc`, data: { word } });
	api.handleRes(res);
	if (res.ok) {
		assocStore.removeWord(word);
		toast.push(`Successfully removed ${word}`);
	}
}
