import {Model, Column, Table, HasMany} from 'sequelize-typescript';
import {Ticket} from './Ticket';
import { Comment } from './Comment';

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

  @HasMany(() => Comment)
  comments!: Comment[];
  
  @HasMany(() => Ticket)
  ticket!: Ticket
}

