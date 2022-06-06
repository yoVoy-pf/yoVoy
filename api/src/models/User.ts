import {Model, Column, Table, HasMany} from 'sequelize-typescript'
import {Ticket} from './Ticket'

@Table
export class User extends Model<User>{
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password!: string
  
  @HasMany(()=> Ticket)
  ticket!: Ticket
}

export default User

