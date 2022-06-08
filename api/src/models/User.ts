import {Model, Column, Table, HasMany, DataType} from 'sequelize-typescript';
import { Event } from './Event';
import {Ticket} from './Ticket';

export interface iUser {
  name : string;
  password : string;
  email? : string;
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

  @Column(DataType.STRING(500))
  refreshToken!: string;
  
  @HasMany(()=> Ticket)
  tickets!: Ticket[]

  @HasMany(() => Event)
  favorites!: Event[];
}

