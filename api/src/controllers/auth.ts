require('dotenv').config()
import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import { createUserInDb, getUserFromDbByField } from "../utils/users"
import { iUser } from "../models/User"
import { generateAccessToken, updateRefreshToken, verifyRefreshToken } from "../utils/auth"

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
  const user = await getUserFromDbByField('name',req.body.name) // Find in DB
  if (!user) return next({status: 400, message: `Cannot find user`})
  try{
    if(await bcrypt.compare(req.body.password, user.password)){ // Compare the password sent by body with the one in the DB
      const accessToken =  generateAccessToken(user)
      const refreshToken = await updateRefreshToken(user)
      res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) // 1 day
      res.send({accessToken})
    } else next({status:403 , message:'Not Allowed'})
  }catch(error){
    next(error)
  }
}

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!Object.keys(cookies).length || !Object.keys(cookies.jwt).length) return next({status: 401, message: `Invalid refresh token`})
  const refreshToken = cookies.jwt;
  try{
    const user = await getUserFromDbByField('refreshToken',refreshToken);
    if (!user) return next({status:403 , message:'Not Allowed'})
    let newToken = verifyRefreshToken(user);
    if (typeof newToken === 'string') res.send({newToken})
    else throw newToken    
  }catch(error){return next(error)}

  
}