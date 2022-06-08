import {Model, Column, Table, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { EventLocation } from './EventLocation';



@Table
export class Date extends Model<Date> {
    @Column
    date!: string;

    @Column
    price!: number;

    @ForeignKey(() => EventLocation)
    @Column
    eventId!: number

    @BelongsTo(() => EventLocation)
    event!: EventLocation
}