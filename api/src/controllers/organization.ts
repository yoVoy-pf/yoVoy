import { Request, Response, NextFunction } from "express"
import { createOrganization } from "../utils/organization"


export const postOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, user} = req.body
        
        const organization = await createOrganization(name, user.id)

        res.status(201).json(organization)
    }catch(error){
        next(error)
    }
}