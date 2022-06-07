require('dotenv').config()
import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {users} from './users'
import { iUser } from "../models/User"

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  let user : iUser = {name: req.body.name, password: req.body.password}
  try{
    const hashedPassword = await bcrypt.hash(user.password,10) // hash(password, salt)
    user = {...user, password: hashedPassword}
    users.push(user)
    res.sendStatus(201)
  }catch(error){
    next(error)
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = users.find(user => user.name === req.body.name) // Find in DB
  if (!user) return next({status: 400, message: `Cannot find user`})
  try{
    if(await bcrypt.compare(req.body.password, user.password)){ // Compare the password sent by body with the one in the DB
      const accessToken = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET as string)
      res.send({accessToken})
    } else res.send('Not Allowed')
  }catch(error){
    next(error)
  }
}