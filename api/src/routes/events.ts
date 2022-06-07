
import {Router, Response, Request } from "express"
import {getEventsFromDb} from '../controllers/eventsController'


const routes = Router()

routes.get('/', (req: Request, res: Response) =>{
   res.status(200).send("prueba")
})

routes.get('/', (req: Request, res: Response) =>{
   const {search} = req.query 

})


export default routes