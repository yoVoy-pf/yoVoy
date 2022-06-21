import { Request, Response, NextFunction } from "express";
import { createRequest, updateRequest } from "../utils/request";

export const postRequest = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {user, description, type, method, information } = req.body


        await createRequest(user.id, description, type, method, information)

        res.status(201).send("Request created successfully")
    }catch(error){
        next(error)
    }
}

export const putRequest = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {status} = req.body
        const {id} = req.params


        await updateRequest(id,status)

        res.status(200).send("Request updated successfully")
    }catch(error){
        next(error)
    }
}
