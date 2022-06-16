import { Request, Response, NextFunction } from 'express';
import {
	getEventsFromDb,
	getEventsFromDbBySearch,
	getEventsFromDbByFilter,
} from '../utils/events';

export const getEvents = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const search = req.query.search as string;
		const category = req.query.category as string;
		const location = req.query.location as string;
		const city = req.query.city as string;
		const organization = req.query.organization as string;
		const name = req.query.name as string;
		let events;
		if (search) events = await getEventsFromDbBySearch(search.trim());
		else if (category || location || organization || city || name)
			events = await getEventsFromDbByFilter(
				category,
				location,
				organization,
				city,
				name,
			);
		else events = await getEventsFromDb();

		if (!events.length) next({ status: 404, message: `Event/s not found` });
		else res.status(200).json(events);
	} catch (error) {
		next(error);
	}
};
