require('dotenv').config()
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';

// authenticate the token send by header on the request

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ').pop()
  if (!token) return next({status:401, message:'You need a valid token to access this route'})
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return next({status:403, message:`You don't have access. Token no longer valid`})
    req.body.user = user;
    next();
  })
}