import { iDate } from "./date"
import { iOrganization } from "./organization"
import { iCategory } from "./category"
import { iLocation } from "./location"

export interface iEvent {
	id: string;
	name: string;
	background_image: string;
	description?: string;
	dates?: iDate[];
	organization?: iOrganization;
	categories?: iCategory[];
	location?: iLocation[];
}