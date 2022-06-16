import { Response, Request, NextFunction } from "express";
import { getAllTickets } from "../utils/tickets"

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const tickets = await getAllTickets()
        
        if(!tickets.length) next({status: 404, message: "Tickets not found"})
        else res.status(200).json(tickets)

    }catch(error){
        next(error)
    }

}
