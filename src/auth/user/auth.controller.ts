import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from '../auth-dto/signup-auth.dto';
import { SignInUserDto } from '../auth-dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signup(signUpUserDto);
  }

  @Post('login')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }
}
