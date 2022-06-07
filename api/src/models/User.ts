import {Model, Column, Table, HasMany} from 'sequelize-typescript';
import {Ticket} from './Ticket';

export interface iUser {
  name : string;
  email? : string;
  password : string;
  ticket? : Ticket
}

@Table
export class User extends Model<iUser>{
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password!: string
  
  @HasMany(()=> Ticket)
  ticket!: Ticket
}

