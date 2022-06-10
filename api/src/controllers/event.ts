import { Response, Request, NextFunction} from "express";
import utils from "../utils/event"


export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params

    const event = await utils.getEventById(id)

    res.status(200).json(event)
} 

export const postEvent = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const eventCreated = await utils.createEvent(req.body)

        res.status(201).json(eventCreated)
    }catch(error){
        next(error)
    }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params 
        await utils.destroyEvent(id)

        res.status(200).json("Evento Eliminado")
    }catch(error){
        next(error)
    }
}