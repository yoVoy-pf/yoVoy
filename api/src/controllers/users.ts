import { Request, Response, NextFunction } from "express"
import { getUsersFromDb } from "../utils/users"

export const getUsers = (req: Request,res: Response,next:NextFunction) => {
  getUsersFromDb().then(users => res.send(users)).catch(error => next(error))

}
export const getUser = (req: Request,res: Response,next:NextFunction) => {

}
export const createUser = (req: Request,res: Response,next:NextFunction) => {

}
export const deleteUser = (req: Request,res: Response,next:NextFunction) => {

}


