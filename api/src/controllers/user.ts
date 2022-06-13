import { Request, Response, NextFunction } from "express"
import { getAllFavorites} from "../utils/user"

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

