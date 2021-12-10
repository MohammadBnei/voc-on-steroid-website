import type { AssocWord } from '$entity/assoc/services';
import { writable } from 'svelte/store';

const createAssocStore = () => {
	const { subscribe, update, set } = writable<AssocWord[]>([]);

	const updateList = (words: AssocWord[]) => update((list) => [...words, ...list]);
	const addWord = (word: AssocWord) => update((list) => [word, ...list]);
	const removeWord = (word: string) => update((list) => list.filter((v) => v.word !== word));
	const setList = (words: AssocWord[]) => set([...words]);

	return {
		subscribe,
		updateList,
		addWord,
		removeWord,
		setList,
	};
};

export const assocStore = createAssocStore();
