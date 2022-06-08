import {Model, Column, Table, HasMany, DataType} from 'sequelize-typescript';
import {Ticket} from './Ticket';
import { Comment } from './Comment';
import { Event } from './Event';

export interface iUser {
  name : string;
  password : string;
  email? : string;
  refreshToken? : string;
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

  @HasMany(() => Comment)
  comments!: Comment[];
  
  @HasMany(()=> Ticket)
  tickets!: Ticket[]

  @HasMany(() => Event)
  favorites!: Event[];
}

