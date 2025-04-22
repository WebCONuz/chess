import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from '../../users/model/users.model';
import { UserGames } from '../../users/model/user-games';

interface CreateGameAttr {
  result: number;
  description: string;
  is_active: boolean;
  tournamentId: number;
}

@Table({ tableName: 'games' })
export class Game extends Model<Game, CreateGameAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
  })
  result: number;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  tournamentId: number;

  @BelongsToMany(() => Users, () => UserGames)
  players: Users[];
}
