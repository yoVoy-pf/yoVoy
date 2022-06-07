import { Router, Response, Request, NextFunction } from "express"
import { getEventsFromDb, getEventsFromDbBySearch } from '../utils/utilsEvents'


export const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {

   const search = req.query.search as string
   let events;
   if (search) {
      events = getEventsFromDbBySearch(search.trim())
   } else {
      events = getEventsFromDb()
   }
   res.status(200).json(search)
})


