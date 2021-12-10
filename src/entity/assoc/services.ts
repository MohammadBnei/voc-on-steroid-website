import * as api from '$lib/utils/api';
import { assocStore } from '$lib/utils/stores';
import { toast } from '$lib/shared/ui/components/toast';

export interface AssocWord {
	word: string;
	created: Date;
}

const assocUrl = 'assoc/';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function fetchUserWords(userId: string): Promise<AssocWord[]> {
	const res = await api.get(assocUrl + userId);
	const data = (await api.handleRes(res)) as unknown as AssocWord[];
	assocStore.setList(data);

	return data;
}

export async function addWord(word: string): Promise<null | Response> {
	const res = await api.post('assoc', {
		word,
	});
	const data = (await api.handleRes(res)) as unknown as AssocWord;
	if (res.ok) {
		assocStore.addWord(data);
		toast.push(`Successfully added ${word}`);
		return null;
	}
}

export async function removeWord(word: string): Promise<null | Response> {
	const res = await api.del(`assoc?word=${word}`);
	api.handleRes(res);
	if (res.ok) {
		assocStore.removeWord(word);
		toast.push(`Successfully removed ${word}`);
	}

	return null;
}
