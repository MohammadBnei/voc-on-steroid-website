import * as api from '$lib/utils/api';
import { assocStore } from '$stores';
import { toast } from '$lib/shared/ui/components/toast';

export interface AssocWord {
	word: string;
	created: Date;
}

export async function fetchUserWords(userId: string): Promise<AssocWord[]> {
	const res = await api.get({ path: 'assoc/' + userId });
	const data = (await api.handleRes(res)) as unknown as AssocWord[];
	assocStore.setList(data);

	return data;
}

export async function addWord(word: string): Promise<null | Response> {
	const res = await api.post({ path: 'assoc', data: { word } });
	const data = (await api.handleRes(res)) as unknown as AssocWord;
	if (res.ok) {
		assocStore.addWord(data);
		toast.push(`Successfully added ${word}`);
		return null;
	}
}

export async function removeWord(word: string): Promise<null | Response> {
	const res = await api.del({ path: `assoc?word=${word}` });
	api.handleRes(res);
	if (res.ok) {
		assocStore.removeWord(word);
		toast.push(`Successfully removed ${word}`);
	}

	return null;
}
