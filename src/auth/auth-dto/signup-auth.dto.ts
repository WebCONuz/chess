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

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNumber()
  raiting: number;

  @IsAlpha()
  country: string;

  @IsString()
  role: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  password: string;
}
