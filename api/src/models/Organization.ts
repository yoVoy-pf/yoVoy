import {Model, Column, Table, HasMany, BelongsTo, ForeignKey, DataType} from 'sequelize-typescript';
import { Event } from './Event';
import { User } from './User';

@Table
export class Organization extends Model<Organization> {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @Column(DataType.STRING(500))
    ACCESS_TOKEN!: string;

    @Column
    name!: string;

    @HasMany(() => Event)
    events!: Event[]
}