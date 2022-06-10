export interface Event {
	id: string;
	name: string;
	description?: string;
	background_image: string;
	organization: Organization;
	categories: Category[];
	locations: Location[];
}

export interface Organization {
	id: string;
	name: string;
}

export interface Category {
	id: number;
	name: string;
}

export interface Location {
	id: number;
	name: string;
	address: string;
	map: string;
	city: City;
	dates: Dates[];
}
export interface City {
	id: number;
	name: string;
}

export interface Dates {
	id: number;
	date: Date;
	price: number;
}

export interface User {
	name: string;
	email: string;
	rolesId: number[];
}

export enum ROLES_LIST {
	Admin = 3030,
	Organization = 2020,
	User = 1010,
}
