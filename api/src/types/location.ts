import { iCity } from "./city";

export interface iLocation {
	id: number;
	name: string;
	address: string;
	map: string;
	city?: iCity;
}
