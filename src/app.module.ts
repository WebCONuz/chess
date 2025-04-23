import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GamesModule } from './games/games.module';
import { Users } from './users/model/users.model';
import { Game } from './games/model/game.model';
import { UserGames } from './users/model/user-games';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      autoLoadModels: true,
      models: [Users, Game, UserGames],
      logging: false,
      sync: { alter: true },
    }),
    UsersModule,
    GamesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
