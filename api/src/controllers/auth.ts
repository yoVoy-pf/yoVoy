require('dotenv').config()
import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import { createUserInDb, getUserFromDbByField } from "../utils/users"
import { iUser } from "../types/user"
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
  if (!Object.keys(cookies).length || !Object.keys(cookies.jwt).length) return res.sendStatus(401) // unauthorized
  const refreshToken = cookies.jwt;
  try{
    const user = await getUserFromDbByField('refreshToken',refreshToken);
    if (!user) return next({status:403 , message:'Not Allowed'})
    let newToken = verifyRefreshToken(user);
    if (typeof newToken === 'string') res.send({accessToken:newToken})
    else throw newToken   // obj error {status, message}
  }catch(error){return next(error)}
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!Object.keys(cookies).length || !Object.keys(cookies.jwt).length) return res.sendStatus(204) // no content
  const refreshToken = cookies.jwt;
  try{
    // Is refreshToken in db?
    const user = await getUserFromDbByField('refreshToken',refreshToken);
    // If we dont find a user with the refreshToken, we proceed to clear the cookie
    if (!user) {
      res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
      return res.sendStatus(204)
    }
    // Delete refreshToken in db
    await updateRefreshToken(user, true) // errase true
    res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.sendStatus(204)
    // if (!user)    
  }catch(error){return next(error)}
}