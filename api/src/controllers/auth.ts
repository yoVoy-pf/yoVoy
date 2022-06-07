import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import { createUserInDb, getUserFromDbByName } from "../utils/users"
import { iUser } from "../models/User"

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  let user : iUser = {name: req.body.name, password: req.body.password}
  try{
    const hashedPassword = await bcrypt.hash(user.password,10) // hash(password, salt)
    user = {...user, password: hashedPassword}
    await createUserInDb(user)
    res.sendStatus(201)
  }catch(error){
    next(error)
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await getUserFromDbByName(req.body.name) // Find in DB
  if (!user) return next({status: 400, message: `Cannot find user`})
  try{
    if(await bcrypt.compare(req.body.password, user.password)){ // Compare the password sent by body with the one in the DB
      res.send('Success')
    } else res.send('Not Allowed')
  }catch(error){
    next(error)
  }
}