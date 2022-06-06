import {Model, Column, Table, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { Event } from './Event';
import { User } from './User';

@Table
export class Category extends Model<Category> {
    @Column
    serialNumber!: number;

    @ForeignKey(() => Event)
    @Column
    eventId!: number

    @BelongsTo(() => Event)
    event!: Event

    @ForeignKey(() => User)
    @Column
    userId!: number

    @BelongsTo(()=> User)
    user!: User
}
