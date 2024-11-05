export interface HeroResponse {
	pageNumber: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
	content: Hero[];
}

export interface Hero {
	id: string;
	superhero: string;
	publisher: Publisher;
	alterEgo: string;
	firstApparence: string;
	characters: string;
}

export enum Publisher {
	DCComics = 'DC Comics',
	MarvelComics = 'Marvel Comics',
}
