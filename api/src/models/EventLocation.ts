import {Model, Column, Table, ForeignKey, HasMany} from 'sequelize-typescript';
import { Location } from './Location';
import { Event } from './Event';
import { Date } from './Date';



@Table
export class EventLocation extends Model<EventLocation> {

    @HasMany(() => Date)
    dates!: Date[]

    @ForeignKey(() => Event)
    @Column
    eventId!: number

    @ForeignKey(() => Location)
    @Column
    locationId!: number
}