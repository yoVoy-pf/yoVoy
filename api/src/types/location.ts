import { iCity } from "./City";

export interface iLocation {
	id: number;
	name: string;
	address: string;
	map: string;
	city?: iCity;
}
