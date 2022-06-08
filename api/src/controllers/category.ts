import { Response, Request, NextFunction } from "express";
import { createCategory } from "../utils/category"

export const postCategory = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name} = req.body
        const category = await createCategory(name)

        res.status(200).json(category)
    }catch(error){
        next(error)
    }

} 
