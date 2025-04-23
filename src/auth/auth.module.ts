import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './user/auth.controller';
import { AuthService } from './user/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
