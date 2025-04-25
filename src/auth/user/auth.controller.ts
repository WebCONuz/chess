import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from '../auth-dto/signup-auth.dto';
import { SignInUserDto } from '../auth-dto/signin-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  signUp(@Body() signUpUserDto: SignUpUserDto, @UploadedFile() avatar: any) {
    return this.authService.signup(signUpUserDto, avatar);
  }

  @Post('login')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }
}
