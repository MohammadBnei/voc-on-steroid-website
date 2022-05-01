import * as api from '$lib/utils/api';
import type { Assoc, Category } from '$lib/models/interfaces/assoc';
import { assocStore, categoryStore } from '$stores';
import type { WordModel } from '$lib/models';

export async function createCateory(name: string): Promise<Assoc> {
	const res = await api.put({ path: 'category', data: { category: name } });
	const data = await api.handleRes(res);

	categoryStore.setList(data.categories ?? []);

	return data as Assoc;
}
export async function removeCateory(category: Category): Promise<Assoc> {
	const res = await api.del({ path: 'category', data: { category: category.name } });
	const data = await api.handleRes(res);

	categoryStore.setList(data.categories ?? []);

	return data as Assoc;
}

export async function assignCategory(word: WordModel, category: Category): Promise<Assoc> {
	const res = await api.put({ path: 'word-category', data: { word: word.word, category: category.name } });
	const data = await api.handleRes(res);

	assocStore.setList(data.words);

	return data as Assoc;
}
export async function unassignCategory(word: WordModel, category: Category): Promise<Assoc> {
	const res = await api.del({ path: 'word-category', data: { word: word.word, category: category.name } });
	const data = await api.handleRes(res);

	assocStore.setList(data.words);

	return data as Assoc;
}
