import { Request, Response, NextFunction } from "express"
import { getEventsFromDb, getEventsFromDbBySearch } from '../utils/utilsEvents'

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search as string
        let events;
        let prueba;
        if (search) {
            events = await getEventsFromDbBySearch(search.trim())
        } else {
            events = await getEventsFromDb()
        }
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json(error)
    }

}