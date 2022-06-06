import {Model, Column, Table, ForeignKey, HasMany} from 'sequelize-typescript';
import { Organization } from './Organization';
import { Date } from './Date';

@Table
export class Event extends Model<Event> {
    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    background_image!: string;

    @ForeignKey(() => Organization)
    @Column
    organizationId!: number;

    @HasMany(() => Date)
    dates!: Date[];
}