import {Model, Column, Table, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { Event } from './Event';
import { User } from './User';

@Table
export class Organization extends Model<Organization> {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @Column
    name!: string;

    @HasMany(() => Event)
    events!: Event[]
}