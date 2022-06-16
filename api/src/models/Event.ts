import {Model, Column, Table, ForeignKey, HasMany, BelongsTo, BelongsToMany, DataType} from 'sequelize-typescript';
import { Organization } from './Organization';
import { Category } from './Category';
import { EventCategory } from './EventCategory';
import { Ticket } from './Ticket';
import { Comment } from "./Comment"
import { Location } from './Location';
import { EventLocation } from './EventLocation';
import { User } from './User';
import { Favorites } from './Favorites';

@Table
export class Event extends Model<Event> {
    @Column
    name!: string;

    @Column(DataType.TEXT)
    description!: string;

    @Column
    background_image!: string;

    @ForeignKey(() => Organization)
    @Column
    organizationId!: number;

    @BelongsTo(() => Organization)
    organization!: Organization

    @BelongsToMany(() => Location, () => EventLocation)
    locations!: Location[]

    @HasMany(()=> EventLocation)
    locations_m!: EventLocation[] 

    @HasMany(() => Comment)
    comments!: Comment[]

    @BelongsToMany(() => Category, () => EventCategory)
    categories!: Category[]


    @HasMany(() => Ticket)
    ticket!: Ticket

    @BelongsToMany(() => User, () => Favorites)
    users!: User[];
}