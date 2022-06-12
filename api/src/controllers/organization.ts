import { Request, Response, NextFunction } from "express"
import { createOrganization, getOrganizationById} from "../utils/organization"


export const postOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, user} = req.body
        
        const organization = await createOrganization(name, user.id)

        res.status(201).json(organization)
    }catch(error){
        next(error)
    }
}

export const getOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params

        const organization = await getOrganizationById(id)

        res.status(200).json(organization)
    }catch(error){
        next(error)
    }
}
