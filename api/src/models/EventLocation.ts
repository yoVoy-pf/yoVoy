import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import { Location } from './Location';
import { Event } from './Event';



@Table
export class EventLocation extends Model<EventLocation> {
    @ForeignKey(() => Event)
    @Column
    eventId!: number

    @ForeignKey(() => Location)
    @Column
    locationId!: number
}
