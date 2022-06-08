import {Model, Column, Table, HasMany} from 'sequelize-typescript';
import { Event } from './Event';


@Table
export class City extends Model<City> {
    @Column
    name!: string;

}