import type { AssocWord } from '$entity/assoc/services';
import { writable } from 'svelte/store';

export const isDev = writable(process.env.NODE_ENV === 'development');

export const isFetching = writable(false);

export const currentWord = writable<string | null>(null);

const createAssocStore = () => {
	const { subscribe, update, set } = writable<AssocWord[]>([]);

	const updateList = (words: AssocWord[]) => update((list) => [...words, ...list]);
	const addWord = (word: AssocWord) => update((list) => [word, ...list]);
	const removeWord = (word: string) => update((list) => list.filter((v) => v.id !== word));
	const setList = (words: AssocWord[]) => set([...words]);

	return {
		subscribe,
		updateList,
		addWord,
		removeWord,
		setList,
	};
};

export const loginHistory = writable<string>(null);

export const assocStore = createAssocStore();
export const headerHeight = writable(0);
