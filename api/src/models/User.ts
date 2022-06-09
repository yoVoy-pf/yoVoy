import {Model, Column, Table, HasMany, DataType, BelongsToMany, HasOne, ForeignKey} from 'sequelize-typescript';
import {Ticket} from './Ticket';
import { Comment } from './Comment';
import { Event } from './Event';
import { Favorites } from './Favorites';
import { Role } from './Role';
import { UserRole } from './UserRole';
import { iUser } from '../types/user';
import { Organization } from './Organization';

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

  @ForeignKey(() => Organization)
  @Column
  organizationId!: number;
  
  @HasOne(() => Organization)
  organization!: Organization;

  @HasMany(() => Comment)
  comments!: Comment[];
  
  @HasMany(()=> Ticket)
  tickets!: Ticket[]

  @BelongsToMany(() => Event, () => Favorites)
  favorites!: Event[];

  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[];
}

