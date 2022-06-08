import {Model, Column, Table, BelongsTo, ForeignKey, BelongsToMany} from 'sequelize-typescript';
import { City } from './City';
import { Event } from './Event';
import { EventLocation } from './EventLocation';


@Table
export class Location extends Model<Location> {
    @Column
    name!: string;

    @Column
    address!: string;

    @Column
    map!: string;

    @BelongsToMany(() => Event, () => EventLocation)
    events!: Event[]

    @ForeignKey(() => City)
    @Column
    cityId!: number; 

    @BelongsTo(() => City)
    city!: City;
}