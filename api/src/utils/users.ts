import { sequelize } from '../db'
import { iUser } from '../types/user';
import { ROLES_LIST } from '../authorization/roles';
import {Model} from 'sequelize-typescript'
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
      },
      include: {
        model: Role,
        attributes:['id'],
        through:{
          attributes:[]
        }
      }
    })
    if (!user) return null;
    let username : string= user?.getDataValue('name');
    let password : string= user?.getDataValue('password');
    let email : string= user?.getDataValue('email');
    let refreshToken : string = user?.getDataValue('refreshToken');
    let rolesId : []= user?.getDataValue('roles').map((r : Model<any,any>) => r.getDataValue('id'))
    let id : number = user?.getDataValue("id");
     return {name: username, password, email, refreshToken, rolesId, id};
}

export async function giveRoleToUser(user: iUser, role: number){

}

export async function getUserById(id: string | number) {
  const user = await User.findByPk(id)

  return user
}

export async function destroyUser(id: string | number){
  const user = await User.destroy({
    where: {
      id: id
    }
  })

  return user
}