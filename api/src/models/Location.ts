import {Model, Column, Table, HasMany} from 'sequelize-typescript';
import { Date } from './Date';


@Table
export class Location extends Model<Location> {
    @Column
    name!: string;

    @Column
    address!: string;

    @Column
    map!: string;

    @HasMany(() => Date)
    dates!: Date[]
}