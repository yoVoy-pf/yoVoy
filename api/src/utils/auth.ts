require('dotenv').config()
import  jwt  from "jsonwebtoken";
import { iUser } from "../models/User";

export function generateAccessToken(user: iUser){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '30m'})
}