require('dotenv').config()
import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import { createUserInDb, getUserFromDbByField } from "../utils/users"
import { iUser } from "../types/user"
import { decodeGoogleToken, generateAccessToken, updateRefreshToken, verifyRefreshToken } from "../utils/auth"
import config from "../../config"

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  let user : iUser;
  try{
    if (req.body.googleToken){
      // Desencrypt google token
      const decodedUserInfo : any = decodeGoogleToken(req.body.googleToken)
      const {email, name, email_verified: check} = decodedUserInfo
      // Check if mail is verified
      if(!check) return next({status: 403, message: `El email no esta verificado`})
      const password = await bcrypt.hash(req.body.clientId, 10)
      user = {name, password, email}
      console.log(user)
      req.body = {
        googleToken: req.body.googleToken,
      }
    }
    else{
      const password = await bcrypt.hash(req.body.password,10) // hash(password, salt)
      user = {name: req.body.name, email: req.body.email, password}
      req.body ={
        email: user.email,
        password: req.body.password
      }
    }
    // Verify if user already exists
    const userExists = await getUserFromDbByField('email', user.email);
    if (userExists) return next({status: 400, message: `Ya existe un usuario con ese email`})
    else{
      await createUserInDb(user)
      res.redirect(307,'./login')
    }
  }catch(error){
    next(error)
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  // Check if is google user
  let user;
  try{
      if(req.body.googleToken){
      // Desencrypt google token
      const decodedUserInfo : any = decodeGoogleToken(req.body.googleToken)
      const {email, name, email_verified: check} = decodedUserInfo
      // Check if mail is verified
      if(!check) return next({status: 403, message: `El email no esta verificado`})
      // check if user exists in Db
      user = await getUserFromDbByField('email', email)
      if(!user) return next({status: 400, message: `El usuario no existe`})
    }
      else{
          // Checks if user exists in Db
          user = await getUserFromDbByField('email', req.body.email) 
          if (!user) return next({status: 400, message: `El usuario no existe`})
          // Compare the password sent by body with the one in the DB
          if(!await bcrypt.compare(req.body.password, user.password)) return next({status:403 , message:'Contraseña incorrecta'})
      } 
      // Generate access token
      const accessToken =  generateAccessToken(user)
      const refreshToken = await updateRefreshToken(user)
      res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, domain:'herokuapp.com', sameSite: 'none', maxAge: 24 * 60 * 60 * 1000}) // 1 day
      res.send({
      data: {
      name : user.name,
      email : user.email,
      rolesId: user.rolesId,
        },
      accessToken: accessToken
      })
  }catch(error){
    next(error)
      }
  
}

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(401)
  if (!Object.keys(cookies).length || !Object.keys(cookies.jwt).length) return res.sendStatus(401) // unauthorized
  const refreshToken = cookies.jwt;
  try{
    const user = await getUserFromDbByField('refreshToken',refreshToken);
    if (!user) return next({status:403 , message:'El usuario con ese token no existe'})
    let newToken = verifyRefreshToken(user);
    if (typeof newToken === 'string') res.send({accessToken:newToken})
    else throw newToken   // obj error {status, message}
  }catch(error){return next(error)}
}

// getUserAuth
export const getUserAuth = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  console.log(cookies)
  if (!Object.keys(cookies).length || !Object.keys(cookies.jwt).length) return res.sendStatus(401) // unauthorized
  const refreshToken = cookies.jwt;
  try{
    const user = await getUserFromDbByField('refreshToken',refreshToken);
    if (!user) return next({status:404 , message:'No se encontro una sesion activa'})
    let newToken = verifyRefreshToken(user);
    if (typeof newToken === 'string'){
    return res.send({
      data: {
      name : user.name,
      email : user.email,
      rolesId: user.rolesId,
        },
      accessToken: newToken
    })
    } else throw newToken   // obj error {status, message}

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
      res.clearCookie('jwt', {httpOnly: true, secure: true, domain:'herokuapp.com', sameSite: 'none', maxAge: 24 * 60 * 60 * 1000})
      return res.sendStatus(204)
    }
    // Delete refreshToken in db
    await updateRefreshToken(user, true) // errase true
    res.clearCookie('jwt', {httpOnly: true, secure: true, domain:'herokuapp.com',sameSite: 'none', maxAge: 24 * 60 * 60 * 1000})
    res.sendStatus(204)
    // if (!user)    
  }catch(error){return next(error)}
}
