import { Request, Response, NextFunction } from "express"
import { createFavorite, getAllFavorites, getAllTickets, updateUserRole, destroyFavorite, getTicketById, resetUserPassword, getUserInformation} from "../utils/user"

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

export const deleteFavorite = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
        const {eventId} = req.params

        const favorite = await destroyFavorite(user.id, eventId)
        
         res.status(200).json(favorite)
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

export const putUserRole = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {userId, roleId} = req.body
        
        const user = await updateUserRole(userId, roleId)

        res.status(201).json(user)
    }catch(error){
        next(error)
    }
}

export const getTicket = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
        const {ticketId} = req.params
        
        const ticket = await getTicketById(ticketId, user.id)

        if(!ticket)next({status:404, message: "Ticket not found"})
        else res.status(200).json(ticket)
    }catch(error){
        next(error)
    }
}

export const resetPassword = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {userId}= req.body
        
        await resetUserPassword(userId)

        res.status(200).json("password has reset succesfully")
    }catch(error){
        next(error)
    }
}

export const getUserProfile = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user}= req.body
        
        const userProfile = await getUserInformation(user.id)

        res.status(200).json(userProfile)
    }catch(error){
        next(error)
    }
}

