import { Request, Response, NextFunction } from "express"

export const getUsers = (req: Request,res: Response,next:NextFunction) => {
  res.send({list: [1,2,3]})

}
export const getUser = (req: Request,res: Response,next:NextFunction) => {

}
export const createUser = (req: Request,res: Response,next:NextFunction) => {

}
export const deleteUser = (req: Request,res: Response,next:NextFunction) => {

}


