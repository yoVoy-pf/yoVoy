import { sequelize } from '../db'
import { iUser } from '../models/User';
const { User } = sequelize.models


// create new user in the database
export async function createUserInDb(user: iUser) {
  const {name, password} = user
  try{
    await User.create({name, password})
  }catch(error) {throw error}
}

//return every user in the database
export async function getUsersFromDb() {
    const users = await User.findAll()
    return users;
}

export async function getUserFromDbByName(name: string) {
    const user = await User.findOne({
      where: {
        name
      }
    })
    if (!user) return null;
    let username : string= user?.getDataValue('name');
    let password : string= user?.getDataValue('password')
     return {name: username, password};
}