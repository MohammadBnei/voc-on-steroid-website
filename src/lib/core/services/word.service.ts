import type { IWord, IWordList } from '$lib/models';
import { WordListModel, WordModel } from '$lib/models/word.model';
import { get, handleRes } from '$lib/utils/api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function fetchResemblingWord(input: string): Promise<WordListModel> {
	const res = await get({ path: 'resemblance/' + encodeURI(input) });
	const data = (await handleRes(res, 'Words')) as unknown as [IWordList];
	if (!res.ok) {
		return [] as WordListModel;
	}
	const resemblingWords = new WordListModel().deserialize(data);
	return resemblingWords;
}

export async function getWord(word: string): Promise<WordModel> {
	const res = await get({ path: `word/${word}` });
	const data = await handleRes(res, 'Words');
	if (res.ok) {
		const wordModel = new WordModel().deserialize(data.word as unknown as IWord);
		return wordModel;
	}
}
