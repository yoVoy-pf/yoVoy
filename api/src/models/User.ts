import {Model, Column, Table, BelongsTo, ForeignKey, DataType} from 'sequelize-typescript'
import { sequelize } from '../db';
import { StringLiteralLike } from 'typescript';

interface UserAttributes{
  name: string;
  email: string;
  password: string;
}

@Table
export class User extends Model<UserAttributes>{
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password!: string
  
}


  // class User extends Model<UserAttributes>
  // implements UserAttributes
  // {
  //   name!: string;
  //   email!: string;
  //   password!: string;
  // }
  // User.init({
  //   name: {
  //     type: DataType.STRING,
  //     allowNull: false
  //   },
  //   email:{
  //     type: DataType.STRING,
  //     allowNull: false,
  //     unique: true
  //   },
  //   password:{
  //     type: DataType.STRING,
  //     allowNull: false
  //   }
  // },{
  //   sequelize,
  //   tableName: 'User'
  // })

export default User

