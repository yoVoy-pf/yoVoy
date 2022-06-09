import { sequelize } from '../db'
import { iUser } from '../models/User';
import { ROLES_LIST } from '../authorization/roles';
const { User, Role, UserRole } = sequelize.models


// create new user in the database
export async function createUserInDb(user: iUser) {
  const {name, password} = user
  try{
    const newUser = await User.create({name, password})
    let id : number = newUser?.getDataValue('id')
    UserRole.create({userId: id, roleId: ROLES_LIST.User})
  }catch(error) {throw error}
}

//return every user in the database
export async function getUsersFromDb() {
    const users = await User.findAll({
      include: {
        model: Role,
        attributes:['name'],
        through:{
          attributes:[]
        }
      }
    })
    return users;
}

export async function getUserFromDbByField(field: string, value: string) {
    const user = await User.findOne({
      where: {
        [field]:value
      }
    })
    if (!user) return null;
    let username : string= user?.getDataValue('name');
    let password : string= user?.getDataValue('password');
    let email : string= user?.getDataValue('email');
    let refreshToken : string = user?.getDataValue('refreshToken');
     return {name: username, password, email, refreshToken};
}

export async function giveRoleToUser(user: iUser, role: number){

}