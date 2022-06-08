import {Model, Column, Table, HasMany} from 'sequelize-typescript';
import { Event } from './Event';


@Table
export class Location extends Model<Location> {
    @Column
    name!: string;

    @Column
    city!: string;

    @Column
    address!: string;

    @Column
    map!: string;

    @HasMany(() => Event)
    events!: Event[]
}