import {Model, Column, Table, HasMany} from 'sequelize-typescript';
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

  @Column
  refreshToken!: number;
  
  @HasMany(()=> Ticket)
  ticket!: Ticket

  @HasMany(() => Event)
  favorites!: Event[];
}

