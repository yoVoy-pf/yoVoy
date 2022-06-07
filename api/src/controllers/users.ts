import { Request, Response, NextFunction } from "express"
import { iUser } from "../models/User"

export const users : iUser[] = [{
  name:'Pablo',
  password:'12345'
}]

export const getUsers = (req: Request,res: Response,next:NextFunction) => {
  res.send(users)

}
export const getUser = (req: Request,res: Response,next:NextFunction) => {

}
export const createUser = (req: Request,res: Response,next:NextFunction) => {

}
export const deleteUser = (req: Request,res: Response,next:NextFunction) => {

}


