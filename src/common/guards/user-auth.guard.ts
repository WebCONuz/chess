import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const headers = req.headers.authorization;
    if (!headers) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }

    const bearer = headers.split(' ')[0];
    const token = headers.split(' ')[1];
    if (!bearer || !token) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }

    try {
      const payload = this.jwtService.verify(token, { secret: 'Salom!' });
      req.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
