import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Game } from '../../games/model/game.model';
import { UserGames } from './user-games';

interface UsersAttr {
  fullname: string;
  age: number;
  raiting: number;
  country: string;
  role: string;
  username: string;
  password: string;
  avatar: string;
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
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare avatar: string;

  @BelongsToMany(() => Game, () => UserGames)
  games: Game[];
}
