import * as api from '$lib/utils/api';
import { assocStore } from '$stores';
import { toast } from '$lib/shared/ui/components/toast';

export interface AssocWord {
	id: string;
	created: Date;
}

export async function fetchUserWords(): Promise<AssocWord[]> {
	const res = await api.get({ path: 'assoc/' });
	const data = await api.handleRes(res);
	if (data.words) {
		assocStore.setList(data.words);
	}

	return data.words;
}

export async function addWord(word: string): Promise<null | Response> {
	const res = await api.put({ path: 'assoc', data: { word } });
	const data = (await api.handleRes(res));
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
