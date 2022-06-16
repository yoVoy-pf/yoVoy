import { Request, Response, NextFunction } from "express"
import { createOrganization, getOrganizationById, destroyOrganization, updateOrganization} from "../utils/organization"


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

export const getOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params

        const organization = await getOrganizationById(id)

        res.status(200).json(organization)
    }catch(error){
        next(error)
    }
}

export const putOrganization = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params

        const organization = await updateOrganization(id, req.body)

        res.status(200).json(organization)
    }catch(error){
        next(error)
    }
}

