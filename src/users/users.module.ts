import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './model/users.model';
import { UserGames } from './model/user-games';
import { Game } from '../games/model/game.model';

@Module({
  imports: [SequelizeModule.forFeature([Users, UserGames, Game])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
