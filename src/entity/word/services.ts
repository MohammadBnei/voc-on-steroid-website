import { WordListModel, WordModel } from './word.model';
import { get, handleRes } from '$lib/utils/api';
import type { IWord, IWordList } from './iword.interface';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function fetchResemblingWord(input: string): Promise<WordListModel | []> {
	let url = 'api/words/resemblance';
	url += `?value=${input}`;
	const res = await fetch(url);
	const data = (await handleRes(res, 'Words')) as unknown as [IWordList];
	if (!res.ok) {
		return [];
	}
	const resemblingWords = new WordListModel().deserialize(data);
	return resemblingWords;
}

export async function searchWord(word: string, exact = true): Promise<WordModel> {
	let url = 'words';
	url += `?value=${word}${exact ? '' : '&exact=false'}`;
	const res = await get(url);
	const data = await handleRes(res, 'Words');
	if (!res.ok) {
		throw Error(data?.message);
	}
	const wordModel = new WordModel().deserialize(data as unknown as IWord);
	return wordModel;
}
