import type { IWord, IWordList } from '$lib/models';
import { WordListModel, WordModel } from '$lib/models/word.model';
import { get, handleRes } from '$lib/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function fetchResemblingWord(input: string): Promise<WordListModel> {
	let url = 'resemblance';
	url += `?term=${input.toLocaleLowerCase()}`;
	const res = await get({ path: url });
	const data = (await handleRes(res, 'Words')) as unknown as [IWordList];
	if (!res.ok) {
		return [] as WordListModel;
	}
	const resemblingWords = new WordListModel().deserialize(data);
	return resemblingWords;
}

export async function searchWord(word: string, exact = true): Promise<WordModel> {
	let url = 'words';
	url += `?term=${word}${exact ? '' : '&exact=false'}`;
	const res = await get({ path: url });
	const data = await handleRes(res, 'Words');
	if (!res.ok) {
		throw Error(data?.message);
	}
	const wordModel = new WordModel().deserialize(data.word as unknown as IWord);
	return wordModel;
}
