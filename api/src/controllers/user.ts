import { Request, Response, NextFunction } from "express"
import { createFavorite, getAllFavorites} from "../utils/user"

export const getFavorites = async (req: Request,res: Response,next:NextFunction) =>{
    try{
        const {user} = req.body
    
        const favorites = await getAllFavorites(user.id)
        if(!favorites.length) next({status: 404, message: `Event/s not found`})
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
