import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { SignUpUserDto } from '../auth-dto/signup-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from '../auth-dto/signin-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authService: UsersService,
    readonly jwtService: JwtService,
  ) {}

  async signup(authDto: SignUpUserDto) {
    try {
      const hashPassword = await bcrypt.hash(authDto.password, 10);
      const user = await this.authService.create({
        ...authDto,
        password: hashPassword,
      });
      const payload = {
        sub: user.id,
        login: user.username,
      };
      const token = this.jwtService.sign(payload, {
        secret: 'Salom!',
        expiresIn: '1h',
      });
      return {
        success: true,
        id: user.id,
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signin(authDto: SignInUserDto) {
    const user = await this.authService.getByUsername(authDto.username);
    if (!user) {
      throw new NotFoundException('User mavjud emas');
    }

    const check = bcrypt.compare(authDto.password, user.dataValues.password);
    if (!check) {
      throw new BadRequestException('login yoki parol xato!');
    }

    const payload = {
      sub: user.id,
      login: user.username,
    };
    const token = this.jwtService.sign(payload, {
      secret: 'Salom!',
      expiresIn: '1h',
    });
    return {
      success: true,
      id: user.id,
      token,
    };
  }
}
