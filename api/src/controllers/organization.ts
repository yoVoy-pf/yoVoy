import { Request, Response, NextFunction } from "express"
import { createOrganization, destroyOrganization } from "../utils/organization"


export const postOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, user} = req.body
        
        const organization = await createOrganization(name, user.id)

        res.status(201).json(organization)
    }catch(error){
        next(error)
    }
}

export const deleteOrganization = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params

        const number = await destroyOrganization(id)

        if(!number){
            next({status:404, message: "Organization not found"})
        }else{
            res.status(200).json("Organization was deleted")
        }
    }catch(error){
        next(error)
    }

}