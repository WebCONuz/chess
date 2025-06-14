import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './model/game.model';
import { Users } from '../users/model/users.model';
import { UserGames } from '../users/model/user-games';

@Module({
  imports: [SequelizeModule.forFeature([Game])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
