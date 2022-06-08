import { Request, Response, NextFunction } from "express"
import { getEventsFromDb, getEventsFromDbBySearch, getEventsFromDbByFilter } from '../utils/events'

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search as string
        const filter = req.query.filter as string
        let events;
        if (search) {
            events = await getEventsFromDbBySearch(search.trim())
        } 
        if(filter){
            events = await getEventsFromDbByFilter(filter)
        }
        if(!filter && !search) {
            events = await getEventsFromDb()
        }
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json(error)
    }

}