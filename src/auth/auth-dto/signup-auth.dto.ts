import {
  IsAlpha,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsString()
  raiting: string;

  @IsAlpha()
  country: string;

  @IsString()
  role: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  password: string;

  avatar: any;
}
