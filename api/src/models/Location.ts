import {Model, Column, Table, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { City } from './City';
import { Event } from './Event';


@Table
export class Location extends Model<Location> {
    @Column
    name!: string;

    @Column
    address!: string;

    @Column
    map!: string;

    @HasMany(() => Event)
    events!: Event[]

    @ForeignKey(() => City)
    @Column
    cityId!: number;

    @BelongsTo(() => City)
    city!: City;
}