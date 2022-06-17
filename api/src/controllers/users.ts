import { Request, Response, NextFunction } from "express"
import { getUsersFromDb, getUserById, destroyUser, updateUser } from "../utils/users"

export const getUsers = (req: Request,res: Response,next:NextFunction) => {
  getUsersFromDb().then(users => res.send(users)).catch(error => next(error))

}
export const getUser = async (req: Request,res: Response,next:NextFunction) => {
  try{
    const {id} = req.params
    const user = await getUserById(id)

    if(!user) next({status: 404, message: "User not found"})
    else res.status(200).json(user)

  }catch(error){
    next(error)
  }
}
export const createUser = (req: Request,res: Response,next:NextFunction) => {

}
export const deleteUser = async (req: Request,res: Response,next:NextFunction) => {
  try{
    const {id} = req.params
    const user = await destroyUser(id)
    
    if(!user) next({status: 404, message: "User not found"})
    else res.status(200).json(user)
    
  }catch(error){
    next(error)
  }
}

export const putUser = async (req: Request,res: Response,next:NextFunction) => {
  try{
    const {id} = req.params

    const user = await updateUser(id, req.body)

    res.status(200).json(user)
  }catch(error){
    next(error)
  }
}


