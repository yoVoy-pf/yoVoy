import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import {users} from './users'
import { iUser } from "../models/User"

export const registerUser = (req: Request, res: Response, next: NextFunction) => {
  const user : iUser = {name: req.body.name, password: req.body.password}
  users.push(user)
  res.sendStatus(201)
}