import { sequelize } from "../db"
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
  let admin = await User.create({
    name: 'Admin',
    password: 'Admin',
  })
  UserRole.create({userId: admin.getDataValue('id'), roleId: ROLES_LIST.Admin })
  UserRole.create({userId: admin.getDataValue('id'), roleId: ROLES_LIST.Organization })
  UserRole.create({userId: admin.getDataValue('id'), roleId: ROLES_LIST.User })
}