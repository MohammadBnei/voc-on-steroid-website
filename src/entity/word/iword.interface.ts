export interface IWord {
	word: string;
	lang: string;
	results: IResult[];
	etymologies: string[];
}

export interface IResult {
	type: string;
	definitions: IDefinition[];
}

export interface IDefinition {
	definition: string;
	examples: string[];
}

export interface IWordList {
	key: string;
	title: string
}