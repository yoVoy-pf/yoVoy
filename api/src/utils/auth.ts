require('dotenv').config()
import  jwt  from "jsonwebtoken";
import { User } from "../models/User";
import { iUser } from "../types/user";

export function generateAccessToken(user: iUser){
  let currentUser = {...user};
  delete currentUser.refreshToken;
  return jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '30m'})
}

export async function updateRefreshToken(user: iUser, errase: boolean = false){
  let token;
  errase 
  ? token = '' 
  : token = jwt.sign(
        user,
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn: '1d'}
      )
  await User.update({refreshToken: token}, {where: {name: user.name}})
  return token;
}

export function verifyRefreshToken(user:iUser){
  const token = user.refreshToken as string;
  let newToken : string | {status: number, message: string}= ''
  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err, decoded) => {
    let decodedUser : iUser = decoded as iUser;
    if (err || user.name !== decodedUser.name)  newToken =({status:403, message:`You don't have access. Token no longer valid`})
    else newToken = generateAccessToken(user)
  }
  )
  return newToken;
}
