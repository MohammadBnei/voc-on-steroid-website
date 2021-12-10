import type { WordListModel } from '$lib/models/classes';
import { writable } from 'svelte/store';

const SearchStore = () => {
    const { update, subscribe } = writable<WordListModel>(null);
};