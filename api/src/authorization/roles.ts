import { sequelize } from "../db"
import bcrypt from 'bcrypt'
export enum ROLES_LIST {
  Admin = 3030,
  Organization = 2020,
  User = 1010
}

const roles = [
  {name: 'Admin', id: ROLES_LIST.Admin},
  {name: 'Organization', id: ROLES_LIST.Organization},
  {name: 'User', id: ROLES_LIST.User}
]

const {Role, User, UserRole} = sequelize.models

export async function createRoles(){
  Role.bulkCreate(roles)
  let password = 'Admin';
  let hashedPassword = await bcrypt.hash(password,10)
  let user = await User.create({
    name: 'Admin',
    password: hashedPassword,
  })
  UserRole.create({userId: user.getDataValue('id'), roleId: ROLES_LIST.Admin })
  UserRole.create({userId: user.getDataValue('id'), roleId: ROLES_LIST.Organization })
  UserRole.create({userId: user.getDataValue('id'), roleId: ROLES_LIST.User })

  password = 'Organization'
  hashedPassword = await bcrypt.hash(password,10)
  user = await User.create({
    name: 'Organization',
    password: hashedPassword,
  })
  UserRole.create({userId: user.getDataValue('id'), roleId: ROLES_LIST.Organization })
  UserRole.create({userId: user.getDataValue('id'), roleId: ROLES_LIST.User })

  password = 'User'
  hashedPassword = await bcrypt.hash(password,10)
  user = await User.create({
    name: 'User',
    password: hashedPassword,
  })
  UserRole.create({userId: user.getDataValue('id'), roleId: ROLES_LIST.User })

  password = 'Guest'
  hashedPassword = await bcrypt.hash(password,10)
  user = await User.create({
    name: 'Guest',
    password: hashedPassword,
  })
}