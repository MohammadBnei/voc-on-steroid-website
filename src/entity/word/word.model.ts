import type { IResult, IWord, IWordList } from './iword.interface';
import type { IDeserializable } from '$models/interfaces/ideserializable.interface';

export class WordModel implements IDeserializable<IWord>, IWord {
	public word: string;
	public lang: string;
	public results: IResult[];
	public etymologies: string[];

	deserialize(input: IWord): this {
		Object.assign(this, input);
		return this;
	}
}

export class WordListModel extends Array implements IDeserializable<Array<IWordList>>, Array<IWordList> {
	public key: string;
	public title: string;

	deserialize(input: [IWordList]): this {
		input.map(v => this.push({ ...v }));
		return this;
	}
}


