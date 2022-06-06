import {Model, Column, Table, HasMany} from 'sequelize-typescript';
import { Event } from './Event';

@Table
export class Organization extends Model<Organization> {
    @Column
    name!: string;

    @HasMany(() => Event)
    events!: Event[]
}