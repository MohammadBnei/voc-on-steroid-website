export interface Category {
	name: string;
	createdAt: Date;
}
export interface AssocWord {
	id: string;
	createdAt: Date;
	categories?: string[];
}

export interface Assoc {
	userId: string;
	categories: Category[];
	words: AssocWord[];
}
