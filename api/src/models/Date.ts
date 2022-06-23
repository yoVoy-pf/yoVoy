import {Model, Column, Table, BelongsTo, ForeignKey, DataType, Default} from 'sequelize-typescript';
import { EventLocation } from './EventLocation';



@Table
export class Date extends Model<Date> {
    @Column
    date!: string;

    @Column
    price!: number;

    @Default("active")
    @Column(DataType.ENUM("active","inactive", "canceled"))
    status!: string

    @ForeignKey(() => EventLocation)
    @Column
    eventLocationId!: number

    @BelongsTo(() => EventLocation)
    event!: EventLocation
}