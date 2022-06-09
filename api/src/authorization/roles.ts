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

const {Role} = sequelize.models

export async function createRoles(){
  Role.bulkCreate(roles)
}