import {Model, Column, Table, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { Event } from './Event';
import { Location } from './Location';


@Table
export class Date extends Model<Date> {
    @Column
    date!: string;

    @Column
    price!: number;

    @ForeignKey(() => Event)
    @Column
    eventId!: number

    @BelongsTo(() => Event)
    event!: Event

    @ForeignKey(() => Location)
    @Column
    locationId!: number

    @BelongsTo(() => Location)
    location!: Location
}