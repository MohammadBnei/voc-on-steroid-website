import { writable } from 'svelte/store';
import type { AssocWord } from '$lib/core/services/assoc.service';

export const isDev = writable(process.env.NODE_ENV === 'development');

const createIsFetching = () => {
	const { subscribe, update } = writable<Array<string>>([]);

	const addFetching = () => {
		const id = Date.now().toString();
		update((a) => [...a, id]);
		return id;
	};

	const removeFetching = (id: string) => {
		update((a) => a.filter((v) => v !== id));
	};

	return {
		subscribe,
		addFetching,
		removeFetching,
	};
};

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

export const headerHeight = writable(0);

export const assocStore = createAssocStore();

export const isFetching = createIsFetching();
