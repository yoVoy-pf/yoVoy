import { Request, Response, NextFunction } from "express"
import { getEventsFromDb, getEventsFromDbBySearch, getEventsFromDbByFilter } from '../utils/events'

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search as string
        const category = req.query.category as string
        const location = req.query.location as string
        let events;
        console.log(category, location)
        if (search) {
            events = await getEventsFromDbBySearch(search.trim())
        } 
        if(category || location ){
            events = await getEventsFromDbByFilter(category,location)
        }
        if(!category && !search && !location) {
            events = await getEventsFromDb()
        }
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json(error)
    }

}