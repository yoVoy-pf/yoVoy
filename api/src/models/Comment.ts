import {Model, Column, Table, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { Event } from './Event';
import { User } from './User';

@Table
export class Comment extends Model<Comment> {
    @Column
    description!: string;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;   

    @ForeignKey(() => Event)
    @Column
    eventId!: number;

    @BelongsTo(() => Event)
    event!: Event;
}
