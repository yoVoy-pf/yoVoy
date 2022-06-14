export interface Event {
	id: string;
	name: string;
	description?: string;
	background_image: string;
	organization: Organization;
	categories: Category[];
	locations: Location[];
}


export interface postCategory{
  name: string;
}

export interface postOrganization{
	name: string;
  }

export interface putEvent {
  name: string;
  description: string;
  background_image: string;
  categoriesIds: number[];
  locations: putLocation[]
}

export interface putLocation {
  id: number;
  dates: any[];
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

export interface Filter {
	filter: string;
	id: string | number;
}