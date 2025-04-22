import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Game } from '../../games/model/game.model';

interface UserGamesAttr {
  userId: number;
  gameId: number;
}

@Table({ tableName: 'user-games' })
export class UserGames extends Model<UserGames, UserGamesAttr> {
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Game)
  @Column({
    type: DataType.INTEGER,
  })
  gameId: number;
}
