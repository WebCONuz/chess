import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UsersAttr {
  fullname: string;
  age: number;
  raiting: number;
  country: string;
  role: string;
  username: string;
  password: string;
  tournament_id: number;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UsersAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullname: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  raiting: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tournament_id: number;
}
