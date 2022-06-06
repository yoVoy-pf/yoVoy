import {Model, Column, Table, ForeignKey, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript';
import { Organization } from './Organization';
import { Date } from './Date';
import { Category } from './Category';
import { EventCategory } from './EventCategory';

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

    @BelongsTo(() => Organization)
    organization!: Organization

    @HasMany(() => Date)
    dates!: Date[];

    @BelongsToMany(() => Category, () => EventCategory)
    categories!: Category[]
}