export type Movie = {
	id?: number;
	title?: string;
	summary?: string;
	videoUrl?: string;
	coverImageUrl?: string;
	numberOfStreams?: number;
	genres?: string[];
	mainCasts?: string[];
	releaseYear?: string;
	countryOfOrigin?: string;
	savedBy?: User[];
	watchedBy?: User[];
};

export type User = {
	id?: number;
	username?: string;
	role?: string;
	watchList?: Movie[];
	watchHistory?: Movie[];
};
