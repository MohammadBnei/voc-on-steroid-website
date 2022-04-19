export interface IWord {
	word: string;
	lang: string;
	types: ITypes[];
	etymologies: string[];
}

export interface ITypes {
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