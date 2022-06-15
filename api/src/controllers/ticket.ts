import { Response, Request, NextFunction } from "express";
import { getTicketFromDb, updateTicket} from "../utils/ticket"

export const getTicket = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const ticket = await getTicketFromDb(id)

        res.status(200).json(ticket)
    }catch(error){
        next(error)
    }
} 

export const putTicket = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {preferenceId, paymentId} = req.body
        const ticket = await updateTicket(preferenceId, paymentId)

        res.status(200).json(ticket)
    }catch(error){
        next(error)
    }
} 
