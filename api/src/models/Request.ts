import {Model, Column, Table, BelongsTo, Default, ForeignKey, DataType} from 'sequelize-typescript';
import { User } from './User';

@Table
export class Request extends Model<Request> {
    @Default("pending")
    @Column(DataType.ENUM("pending","accepted","rejected"))
    status!: string;

    @Column(DataType.TEXT)
    description!: string

    @Column
    type!: string;

    @Column(DataType.ENUM("GET","POST","PUT","DELETE"))
    method!: string;

    @Column(DataType.TEXT)
    url_body!: string;

    @Column
    function!: string;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => User)
    @Column
    userId!: number;
}
