import { ParseIntPipe } from '@nestjs/common';
import { Type } from 'class-transformer';

export class CreateUserDto {
  fullname: string;
  age: string;
  raiting: string;
  country: string;
  role: string;
  username: string;
  password: string;
  avatar: any;
}
