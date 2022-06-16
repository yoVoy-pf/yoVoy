import { Request, Response, NextFunction } from "express"
import { createFavorite, getAllFavorites, getAllTickets} from "../utils/user"

export const getFavorites = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body 
        const favorites = await getAllFavorites(user.id)

        if(!favorites.length) next({status: 404, message: `Events not found`})
        else res.status(200).json(favorites)

    }catch(error){
        next(error)
    }
}

export const postFavorite = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
        const eventId = req.params.eventId as string

        const favorite = await createFavorite(user.id, eventId)
        
         res.status(201).json(favorite)
    }catch(error){
        next(error)
    }
}

export const getTickets = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
        const tickets = await getAllTickets(user.id)
        
        if(!tickets.length) next({status: 404, message: "Tickets not Found"})
        else res.status(201).json(tickets)
        
    }catch(error){
        next(error)
    }
}

