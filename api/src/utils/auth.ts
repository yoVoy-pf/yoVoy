require('dotenv').config()
import  jwt  from "jsonwebtoken";
import { iUser, User } from "../models/User";

export function generateAccessToken(user: iUser){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '30m'})
}

export async function updateRefreshToken(user: iUser){
  const token = jwt.sign(
        user,
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn: '1d'}
      )
  await User.update({refreshToken: token}, {where: {name: user.name}})
  return token;
}