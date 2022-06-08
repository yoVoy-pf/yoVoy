export interface Event {
	id: string;
	name: string;
	description?: string;
	background_image: string;
	dates: Dates[];
}

export interface Dates {
	id: number;
	date: Date;
	price: number;
	location: Location;
}

export interface Location {
	id: number;
	name: string;
	address: string;
}

export interface Category {
	name: string;
}
