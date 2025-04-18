import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './model/users.model';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
